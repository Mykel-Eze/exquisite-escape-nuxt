<template>
  <section id="flight-stops">
    <div class="container">
      <div class="rel max-w-full">
        <swiper
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1440: { slidesPerView: 6 },
          }"
          :spaceBetween="15"
          :navigation="{ nextEl: '.fs-next', prevEl: '.fs-prev' }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide>
            <div class="stop-title-block center">
              <div class="sb-top-side"></div>
              <ul class="sb-contents">
                <li>Non Stop</li>
                <li>1 Stop</li>
                <li>2+ Stops</li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide v-for="(airline, index) in flightsByAirline" :key="index">
            <div class="stop-block center">
              <div class="sb-top-side">
                <img :src="getAirlineLogo(airline.code)" alt="airline logo">
                <div>{{ airline.name }}</div>
              </div>
              <ul class="sb-contents">
                <li>{{ formatNumber(airline.prices.nonStop) }}</li>
                <li>{{ formatNumber(airline.prices.oneStop) }}</li>
                <li>{{ formatNumber(airline.prices.multiStop) }}</li>
              </ul>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Custom navigation icons -->
        <div class="custom-nav-icon custom-prev fs-prev"> 
          <img src="~/assets/images/arrow-left.svg" alt="prev">
        </div>
        <div class="custom-nav-icon custom-next fs-next"> 
          <img src="~/assets/images/arrow-right.svg" alt="next">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { computed } from 'vue';

export default {
  name: "FlightsStops",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    flights: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const flightsByAirline = computed(() => {
      const airlines = {};
      props.flights.forEach(flight => {
        const airline = flight.validatingAirlineCodes[0];
        if (!airlines[airline]) {
          airlines[airline] = {
            code: airline,
            name: flight.itineraries[0].segments[0].carrierCode,
            prices: {
              nonStop: Infinity,
              oneStop: Infinity,
              multiStop: Infinity,
            },
          };
        }
        const stops = flight.itineraries[0].segments.length - 1;
        const price = parseFloat(flight.price.total);
        if (stops === 0 && price < airlines[airline].prices.nonStop) {
          airlines[airline].prices.nonStop = price;
        } else if (stops === 1 && price < airlines[airline].prices.oneStop) {
          airlines[airline].prices.oneStop = price;
        } else if (stops > 1 && price < airlines[airline].prices.multiStop) {
          airlines[airline].prices.multiStop = price;
        }
      });
      return Object.values(airlines);
    });

    return {
      modules: [Navigation],
      flightsByAirline,
    };
  },
  methods: {
    formatNumber(num) {
      if (num === Infinity) {
        return '-'; // Return an empty string instead of 'N/A'
      }
      return `₦${num.toLocaleString()}`;
    },
    getAirlineLogo(airlineCode) {
      return `/images/airlines/${airlineCode.toLowerCase()}.png`;
    },
  },
};
</script>