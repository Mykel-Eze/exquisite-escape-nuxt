<template>
    <div id="tours-availability-modal" class="modal">
        <div class="modal-header">
            <div class="container flex-div justify-between mb-4">
                <h2 class="modal-title m-0">Check availability</h2>
                <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal-2">
            </div>
        </div>
        
        <div v-if="tour" class="modal-content">
            <!-- <div class="flex-div gap-4">
                <div class="flex space-x-2 overflow-x-auto">
                    <button
                        v-for="(date, index) in dates"
                        :key="index"
                        class="availability-btn"
                    >
                        <span>{{ date.day }}</span>
                        <div class="mt-1">{{ date.price }}</div>
                    </button>
                </div>
                <button class="modify-availability-btn flex-div gap-3 justify-center">
                    Modify
                    <img src="@/assets/images/modify-icon.svg" alt="modify-icon">
                </button>
            </div> -->
                
            <div class="tours-details-wrappper">
                <div class="tours-details-block max-w-[354px]">
                    <div class="tours-detail-title">{{ tour.name }}</div>
                    <div class="tours-detail-address flex-div gap-3 mt-[5px] mb-[15px]">
                        <img src="@/assets/images/location.svg" alt="location-icon" class="location-icon">
                        <span class="text-[14px]">{{ getTourLocation(tour) }}</span>
                    </div>
                    <div class="tours-detail-tag inline-block rounded-full px-3 py-1 text-sm mr-2">
                        {{ getTourCategory(tour) }}
                    </div>

                    <button @click="addToCart" class="add-to-cart-btn w-full flex-div gap-3 justify-center mt-[30px]">
                        <img src="@/assets/images/cart-check.svg" alt="cart-check">
                        <span>Add to Cart</span>
                    </button>
                </div>

                <div class="num-of-travellers-block">
                    <div>
                        <div class="notb-title mb-[16px]">Number of Traveller(s)</div>
                        <div class="flex-div justify-between mb-[16px]">
                            <div class="">
                                <div class="mb-1 flex-div gap-4 text-[16px]">
                                    <span>Adults</span> 
                                    <span class="pry-color">
                                        <!-- (<small class="text-[10px]">{{ currency }}</small> {{ formatNumber(totalAdultAmount) }}) -->
                                         ({{ formatCurrency(totalAdultAmount, currency) }})
                                    </span>
                                </div>
                                <small class="text-[12px] text-[#9D9D9D]">Age 12 or above</small>
                            </div>
                            <div class="flex-div counter">
                                <button @click="decreaseAdults">-</button>
                                <span class="mx-4">{{ adults }}</span>
                                <button @click="increaseAdults" class="counter-add-btn">+</button>
                            </div>
                        </div>
                        <div class="flex-div justify-between">
                            <div class="">
                                <div class="mb-1 flex-div gap-4 text-[16px]">
                                    <span>Child</span> 
                                    <span class="pry-color">
                                        <!-- (<small class="text-[10px]">{{ currency }}</small> {{ formatNumber(totalChildAmount) }}) -->
                                         ({{ formatCurrency(totalChildAmount, currency) }})
                                    </span>
                                </div>
                                <small class="text-[12px] text-[#9D9D9D]">Age 2 - 11</small>
                            </div>
                            <div class="flex-div counter">
                                <button @click="decreaseChildren">-</button>
                                <span class="mx-4">{{ children }}</span>
                                <button @click="increaseChildren" class="counter-add-btn">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="modal-content">
            <h4 class="text-center my-4">No tour activity selected</h4>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, computed, watch } from 'vue';
import { formatCurrency } from '@/utils/currency';

const props = defineProps({
  tour: Object
});

// const dates = ref([
//   { day: 'Friday, 5 April', price: 'N80,000' },
//   { day: 'Friday, 5 April', price: 'N80,000' },
//   { day: 'Friday, 5 April', price: 'N80,000' },
//   { day: 'Friday, 5 April', price: 'N80,000' },
//   { day: 'Friday, 5 April', price: 'N80,000' },
//   { day: 'Friday, 5 April', price: 'N80,000' },
// ])

const emit = defineEmits(['add-to-cart']);

const adults = ref(1)
const children = ref(0)

const increaseAdults = () => {
  adults.value++
}

const decreaseAdults = () => {
  if (adults.value > 1) {
    adults.value--
  }
}

const increaseChildren = () => {
  children.value++
}

const decreaseChildren = () => {
  if (children.value > 0) {
    children.value--
  }
}

const addToCart = () => {
  emit('add-to-cart', {
    tour: props.tour,
    adults: adults.value,
    children: children.value
  });
  // Close the modal using Materialize
  const modal = M.Modal.getInstance(document.getElementById('tours-availability-modal'));
  modal.close();
};

const getTourLocation = (tour) => {
  const country = tour.content.countries[0];
  const destination = country.destinations[0];
  return `${destination.name}, ${country.name}`;
};

const getTourCategory = (tour) => {
  return tour.content.segmentationGroups.find(group => group.code === 1)?.segments[0]?.name || '';
};

const currency = computed(() => {
  return props.tour ? props.tour.currency : '';
});

const getAmounts = computed(() => {
  if (!props.tour) return [];
  return props.tour.amountsFrom.sort((a, b) => a.amount - b.amount);
});

const adultAmount = computed(() => {
  const adultPrice = getAmounts.value.find(amount => amount.paxType === 'ADULT');
  return adultPrice ? adultPrice.amount : 0;
});

const childAmount = computed(() => {
  const childPrice = getAmounts.value.find(amount => amount.paxType === 'CHILD');
  return childPrice ? childPrice.amount : 0;
});

const totalAdultAmount = computed(() => {
  return adultAmount.value * adults.value;
});

const totalChildAmount = computed(() => {
  return childAmount.value * children.value;
});

onMounted(() => {
  // Initialize the modal
  const modalElement = document.getElementById('tours-availability-modal');
  M.Modal.init(modalElement);
});

watch(() => props.tour, () => {
  adults.value = 1;
  children.value = 0;
});

// const formatNumber = (num) => {
//     return num.toLocaleString('en-US');
// };
</script>

<style scoped src="@/assets/css/tours-modal.css"></style>
