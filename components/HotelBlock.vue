<template>
    <div id="hotel-block-wrapper">
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
            :navigation="{ nextEl: '.hb-next', prevEl: '.hb-prev' }" 
            :modules="modules"
            class="hotelSwiper"
        >
            <swiper-slide v-for="(hotel, index) in hotels" :key="index">
                <div class="hotel-block-item">
                    <div class="hotel-block-img">
                        <img :src="hotel.image" :alt="hotel.name">
                    </div>
                    <div class="hotel-block-content">
                        <div class="hotel-block-title">{{ hotel.name }}</div>
                        <div class="hotel-block-txt">{{ hotel.desc }}</div>
                        <div class="hotel-block-price">${{ hotel.price }} night</div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <!-- Custom navigation icons -->
        <div class="custom-slider-nav-wrapper">
            <div class="csn-pagination"></div>
            <div class="csn-navigation flex-div gap-[27px]">
                <div class="custom-nav-icon custom-prev pry-bg hb-prev">
                    <img src="~/assets/images/arrow-left.svg" alt="prev">
                </div>
                <div class="custom-nav-icon custom-next pry-bg hb-next">
                    <img src="~/assets/images/arrow-right.svg" alt="next">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default {
    name: "HotelBlock",
    data() {
        return {
            hotels: [
                {
                    image: "/places/eko-hotel.jpg",
                    name: "Eko Hotel $ Suite",
                    desc: "Eko Hotels & Suites is the most preferred hotel in West Africa, and it is all about the right mix! Located in the heart of Victoria Island, we offer our clients",
                    price: 100
                },
                {
                    image: "/places/egypt.jpg",
                    name: "Eko Hotel $ Suite",
                    desc: "Eko Hotels & Suites is the most preferred hotel in West Africa, and it is all about the right mix! Located in the heart of Victoria Island, we offer our clients",
                    price: 200
                },
                {
                    image: "/places/dubai.jpg",
                    name: "Eko Hotel $ Suite",
                    desc: "Eko Hotels & Suites is the most preferred hotel in West Africa, and it is all about the right mix! Located in the heart of Victoria Island, we offer our clients",
                    price: 120
                },
                {
                    image: "/places/seychelles.jpg",
                    name: "Eko Hotel $ Suite",
                    desc: "Eko Hotels & Suites is the most preferred hotel in West Africa, and it is all about the right mix! Located in the heart of Victoria Island, we offer our clients",
                    price: 300
                },
                {
                    image: "/places/zanzibar.jpg",
                    name: "Eko Hotel $ Suite",
                    desc: "Eko Hotels & Suites is the most preferred hotel in West Africa, and it is all about the right mix! Located in the heart of Victoria Island, we offer our clients",
                    price: 1000
                }
            ]
        }
    },
    setup() {
        return {
            modules: [ Navigation ],
        };
    },
}
</script>

<style>

</style>