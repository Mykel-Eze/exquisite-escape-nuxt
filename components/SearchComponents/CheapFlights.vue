<template>
    <section id="cheap-flights">
        <div class="container">
            <div class="rel max-w-full">
                <swiper
                    :breakpoints="{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1440: {
                            slidesPerView: 4,
                        },
                    }"
                    :spaceBetween="15"
                    :navigation="{ nextEl: '.cf-next', prevEl: '.cf-prev' }"
                    :modules="modules"
                    class="mySwiper"
                >
                    <swiper-slide v-for="(flight, index) in cheapFlights" :key="index">
                        <div class="cheap-flight-block">
                            <div class="flex-div justify-between">
                                <span class="text-black">Date</span>
                                <span class="text-[#848484]">{{ flight.date }}</span>
                            </div>
                            <div class="flex-div justify-between">
                                <span class="text-black">Min. Price </span>
                                <span class="text-[#848484]">₦{{ formatNumber(flight.minPrice) }}</span>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Custom navigation icons -->
                <div class="custom-nav-icon custom-prev cf-prev"> 
                    <img src="~/assets/images/arrow-left.svg" alt="prev">
                </div>
                <div class="custom-nav-icon custom-next cf-next"> 
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

import { cheapFlights } from '@/data/CheapFlightsData.js';

export default {
    name: "CheapFlights",
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        cheapFlights,
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