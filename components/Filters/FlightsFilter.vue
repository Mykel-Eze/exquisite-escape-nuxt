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
      <div id="slider" ref="slider"></div>
      <div class="slider-values flex-div justify-between">
        <span>₦{{formatNumber(currentMinPrice)}}</span>
        <span>₦{{formatNumber(currentMaxPrice)}}</span>
      </div>
    </div>

    <!-- Stops Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Stops</span>
        <small class="pry-color clear-btn" @click="resetStopsFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="stop in stops" :key="stop.value">
          <input type="checkbox" v-model="selectedStops" :value="stop.value" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between gap-2">
              <span class="filter-block-item">{{ stop.label }}</span>
              <span>({{ stop.count }})</span>
            </span>
          </span>
        </label>
      </div>
    </div>

    <!-- Airline Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Airline</span>
        <small class="pry-color clear-btn" @click="resetAirlineFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="airline in displayedAirlines" :key="airline.code">
          <input type="checkbox" v-model="selectedAirlines" :value="airline.code" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between gap-2">
                <span class="filter-block-item truncate">{{ airline.name }} </span>
                <span>({{ airline.count }})</span>
            </span>
          </span>
        </label>
      </div>
      
      <div class="show-more-btn-wrapper mt-[15px]" v-if="airlines.length > 10">
        <button @click="toggleShowMore" class="flex-div gap-2 bold-txt pry-color text-[14px]">
          {{ showMore ? 'Show Less' : 'Show More' }}
          <img src="@/assets/images/caret-down-green.svg" alt="caret">
        </button>
      </div>
    </div>

    <!-- Travel & Baggage Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Travel & Baggage</span>
        <small class="pry-color clear-btn" @click="resetBaggageFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="baggage in baggages" :key="baggage.value">
          <input type="checkbox" v-model="selectedBaggages" :value="baggage.value" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between gap-2">
              <span class="filter-block-item">{{ baggage.label }}</span>
              <span>({{ baggage.count }})</span>
            </span>
          </span>
        </label>
      </div>
    </div>

    <!-- Departure Time Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Departure Time</span>
        <small class="pry-color clear-btn" @click="resetDepartureTimeFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="time in departureTimes" :key="time.value">
          <input type="checkbox" v-model="selectedDepartureTimes" :value="time.value" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between">
              <span class="filter-block-item truncate w-[80px]">{{ time.label }}</span>
              <span class="filter-block-item-value">{{ time.range }}</span>
            </span>
          </span>
        </label>
      </div>
    </div>

    <!-- Arrival Time Filter -->
    <div class="filter-block">
      <div class="filter-block-header">
        <span>Arrival Time</span>
        <small class="pry-color clear-btn" @click="resetArrivalTimeFilter">Clear</small>
      </div>
      <div class="filter-list-items">
        <label v-for="time in arrivalTimes" :key="time.value">
          <input type="checkbox" v-model="selectedArrivalTimes" :value="time.value" class="filled-in">
          <span class="w-full">
            <span class="flex-div justify-between">
              <span class="filter-block-item truncate w-[80px]">{{ time.label }}</span>
              <span class="filter-block-item-value">{{ time.range }}</span>
            </span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
    name: 'FlightsFilter',
    props: {
        flights: {
            type: Array,
            required: true,
            default: () => []
        },
        dictionaries: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    emits: ['update:filteredFlights'],
    setup(props, { emit }) {
        const slider = ref(null);
        const minPrice = ref(0);
        const maxPrice = ref(0);
        const currentMinPrice = ref(0);
        const currentMaxPrice = ref(0);
        const selectedStops = ref([]);
        const selectedAirlines = ref([]);
        const selectedBaggages = ref([]);
        const selectedDepartureTimes = ref([]);
        const selectedArrivalTimes = ref([]);
        const showMore = ref(false);

        const stops = computed(() => {
          if (!props.flights || props.flights.length === 0) return [];
          const stopCounts = props.flights.reduce((acc, flight) => {
            const stopCount = flight.itineraries[0].segments.length - 1;
            acc[stopCount] = (acc[stopCount] || 0) + 1;
            return acc;
          }, {});
          return [
            { value: 0, label: 'Non-stop', count: stopCounts[0] || 0 },
            { value: 1, label: '1 Stop', count: stopCounts[1] || 0 },
            { value: 2, label: '2+ Stops', count: Object.entries(stopCounts).reduce((sum, [stops, count]) => stops >= 2 ? sum + count : sum, 0) }
          ].filter(stop => stop.count > 0);
        });

        const airlines = computed(() => {
            if (!props.flights || props.flights.length === 0 || !props.dictionaries || !props.dictionaries.carriers) return [];
            const airlineMap = new Map();
            props.flights.forEach(flight => {
                const airlineCode = flight.itineraries[0].segments[0].carrierCode;
                const airlineName = props.dictionaries.carriers[airlineCode] || airlineCode;
                if (!airlineMap.has(airlineCode)) {
                airlineMap.set(airlineCode, { 
                    code: airlineCode, 
                    name: airlineName,
                    count: 1
                });
                } else {
                airlineMap.get(airlineCode).count++;
                }
            });
            return Array.from(airlineMap.values());
        });

        const displayedAirlines = computed(() => {
            return showMore.value ? airlines.value : airlines.value.slice(0, 10);
        });

        const baggages = computed(() => {
          if (!props.flights || props.flights.length === 0) return [];
          const baggageCounts = props.flights.reduce((acc, flight) => {
            const hasCheckedBags = flight.travelerPricings.some(traveler => 
              traveler.fareDetailsBySegment.some(segment => segment.includedCheckedBags?.quantity > 0)
            );
            acc.checked = (acc.checked || 0) + (hasCheckedBags ? 1 : 0);
            acc.carry_on = (acc.carry_on || 0) + 1; // Assuming all flights allow carry-on
            return acc;
          }, {});
          return [
            { value: 'carry_on', label: 'Carry-on bag', count: baggageCounts.carry_on || 0 },
            { value: 'checked', label: 'Checked bag', count: baggageCounts.checked || 0 }
          ];
        });

        const departureTimes = [
            { value: 'early_morning', label: 'Early Morning', range: '12:00am - 5:59am' },
            { value: 'morning', label: 'Morning', range: '6:00am - 11:59am' },
            { value: 'afternoon', label: 'Afternoon', range: '12:00pm - 5:59pm' },
            { value: 'evening', label: 'Evening', range: '6:00pm - 11:59pm' }
        ];

        const arrivalTimes = [
            { value: 'early_morning', label: 'Early Morning', range: '12:00am - 5:59am' },
            { value: 'morning', label: 'Morning', range: '6:00am - 11:59am' },
            { value: 'afternoon', label: 'Afternoon', range: '12:00pm - 5:59pm' },
            { value: 'evening', label: 'Evening', range: '6:00pm - 11:59pm' }
        ];

        const initPriceSlider = () => {
            if (!props.flights || props.flights.length === 0) return;

            const prices = props.flights.map(flight => parseFloat(flight.price.total));
            minPrice.value = Math.min(...prices);
            maxPrice.value = Math.max(...prices);
            currentMinPrice.value = minPrice.value;
            currentMaxPrice.value = maxPrice.value;

            if (slider.value) {
                if (slider.value.noUiSlider) {
                    slider.value.noUiSlider.destroy();
                }
                noUiSlider.create(slider.value, {
                    start: [minPrice.value, maxPrice.value],
                    connect: true,
                    range: {
                        'min': minPrice.value,
                        'max': maxPrice.value
                    }
                });

                slider.value.noUiSlider.on('update', (values) => {
                    currentMinPrice.value = Math.round(values[0]);
                    currentMaxPrice.value = Math.round(values[1]);
                    applyFilters();
                });
            }
        };

        const applyFilters = () => {
            if (!props.flights || props.flights.length === 0) {
                emit('update:filteredFlights', []);
                return;
            }
            
            const filteredFlights = props.flights.filter(flight => {
                const price = parseFloat(flight.price.total);
                const stops = flight.itineraries[0].segments.length - 1;
                const airline = flight.itineraries[0].segments[0].carrierCode;
                const departureTime = new Date(flight.itineraries[0].segments[0].departure.at).getHours();
                const arrivalTime = new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).getHours();

                return (
                    price >= currentMinPrice.value &&
                    price <= currentMaxPrice.value &&
                    (selectedStops.value.length === 0 || selectedStops.value.includes(stops >= 2 ? 2 : stops)) &&
                    (selectedAirlines.value.length === 0 || selectedAirlines.value.includes(airline)) &&
                    (selectedDepartureTimes.value.length === 0 || selectedDepartureTimes.value.includes(getTimeCategory(departureTime))) &&
                    (selectedArrivalTimes.value.length === 0 || selectedArrivalTimes.value.includes(getTimeCategory(arrivalTime)))
                );
            });

            emit('update:filteredFlights', filteredFlights);
        };

        const getTimeCategory = (hour) => {
            if (hour >= 0 && hour < 6) return 'early_morning';
            if (hour >= 6 && hour < 12) return 'morning';
            if (hour >= 12 && hour < 18) return 'afternoon';
            return 'evening';
        };

        const resetAllFilters = () => {
            selectedStops.value = [];
            selectedAirlines.value = [];
            selectedBaggages.value = [];
            selectedDepartureTimes.value = [];
            selectedArrivalTimes.value = [];
            const slider = document.getElementById('slider');
            if (slider && slider.noUiSlider) {
                slider.noUiSlider.set([minPrice.value, maxPrice.value]);
            }
            applyFilters();
        };

        const resetPriceFilter = () => {
            const slider = document.getElementById('slider');
            if (slider && slider.noUiSlider) {
                slider.noUiSlider.set([minPrice.value, maxPrice.value]);
            }
            applyFilters();
        };

        const resetStopsFilter = () => {
            selectedStops.value = [];
            applyFilters();
        };

        const resetAirlineFilter = () => {
            selectedAirlines.value = [];
            applyFilters();
        };

        const resetBaggageFilter = () => {
            selectedBaggages.value = [];
            applyFilters();
        };

        const resetDepartureTimeFilter = () => {
            selectedDepartureTimes.value = [];
            applyFilters();
        };

        const resetArrivalTimeFilter = () => {
            selectedArrivalTimes.value = [];
            applyFilters();
        };

        const toggleShowMore = () => {
            showMore.value = !showMore.value;
        };

        const formatNumber = (num) => {
            return num.toLocaleString('en-US');
        };

        onMounted(() => {
            slider.value = document.getElementById('slider');
            if (props.flights && props.flights.length > 0) {
                initPriceSlider();
            }
        });

        watch(() => props.flights, (newFlights) => {
            if (newFlights && newFlights.length > 0) {
                initPriceSlider();
                applyFilters();
            }
        });

        watch([selectedStops, selectedAirlines, selectedBaggages, selectedDepartureTimes, selectedArrivalTimes], () => {
            applyFilters();
        });

        return {
            currentMinPrice,
            currentMaxPrice,
            selectedStops,
            selectedAirlines,
            selectedBaggages,
            selectedDepartureTimes,
            selectedArrivalTimes,
            stops,
            airlines,
            displayedAirlines,
            baggages,
            departureTimes,
            arrivalTimes,
            showMore,
            resetAllFilters,
            resetPriceFilter,
            resetStopsFilter,
            resetAirlineFilter,
            resetBaggageFilter,
            resetDepartureTimeFilter,
            resetArrivalTimeFilter,
            toggleShowMore,
            formatNumber
        };
  }
};
</script>