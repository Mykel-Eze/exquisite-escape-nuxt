<template>
    <div class="ticket-review-page relative pt-[100px] pb-[80px]">
        <div v-if="isLoading" class="loading-spinner-wrapper">
            <LoadingSpinner text="" />
        </div>
        <div v-else-if="cartItem" class="row">
            <div class="container">
                <div class="review-top-side">
                    <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                        <span class="text-white">{{ cartItem?.tour.name }}</span>
                        <img src="@/assets/images/chevron-right.svg" alt="chevron-right" class="right-arr">
                        <span class="text-[#9d9d9d]">Review your trip</span>
                    </div>
                    <div class="text-[18px] text-[#606161] leading-[26px] flex-div gap-[10px]">
                        <img src="@/assets/images/check-circle.svg" alt="check-circle">
                        <span>
                            Nice job! You picked one of our best value tour. Book now so you don't miss out on this price.
                        </span>
                    </div>
                </div>

                <div class="review-content-side">
                    <div class="ticket-summary-side flex flex-col gap-[20px]">
                        <div class="ticket-1">
                            <div class="ticket-summary-block">
                                <div class="text-[14px]">
                                    <div class="text-[24px]">{{ cartItem?.tour.name }}</div>
                                    <div class="flex-div gap-[10px] my-2">
                                        <img src="@/assets/images/location.svg" alt="location" class="w-[24px]">
                                        <span>{{ getTourLocation(cartItem?.tour) }}</span>
                                    </div>
                                    <div class="flex gap-[10px]">
                                        <div class="ticket-labels flex-div">
                                            <span>{{ getTourCategory(cartItem?.tour) }}</span>
                                        </div>
                                        <div v-if="cartItem?.tour.freeCancellationDate" class="ticket-labels flex-div">
                                            <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
                                            <span>Free Cancellation until {{ formatDate(cartItem.tour.freeCancellationDate) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-start gap-[10px] mt-[40px]">
                                    <img src="@/assets/images/calendar.svg" alt="calendar-icon">
                                    <div class="flex flex-col gap-[5px]">
                                        <div class="bold-txt text-[15px]">{{ formatDate(cartItem?.date) }}</div>
                                        <div class="flex-div gap-[10px] mb-3 mt-1">
                                            <div class="flex-div gap-[10px]">
                                                <img src="@/assets/images/check-3.svg" alt="check-icon" class="check-icon">
                                                <span>
                                                    <span class="pry-color">{{ cartItem?.adults }}</span> {{ cartItem?.adults > 1 ? "Adults": "Adult"}}
                                                </span>
                                            </div>
                                            <div v-if="cartItem?.children" class="flex-div gap-[10px]">
                                                <img src="@/assets/images/check-3.svg" alt="check-icon" class="check-icon">
                                                <span>
                                                    <span class="pry-color">{{ cartItem?.children }}</span> {{ cartItem?.children > 1 ? "Children": "Child"}}
                                                </span>
                                            </div>
                                            <div class="flex-div gap-[10px]">
                                                <img src="@/assets/images/check-3.svg" alt="check-icon" class="check-icon">
                                                <span>Language: {{ getLanguageName(cartItem?.tour.content.language) || 'English' }}</span>
                                            </div>
                                        </div>
                                        <nuxt-link to="/search-results/tours" class="pry-color underline text-[14px]">
                                            Change date
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>

                            <div class="ticket-summary-block">
                                <div class="tsb-top-side text-[14px]">
                                    <div class="text-[24px]">Cancellation fee</div>
                                    <div class="flex-div gap-[10px] my-2">
                                        Before 23:59 on {{ formatDate(getCancellationDate()) }}:
                                        <b class="pry-color">{{ formatCurrency(getCancellationFee(), cartItem?.tour.currency) }}</b>
                                    </div>
                                    
                                    <div class="text-[24px] mt-[30px]">Remarks</div>
                                    <div class="remarks-items-wrapper flex-div gap-[10px] my-3">
                                        <div class="remarks-items-wrapper flex-div gap-[10px] my-3">
                                            <div v-for="(remark, index) in getRemarks()" :key="index" class="remarks-item flex-div gap-[10px]">
                                                <img :src="getRemarkIcon(remark)" alt="remark-icon">
                                                <span v-html="remark"></span>
                                                <img src="@/assets/images/remove.svg" alt="remove">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-[#848484] text-[14px]">
                                        If the incorrect details are provided, the provider will not be held
                                        responsible for the correct service provision and you may be subject to
                                        cancellation / no-show-fees
                                    </div>
                                </div>
                                <div class="tsb-bottom-side">
                                    <div class="text-[18px] mt-5">Best Available Rate</div>
                                    <div class="flex-div gap-[10px] my-[10px]">
                                        <img src="@/assets/images/badge-percent.svg" alt="badge-percent" class="w-[24px]">
                                        <span class="text-[14px]">
                                            This rate does not allow any changes. You must cancel the existing booking
                                            and issue a new one. Cancellation fees may apply according to the rate
                                            conditions.
                                        </span>
                                    </div>

                                    <div class="mt-[30px]">
                                        <button @click="addMore" class="addmore-btn flex-div gap-[6px] text-[14px]">
                                            <img src="@/assets/images/plus-circle2.svg" alt="plus-circle2" class="">
                                            <span>Add more</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ticket-price-summary-side">
                        <div class="price-summary-block">
                            <div class="psb px-[20px] py-[10px]">
                                <div class="price-summary-block-title text-[22px]">Price summary</div>
                                <div class="price-summary-block-1 mt-3">
                                    <div class="font-bold text-[16px] pry-color mb-2">{{ cartItem?.tour.name }}</div>
                                    <ul class="price-summary-list text-[14px] text-[#848484]">
                                        <li class="flex-div justify-between">
                                            <span>Traveler {{ cartItem?.adults }}: {{ cartItem?.adults > 1 ? "Adults": "Adult"}}</span>
                                            <span>{{ formatCurrency(getAdultsPrice(), cartItem?.tour.currency) }}</span>
                                        </li>
                                        <li class="flex-div justify-between">
                                            <span>Traveler {{ cartItem?.children }}: {{ cartItem?.children > 1 ? "Children": "Child"}}</span>
                                            <span>{{ formatCurrency(getChildrenPrice(), cartItem?.tour.currency) }}</span>
                                        </li>
                                        <li class="flex-div justify-between">
                                            <span>Taxes and fees</span>
                                            <span>{{ formatCurrency(getTaxesAndFees(), cartItem?.tour.currency) }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="px-[20px] py-[10px]">
                                <div class="flex-div justify-between text-[20px] mb-1">
                                    <span>Total</span>
                                    <span>{{ formatCurrency(getTotalPrice(), cartItem?.tour.currency) }}</span>
                                </div>
                                <div class="text-[14px] text-[#848484]">Rates are quoted in {{ getCurrencyName() }}</div>
                            </div>

                            <div class="summary-checkout-btn-wrapper px-[20px] py-[14px]">
                                <nuxt-link to="/tours-checkout">
                                    <button class="summary-checkout-btn">Checkout</button>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="error-message center mt-10 mb-5">
            <div class="container">
                <p class="mb-3">Unable to load tour details. Please try again.</p>
                <NuxtLink to="/search-results/tours" class="pry-color hover:underline">
                    Return to Search Results
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/utils/currency';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();

const cartItem = ref(null);
const isLoading = ref(true);

definePageMeta({
  middleware: 'tour-review-auth'
});

onMounted(() => {
  cartStore.initializeStore();
  loadCartItem();
});

const loadCartItem = () => {
  const id = route.params.id;
  cartItem.value = cartStore.getCartItemById(id);
  console.log('Loaded cart item:', cartItem.value);
  if (!cartItem.value) {
    toast.error("Tour not found in cart");
    router.push('/search-results/tours');
  }
  isLoading.value = false;
};

watch(() => cartStore.items, () => {
  loadCartItem();
}, { deep: true });


const getTourLocation = (tour) => {
  if (!tour || !tour.content || !tour.content.countries) return '';
  const country = tour.content.countries[0];
  const destination = country.destinations[0];
  return `${destination.name}, ${country.name}`;
};

const getTourCategory = (tour) => {
  if (!tour || !tour.content || !tour.content.segmentationGroups) return '';
  return tour.content.segmentationGroups.find(group => group.code === 1)?.segments[0]?.name || '';
};

const formatDate = (dateString) => {
  console.log('Formatting date:', dateString);
  if (!dateString) return 'Date not available';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return 'Invalid date';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

const getCancellationDate = () => {
  return cartItem.value?.tour.modalities[0]?.cancellationPolicies[0]?.dateFrom || '';
};

const getCancellationFee = () => {
  return cartItem.value?.tour.modalities[0]?.cancellationPolicies[0]?.amount || 0;
};

const getRemarks = () => {
  return cartItem.value?.tour.content.importantInfo || [];
};

const getLanguageName = (code) => {
  const languageNames = {
    'en': 'English',
    'fr': 'French',
    'es': 'Spanish',
    // Add more languages as needed
  };
  return languageNames[code] || code;
};

const getRemarkIcon = (remark) => {
  // You can implement logic here to return appropriate icons based on the remark content
  return '/information.svg';
};

const getAdultsPrice = () => {
  if (!cartItem.value) return 0;
  const adultPrice = cartItem.value.tour.amountsFrom.find(amount => amount.paxType === 'ADULT')?.amount || 0;
  return adultPrice * cartItem.value.adults;
};
const getChildrenPrice = () => {
  if (!cartItem.value) return 0;
  const childrenPrice = cartItem.value.tour.amountsFrom.find(amount => amount.paxType === 'CHILD')?.amount || 0;
  return childrenPrice * cartItem.value.children;
};

const getTaxesAndFees = () => {
  // Assuming taxes and fees are 10% of the adult price
  return (getAdultsPrice() + getChildrenPrice()) * 0.1;
};

const getTotalPrice = () => {
  return getAdultsPrice() + getChildrenPrice() + getTaxesAndFees();
};

const getCurrencyName = () => {
  return cartItem.value?.tour.currencyName || 'NG Naira';
};

const addMore = () => {
  router.push('/search-results/tours');
};
</script>