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
            <span>₦{{formatNumber(minPrice)}}</span>
            <span>₦{{formatNumber(maxPrice)}}</span>
        </div>
    </div>

    <!-- Stops Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Stops</span>
            <small class="pry-color clear-btn" @click="clear(selectedStops, stops)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(stop, index) in stops" :key="index" :for="stop.item">
                <input type="checkbox" :id="stop.item" v-model="selectedStops" :value="stop.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ stop.item }}</span>
                        <span class="filter-block-item-value">₦{{ formatNumber(stop.value) }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Airline Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Airline</span>
            <small class="pry-color clear-btn" @click="clear(selectedAirlines, airlines)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(airline, index) in displayedAirlines" :key="index" :for="airline.name">
                <input type="checkbox" :id="airline.name" v-model="selectedAirlines" :value="airline.name" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item truncate">({{ airline.number }}) - {{ airline.name }}</span>
                        <span class="filter-block-item-value">₦{{ formatNumber(airline.value) }}</span>
                    </span>
                </span>
            </label>
        </div>
        
        <div class="show-more-btn-wrapper mt-[15px]">
            <button v-if="airlines.length > 10" @click="showMore = !showMore" class="flex-div gap-2 bold-txt pry-color text-[14px]">
                {{ showMore ? 'Show Less' : 'Show More' }} 
                <img src="@/assets/images/caret-down-green.svg" alt="caret">
            </button>
        </div>
    </div>

    <!-- Travel & Baggage Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Travel & Baggage</span>
            <small class="pry-color clear-btn" @click="clear(selectedBaggages, baggages)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(baggage, index) in baggages" :key="index" :for="baggage.item">
                <input type="checkbox" :id="baggage.item" v-model="selectedBaggages" :value="baggage.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ baggage.item }}</span>
                        <span class="filter-block-item-value">₦{{ formatNumber(baggage.value) }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Departure Time Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Departure Time</span>
            <small class="pry-color clear-btn" @click="clear(selectedDepartures, departures)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(departure, index) in departures" :key="index" :for="departure.time">
                <input type="checkbox" :id="departure.time" v-model="selectedDepartures" :value="departure.time" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ departure.time }}</span>
                        <span class="filter-block-item-value">{{ departure.startTime }} - {{ departure.endTime }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- Arrival Time Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Arrival Time</span>
            <small class="pry-color clear-btn" @click="clear(selectedArrivals, arrivals)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(arrival, index) in arrivals" :key="index" :for="arrival.time+index">
                <input type="checkbox" :id="arrival.time+index" v-model="selectedArrivals" :value="arrival.time" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ arrival.time }}</span>
                        <span class="filter-block-item-value">{{ arrival.startTime }} - {{ arrival.endTime }}</span>
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
    stops, airlines, baggages, departures, arrivals
} from '~/data/FlightsFilterData.js';

let slider = ref(null);
const minPrice = ref(90000);
const maxPrice = ref(10000000);

const selectedStops = ref([]);

const selectedAirlines = ref([]);
const showMore = ref(false);

const selectedBaggages = ref([]);
const selectedDepartures = ref([]);
const selectedArrivals = ref([]);

const displayedAirlines = computed(() => {
  return showMore.value ? airlines.value : airlines.value.slice(0, 10);
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
