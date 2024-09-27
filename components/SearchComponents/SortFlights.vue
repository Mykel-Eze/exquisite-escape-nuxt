<template>
  <section id="sort-flights">
    <div class="sort-bar">
      <div class="container flex-div">
        <span class="text-[18px]">Sort By</span>
        <ul class="flex-div sort-tabs-wrapper">
          <li :class="{ active: activeTab === 'all' }" @click="setActiveTab('all')">
            <span>All Flights</span>
          </li>
          <li :class="{ active: activeTab === 'cheapest' }" @click="setActiveTab('cheapest')">
            <span>Cheapest</span>
          </li>
          <li :class="{ active: activeTab === 'fastest' }" @click="setActiveTab('fastest')">
            <span>Fastest</span>
          </li>
          <li :class="{ active: activeTab === 'recommended' }" @click="setActiveTab('recommended')">
            <span>Recommended</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <FlightTicketOverviewBlock 
        :flights="sortedFlights" 
        :dictionaries="dictionaries"
        v-if="dictionaries"
        @view-ticket-clicked="viewTicketDetails"
      />

      <div class="other-tickets-overview-wrapper">
        <div class="show-more-wrapper mt-[50px]" v-if="hasMoreFlights">
          <button class="show-more-btn flex-div gap-2" @click="showMoreFlights">
            <span>Show More</span> 
            <img src="@/assets/images/caret-down-white.svg" alt="caret">
          </button>
        </div>
      </div>
    </div>

    <FlightsSidePopup 
      v-if="showPopup" 
      :flight="selectedFlight"
      :dictionaries="dictionaries"
      @close-popup="closePopup"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: "SortFlights",
  props: {
    flights: {
      type: Array,
      required: true
    },
    dictionaries: {
      type: Object,
      required: true
    },
    activeTab: {
        type: String,
        required: true
    }
  },
  setup(props, { emit }) {
    const showPopup = ref(false);
    const selectedFlight = ref(null);
    const visibleFlights = ref(5);
    const activeTab = ref('all');
    const filteredFlights = ref([...props.flights]);

    const updateFilteredFlights = (newFilteredFlights) => {
      filteredFlights.value = newFilteredFlights;
    };

    const sortedFlights = computed(() => {
      let filteredFlights = [...props.flights];

      switch (activeTab.value) {
        case 'cheapest':
          filteredFlights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
          return filteredFlights.slice(0, 3); // Show top 3 cheapest
        case 'fastest':
          filteredFlights.sort((a, b) => getTotalDuration(a) - getTotalDuration(b));
          return filteredFlights.slice(0, 3); // Show top 3 fastest
        case 'recommended':
          // Sort by a combination of price and duration
          filteredFlights.sort((a, b) => {
            const priceScoreA = parseFloat(a.price.total);
            const priceScoreB = parseFloat(b.price.total);
            const durationScoreA = getTotalDuration(a);
            const durationScoreB = getTotalDuration(b);
            return (priceScoreA + durationScoreA) - (priceScoreB + durationScoreB);
          });
          return filteredFlights.slice(0, 3); // Show top 3 recommended
        default:
          return filteredFlights.slice(0, visibleFlights.value);
      }
    });

    const getTotalDuration = (flight) => {
      return flight.itineraries[0].segments.reduce((total, segment) => {
        return total + parseDuration(segment.duration);
      }, 0);
    };

    const parseDuration = (duration) => {
      const [hours, minutes] = duration.replace('PT', '').replace('H', ':').replace('M', '').split(':');
      return parseInt(hours) * 60 + parseInt(minutes);
    };

    const hasMoreFlights = computed(() => {
      return activeTab.value === 'all' && visibleFlights.value < filteredFlights.value.length;
    });

    const viewTicketDetails = (flight) => {
      console.log('viewTicketDetails called:', flight);
      selectedFlight.value = flight;
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
      selectedFlight.value = null;
    };

    const showMoreFlights = () => {
      visibleFlights.value += 5;
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      visibleFlights.value = 5; // Reset visible flights when changing tabs
    };

    watch(() => props.flights, (newFlights) => {
      filteredFlights.value = newFlights;
    });

    return {
      sortedFlights,
      hasMoreFlights,
      showPopup,
      selectedFlight,
      viewTicketDetails,
      closePopup,
      showMoreFlights,
      activeTab,
      setActiveTab,
      updateFilteredFlights
    };
  }
}
</script>