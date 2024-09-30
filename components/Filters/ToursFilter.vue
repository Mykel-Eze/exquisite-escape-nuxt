<template>
    <div class="filter-blocks-wrapper">
        <!-- Reset Filter -->
        <div class="filter-block">
            <div class="filter-block-header mb-5">
                <span>Filter</span>
                <small class="pry-color clear-btn">Reset</small>
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
                <span>₦{{ formatNumber(minPrice) }}</span>
                <span>₦{{ formatNumber(maxPrice) }}</span>
            </div>
        </div>

        <!-- Activity-Name Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span class="bold-txt text-[15px]">Activity Name</span>
            </div>
            <input type="search" id="search-tours" placeholder="Search activity" v-model="ActivityName">
        </div>

        <!-- Categories Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span>Categories</span>
                <small class="pry-color clear-btn" @click="clear(selectedCategories, categories)">Clear</small>
            </div>
            <div class="filter-list-items">
                <label v-for="(category, index) in categories" :key="index" :for="category.item">
                    <input type="checkbox" :id="category.item" v-model="selectedCategories" :value="category.item"
                        class="filled-in">
                    <span class="w-full">
                        <span class="flex-div justify-between">
                            <span class="filter-block-item">{{ category.item }}</span>
                        </span>
                    </span>
                </label>
            </div>
        </div>

        <!-- Duration Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span>Duration</span>
                <small class="pry-color clear-btn" @click="clear(selectedDurations, durations)">Clear</small>
            </div>
            <div class="filter-list-items">
                <label v-for="(duration, index) in durations" :key="index" :for="duration.item">
                    <input type="checkbox" :id="duration.item" v-model="selectedDurations" :value="duration.item"
                        class="filled-in">
                    <span class="w-full">
                        <span class="flex-div justify-between">
                            <span class="filter-block-item">{{ duration.item }}</span>
                        </span>
                    </span>
                </label>
            </div>
        </div>

        <!-- Recommended Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span>Recommended</span>
                <small class="pry-color clear-btn" @click="clear(selectedRecommended, recommended)">Clear</small>
            </div>
            <div class="filter-list-items">
                <label v-for="(recommend, index) in recommended" :key="index" :for="recommend.item">
                    <input type="checkbox" :id="recommend.item" v-model="selectedRecommended" :value="recommend.item"
                        class="filled-in">
                    <span class="w-full">
                        <span class="flex-div justify-between">
                            <span class="filter-block-item">{{ recommend.item }}</span>
                        </span>
                    </span>
                </label>
            </div>
        </div>

        <!-- Services Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span>Services</span>
                <small class="pry-color clear-btn" @click="clear(selectedServices, services)">Clear</small>
            </div>
            <div class="filter-list-items">
                <label v-for="(service, index) in services" :key="index" :for="service.item">
                    <input type="checkbox" :id="service.item" v-model="selectedServices" :value="service.item"
                        class="filled-in">
                    <span class="w-full">
                        <span class="flex-div justify-between">
                            <span class="filter-block-item">{{ service.item }}</span>
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
                <!-- <label for="all-points">
                    <input type="checkbox" id="all-points" v-model="selectedReviews" class="filled-in">
                    <span class="w-full">
                        <span class="flex-div">
                            <span class="filter-block-item">All reviews</span>
                        </span>
                    </span>
                </label> -->
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

        <!-- Suppliers Filter -->
        <div class="filter-block">
            <div class="filter-block-header">
                <span>Suppliers</span>
                <small class="pry-color clear-btn" @click="clear(selectedSuppliers, suppliers)">Clear</small>
            </div>
            <div class="filter-list-items">
                <label v-for="(supplier, index) in suppliers" :key="index" :for="supplier.item">
                    <input type="checkbox" :id="supplier.item" v-model="selectedSuppliers" :value="supplier.item"
                        class="filled-in">
                    <span class="w-full">
                        <span class="flex-div justify-between">
                            <span class="filter-block-item">{{ supplier.item }}</span>
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
    categories, durations, recommended, services, suppliers
} from '~/data/ToursFilterData.js';

let slider = ref(null);
const minPrice = ref(90000);
const maxPrice = ref(10000000);

const ActivityName = ref("");
const selectedCategories = ref([]);
const selectedDurations = ref([]);
const selectedRecommended = ref([]);
const selectedServices = ref([]);
const selectedReviews = ref([]);
const selectedSuppliers = ref([]);
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
        start: [ minPrice.value, maxPrice.value ],
        connect: true,
        step: 1000,
        range: {
            'min': minPrice.value - 1000,
            'max': maxPrice.value + 100000
        }
    });

    sliderInstance.on('update', (values) => {
        minPrice.value = Number(values[ 0 ]);
        maxPrice.value = Number(values[ 1 ]);
    });
});

function formatNumber(num) {
    return num.toLocaleString();
}
</script>


<style></style>
