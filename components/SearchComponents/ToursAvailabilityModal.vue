<template>
    <div id="tours-availability-modal" class="modal">
        <div class="modal-header">
            <div class="container flex-div justify-between mb-4">
                <h2 class="modal-title m-0">Check availability</h2>
                <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal-2">
            </div>
        </div>
        
        <div class="modal-content">
            <div class="flex-div gap-4">
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
            </div>
                
            <div class="tours-details-wrappper">
                <div class="tours-details-block">
                    <div class="tours-detail-title truncate">Palace and Gardens of Versailles</div>
                    <div class="tours-detail-address flex-div gap-3 mt-[5px] mb-[15px]">
                        <img src="@/assets/images/location.svg" alt="location-icon" class="location-icon">
                        <span class="text-[14px]">1 Rue de la legion d'Honneur Paris</span>
                    </div>
                    <div class="tours-detail-tag inline-block rounded-full px-3 py-1 text-sm mr-2">
                        Art & Culture
                    </div>

                    <button @click="addToCart" class="add-to-cart-btn w-full flex-div gap-3 justify-center mt-[30px]">
                        <img src="@/assets/images/cart-check.svg" alt="cart-check">
                        <span>Add to Cart</span>
                    </button>
                </div>

                <div class="num-of-travellers-block">
                    <div class="notb-title mb-[16px]">Number of Traveller(s)</div>
                    <div class="flex-div justify-between mb-[16px]">
                        <div class="">
                            <div class="mb-1 flex-div gap-4 text-[16px]">
                                <span>Adults</span> 
                                <span class="pry-color">(N80,000)</span>
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
                                <span class="pry-color">(N78,000)</span>
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
</template>

<script setup>
import { ref } from 'vue'

const dates = ref([
  { day: 'Friday, 5 April', price: 'N80,000' },
  { day: 'Friday, 5 April', price: 'N80,000' },
  { day: 'Friday, 5 April', price: 'N80,000' },
  { day: 'Friday, 5 April', price: 'N80,000' },
  { day: 'Friday, 5 April', price: 'N80,000' },
  { day: 'Friday, 5 April', price: 'N80,000' },
])

const adults = ref(1)
const children = ref(0)

const increaseAdults = () => {
  adults.value++
}

const decreaseAdults = () => {
  if (adults.value > 0) {
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
    // Implement add to cart functionality
    console.log('Added to cart:', { adults: adults.value, children: children.value })
}
</script>

<style scoped src="@/assets/css/tours-modal.css"></style>
