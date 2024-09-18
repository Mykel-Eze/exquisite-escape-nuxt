<template>
  <section id="affiliate-testimonies">
    <div class="row">
        <div class="container">
            <div class="section-header text-center max-w-[553px] mx-auto">
                <h3 class="section-title text-[40px]">Happy customers always have something to say</h3>
            </div>

            <div class="rel mt-[50px]">
                <swiper
                    :breakpoints="{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }"
                    :spaceBetween="30"
                    :rewind="true"
                    :pagination="{ el: '.csn-pagination' }"
                    :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
                    :modules="modules"
                    class="testimoniesSwiper"
                >
                    <swiper-slide v-for="(testimony, index) in AffiliateTestimoniesData" :key="index">
                        <div class="testimony-block">
                            <div class="testimony-block-header">
                                <div class="testifier-avatar">{{ getInitials(testimony.testifierName) }}</div>
                                <div class="testifier-other-details">
                                    <div class="testifier-name text-[18px] text-black">{{ testimony.testifierName }}</div>
                                    <div class="testifier-company text-[12px]">{{ testimony.testifierCompany }}</div>
                                </div>
                            </div>
                            <div class="testimony-txt">{{ testimony.testimonyText }}</div>
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Custom navigation icons -->
                <div class="custom-slider-nav-wrapper">
                    <div class="csn-pagination"></div>
                    <div class="csn-navigation flex-div gap-[27px]">
                        <div class="custom-nav-icon custom-prev pry-bg"> 
                            <img src="~/assets/images/arrow-left.svg" alt="prev">
                        </div>
                        <div class="custom-nav-icon custom-next pry-bg"> 
                            <img src="~/assets/images/arrow-right.svg" alt="next">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

import { AffiliateTestimoniesData } from '@/data/AffiliateTestimoniesData.js';

export default {
    name: "AffiliateTestimoniesSection",
    data() {
        return {
            AffiliateTestimoniesData,
        };
    },
    setup() {
        return {
            modules: [ Navigation, Pagination ],
        };
    },
    methods: {
        getInitials(name) {
            return name.split(' ').map(part => part[ 0 ]).join('').toUpperCase();
        }
    }
}
</script>

<style>

</style>