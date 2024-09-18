<template>
    <div id="tour-block-wrapper">
        <swiper :breakpoints="{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }" :spaceBetween="30" :rewind="true" :navigation="{ nextEl: '.tb-next', prevEl: '.tb-prev' }"
            :modules="modules" class="hotelSwiper">
            <swiper-slide v-for="(tour, index) in tours" :key="index">
                <div class="tour-block-item">
                    <div class="tour-block-img">
                        <img :src="tour.image" :alt="tour.name">
                    </div>
                    <div class="tour-block-content text-[#232323] text-[14px]">
                        <div class="tbc-row-1">
                            <div class="p-[8px] pl-0 truncate">
                                <span class="tbc-top-title">Tour name</span>
                                <div class="tour-block-title truncate">{{ tour.name }}</div>
                            </div>
                            <div class="p-[8px]">
                                <span class="tbc-top-title">Date</span>
                                <div class="tour-block-date">{{ tour.date }}</div>
                            </div>
                        </div>
                        <div class="tbc-row-2">
                            <span class="tbc-top-title">Descriptione</span>
                            <div class="tour-block-txt text-[16px]">{{ tour.desc }}</div>
                        </div>
                        <div class="tbc-row-3 text-[15px]">
                            <div class="p-[8px] pl-0 truncate">
                                <span class="tbc-top-title">Price</span>
                                <div class="tour-block-price pry-color truncate">${{ tour.price }}</div>
                            </div>
                            <div class="p-[8px] flex-div justify-between">
                                <div>
                                    <span class="tbc-top-title">Status</span>
                                    <div class="tour-block-price text-[#996F00]">{{ tour.status }}</div>
                                </div>
                                <img src="@/assets/images/information.svg" alt="info-icon" class="info-icon">
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <!-- Custom navigation icons -->
        <div class="custom-slider-nav-wrapper">
            <div class="csn-pagination"></div>
            <div class="csn-navigation flex-div gap-[27px]">
                <div class="custom-nav-icon custom-prev pry-bg tb-prev">
                    <img src="~/assets/images/arrow-left.svg" alt="prev">
                </div>
                <div class="custom-nav-icon custom-next pry-bg tb-next">
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
            tours: [
                {
                    image: "/places/waterfall.jpg",
                    name: "Nairobi Waterfall",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    price: 500,
                    date: "05 OCT 2023",
                    status: "Booked"
                },
                {
                    image: "/places/nairobi.jpg",
                    name: "Nairobi Waterfall",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    price: 350,
                    date: "15 OCT 2023",
                    status: "Open"
                },
                {
                    image: "/places/zanzibar.jpg",
                    name: "Conrad Maldives Conrad Maldives",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    price: 700,
                    date: "05 NOV 2023",
                    status: "Booked"
                },
                {
                    image: "/places/egypt.jpg",
                    name: "Nairobi Waterfall",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    price: 350,
                    date: "15 OCT 2023",
                    status: "Open"
                },
                {
                    image: "/places/eko-hotel.jpg",
                    name: "Nairobi Waterfall",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    price: 350,
                    date: "15 OCT 2023",
                    status: "Open"
                },
                
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

<style></style>