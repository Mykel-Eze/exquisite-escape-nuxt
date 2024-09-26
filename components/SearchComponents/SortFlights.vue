<template>
    <section id="sort-flights">
        <div class="sort-bar">
            <div class="container flex-div">
                <span class="text-[18px]">Sort By</span>
                <ul class="flex-div sort-tabs-wrapper">
                    <li class="active">
                        <span>All Flights</span>
                    </li>
                    <li>
                        <span>Cheapest</span>
                    </li>
                    <li>
                        <span>Fastest</span>
                    </li>
                    <li>
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
    }
  },
  setup(props, { emit }) {
    const showPopup = ref(false);
    const selectedFlight = ref(null);
    const visibleFlights = ref(5); // Number of flights to show initially

    const sortedFlights = computed(() => {
      // Implement sorting logic here if needed
      return props.flights.slice(0, visibleFlights.value);
    });

    const hasMoreFlights = computed(() => {
      return visibleFlights.value < props.flights.length;
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

    return {
      sortedFlights,
      hasMoreFlights,
      showPopup,
      selectedFlight,
      viewTicketDetails,
      closePopup,
      showMoreFlights
    };
  }
}
</script>

<style>

</style>