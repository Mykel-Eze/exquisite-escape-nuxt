<template>
    <section id="flight-stops">
        <div class="container">
            <div class="rel max-w-full">
                <swiper
                    :breakpoints="{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1440: {
                            slidesPerView: 6,
                        },
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
                    <swiper-slide v-for="(flightStop, index) in flightsStops" :key="index">
                        <div class="stop-block center">
                            <div class="sb-top-side">
                                <img :src="flightStop.logo" alt="airline logo">
                                <div>{{ flightStop.name }}</div>
                            </div>
                            <ul class="sb-contents">
                                <li>₦{{ formatNumber(flightStop.stop_0)}}</li>
                                <li>₦{{ formatNumber(flightStop.stop_1)}}</li>
                                <li>₦{{ formatNumber(flightStop.stop_2)}}</li>
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
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import { flightsStops } from '@/data/FlightsStopsData.js';

export default {
    name: "FlightsStops",
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        flightsStops,
      };
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },
    methods: {
        formatNumber(num) {
            return num.toLocaleString();
        }
    }
}
</script>

<style>

</style>