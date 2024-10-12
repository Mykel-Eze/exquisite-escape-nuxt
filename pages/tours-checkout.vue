<template>
  <div class="tours-checkout-page pt-[100px] pb-[80px]">
    <div class="row">
      <div class="container">
        <div class="review-top-side">
          <div class="top-snack-bar flex-div gap-2 mb-[30px]">
            <span class="text-white">Secure booking - only takes a few minutes!</span>
            <img src="@/assets/images/check-circle-2.svg" alt="check-circle" class="right-arr">
            <span class="text-[#9d9d9d]">Checkout</span>
          </div>
          <div class="text-[18px] text-[#606161] mt-[30px]">
            <h1 class="text-[52px] m-[-2px]">Hello,</h1>
            <div class="text-[24px]">Who's travelling</div>
            <div class="mt-[10px] text-[18px]">Traveller names must match government-issued photo ID exactly.</div>
          </div>
        </div>

        <div class="review-content-side">
          <checkout-form @form-submitted="handleFormSubmit" :is-form-loading="isFormLoading">
            <template v-slot:ticket-detail>
              <div v-for="cartItem in cartItems" :key="cartItem.id" class="tsb-seats-wrapper text-[14px] text-[#848484] mb-4">
                <div class="tsb-seats-title text-[18px] text-[#606161]">{{ cartItem.tour.name }}</div>
                <div class="flex flex-col gap-[5px] mt-[6px]">
                  <div class="flex-div gap-[70px]">
                    <span>Duration</span>
                    <span v-if="getDuration(cartItem.tour)">{{ formatDuration(getDuration(cartItem.tour)) }}</span>
                    <span v-else>Duration not specified</span>
                  </div>
                </div>
              </div>
            </template>

            <template v-slot:review-booking-notice>
              <ReviewBookingNotice />
            </template>
          </checkout-form>

          <div class="ticket-price-summary-side">
            <div class="tpsss-block mb-4">
              <div v-for="cartItem in cartItems" :key="cartItem.id">
                <div class="tpss-block-header">
                  <div class="tpss-title truncate">{{ cartItem.tour.name }}</div>
                  <span>{{ getTourLocation(cartItem.tour) }}</span>
                </div>

                <div class="tpss-block-body">
                  <div class="tpss-body-item">
                    <div class="tpss-title">
                      <div class="text-[18px]">{{ formatDate(cartItem.date) }}</div>
                    </div>
                    <div class="flex-div">
                      {{ cartItem.adults + cartItem.children }} {{ (cartItem.adults + cartItem.children) <= 1 ? 'Traveller' : 'Travellers' }}
                    </div>

                    <div class="flex flex-col gap-1 mt-2">
                      <div class="flex-div gap-[10px]">
                        <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green" />
                        <span>
                          <span class="pry-color">{{ cartItem.adults }}</span> Adult{{ cartItem.adults > 1 ? 's' : '' }}
                        </span>
                      </div>
                      <div v-if="cartItem.children" class="flex-div gap-[10px]">
                        <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green" />
                        <span>
                          <span class="pry-color">{{ cartItem.children }}</span> Child{{ cartItem.children > 1 ? 'ren' : '' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="tpss-block-footer">
                  <div class="tpss-footer-total right-align">Total: {{ formatCurrency(getTotalPrice(cartItem), cartItem.tour.currency) }}</div>
                </div>
              </div>

              <div v-if="cartItems.length > 1" class="tpss-block-footer">
                <div class="tpss-footer-total tpss-title flex-div gap-[10px] justify-between">
                  <span>Overall total</span>
                  <img src="@/assets/images/direction-down.svg" alt="icon">
                  <b>{{ formatCurrency(getTotalCartPrice(), getCommonCurrency) }}</b>
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
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/utils/currency';
import { useToast } from 'vue-toastification';
import { useOrder } from '~/composables/useOrder';

const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();
const { createOrder } = useOrder();

const cartItems = ref([]);
const isFormLoading = ref(false);

onMounted(() => {
  cartStore.initializeStore();
  loadCartItems();
});

const loadCartItems = () => {
  cartItems.value = cartStore.items;
  if (cartItems.value.length === 0) {
    toast.error("Your cart is empty");
    router.push('/search-results/tours');
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

const getDuration = (tour) => {
  const duration = tour.content?.scheduling?.duration;
  return duration || null;
};

const formatDuration = (duration) => {
  if (!duration) return 'Duration not available';
  return `${duration.value} ${duration.metric.toLowerCase()}`;
};

const getTourLocation = (tour) => {
  const country = tour.content.countries[0];
  const destination = country.destinations[0];
  return `${destination.name}, ${country.name}`;
};

const getTotalPrice = (cartItem) => {
  const adultPrice = cartItem.tour.amountsFrom.find(amount => amount.paxType === 'ADULT')?.amount || 0;
  const childPrice = cartItem.tour.amountsFrom.find(amount => amount.paxType === 'CHILD')?.amount || 0;
  return (adultPrice * cartItem.adults) + (childPrice * cartItem.children);
};

const getTotalCartPrice = () => {
  return cartItems.value.reduce((total, item) => total + getTotalPrice(item), 0);
};

const getCommonCurrency = computed(() => {
  return cartItems.value[0]?.tour.currency || 'NGN';
});

const handleFormSubmit = async (formData) => {
  isFormLoading.value = true;
  try {
    const orderDetails = {
      tours: cartItems.value.map(item => ({
        tourId: item.tour.code,
        adults: item.adults,
        children: item.children,
        date: item.date,
      })),
      totalPrice: getTotalCartPrice(),
      currency: getCommonCurrency.value,
    };

    const orderCreated = await createOrder(formData, orderDetails);
    if (orderCreated) {
      // Clear cart data from store and localStorage
      cartStore.clearCart();
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    toast.error(error.message || 'An error occurred during checkout. Please try again.');
  } finally {
    isFormLoading.value = false;
  }
};
</script>