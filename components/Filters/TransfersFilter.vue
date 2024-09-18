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

    <!--==== Waiting-Time Filters ===-->
    <div class="mt-5 bold-txt">Waiting Time</div>

    <!-- Customer Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Customer</span>
            <small class="pry-color clear-btn" @click="clear(selectedCustomers, customers)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(customer, index) in customers" :key="index" :for="customer.item">
                <input type="checkbox" :id="customer.item" v-model="selectedCustomers" :value="customer.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ customer.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- DomesticSupplier Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Supplier - Domestic</span>
            <small class="pry-color clear-btn" @click="clear(selectedDomesticSuppliers, domesticSuppliers)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(domesticSupplier, index) in domesticSuppliers" :key="index" :for="domesticSupplier.item">
                <input type="checkbox" :id="domesticSupplier.item" v-model="selectedDomesticSuppliers" :value="domesticSupplier.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ domesticSupplier.item }}</span>
                    </span>
                </span>
            </label>
        </div>
    </div>

    <!-- InternationalSupplier Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
            <span>Supplier - International</span>
            <small class="pry-color clear-btn" @click="clear(selectedInternationalSuppliers, internationalSuppliers)">Clear</small>
        </div>
        <div class="filter-list-items">
            <label v-for="(internationalSupplier, index) in internationalSuppliers" :key="index" :for="internationalSupplier.item">
                <input type="checkbox" :id="internationalSupplier.item" v-model="selectedInternationalSuppliers" :value="internationalSupplier.item" class="filled-in">
                <span class="w-full">
                    <span class="flex-div justify-between">
                        <span class="filter-block-item">{{ internationalSupplier.item }}</span>
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
    customers, internationalSuppliers, domesticSuppliers
} from '~/data/TransfersFilterData.js';

let slider = ref(null);
const minPrice = ref(90000);
const maxPrice = ref(10000000);

const selectedCustomers = ref([]);
const selectedDomesticSuppliers = ref([]);
const selectedInternationalSuppliers = ref([]);



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
