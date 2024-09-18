<template>
    <div class="packages-block-wrapper">
        <div class="tour-block-item" v-for="(packageItem, index) in packages" :key="index">
            <div class="tour-block-img">
                <img :src="packageItem.image" :alt="packageItem.name">
            </div>
            <div class="tour-block-content text-[#232323] text-[14px]">
                <div class="tbc-row-1">
                    <div class="p-[8px] pl-0 truncate">
                        <span class="tbc-top-title">Tour name</span>
                        <div class="tour-block-title truncate">{{ packageItem.name }}</div>
                    </div>
                    <div class="p-[8px]">
                        <span class="tbc-top-title">Status</span>
                        <div class="tour-block-date text-[#996F00]">{{ packageItem.status }}</div>
                    </div>
                </div>
                <div class="tbc-row-2">
                    <span class="tbc-top-title">Descriptione</span>
                    <div class="tour-block-txt text-[14px]">{{ packageItem.desc }}</div>
                </div>
                <div class="tbc-row-3 text-[14px]">
                    <div class="p-[8px] pl-0 truncate">
                        <span class="tbc-top-title">Cost</span>
                        <div class="tour-block-price pry-color truncate">${{ packageItem.cost }}</div>
                    </div>
                    <div class="p-[8px]">
                        <div>
                            <span class="tbc-top-title">Start date</span>
                            <div class="tour-block-price">{{ packageItem.startDate }}</div>
                        </div>
                    </div>
                    <div class="p-[8px] flex-div gap-[16px]">
                        <div>
                            <span class="tbc-top-title">End date</span>
                            <div class="tour-block-price">{{ packageItem.endDate }}</div>
                        </div>
                        <img src="@/assets/images/information.svg" alt="info-icon" class="info-icon w-[22px]">
                    </div>
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
    name: "PackagesBlock",
    data() {
        return {
            packages: [
                {
                    image: "/places/waterfall.jpg",
                    name: "2 weeks in Dubai",
                    status: "Booked",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    cost: 400,
                    startDate: "05 OCT 2023",
                    endDate: "05 NOV 2023"
                },
                {
                    image: "/places/nairobi.jpg",
                    name: "2 weeks in Dubai",
                    status: "Booked",
                    desc: "Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.",
                    cost: 400,
                    startDate: "05 OCT 2023",
                    endDate: "05 NOV 2023"
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

<style>

</style>