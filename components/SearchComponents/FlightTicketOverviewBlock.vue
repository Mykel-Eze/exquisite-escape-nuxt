<template>
  <div class="tickets-overview-wrapper mt-[30px]">
    <div class="ticket-overview-block" v-for="flight in flights" :key="flight.id">
      <div class="left-side">
        <div class="ticket-labels-wrapper flex-div gap-[18px]">
          <FlightTags v-if="isCheapest(flight)" type="filter" label="Cheapest" />
          <FlightTags v-if="isFastest(flight)" type="filter" label="Fastest" />
          <FlightTags v-if="isMultiCity(flight)" type="trip" label="Mult-city per traveler" icon="double-arr.svg" />
          <FlightTags type="days" label="Same day" />
          <!-- <FlightTags v-if="flight.numberOfBookableSeats <= 1" type="trip" :label="`${flight.numberOfBookableSeats} ticket(s) left`" icon="ticket.svg" /> -->
        </div>

        <div class="ticket-overview-content">
          <div class="tc-row-wrapper">
            <div class="toc-row flex-div gap-5 w-full" v-for="segment in flight.itineraries[0].segments" :key="segment.id">
              <div class="ticket-airline">
                <img :src="getAirlineLogo(segment.carrierCode)" :alt="getAirlineName(segment.carrierCode)">
                <span class="truncate w-full center">{{ getAirlineName(segment.carrierCode) }}</span>
              </div>

              <div class="ticket-from-to flex-div">
                <div class="ticket-from">
                  <div class="ticket-time">{{ formatTime(segment.departure.at) }}</div>
                  <div class="ticket-state-code">{{ segment.departure.iataCode }}</div>
                  <div class="ticket-state capitalize">{{ getCityName(segment.departure.iataCode) }}</div>
                </div>
                <div class="from-to-divider">
                  <SvgIcons icon="flight_2" />
                  <div>
                    <span>{{ formatDuration(segment.duration) }}</span> ∙ <span>{{ getStops(flight) }}</span>
                  </div>
                </div>
                <div class="ticket-to">
                  <div class="ticket-time">{{ formatTime(segment.arrival.at) }}</div>
                  <div class="ticket-state-code">{{ segment.arrival.iataCode }}</div>
                  <div class="ticket-state capitalize">{{ getCityName(segment.arrival.iataCode) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-labels-wrapper flex-div gap-[10px]">
          <FlightTags v-if="hasCheckedBags(flight)" type="addon" label="Carry - one bag" icon="bag.svg" />
          <FlightTags type="addon" label="No changes fee" icon="recycle.svg" />
          <FlightTags type="addon" label="Seat choice included" icon="seat.svg" />
          <FlightTags type="addon" label="Average CO2" icon="cloud.svg" />
        </div>
      </div>
      <div class="right-side rel min-h-[200px]">
        <div class="ticket-left-label" v-if="flight.numberOfBookableSeats < 10">
          <TicketLabels label="tickets-left" :ticketsLeft="flight.numberOfBookableSeats" />
        </div>
        
        <div class="ticket-amount-wrapper">
          <div class="ticket-amount">{{ formatCurrency(flight.price.total, flight.price.currency) }}</div>

          <div class="view-ticket-btn-wrapper w-full">
            <button class="view-ticket-btn flex-div" @click="viewTicket(flight)">
                <span>View ticket</span>
                <img src="@/assets/images/chevy-right.svg" alt="right arrow">
            </button>
          </div>
        </div>
        <div class="cup-curves up-curve"></div>
        <div class="cup-curves down-curve"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApi } from '@/utils/api';
import { formatCurrency } from '@/utils/currency';

const props = defineProps({
  flights: {
    type: Array,
    required: true
  },
  dictionaries: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['view-ticket-clicked']);

const api = useApi();
const cityNames = ref({});

const lowestPrice = computed(() => {
  return Math.min(...props.flights.map(flight => parseFloat(flight.price.total)));
});

const getAirlineLogo = (carrierCode) => {
  return `https://pics.avs.io/200/200/${carrierCode}.png`;
};

const viewTicket = (flight) => {
  emit('view-ticket-clicked', flight);
  // console.log("Button clicked", flight);
};

const getAirlineName = (carrierCode) => {
  return props.dictionaries?.carriers?.[carrierCode] || carrierCode;
};

const fetchCityName = async (iataCode) => {
  try {
    const response = await api.post('/api/flight/airport-nearby', {
      keyword: iataCode,
      subType: "CITY"
    });
    
    if (response.data && response.data.length > 0) {
      const matchingCity = response.data.find(city => city.iataCode === iataCode);
      
      if (matchingCity) {
        cityNames.value[iataCode] = matchingCity.address.cityName;
      } else {
        cityNames.value[iataCode] = response.data[0].address.cityName;
      }
    } else {
      cityNames.value[iataCode] = iataCode;
    }
  } catch (error) {
    console.error(`Error fetching city name for ${iataCode}:`, error);
    cityNames.value[iataCode] = iataCode;
  }
};

const getCityName = (iataCode) => {
  if (!cityNames.value[iataCode]) {
    fetchCityName(iataCode);
    return iataCode; // Return IATA code while fetching
  }
  return cityNames.value[iataCode];
};

onMounted(() => {
  const uniqueIataCodes = new Set();
  props.flights.forEach(flight => {
    flight.itineraries[0].segments.forEach(segment => {
      uniqueIataCodes.add(segment.departure.iataCode);
      uniqueIataCodes.add(segment.arrival.iataCode);
    });
  });
  uniqueIataCodes.forEach(fetchCityName);
});

const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'N/A';
  }
};

const formatDuration = (duration) => {
  const durationString = duration.slice(2, -1);
  const [hoursPart, minutesPart] = durationString.split('H');
  const hours = hoursPart ? hoursPart : '0';
  const minutes = minutesPart ? minutesPart.replace('M', '') : '0';
  return `${hours}h ${minutes}m`;
};

const getStops = (flight) => {
  const stops = flight.itineraries[0].segments.length - 1;
  return stops === 0 ? 'Non-stop' : `${stops} stop${stops > 1 ? 's' : ''}`;
};

const hasCheckedBags = (flight) => {
  return flight.travelerPricings.some(traveler => 
    traveler.fareDetailsBySegment.some(segment => segment.includedCheckedBags?.quantity > 0)
  );
};

const sortedByPrice = computed(() => {
  return [...props.flights].sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
});

const cheapestFlights = computed(() => {
  return sortedByPrice.value.slice(0, 3);
});

const isCheapest = (flight) => cheapestFlights.value.includes(flight);

const sortedByDuration = computed(() => {
  return [...props.flights].sort((a, b) => {
    const durationA = getTotalDuration(a);
    const durationB = getTotalDuration(b);
    return durationA - durationB;
  });
});

const fastestFlight = computed(() => sortedByDuration.value[0]);

const isFastest = (flight) => flight === fastestFlight.value;

const getTotalDuration = (flight) => {
  return flight.itineraries[0].segments.reduce((total, segment) => {
    return total + parseDuration(segment.duration);
  }, 0);
};

const parseDuration = (duration) => {
  const [hours, minutes] = duration.replace('PT', '').replace('H', ':').replace('M', '').split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
};

const isMultiCity = (flight) => flight.itineraries[0].segments.length > 1;
</script>