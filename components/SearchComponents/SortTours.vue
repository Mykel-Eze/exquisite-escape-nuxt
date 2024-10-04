<!-- SortTours.vue -->
<template>
  <section id="sort-tours">
    <!-- <div class="sort-bar">
      <div class="container flex-div">
        <span class="text-[18px]">Sort By</span>
        <ul class="flex-div sort-tabs-wrapper">
          <li :class="{ active: activeTab === 'all' }" @click="setActiveTab('all')">
            <span>All Tours</span>
          </li>
          <li :class="{ active: activeTab === 'cheapest' }" @click="setActiveTab('cheapest')">
            <span>Cheapest</span>
          </li>
          <li :class="{ active: activeTab === 'popular' }" @click="setActiveTab('popular')">
            <span>Most Popular</span>
          </li>
          <li :class="{ active: activeTab === 'recommended' }" @click="setActiveTab('recommended')">
            <span>Recommended</span>
          </li>
        </ul>
      </div>
    </div> -->

    <div class="container">
      <ToursTicketOverviewBlock 
        :tours="sortedTours"
        @view-ticket-clicked="viewTicketDetails"
        @show-availability-modal="showAvailabilityModal"
      />

      <div class="other-tickets-overview-wrapper">
        <div class="show-more-wrapper mt-[50px]" v-if="hasMoreTours">
          <button class="show-more-btn flex-div gap-2" @click="showMoreTours">
            <span>Show More</span> 
            <img src="@/assets/images/caret-down-white.svg" alt="caret">
          </button>
        </div>
      </div>
    </div>
    
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: "SortTours",
  props: {
    tours: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  emits: ['update:activeTab', 'view-ticket-clicked', 'show-availability-modal'],
  setup(props, { emit }) {
    const showSuccessModal = ref(false);
    const showSidePopup = ref(false);
    const selectedTour = ref(null);
    const visibleTours = ref(5);

    const sortedTours = computed(() => {
      if (!props.tours || props.tours.length === 0) {
        return [];
      }

      let filteredTours = [...props.tours];

      switch (props.activeTab) {
        case 'cheapest':
          filteredTours.sort((a, b) => a.amountsFrom[0].amount - b.amountsFrom[0].amount);
          return filteredTours.slice(0, 3);
        case 'popular':
          // You might need to add a popularity field to your tour data
          return filteredTours.slice(0, 3);
        case 'recommended':
          // You might need to add a rating field to your tour data
          return filteredTours.slice(0, 3);
        default:
          return filteredTours.slice(0, visibleTours.value);
      }
    });

    const hasMoreTours = computed(() => {
      return props.activeTab === 'all' && props.tours && visibleTours.value < props.tours.length;
    });

    const viewTicketDetails = (tour) => {
      emit('view-ticket-clicked', tour);
    };

    const showAvailabilityModal = (tour) => {
      emit('show-availability-modal', tour);
    };

    const showMoreTours = () => {
      visibleTours.value += 5;
    };

    const setActiveTab = (tab) => {
      emit('update:activeTab', tab);
      visibleTours.value = 5;
    };

    return {
      sortedTours,
      hasMoreTours,
      showAvailabilityModal,
      showSuccessModal,
      showSidePopup,
      selectedTour,
      viewTicketDetails,
      showMoreTours,
      setActiveTab,
    };
  }
}
</script>