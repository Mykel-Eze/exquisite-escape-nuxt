<template>
  <div class="ticket-review-page pt-[100px] pb-[80px]">
    <div class="row">
      <div class="container">
        <div class="review-top-side">
          <div class="top-snack-bar flex-div gap-2 mb-[30px]">
            <span class="text-white">Choose flight from {{ originCity }} to {{ destinationCity }}</span>
            <img src="@/assets/images/chevron-right.svg" alt="chevron-right" class="right-arr">
            <span class="text-[#9d9d9d]">Review your trip</span>
          </div>
          <div class="text-[18px] text-[#606161] leading-[26px] flex-div gap-[10px]">
            <img src="@/assets/images/check-circle.svg" alt="check-circle">
            <span>
              Nice job! You picked one of our best value flights. Book now so you don't miss out on this price.
            </span>
          </div>
        </div>

        <div class="review-content-side">
          <div class="ticket-summary-side flex flex-col gap-[20px]">
            <div class="ticket-summary-block">
              <div class="flex items-start gap-[10px]">
                <img src="@/assets/images/calendar.svg" alt="calendar-icon">
                <div class="flex flex-col gap-[5px]">
                  <div class="bold-txt text-[15px]">
                    Stay flexible with no charge fees
                  </div>
                  <div class="text-[14px]">
                    We recommend booking a flight with no change fees in case your plans change.
                  </div>
                  <nuxt-link to="/search-results/flights" class="pry-color underline text-[14px]">
                    Change flights
                  </nuxt-link>
                </div>
              </div>
            </div>

            <div class="ticket-summary-block">
              <div class="flex items-start gap-[10px]">
                <img src="@/assets/images/check-2.svg" alt="check-2">
                <div class="flex flex-col gap-[5px]">
                  <div class="bold-txt text-[15px]">
                    No change fees for all flights
                  </div>
                  <div class="text-[14px]">
                    You can change these flights without paying a fee if plans change. Because flexibility matters.
                  </div>
                </div>
              </div>
            </div>

            <div class="ticket-summary-block" v-if="selectedFlight">
              <div class="tsb-top-side text-[14px]">
                <div class="text-[24px]">{{ flightRouteInfo.route }}</div>
                <div class="mt-2">{{ flightRouteInfo.time }}</div>
                <div class="flex-div gap-[10px] my-2">
                  <img :src="flightRouteInfo.airlineLogo" :alt="flightRouteInfo.airlineName" class="w-[30px]">
                  <span>{{ flightRouteInfo.airlineInfo }}</span>
                </div>
                <div class="flex">
                  <TicketLabels label="average-co" />
                </div>

                <!-- <div class="show-more-wrapper-2 flex-div gap-[6px] pry-color mt-[30px]">
                  <span>Show more</span>
                  <img src="@/assets/images/caret-down-green.svg" alt="caret-down-green">
                </div> -->
              </div>
              <div class="tsb-bottom-side">
                <div class="text-[18px] mb-1">Your fare: {{ getFareDetails() }}</div>
                <div class="flex-div gap-[10px] text-[14px]">
                  <img src="@/assets/images/tag.svg" alt="tag" class="w-[24px]">
                  <span>Upgrade for $60 to get seat choice and no change fees.</span>
                </div>
                <div class="upgarde-btn-wrapper mt-[30px]">
                  <button class="upgrade-btn" @click="showUpgradeOptions">See upgrade options</button>
                </div>
              </div>
            </div>

            <div class="ticket-summary-block">
              <div class="text-[18px]">Seats</div>
              <template v-if="selectedSeat">
                <div class="flex-div gap-[10px] my-[10px]">
                  <img src="@/assets/images/check.svg" alt="check" class="w-[20px]">
                  <span class="text-[14px]">Seat choice Included</span>
                </div>
                <div class="text-[14px]">
                  <div class="bold-txt text-[16px] mb-1">Traveler 1: Adult</div>
                  <div v-for="(segment, index) in selectedFlight.itineraries[0].segments" :key="index" class="flex-div text-[#848484] mb-1 max-w-[200px] justify-between">
                    <span>{{ segment.departure.iataCode }} to {{ segment.arrival.iataCode }}</span>
                    <span>Seat {{ selectedSeat }}</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex-div gap-[10px] my-[10px]">
                  <img src="@/assets/images/x-close.svg" alt="x-close" class="w-[20px]">
                  <span class="text-[14px]">Seat choice not available</span>
                </div>
                <div class="text-[14px]">Fare upgrade required to choose your seat.</div>
              </template>
              <div class="upgarde-btn-wrapper mt-[30px]">
                <button class="upgrade-btn" @click="showUpgradeOptions">See upgrade options</button>
              </div>
            </div>

            <div class="ticket-summary-block">
              <div class="text-[18px]">Bags</div>
              <div class="flex-div gap-[10px] text-[14px] my-[5px]">
                <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green">
                <span>Carry-on bag included</span>
              </div>
              <div class="flex-div gap-[10px] text-[14px] my-[5px]">
                <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green">
                <span>1st checked bag included</span>
              </div>
              <div class="text-[14px]">
                Additional bags for this flight must be purchased through the airline after booking.
              </div>
            </div>
          </div>
          <div class="ticket-price-summary-side">
            <div class="price-summary-block">
              <div class="psb px-[20px] py-[10px]">
                <div class="price-summary-block-title text-[22px]">Price summary</div>
                <ul class="price-summary-list text-[14px] text-[#848484]">
                  <!-- <li class="flex-div justify-between">
                    <span>Traveler 1: Adult</span>
                    <span>₦{{ formatPrice(selectedFlight?.price?.total) }}</span>
                  </li> -->
                  <li class="flex-div justify-between">
                    <span>Flight</span>
                    <span>₦{{ formatPrice(selectedFlight?.price?.base) }}</span>
                  </li>
                  <li class="flex-div justify-between">
                    <span>Taxes and fees</span>
                    <span>₦{{ calculateTaxesAndFees() }}</span>
                  </li>
                </ul>
              </div>
              <div class="px-[20px] py-[10px]">
                <div class="flex-div justify-between text-[20px] mb-1">
                  <span>Total</span>
                  <span>₦{{ formatPrice(selectedFlight?.price?.total) }}</span>
                </div>
                <div class="text-[14px] text-[#848484]">Rates are quoted in NG Naira</div>
              </div>

              <div class="summary-checkout-btn-wrapper px-[20px] py-[14px]">
                <nuxt-link to="/flight-checkout">
                  <button class="summary-checkout-btn">Checkout</button>
                </nuxt-link>
              </div>
            </div>

            <div class="free-cancellation-block flex items-start gap-[10px]">
              <img src="@/assets/images/clock-circle.svg" alt="clock-circle">
              <div>
                <div class="bold-txt text-[16px]">Free cancellation</div>
                <div class="text-[14px] leading-[22px]">
                  There's no fee to cancel within 24 hours of booking.
                </div>
              </div>
            </div>
          </div>
        </div>

        <ChooseSeatsPopup 
          v-if="showSeatsPopup" 
          :flight="selectedFlight"
          @close-popup="showSeatsPopup = false"
          @seat-selected="onSeatSelected"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFlightStore } from '~/store/flightStore';
import { useFlightApi } from '~/composables/useFlightApi';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const flightStore = useFlightStore();
const flightApi = useFlightApi();

const selectedFlight = ref(null);
const showSeatsPopup = ref(false);
const selectedSeat = ref(null);
const originCity = ref('');
const destinationCity = ref('');
const isLoading = ref(true);
const error = ref(null);

const route = useRoute();
const router = useRouter();
const toast = useToast();

definePageMeta({
  middleware: ['selected-flight-middleware', 'flight-review-redirect']
});

onMounted(async () => {
  const flightId = route.params.id;
  flightStore.loadSelectedFlight(); // Load from session storage

  try {
    if (flightStore.selectedFlight && flightStore.selectedFlight.id === flightId) {
      selectedFlight.value = flightStore.selectedFlight;
    } else {
      // If not in store, try to fetch from API
      const flight = await flightApi.getFlightDetails(flightId);
      if (flight) {
        selectedFlight.value = flight;
        flightStore.setSelectedFlight(flight);
      } else {
        throw new Error('Flight not found');
      }
    }
    await fetchCityNames();
  } catch (e) {
    error.value = "Flight not found. Redirecting to flights page.";
    toast.error(error.value);
    setTimeout(() => router.push('/search-results/flights'), 2000);
  } finally {
    isLoading.value = false;
  }
});

const fetchCityNames = async () => {
  if (selectedFlight.value) {
    const originIata = selectedFlight.value.itineraries[0].segments[0].departure.iataCode;
    const destinationIata = selectedFlight.value.itineraries[0].segments[selectedFlight.value.itineraries[0].segments.length - 1].arrival.iataCode;
    
    try {
      const originInfo = await flightApi.getAirportInfo(originIata);
      const destinationInfo = await flightApi.getAirportInfo(destinationIata);
      originCity.value = `${originInfo.cityName}`;
      destinationCity.value = `${destinationInfo.cityName}`;
    } catch (error) {
      console.error('Error fetching city names:', error);
      originCity.value = originIata;
      destinationCity.value = destinationIata;
    }
  }
};

const flightRouteInfo = computed(() => {
  if (!selectedFlight.value) return {};

  const firstSegment = selectedFlight.value.itineraries[0].segments[0];
  const lastSegment = selectedFlight.value.itineraries[0].segments[selectedFlight.value.itineraries[0].segments.length - 1];
  const carrier = firstSegment.carrierCode;

  return {
    route: `${originCity.value} to ${destinationCity.value}`,
    time: `${formatTime(firstSegment.departure.at)} - ${formatTime(lastSegment.arrival.at)} (${formatDuration(selectedFlight.value.itineraries[0].duration)} ∙ ${selectedFlight.value.itineraries[0].segments.length - 1} stop${selectedFlight.value.itineraries[0].segments.length - 1 > 1 ? 's' : ''})`,
    airlineLogo: getAirlineLogo(carrier),
    airlineName: getAirlineName(carrier),
    airlineInfo: `${getAirlineName(carrier)} • ${formatDate(firstSegment.departure.at)}`
  };
});

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (duration) => {
  const hours = duration.slice(2, -1).split('H')[0];
  const minutes = duration.slice(2, -1).split('H')[1].replace('M', '');
  return `${hours}h ${minutes}m`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getAirlineLogo = (carrierCode) => {
  return `https://pics.avs.io/200/200/${carrierCode}.png`;
};

const getAirlineName = (carrierCode) => {
  return flightStore.dictionaries?.carriers?.[carrierCode] || carrierCode;
};

const getFareDetails = () => {
  const fareInfo = selectedFlight.value?.travelerPricings?.[0]?.fareDetailsBySegment?.[0];
  return fareInfo?.brandedFare || 'Basic Economy';
};

const showUpgradeOptions = () => {
  showSeatsPopup.value = true;
};

const onSeatSelected = (seat) => {
  selectedSeat.value = seat;
  showSeatsPopup.value = false;
};

const formatPrice = (price) => {
  return parseFloat(price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const calculateTaxesAndFees = () => {
  if (!selectedFlight.value?.price) return '0.00';
  const total = parseFloat(selectedFlight.value.price.total || 0);
  const base = parseFloat(selectedFlight.value.price.base || 0);
  return formatPrice(total - base);
};
</script>

<style scoped>
.error-div {
  text-align: center;
  margin: 0 auto 20px;
  background: red;
  color: white;
  width: 500px;
  margin-right: 0;
  padding: 10px;
  border-radius: 8px;
}
</style>