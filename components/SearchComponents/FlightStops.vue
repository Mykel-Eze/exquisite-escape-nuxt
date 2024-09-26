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
          <swiper-slide v-for="(carrier, index) in flightsByCarrier" :key="index">
            <div class="stop-block center">
              <div class="sb-top-side">
                <div class="carrier-logo-wrapper">
                    <img :src="getCarrierLogo(carrier.code)" alt="carrier logo">
                </div>
                <div class="capitalize">{{ carrier.name }}</div>
              </div>
              <ul class="sb-contents">
                <li class="">{{ formatNumber(carrier.prices.nonStop) }}</li>
                <li class="">{{ formatNumber(carrier.prices.oneStop) }}</li>
                <li class="">{{ formatNumber(carrier.prices.multiStop) }}</li>
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
    dictionaries: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const flightsByCarrier = computed(() => {
      const carriers = {};
      props.flights.forEach(flight => {
        const carrierCode = flight.itineraries[0].segments[0].carrierCode;
        if (!carriers[carrierCode]) {
          carriers[carrierCode] = {
            code: carrierCode,
            name: props.dictionaries.carriers[carrierCode] || carrierCode,
            prices: {
              nonStop: Infinity,
              oneStop: Infinity,
              multiStop: Infinity,
            },
          };
        }
        const stops = flight.itineraries[0].segments.length - 1;
        const price = parseFloat(flight.price.total);
        if (stops === 0 && price < carriers[carrierCode].prices.nonStop) {
          carriers[carrierCode].prices.nonStop = price;
        } else if (stops === 1 && price < carriers[carrierCode].prices.oneStop) {
          carriers[carrierCode].prices.oneStop = price;
        } else if (stops > 1 && price < carriers[carrierCode].prices.multiStop) {
          carriers[carrierCode].prices.multiStop = price;
        }
      });
      return Object.values(carriers);
    });

    return {
      modules: [Navigation],
      flightsByCarrier,
    };
  },
  methods: {
    formatNumber(num) {
      if (num === Infinity) {
        return '-';
      }
      return `₦${num.toLocaleString()}`;
    },
    getCarrierLogo(carrierCode) {
    //   return `/images/carriers/${carrierCode.toLowerCase()}.png`;
    return `http://pics.avs.io/200/200/${carrierCode}.png`
    },
  },
};
</script>

<style scoped>
.carrier-logo-wrapper {
    width: 45px;
    height: 45px;
    position: relative;
    margin: auto;
}
.carrier-logo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
}
</style>