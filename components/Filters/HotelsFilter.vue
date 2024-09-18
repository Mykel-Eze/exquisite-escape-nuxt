<template>
  <div class="filter-blocks-wrapper">
    <!-- Reset Filter -->
    <div class="filter-block">
        <div class="filter-block-header mb-5">
            <span>Filter</span>
            <small class="pry-color clear-btn">Reset</small>
        </div>
    </div>

    <!-- Hotel-Name Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span class="bold-txt text-[15px]">Hotel Name</span>
        </div>
        <input type="search" id="search-hotel" placeholder="Search accommodation" v-model="HotelName">
    </div>

    <!-- WishListt Filter -->
    <div class="filter-block">
        <div class="filter-list-items">
            <label for="wishlist">
                <input type="checkbox" id="wishlist" v-model="selectedWishlist" value="stop.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/heart.svg" alt="heart">
                        <span class="filter-block-item">Only Wishlist</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Boards Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Board</span>
            <small class="pry-color clear-btn" @click="clear(selectedBoards, boards)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(board, index) in boards" :key="index" :for="board.item">
                <input type="checkbox" :id="board.item" v-model="selectedBoards" :value="board.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ board.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Price Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Price</span>
            <small class="pry-color clear-btn">Clear</small>
        </div>
        <div id="slider"></div>
        <div class="slider-values flex-div justify-between">
            <span>₦{{formatNumber(minPrice)}}</span>
            <span>₦{{formatNumber(maxPrice)}}</span>
        </div>
    </div>

    <!-- Categories Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Category</span>
            <small class="pry-color clear-btn" @click="clear(selectedCategories, categories)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label for="all-star">
                <input type="checkbox" id="all-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div">All Categories</span>
                </span>
            </label>
            <label for="5-star">
                <input type="checkbox" id="5-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                    </span>
                </span>
            </label>
            <label for="4-star">
                <input type="checkbox" id="4-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                    </span>
                </span>
            </label>
            <label for="3-star">
                <input type="checkbox" id="3-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                    </span>
                </span>
            </label>
            <label for="2-star">
                <input type="checkbox" id="2-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                    </span>
                </span>
            </label>
            <label for="1-star">
                <input type="checkbox" id="1-star" v-model="selectedCategories" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/star.svg" alt="star" class="option-star">
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Cancellation-Fees Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Cancellation Fees</span>
            <small class="pry-color clear-btn" @click="clear(selectedCancellationFees, cancellationFees)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(cancellationFee, index) in cancellationFees" :key="index" :for="cancellationFee.item">
                <input type="checkbox" :id="cancellationFee.item" v-model="selectedCancellationFees" :value="cancellationFee.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item truncate">{{ cancellationFee.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- EstProfiles Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Est. profile</span>
            <small class="pry-color clear-btn" @click="clear(selectedEstProfiles, estProfiles)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(estProfile, index) in estProfiles" :key="index" :for="estProfile.item">
                <input type="checkbox" :id="estProfile.item" v-model="selectedEstProfiles" :value="estProfile.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ estProfile.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Customer-Reviews Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Customer reviews</span>
            <small class="pry-color clear-btn" @click="clear(selectedReviews, reviews)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label for="all-points">
                <input type="checkbox" id="all-points" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div">
                        <span class="filter-block-item">All reviews</span>
                    </span>
                </span>
            </label>
            <label for="5-point">
                <input type="checkbox" id="5-point" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                    </span>
                </span>
            </label>
            <label for="4-point">
                <input type="checkbox" id="4-point" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                    </span>
                </span>
            </label>
            <label for="3-point">
                <input type="checkbox" id="3-point" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                    </span>
                </span>
            </label>
            <label for="2-point">
                <input type="checkbox" id="2-point" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                    </span>
                </span>
            </label>
            <label for="1-point">
                <input type="checkbox" id="1-point" v-model="selectedReviews" class="filled-in">
                <span class="w-full">
                    <span class="flex-div gap-[10px]">
                        <img src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                        <img src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Amenities Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Amenities</span>
            <small class="pry-color clear-btn" @click="clear(selectedAmenities, amenities)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(amenity, index) in displayedAmenities" :key="index" :for="amenity.name">
                <input type="checkbox" :id="amenity.name" v-model="selectedAmenities" :value="amenity.name" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item truncate">{{ amenity.item }}</span>
                    </span>
                </span>
            </label>
        </div>
        
        <div class="show-more-btn-wrapper mt-[15px]">
            <button v-if="amenities.length > 10" @click="showMore = !showMore" class="flex-div gap-2 bold-txt pry-color text-[14px]">
                {{ showMore ? 'Show Less' : 'Show More' }} 
                <img src="@/assets/images/caret-down-green.svg" alt="caret">
            </button>
        </div>
    </div>

    <!-- Types Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Type</span>
            <small class="pry-color clear-btn" @click="clear(selectedTypes, types)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(type, index) in types" :key="index" :for="type.item">
                <input type="checkbox" :id="type.item" v-model="selectedTypes" :value="type.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ type.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Offers Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Offers</span>
            <small class="pry-color clear-btn" @click="clear(selectedOffers, offers)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(offer, index) in offers" :key="index" :for="offer.item">
                <input type="checkbox" :id="offer.item" v-model="selectedOffers" :value="offer.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ offer.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import { 
    boards, cancellationFees, estProfiles, amenities, types, offers
 } from '~/data/HotelsFilterData.js';

let slider = ref(null);
const minPrice = ref(90000);
const maxPrice = ref(10000000);

const HotelName = ref("");
const selectedBoards = ref([]);
const selectedCategories = ref([]);
const selectedCancellationFees = ref([]);
const selectedEstProfiles = ref([]);
const selectedTypes = ref([]);
const selectedOffers = ref([]);

const selectedAmenities = ref([]);
const showMore = ref(false);

const displayedAmenities = computed(() => {
  return showMore.value ? amenities.value : amenities.value.slice(0, 10);
});

const clear = (selectedItem, items) => {
  selectedItem.value = [];
  items.value = items.value.map(item => ({ ...item, checked: false }));
};

onMounted(() => {
    slider.value = document.querySelector("#slider");
    let sliderInstance = noUiSlider.create(slider.value, {
        start: [minPrice.value, maxPrice.value],
        connect: true,
        step: 1000,
        range: {
            'min': minPrice.value - 1000,
            'max': maxPrice.value + 100000
        }
    });

    sliderInstance.on('update', (values) => {
      minPrice.value = Number(values[0]);
      maxPrice.value = Number(values[1]);
    });
});

function formatNumber(num) {
  return num.toLocaleString();
}
</script>


<style></style> 
