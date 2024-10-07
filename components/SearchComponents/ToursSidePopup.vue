<template>
    <div v-if="isVisible">
        <div class="side-popup">
            <div class="side-popup-header">
                <div class="flex-div gap-2 mb-5">
                    <img src="@/assets/images/close-popup.svg" alt="close" class="close-popup-icon"
                        @click="$emit('close')">
                    <span>Select tour</span>
                </div>

                <!-- <div class="top-ticket-details-wrapper text-[#606061]">
                    <div class="ttdr-ratings flex-div gap-[10px] text-[16px] mb-3">
                        <img src="@/assets/images/filled-radial.svg" alt="close" />
                        4.7 (0 Reviews)
                    </div>
                    <div class="ttdr-name-address">
                        <div class="text-[24px]">Palace and Gardens of Versailles</div>
                        <small class="text-[14px]">1 Rue de la legion d’Honneur Paris</small>
                    </div>
                </div> -->
            </div>

            <div class="tickets-wrapper cart-wrapper mt-[50px]">
                <div class="tickets-block">
                    <div class="tickets-top-side">
                        <div v-if="cartItems.length === 0" class="text-center py-4">
                            Your cart is empty
                        </div>
                        <div v-else v-for="(item, index) in cartItems" :key="index" class="ticket-items-block cart-block">
                            <div class="ticket-amount-div">
                                <div class="flex-div justify-between">
                                    <h2 class="m-0">
                                        <small class="text-[14px]">{{ item.tour.currency }}</small> 
                                        {{ formatNumber(getTotalPrice(item)) }}
                                    </h2>
                                    <button class="delete-cart-btn" @click="removeFromCart(index)">
                                    <img src="@/assets/images/trash.svg" alt="delete">
                                    </button>
                                </div>
                                <div class="tours-detail-title truncate">{{ item.tour.name }}</div>
                                <div class="tours-detail-address flex-div gap-3 mt-[5px] mb-[15px]">
                                    <img src="@/assets/images/location.svg" alt="location-icon" class="location-icon">
                                    <span class="text-[14px]">{{ getTourLocation(item.tour) }}</span>
                                </div>
                                <div class="tours-detail-tag inline-block rounded-full px-3 py-1 text-sm mr-2">
                                    {{ getTourCategory(item.tour) }}
                                </div>
                            </div>
                            <div class="ticket-item mt-3">
                                <div class="ticket-item-title">Traveller</div>
                                <div class="ticket-item-content flex-div gap-[10px]">
                                    <img src="@/assets/images/arrow-right-green.svg" alt="arrow" class="ticket-item-icon w-[24px]">
                                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                                    <span class="text-[#606161]">
                                        <span class="pry-color">{{ item.adults }}</span> {{ item.adults > 1 ? 'Adults' : 'Adult' }}
                                    </span>
                                    </div>
                                </div>
                                <div v-if="item.children > 0" class="ticket-item-content flex-div gap-[10px]">
                                    <img src="@/assets/images/arrow-right-green.svg" alt="arrow" class="ticket-item-icon w-[24px]">
                                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                                    <span class="text-[#606161]">
                                        <span class="pry-color">{{ item.children }}</span> {{ item.children > 1 ? 'Children' : 'Child' }}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tickets-bottom-side">
                        <div class="flex-div justify-between">
                            <button class="tbs-btn flex-div gap-2 text-[14px] text-[#141414]" @click="emptyCart">
                                <img src="@/assets/images/trash.svg" alt="" class="empty-icon w-[16px]">
                                <span>Empty clear selection</span>
                            </button>
                            <span><small class="text-[10px]">{{ cartCurrency }}</small> {{ totalPrice }}</span>
                        </div>

                        <div class="select-ticket-btn-wrapper mt-5">
                            <button class="select-ticket-btn" @click="goToCheckout">Checkout</button>
                            <div class="mt-5">
                                <button class="select-ticket-btn stb-2" @click="addMore">Add more</button>
                            </div>
                        </div>

                        <div class="cup-curves left-curve"></div>
                        <div class="cup-curves right-curve"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="side-popup-overlay" @click="$emit('close')"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isVisible: Boolean,
  cartItems: Array
});

const emit = defineEmits(['close', 'remove-from-cart', 'empty-cart', 'add-more']);

const router = useRouter();

const getTotalPrice = (item) => {
  const adultPrice = item.tour.amountsFrom.find(amount => amount.paxType === 'ADULT')?.amount || 0;
  const childPrice = item.tour.amountsFrom.find(amount => amount.paxType === 'CHILD')?.amount || 0;
  return (adultPrice * item.adults) + (childPrice * item.children);
};

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => {
    return total + getTotalPrice(item);
  }, 0);
});

const cartCurrency = computed(() => {
  return props.cartItems.length > 0 ? props.cartItems[0].tour.currency : '';
});

const formatNumber = (num) => {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getTourLocation = (tour) => {
  const country = tour.content.countries[0];
  const destination = country.destinations[0];
  return `${destination.name}, ${country.name}`;
};

const getTourCategory = (tour) => {
  return tour.content.segmentationGroups.find(group => group.code === 1)?.segments[0]?.name || '';
};

const removeFromCart = (index) => {
  emit('remove-from-cart', index);
};

const emptyCart = () => {
  emit('empty-cart');
};

const goToCheckout = () => {
  router.push('/tour-ticket-review');
};

const addMore = () => {
  emit('add-more');
};
</script>

<style scoped src="@/assets/css/tours-modal.css"></style>