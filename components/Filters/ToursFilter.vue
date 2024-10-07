<template>
  <div class="filter-blocks-wrapper">
    <!-- Reset Filter -->
    <div class="filter-block">
      <div class="filter-block-header mb-5">
        <span>Filter</span>
        <small class="pry-color clear-btn" @click="resetAllFilters">Reset</small>
      </div>
    </div>

    <!-- Price Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Price</span>
        <small class="pry-color clear-btn" @click="resetPriceFilter">Clear</small>
      </div>
      <div id="slider"></div>
      <div class="slider-values flex-div justify-between">
        <span>{{ formatCurrency(minPrice) }}</span>
        <span>{{ formatCurrency(maxPrice) }}</span>
      </div>
    </div>

    <!-- Activity Name Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span class="bold-txt text-[15px]">Activity Name</span>
      </div>
      <input type="search" id="search-tours" placeholder="Search activity" v-model="activityName">
    </div>

    <!-- Categories Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Categories</span>
        <small class="pry-color clear-btn" @click="resetCategoryFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="category in uniqueCategories" :key="category">
          <input type="checkbox" v-model="selectedCategories" :value="category" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between">
              <span class="filter-block-item truncate">{{ category }}</span>
            </span>
          </span>
        </label>
      </div>
    </div>

    <!-- Duration Filter -->
    <div class="filter-block">
        <div class="filter-block-header">
        <span>Duration</span>
        <small class="pry-color clear-btn" @click="resetDurationFilter">Clear</small>
        </div>
        <div class="filter-list-items">
        <label v-for="duration in displayedDurations" :key="duration">
            <input type="checkbox" v-model="selectedDurations" :value="duration" class="filled-in">
            <span class="w-full">
            <span class="flex-div justify-between">
                <span class="filter-block-item truncate">{{ duration }}</span>
            </span>
            </span>
        </label>
        </div>
        <small v-if="showMoreDurations" @click="toggleShowAllDurations" class="show-more-btn clear-btn pry-color">
        {{ showAllDurations ? 'Show less' : 'Show more' }}
        </small>
    </div>

    <!-- Recommended Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Recommended for</span>
        <small class="pry-color clear-btn" @click="resetRecommendedFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="recommendation in uniqueRecommendations" :key="recommendation">
          <input type="checkbox" v-model="selectedRecommendations" :value="recommendation" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between">
              <span class="filter-block-item truncate">{{ recommendation }}</span>
            </span>
          </span>
        </label>
      </div>
    </div>

    <!-- Customer Reviews Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Customer reviews</span>
        <small class="pry-color clear-btn" @click="resetReviewFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating">
          <input type="checkbox" v-model="selectedRatings" :value="rating" class="filled-in">
          <span class="w-full">
            <span class="flex-div gap-[10px]">
              <img v-for="star in rating" :key="star" src="@/assets/images/filled-radial.svg" alt="radial" class="option-point">
              <img v-for="emptyStar in 5 - rating" :key="`empty-${emptyStar}`" src="@/assets/images/empty-radial.svg" alt="radial" class="option-point">
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const props = defineProps({
  tours: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:filteredTours']);

const slider = ref(null);
const minPrice = ref(0);
const maxPrice = ref(0);
const activityName = ref('');
const selectedCategories = ref([]);
const selectedDurations = ref([]);
const selectedRatings = ref([]);
const selectedRecommendations = ref([]);
const showAllDurations = ref(false);

const uniqueCategories = computed(() => {
  const categories = new Set();
  props.tours.forEach(tour => {
    tour.content.segmentationGroups.forEach(group => {
      if (group.code === 1) {  // Assuming code 1 is for categories
        group.segments.forEach(segment => categories.add(segment.name));
      }
    });
  });
  return Array.from(categories);
});

const sortedUniqueDurations = computed(() => {
  const durations = new Set();
  props.tours.forEach(tour => {
    const duration = getDuration(tour);
    if (duration) durations.add(duration);
  });
  return Array.from(durations).sort((a, b) => {
    const aHours = parseFloat(a.split(' ')[0]);
    const bHours = parseFloat(b.split(' ')[0]);
    return aHours - bHours;
  });
});

const displayedDurations = computed(() => {
  return showAllDurations.value ? sortedUniqueDurations.value : sortedUniqueDurations.value.slice(0, 6);
});

const showMoreDurations = computed(() => {
  return sortedUniqueDurations.value.length > 6;
});

const toggleShowAllDurations = () => {
  showAllDurations.value = !showAllDurations.value;
};

const uniqueRecommendations = computed(() => {
  const recommendations = new Set();
  props.tours.forEach(tour => {
    tour.content.segmentationGroups.forEach(group => {
      if (group.code === 3) {  // Assuming code 3 is for recommendations
        group.segments.forEach(segment => recommendations.add(segment.name));
      }
    });
  });
  return Array.from(recommendations);
});

const filteredTours = computed(() => {
  return props.tours.filter(tour => {
    const price = tour.amountsFrom[0].amount;
    const tourCategories = tour.content.segmentationGroups
      .find(group => group.code === 1)?.segments.map(segment => segment.name) || [];
    const tourRecommendations = tour.content.segmentationGroups
      .find(group => group.code === 3)?.segments.map(segment => segment.name) || [];
    const tourDuration = getDuration(tour);
    const tourRating = tour.content.review?.rate || 0;

    return (
      price >= minPrice.value &&
      price <= maxPrice.value &&
      (activityName.value === '' || tour.name.toLowerCase().includes(activityName.value.toLowerCase())) &&
      (selectedCategories.value.length === 0 || tourCategories.some(cat => selectedCategories.value.includes(cat))) &&
      (selectedDurations.value.length === 0 || selectedDurations.value.includes(tourDuration)) &&
      (selectedRatings.value.length === 0 || selectedRatings.value.includes(Math.floor(tourRating))) &&
      (selectedRecommendations.value.length === 0 || tourRecommendations.some(rec => selectedRecommendations.value.includes(rec)))
    );
  });
});

const getDuration = (tour) => {
  const duration = tour.content.scheduling?.duration;
  if (duration && duration.value && duration.metric) {
    return `${duration.value} ${duration.metric.toLowerCase()}`;
  }
  return null;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: props.tours[0]?.currency || 'USD' }).format(value);
};

const resetAllFilters = () => {
  activityName.value = '';
  selectedCategories.value = [];
  selectedDurations.value = [];
  selectedRatings.value = [];
  selectedRecommendations.value = [];
  resetPriceFilter();
};

const resetPriceFilter = () => {
  const prices = props.tours.map(tour => tour.amountsFrom[0].amount);
  minPrice.value = Math.min(...prices);
  maxPrice.value = Math.max(...prices);
  if (slider.value) {
    slider.value.noUiSlider.set([minPrice.value, maxPrice.value]);
  }
};

const resetCategoryFilter = () => {
  selectedCategories.value = [];
};

const resetDurationFilter = () => {
  selectedDurations.value = [];
  showAllDurations.value = false;
};

const resetReviewFilter = () => {
  selectedRatings.value = [];
};

const resetRecommendedFilter = () => {
  selectedRecommendations.value = [];
};

onMounted(() => {
  const prices = props.tours.map(tour => tour.amountsFrom[0].amount);
  minPrice.value = Math.min(...prices);
  maxPrice.value = Math.max(...prices);

  slider.value = document.querySelector("#slider");
  noUiSlider.create(slider.value, {
    start: [minPrice.value, maxPrice.value],
    connect: true,
    step: 1,
    range: {
      'min': minPrice.value,
      'max': maxPrice.value
    }
  });

  slider.value.noUiSlider.on('update', (values) => {
    minPrice.value = Number(values[0]);
    maxPrice.value = Number(values[1]);
  });
});

watch([activityName, selectedCategories, selectedDurations, selectedRatings, selectedRecommendations, minPrice, maxPrice], () => {
  emit('update:filteredTours', filteredTours.value);
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>