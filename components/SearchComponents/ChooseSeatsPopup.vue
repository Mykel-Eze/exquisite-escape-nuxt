<template>
  <div>
    <div class="side-popup">
      <div class="side-popup-header">
        <div class="flex-div gap-2 mb-4">
          <img src="@/assets/images/close-popup.svg" alt="close" class="close-popup-icon" @click="$emit('close-popup')">
          <span>Choose your seats</span>
        </div>

        <div class="selected-flight-box flex-div gap-[15px]">
          <img src="@/assets/images/plane.svg" alt="plane">
          <div>
            <small>Flight {{ activeTab }} of {{ flight.itineraries.length }}</small>
            <div>{{ flightRouteInfo }}</div>
          </div>
        </div>
      </div>

      <div class="flights-seats-block">
        <ul class="flight-seat-tabs-wrapper flex-div">
          <li v-for="(itinerary, index) in flight.itineraries" :key="index"
              :class="{ active: activeTab === index + 1 }" @click="activeTab = index + 1">
            <span>Travel {{ index + 1 }}</span>
          </li>
        </ul>

        <div class="flight-seats-wrapper">
          <div v-for="(itinerary, itineraryIndex) in flight.itineraries" :key="itineraryIndex"
               v-show="activeTab === itineraryIndex + 1">
            <div class="seating-chart">
              <div class="grid-div">
                <div class="seat-div"></div> <!-- Empty top-left corner -->
                <div v-for="col in cols" :key="col" class="seat-columns text-[14px]"
                     :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                  <div>{{ col }}</div>
                </div>
              </div>
              <div v-for="row in rows" :key="row" class="grid-div seat-wrapper">
                <div class="seat-row text-[14px]">{{ row }}</div> <!-- Row headers -->
                <label v-for="col in cols" :key="col" :id="`${col}${row}`" class="seat"
                       :class="{ 'booked': isBooked(itineraryIndex, col, row), 'selected': isSelected(itineraryIndex, col, row) }"
                       :style="{ 'grid-column-start': (col === 'C' || col === 'F') ? 'span 2' : 'auto' }">
                  <input type="checkbox" :disabled="isBooked(itineraryIndex, col, row)"
                         @change="selectSeat(itineraryIndex, col, row)">
                  {{ isBooked(itineraryIndex, col, row) ? 'X' : '' }}
                  <i v-if="!isBooked(itineraryIndex, col, row)">{{col + row}}</i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="seat-price-wrapper flex-div justify-between">
        <div class="seat-price-block text-black">
          <h6 class="text-[24px] m-0">₦{{ formatPrice(seatPrice) }}</h6>
          <small class="text-[10px]">Seat: {{ selectedSeatsInfo }}</small>
        </div>
        <div class="upgrade-seat-btn-wapper">
          <div class="upgrade-seat-btn" @click="upgradeSeat">Upgrade Seat</div>
        </div>
      </div>
    </div>
    <div class="side-popup-overlay" @click="$emit('close-popup')"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFlightApi } from '~/composables/useFlightApi';

const props = defineProps({
  flight: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close-popup', 'seat-selected']);

const flightApi = useFlightApi();

const activeTab = ref(1);
const cols = ref(['A', 'B', 'C', 'D', 'E', 'F']);
const rows = ref(Array.from({ length: 30 }, (_, i) => i + 1));
const bookedSeats = ref([]);
const selectedSeats = ref({});
const seatPrice = ref(5000); // Default seat price, adjust as needed
const cityNames = ref({});

const flightRouteInfo = computed(() => {
  const currentItinerary = props.flight.itineraries[activeTab.value - 1];
  const firstSegment = currentItinerary.segments[0];
  const lastSegment = currentItinerary.segments[currentItinerary.segments.length - 1];
  return `${cityNames.value[firstSegment.departure.iataCode] || firstSegment.departure.iataCode} (${firstSegment.departure.iataCode}) to 
          ${cityNames.value[lastSegment.arrival.iataCode] || lastSegment.arrival.iataCode} (${lastSegment.arrival.iataCode})`;
});

const selectedSeatsInfo = computed(() => {
  const seats = Object.entries(selectedSeats.value)
    .map(([itinerary, seat]) => `Travel ${parseInt(itinerary) + 1}: ${seat}`)
    .join(', ');
  return seats || '- 0 of 1 selected';
});

onMounted(async () => {
  await fetchCityNames();
  generateBookedSeats();
});

const fetchCityNames = async () => {
  const iataCodesSet = new Set();
  props.flight.itineraries.forEach(itinerary => {
    itinerary.segments.forEach(segment => {
      iataCodesSet.add(segment.departure.iataCode);
      iataCodesSet.add(segment.arrival.iataCode);
    });
  });

  for (const iataCode of iataCodesSet) {
    try {
      const response = await flightApi.getAirportInfo(iataCode);
      cityNames.value[iataCode] = response.address?.cityName || iataCode;
    } catch (error) {
      console.error(`Error fetching city name for ${iataCode}:`, error);
      cityNames.value[iataCode] = iataCode;
    }
  }
};

const generateBookedSeats = () => {
  props.flight.itineraries.forEach((_, index) => {
    bookedSeats.value[index] = [];
    for (let i = 0; i < 15; i++) {
      const row = Math.floor(Math.random() * rows.value.length) + 1;
      const col = cols.value[Math.floor(Math.random() * cols.value.length)];
      bookedSeats.value[index].push(`${col}${row}`);
    }
  });
};

const isBooked = (itineraryIndex, col, row) => {
  return bookedSeats.value[itineraryIndex]?.includes(`${col}${row}`);
};

const isSelected = (itineraryIndex, col, row) => {
  return selectedSeats.value[itineraryIndex] === `${col}${row}`;
};

const selectSeat = (itineraryIndex, col, row) => {
  const seatId = `${col}${row}`;
  if (selectedSeats.value[itineraryIndex] === seatId) {
    delete selectedSeats.value[itineraryIndex];
  } else {
    selectedSeats.value[itineraryIndex] = seatId;
  }
};

const upgradeSeat = () => {
  if (Object.keys(selectedSeats.value).length === props.flight.itineraries.length) {
    // Convert the selectedSeats object to an array of seat strings
    const selectedSeatsArray = Object.values(selectedSeats.value);
    emit('seat-selected', selectedSeatsArray.join(', '));
    emit('close-popup');
  } else {
    alert('Please select a seat for each flight');
  }
};

const formatPrice = (price) => {
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
</script>

<style scoped>
.seating-chart .grid-div {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  align-items: center;
  text-align: center;
}
.seat {
  margin: 5px;
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
}
.booked {
  background-color: #ccc;
  cursor: not-allowed;
}
.selected {
  background-color: var(--pry-color);
  color: white;
}
label i {
  font-size: 8px;
}
.seat-columns > div {
  width: 25px;
  margin: 5px;
}
</style>