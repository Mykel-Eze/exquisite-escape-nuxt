<template>
    <div class="flight-checkout-page pt-[100px] pb-[80px]">
        <div class="row">
            <div v-if="isLoading" class="loading-spinner-wrapper">
                <LoadingSpinner text="Fetching Flights..." />
            </div>
            <div v-else-if="!selectedFlight">No flight selected. Please go back and select a flight.</div>
            
            <div v-else class="container">
                <div class="review-top-side">
                    <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                        <span class="text-white">Secure booking - only takes a few minutes!</span>
                        <img src="@/assets/images/check-circle-2.svg" alt="check-circle" class="right-arr">
                        <span class="text-[#9d9d9d]">Checkout</span>
                    </div>
                    <div class="text-[18px] text-[#606161] mt-[30px]">
                        <h1 class="text-[52px] m-[-2px]">Hello,</h1>
                        <div class="text-[24px]">Who's travelling</div>
                        <div class="mt-[10px] text-[18px]">Traveler names must match government-issued photo ID exactly.</div>
                    </div>
                </div>

                <div class="review-content-side">
                <CheckoutForm @form-submitted="handleFormSubmit" :is-form-loading="isFormLoading" ref="checkoutForm">
                    <template v-slot:ticket-detail>
                        <div class="tsb-seats-wrapper text-[14px] text-[#848484]">
                            <div class="tsb-seats-title text-[18px] text-[#606161]">Your selected seats</div>
                            <div class="flex flex-col gap-[5px] mt-[6px]">
                                <div v-for="(segment, index) in selectedFlight.itineraries[0].segments" :key="index" class="flex-div gap-[70px]">
                                    <span>{{ segment.departure.iataCode }} to {{ segment.arrival.iataCode }}</span>
                                    <span>{{ selectedSeat || 'Not selected' }}</span>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:review-booking-notice>
                        <ReviewBookingNotice />
                    </template>
                </CheckoutForm>

                <div class="ticket-price-summary-side">
                    <div class="tpsss-block">
                        <div class="tpss-block-header">
                            <div class="tpss-title">{{ flightType }} flight</div>
                            <span>1 Ticket ∙ {{ selectedFlight?.travelerPricings?.length }} {{ selectedFlight.travelerPricings.length > 1 ? 'Adults' : 'Adult' }}</span>
                        </div>

                        <div class="tpss-block-body">
                            <div v-for="(itinerary, index) in selectedFlight.itineraries" :key="index" class="tpss-body-item">
                                <div class="tpss-title">{{ getRouteDescription(itinerary) }}</div>
                                <div class="flex-div justify-between">
                                    <div>{{ formatDate(itinerary.segments[0].departure.at) }}</div>
                                    <div>
                                        {{ formatTime(itinerary.segments[0].departure.at) }} - {{ formatTime(itinerary.segments[itinerary.segments.length - 1].arrival.at) }}
                                        <span v-if="isDifferentDay(itinerary)" class="text-[#EB7567]">+{{ getDayDifference(itinerary) }}</span>
                                        ({{ formatDuration(itinerary.duration) }})
                                    </div>
                                </div>
                                <div v-if="isDifferentDay(itinerary)" class="text-[#EB7567] mt-2">Arrives {{ formatDate(itinerary.segments[itinerary.segments.length - 1].arrival.at) }}</div>
                                <div v-if="itinerary.segments.length > 1" class="mt-1">{{ getStopDescription(itinerary) }}</div>

                                <div class="flex flex-col gap-1 mt-2">
                                    <div v-for="(segment, segmentIndex) in itinerary.segments" :key="segmentIndex" class="flex-div gap-[10px]">
                                        <img :src="getAirlineLogo(segment.carrierCode)" :alt="segment.carrierCode" class="w-[50px]" />
                                        <span>{{ getAirlineName(segment.carrierCode) }} {{ segment.number }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div class="tpss-block-footer">
                        <div class="tpss-title">Your price summary</div>
                        <div class="text-right">Total: {{ formatCurrency(selectedFlight.price.total, selectedFlight.price.currency) }}</div>

                        <div class="tpss-footer-total flex-div justify-between">
                            <div class="flex-div gap-[10px]">
                                <span>Traveler {{ selectedFlight.travelerPricings.length }}: {{ selectedFlight.travelerPricings.length > 1 ? 'Adults' : 'Adult' }}</span>
                                <img src="@/assets/images/direction-down.svg" alt="icon">
                            </div>
                            <b>{{ formatCurrency(selectedFlight.price.total, selectedFlight.price.currency) }}</b>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFlightStore } from '~/store/flightStore';
import { useToast } from "vue-toastification";
import { formatCurrency } from '~/utils/currency';
import { usePaystack } from '~/composables/usePaystack';
import { useApi } from '~/utils/api';
import { useFlightOrder } from '~/composables/useFlightOrder';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const flightStore = useFlightStore();
const toast = useToast();
const { initializePayment } = usePaystack();
const api = useApi();
const { createOrder } = useOrder();

const selectedFlight = ref(null);
const selectedSeat = ref(null);
const checkoutForm = ref(null);
const isLoading = ref(true);
const isFormLoading = ref(false);
const authStore = useAuthStore();

const checkAuth = () => {
  if (!authStore.isAuthenticated) {
    localStorage.setItem('authRedirectPath', router.currentRoute.value.fullPath);
    toast.info("You need to be signed in first.");
    router.push('/signin');
  }
};

onMounted(() => {
  loadSelectedFlight();
  checkAuth();
});

const loadSelectedFlight = async () => {
  isLoading.value = true;
  try {
    flightStore.loadSelectedFlight();
    
    selectedFlight.value = flightStore.selectedFlight;
    
    if (!selectedFlight.value) {
      throw new Error("No flight selected");
    }
  } catch (error) {
    toast.error("No flight selected. Redirecting to search page.");
    router.push('/search-results/flights');
  } finally {
    isLoading.value = false;
  }
};

watch(() => flightStore.selectedFlight, (newValue) => {
  selectedFlight.value = newValue;
}, { immediate: true });


// const flightType = computed(() => {
//   console.log("what is SelectedFlight value: ", selectedFlight.value)
//   return selectedFlight.value?.itineraries?.length > 1 ? 'Roundtrip' : 'One-way';
// });
const flightType = computed(() => {
  return selectedFlight.value?.itineraries?.length > 1 ? 'Roundtrip' : 'One-way';
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (duration) => {
  const hours = duration.slice(2, -1).split('H')[0];
  const minutes = duration.slice(2, -1).split('H')[1].replace('M', '');
  return `${hours}h ${minutes}m`;
};

const isDifferentDay = (itinerary) => {
  const departureDate = new Date(itinerary.segments[0].departure.at);
  const arrivalDate = new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at);
  return departureDate.getDate() !== arrivalDate.getDate();
};

const getDayDifference = (itinerary) => {
  const departureDate = new Date(itinerary.segments[0].departure.at);
  const arrivalDate = new Date(itinerary.segments[itinerary.segments.length - 1].arrival.at);
  return arrivalDate.getDate() - departureDate.getDate();
};

const getRouteDescription = (itinerary) => {
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];
  return `${firstSegment.departure.iataCode} to ${lastSegment.arrival.iataCode}`;
};

const getStopDescription = (itinerary) => {
  const stops = itinerary.segments.length - 1;
  return stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`;
};

const getAirlineLogo = (carrierCode) => {
  return `https://pics.avs.io/200/200/${carrierCode}.png`;
};

const getAirlineName = (carrierCode) => {
  return flightStore.dictionaries?.carriers?.[carrierCode] || carrierCode;
};

const handleFormSubmit = async (formData) => {
  if (!selectedFlight.value) {
    toast.error("No flight selected. Please try again.");
    return;
  }
  isFormLoading.value = true;
  try {
    const orderDetails = {
      totalPrice: selectedFlight.value.price.total,
      currency: selectedFlight.value.price.currency,
      flightDetails: selectedFlight.value,
    };

    const orderCreated = await createOrder(formData, orderDetails);
    if (orderCreated) {
      flightStore.clearSelectedFlight();
      // Additional actions after successful order creation
    }
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error(error.message || 'An error occurred during checkout. Please try again.');
  } finally {
    isFormLoading.value = false;
  }
};
</script>