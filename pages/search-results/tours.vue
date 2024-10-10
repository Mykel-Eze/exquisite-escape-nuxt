<!-- pages/search-results/tours.vue -->
<template>
  <div id="tour-result-page">
    <div class="top-section black-bg">
      <div class="row">
        <div class="container py-5">
          <div class="search-tab-wrapper">
            <TourTab />
          </div>
        </div>
      </div>
    </div>

    <section class="results-section">
      <div class="row">
        <div class="container c2">
          <div class="result-main-wrapper">
            <div class="result-filter-side">
              <div class="rfs">
                <ToursFilter :tours="tourList" @update:filteredTours="updateFilteredTours" />
              </div>
            </div>
            <div class="result-contents-side py-10">
              <div class="px-[30px]">
                <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                  <span class="text-white">
                    {{ numberOfActivities }} activities in {{ destinationName }}, {{ countryName }}
                  </span>
                  <img
                    src="@/assets/images/chevron-right.svg"
                    alt="chevron-right"
                    class="right-arr"
                  />
                  <span class="text-[#9d9d9d]">Review your options</span>
                </div>
                <div class="text-[18px] text-[#606161] leading-[26px]">
                  Prices displayed include taxes and may change based on
                  availability. You can review any additional fees before
                  checkout. Prices are not final until you complete your
                  purchase.
                </div>
                
                <div class="text-[18px] text-[#606161] leading-[26px] mt-4">
                    We work closely with all of our Tour Suppliers to protect our mutual customers.
                </div>
              </div>

              <div v-if="isLoading" class="loading-spinner-wrapper">
                <LoadingSpinner text="Fetching Tours..." />
              </div>
              <div v-else-if="!tourList || tourList.length === 0" class="mt-[100px] mb-[40px]">
                <EmptySearch
                  title="Sorry, we couldn't find any tours that match your criteria"
                  description="Try adjusting your search parameters or explore other destinations"
                />
              </div>
              <div v-else>
                <SortTours 
                    :tours="filteredTourList" 
                    :activeTab="activeTab"
                    @update:activeTab="updateActiveTab"
                    @view-ticket-details="showSidePopup"
                    @show-availability-modal="showAvailabilityModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ToursTicketOverviewBlock
        :tours="filteredTourList"
        @show-availability-modal="showAvailabilityModal"
        @view-ticket-details="showSidePopup"
    />
    <ToursAvailabilityModal
        :tour="selectedTour"
        @add-to-cart="addToCart"
    />
    <ToursSuccessModal
        :isVisible="isSuccessModalVisible"
        @open-cart="showSidePopup"
    />
    <ToursSidePopup
        :isVisible="isSidePopupVisible"
        :cartItems="cartItems"
        @close="closeSidePopup"
        @remove-from-cart="removeFromCart"
        @empty-cart="emptyCart"
        @add-more="addMore"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToursStore } from '@/store/tours';
import { useTours } from '@/composables/useTours';
import { useCartStore } from '@/store/cart';

const route = useRoute();
const toursStore = useToursStore();
const { fetchCountries, fetchDestinations } = useTours();

const tourList = ref([]);
const filteredTourList = ref([]);
const isLoading = ref(true);
const activeTab = ref('all');
const destinationName = ref('');
const countryName = ref('');

const isSidePopupVisible = ref(false);
const selectedTour = ref(null);
const cartItems = ref([]);
const isSuccessModalVisible = ref(false);

const numberOfActivities = computed(() => filteredTourList.value.length);

const cartStore = useCartStore();

const updateFilteredTours = (newFilteredTours) => {
  filteredTourList.value = newFilteredTours;
};

const updateActiveTab = (newActiveTab) => {
  activeTab.value = newActiveTab;
};

const fetchTourData = async () => {
  isLoading.value = true;
  const query = route.query;

  try {
    const payload = {
      countryCode: query.countryCode,
      stateCode: query.stateCode,
      departureDate: query.departureDate,
      destinationDate: query.destinationDate,
      paxType: query.paxType || "ADULT"
    };

    // Fetch country and destination names
    const countries = await fetchCountries();
    const country = countries.find(c => c.code === payload.countryCode);
    if (country) {
      countryName.value = country.name;
      const destinations = await fetchDestinations(payload.countryCode);
      const destination = destinations.find(d => d.code === payload.stateCode);
      if (destination) {
        destinationName.value = destination.name;
      }
    }

    const response = await toursStore.searchTours(payload);
    // tourList.value = response.data.activities || [];
    tourList.value = response.data.activities.map(activity => ({
      ...activity,
      departureDate: payload.departureDate,
      destinationDate: payload.destinationDate
    })) || [];
    filteredTourList.value = response.data.activities || [];
    console.log("Tour data fetched:", tourList.value); // Added this line for debugging
  } catch (error) {
    console.error("Error fetching tour data:", error);
    tourList.value = [];
    filteredTourList.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchTourData);

const viewTicketDetails = (tour) => {
  selectedTour.value = tour;
  showSidePopup.value = true;
};

// const closeAvailabilityModal = () => {
//   showAvailabilityModal.value = false;
// };

// const closeSuccessModal = () => {
//   showSuccessModal.value = false;
// };

const showAvailabilityModal = (tour) => {
  selectedTour.value = JSON.parse(JSON.stringify(tour)); // Create a deep copy
  const modal = M.Modal.getInstance(document.getElementById('tours-availability-modal'));
  modal.open();
  console.log(selectedTour.value)
};

const addToCart = (item) => {
  const cartItem = {
    ...item,
    id: Date.now().toString(),
    date: item.departureDate,
    destinationDate: item.destinationDate
  };
  console.log('Adding to cart:', cartItem); // Add this line for debugging
  cartItems.value.push(cartItem);
  cartStore.addItem(cartItem);
  const availabilityModal = M.Modal.getInstance(document.getElementById('tours-availability-modal'));
  availabilityModal.close();
  const successModal = M.Modal.getInstance(document.getElementById('tours-success-modal'));
  successModal.open();
};

const showSidePopup = () => {
  isSidePopupVisible.value = true;
  const successModal = M.Modal.getInstance(document.getElementById('tours-success-modal'));
  successModal.close();
};

const closeSidePopup = () => {
  isSidePopupVisible.value = false;
};

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
};

const emptyCart = () => {
  cartItems.value = [];
};

const addMore = () => {
  closeSidePopup();
};

watch(() => route.query, (newQuery, oldQuery) => {
  if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
    fetchTourData();
  }
}, { deep: true });
</script>


<style scoped>
/* Add any scoped styles here */
</style>