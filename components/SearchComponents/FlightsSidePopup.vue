<template>
  <div>
    <div class="side-popup" :data-ticket-type="flight.travelerPricings.length > 1 ? 'multiple' : 'single'">
      <div class="side-popup-header">
        <div class="flex-div gap-2 mb-4">
          <img src="@/assets/images/close-popup.svg" alt="close" class="close-popup-icon" @click="$emit('close-popup')">
          <span>Select fare to {{ getLastDestination }}</span>
        </div>

        <div class="amenities-wrapper flex-div gap-[10px]">
          <img :src="getAirlineLogo(getCarrier)" alt="airline logo" class="w-[30px]">
          <span class="text-[16px]">{{ getAirlineName(getCarrier) }}</span>
          <img v-if="hasAmenity('power')" src="@/assets/images/plug.svg" alt="plug" class="amenities-icon">
          <img v-if="hasAmenity('wifi')" src="@/assets/images/wifi.svg" alt="wifi" class="amenities-icon">
          <img v-if="hasAmenity('entertainment')" src="@/assets/images/tv.svg" alt="tv" class="amenities-icon">
          <!-- <TicketLabels label="average-co" /> -->
        </div>
      </div>

      <div class="hidden-details-wrapper mb-[30px] mt-[45px]">
        <div class="show-hidden-toggle flex-div gap-3 text-[18px] pointer" @click="toggleHiddenDetails">
          <span>{{ showHiddenDetails ? 'Hide details' : 'Show details' }} </span>
          <img src="@/assets/images/caret-down-green.svg" alt="caret-down-green">
        </div>

        <div class="hidden-details-wrapper" v-if="showHiddenDetails">
          <div v-for="(segment, index) in flight.itineraries[0].segments" :key="index">
            <div class="hidden-details-block">
                <div class="flex-div gap-[10px]">
                    <img src="@/assets/images/flight-icon-2.svg" alt="flight-icon">
                    <span>{{ formatTime(segment.departure.at) }} - {{ getCityName(segment.departure.iataCode) }}</span>
                </div>
                <div>{{ getAirportName(segment.departure.iataCode) }} ({{ segment.departure.iataCode }})</div>
            </div>

            <ul class="hidden-details-block mb-4">
              <li>{{ formatDuration(segment.duration) }} flight</li>
              <li>{{ getAirlineName(segment.carrierCode) }} {{ segment.number }}</li>
              <li>{{ getAircraftName(segment.aircraft.code) }}</li>
              <!-- <li>{{ segment ? getCabinClass(segment) : 'N/A' }}</li> -->
            </ul>

            <div class="hidden-details-block">
                <div class="flex-div gap-[10px]">
                    <img src="@/assets/images/flight-icon-2.svg" alt="flight-icon">
                    <span>{{ formatTime(segment.arrival.at) }} - {{ getCityName(segment.arrival.iataCode) }}</span>
                </div>
                <div>{{ getAirportName(segment.arrival.iataCode) }} ({{ segment.arrival.iataCode }})</div>
            </div>

            <div v-if="index < flight.itineraries[0].segments.length - 1" class="layover-row">
              <span>Layover: {{ formatLayover(segment, flight.itineraries[0].segments[index + 1]) }}</span>
            </div>
          </div>

          <div class="hidden-details-block flex flex-col gap-[10px] mt-[20px]">
            <div v-if="hasAmenity('power')" class="flex-div gap-[10px]">
              <img src="@/assets/images/plug.svg" alt="plug">
              <span>In-seat power outlet</span>
            </div>
            <div v-if="hasAmenity('wifi')" class="flex-div gap-[10px]">
              <img src="@/assets/images/wifi.svg" alt="wifi">
              <span>Wi-Fi</span>
            </div>
            <div v-if="hasAmenity('entertainment')" class="flex-div gap-[10px]">
              <img src="@/assets/images/tv.svg" alt="tv">
              <span>In-flight entertainment</span>
            </div>
            <div class="flex-div">
              <TicketLabels label="average-co" />
            </div>
          </div>
        </div>
      </div>

      <div class="tickets-wrapper">
        <div v-for="(pricing, index) in flight.travelerPricings" :key="index" class="tickets-block">
          <div class="tickets-top-side">
            <div class="ticket-amount-div">
              <h2 class="m-0">₦{{ formatPrice(pricing.price.total) }}</h2>
              <span>₦{{ formatPrice(flight.price.total) }} for {{ flight.travelerPricings.length }} traveler(s)</span>
            </div>
            <div class="ticket-items-wrapper">
              <div class="ticket-item">
                <div class="ticket-item-title">{{ getFareName(pricing) }}</div>
                <div class="ticket-item-content flex-div">
                  <div class="flex-div gap-[10px] text-[#9D9D9D]">
                    <span class="text-[#606161]">Cabin:</span> {{ getCabinClass(pricing.fareDetailsBySegment[0]) }}
                  </div>
                </div>
              </div>
              <div class="ticket-item">
                <div class="ticket-item-title">Seat</div>
                <div class="ticket-item-content flex-div gap-[10px]">
                  <img src="@/assets/images/seat.svg" alt="seat" class="ticket-item-icon w-[18px]">
                  <div class="flex-div gap-[10px] text-[#9D9D9D]">
                    <span class="text-[#606161]">Seat choice ∙ </span> Extra fee
                  </div>
                </div>
              </div>
              <div class="ticket-item">
                <div class="ticket-item-title">Bags</div>
                <div class="ticket-item-content flex-div gap-[10px]">
                    <img src="@/assets/images/arrow-right-green.svg" alt="arrow" class="ticket-item-icon w-[24px]">
                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                        <span class="text-[#606161]">Carry-on bag included</span>
                    </div>
                </div>
                <div class="ticket-item-content flex-div gap-[10px]" v-if="hasCheckedBags(pricing)">
                    <img src="@/assets/images/arrow-right-green.svg" alt="arrow" class="ticket-item-icon w-[24px]">
                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                        <span class="text-[#606161]">Checked bag(s) included</span>
                    </div>
                </div>
                
                <!-- <div class="ticket-item-content">
                  <div class="text-[#606161] text-[14px]">
                    <div class="my-[5px]" v-for="(segment, segIndex) in pricing.fareDetailsBySegment" :key="segIndex">
                      <sup>*</sup>{{ getBaggageInfo(segment) }}
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="ticket-item">
                <div class="ticket-item-title">Flexibility</div>
                <div class="ticket-item-content flex-div gap-[10px]">
                  <img src="@/assets/images/close-popup.svg" alt="close" class="ticket-item-icon w-[24px]">
                  <div class="flex-div gap-[10px] text-[#9D9D9D]">
                    <span class="text-[#606161]">Refund ∙ </span> Extra fee
                  </div>
                </div>
                <div class="ticket-item-content flex-div gap-[10px]">
                  <img src="@/assets/images/recycle.svg" alt="recycle" class="ticket-item-icon w-[24px]">
                  <div class="flex-div gap-[10px] text-[#9D9D9D]">
                    <span class="text-[#606161]">Changes ∙ </span> Extra fee
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tickets-bottom-side">
            <div class="price-change-protection flex-div gap-[10px]">
              <img src="@/assets/images/price-change.svg" alt="price-change" class="price-change-icon">
              <span>Price change protection </span>
              <img src="@/assets/images/i-caution.svg" alt="" class="i-caution-icon">
            </div>
            <div class="text-[14px] text-[#848484]">
              We will refund the difference if the price drops before you fly.
            </div>
            <div class="flex-div justify-between">
              <label class="text-[14px] text-[#141414]">
                <input type="checkbox" class="filled-in" />
                <span>Add to this flight</span>
              </label>
              <span>₦50,000</span>
            </div>

            <div class="select-ticket-btn-wrapper mt-5">
                <button class="select-ticket-btn" @click="selectTicket">Select ticket</button>
            </div>

            <div class="cup-curves left-curve"></div>
            <div class="cup-curves right-curve"></div>
          </div>
        </div>
      </div>

      <div class="side-popup-footer text-[10px]">
        <div class="spf-note-1 my-[10px]">
          Baggage fees reflect the airline's standard fees based on the selected fare class. Fees may vary
          based on size and weight restrictions as well as loyalty programs and other promotions. For more information,
          check with <a :href="getAirlineWebsite" target="_blank" rel="noopener noreferrer" class="pry-color underline">{{ getAirlineName(getCarrier) }} ↗</a>.
          You can purchase checked bags from
          <a :href="getAirlineWebsite" target="_blank" rel="noopener noreferrer" class="pry-color underline">{{ getAirlineName(getCarrier) }} ↗</a> or through
          the link in your confirmation or check-in emails.
        </div>

        <div class="spf-note-2 flex-div">
          <img src="@/assets/images/leaf.svg" alt="leaf" class="leaf-icon">
          <span>
            Visit the <a :href="getAirlineWebsite" target="_blank" rel="noopener noreferrer" class="pry-color underline">{{ getAirlineName(getCarrier) }} ↗</a>
            website to find out more about their sustainability initiatives.
          </span>
        </div>
      </div>
    </div>
    <div class="side-popup-overlay" @click="$emit('close-popup')"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/utils/api';
import { useFlightStore } from '~/store/flightStore';

const props = defineProps({
  flight: {
    type: Object,
    required: true
  },
  dictionaries: {
    type: Object,
    required: true
  }
});

const showHiddenDetails = ref(false);
const api = useApi();
const cityData = ref({});

const router = useRouter();
const flightStore = useFlightStore();

const emit = defineEmits(['close-popup']);

const toggleHiddenDetails = () => {
  showHiddenDetails.value = !showHiddenDetails.value;
};

const getCarrier = computed(() => {
  if (props.flight?.itineraries?.[0]?.segments?.[0]?.carrierCode) {
    return props.flight.itineraries[0].segments[0].carrierCode;
  }
  return null;
});

const getAirlineLogo = (carrierCode) => {
  return `https://pics.avs.io/200/200/${carrierCode}.png`;
};

const getAirlineName = (carrierCode) => {
  return carrierCode ? (props.dictionaries?.carriers?.[carrierCode] || carrierCode) : 'Unknown Airline';
};

const fetchCityAndAirportData = async (iataCode) => {
  if (cityData.value[iataCode]) return;

  try {
    const response = await api.post('/api/flight/airport-nearby', {
      keyword: iataCode,
      subType: "CITY,AIRPORT"
    });
    
    if (response.data && response.data.length > 0) {
      const cityInfo = response.data.find(item => item.subType === 'CITY' && item.iataCode === iataCode);
      const airportInfo = response.data.find(item => item.subType === 'AIRPORT' && item.iataCode === iataCode);
      
      if (cityInfo && airportInfo) {
        cityData.value[iataCode] = {
          cityName: cityInfo.address.cityName || cityInfo.name,
          airportName: airportInfo.name
        };
      } else {
        // If we can't find an exact match, fall back to the IATA code
        cityData.value[iataCode] = { cityName: iataCode, airportName: iataCode };
      }
    } else {
      cityData.value[iataCode] = { cityName: iataCode, airportName: iataCode };
    }
  } catch (error) {
    console.error(`Error fetching data for ${iataCode}:`, error);
    cityData.value[iataCode] = { cityName: iataCode, airportName: iataCode };
  }
};

const getCityName = (iataCode) => {
  if (!cityData.value[iataCode]) {
    fetchCityAndAirportData(iataCode);
    return iataCode; // Return IATA code while fetching
  }
  return cityData.value[iataCode].cityName;
};

const getAirportName = (iataCode) => {
  if (!cityData.value[iataCode]) {
    fetchCityAndAirportData(iataCode);
    return iataCode; // Return IATA code while fetching
  }
  return cityData.value[iataCode].airportName;
};

const getLastDestination = computed(() => {
  const segments = props.flight?.itineraries?.[0]?.segments;
  if (segments && segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    return getCityName(lastSegment.arrival.iataCode);
  }
  return 'Unknown Destination';
});

onMounted(() => {
  // Fetch data for all unique IATA codes
  const uniqueIataCodes = new Set();
  props.flight?.itineraries?.forEach(itinerary => {
    itinerary.segments.forEach(segment => {
      uniqueIataCodes.add(segment.departure.iataCode);
      uniqueIataCodes.add(segment.arrival.iataCode);
    });
  });
  uniqueIataCodes.forEach(fetchCityAndAirportData);
});

const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('en-US');
};

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (duration) => {
  const hours = duration.slice(2, -1).split('H')[0];
  const minutes = duration.slice(2, -1).split('H')[1].replace('M', '');
  return `${hours}h ${minutes}m`;
};

const getAircraftName = (code) => {
  return props.dictionaries.aircraft[code] || code;
};

const getCabinClass = (segment) => {
  return segment?.cabin?.charAt(0).toUpperCase() + segment?.cabin?.slice(1).toLowerCase() ?? 'N/A';
};

const formatLayover = (currentSegment, nextSegment) => {
  const layoverTime = new Date(nextSegment.departure.at) - new Date(currentSegment.arrival.at);
  const hours = Math.floor(layoverTime / (1000 * 60 * 60));
  const minutes = Math.floor((layoverTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m in ${getCityName(currentSegment.arrival.iataCode)}`;
};

const hasAmenity = (type) => {
  // This is a placeholder. You should implement logic to determine if the flight has these amenities.
  return true;
};

const getFareName = (pricing) => {
  return pricing.fareDetailsBySegment[0].brandedFare || 'Standard Fare';
};

const getBaggageInfo = (segment) => {
  if (!segment || !segment.includedCheckedBags) {
    return 'Baggage info not available';
  }

  const baggage = segment.includedCheckedBags;

  if (baggage.quantity === 0) {
    return 'No checked bags included';
  } else if (baggage.weight) {
    return `Checked bag(s) included up to ${baggage.weight}${baggage.weightUnit}`;
  } else {
    return `Checked bag(s) included`;
  }
};

const hasCheckedBags = (pricing) => {
  return pricing.fareDetailsBySegment.some(segment => 
    segment.includedCheckedBags && segment.includedCheckedBags.quantity > 0
  );
};

const getAirlineWebsite = computed(() => {
  return getCarrier.value ? `https://www.${getCarrier.value.toLowerCase()}.com` : '#';
});

const selectTicket = () => {
  flightStore.setSelectedFlight(props.flight);
  router.push(`/flight-ticket-review/${props.flight.id}`);
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>