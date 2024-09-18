<template>
    <div class="rel mt-[50px]">
        <swiper
            :slidesPerView="'auto'"
            :centeredSlides="true"
            :spaceBetween="30"
            :rewind="true"
            :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
            :modules="modules"
            class="flightsSwiper tickets-overview-wrapper"
        >
            <swiper-slide class="max-w-[650px]" v-for="ticket in DashboardFlightsData" :key="ticket.id">
                <div class="ticket-overview-block">
                    <div class="left-side">
                        <div class="ticket-labels-wrapper flex-div gap-[18px]">
                            <div class="ticket-labels flex-div">
                                <img src="@/assets/images/calendar2.svg" alt="ticket-label-icon" class="ticket-label-icon">
                                <span>{{ ticket.date }}</span>
                            </div>
                            <div class="ticket-labels capitalize" :class="ticket.status">
                                {{ ticket.status }}
                            </div>
                        </div>

                        <div class="ticket-overview-content">
                            <div class="tc-row-wrapper">
                                <div class="toc-row flex-div gap-5 w-full" v-for="detail in ticket.travelDetails" :key="detail.airlineName">
                                    <div class="ticket-airline">
                                        <img :src="detail.airlineLogo" :alt="detail.airlineName">
                                        <span>{{ detail.airlineName }}</span>
                                    </div>

                                    <div class="ticket-from-to flex-div">
                                        <div class="ticket-from">
                                            <div class="ticket-time">{{ detail.departure.time }}</div>
                                            <div class="ticket-state-code">{{ detail.departure.code }}</div>
                                            <div class="ticket-state">{{ detail.departure.location }}</div>
                                        </div>
                                        <div class="from-to-divider">
                                            <SvgIcons icon="flight_2" />
                                            <div class="text-[7px]">
                                                Flight duration {{ ticket.flightDuration }}
                                            </div>
                                        </div>
                                        <div class="ticket-to">
                                            <div class="ticket-time">{{ detail.arrival.time }}</div>
                                            <div class="ticket-state-code">{{ detail.arrival.code }}</div>
                                            <div class="ticket-state">{{ detail.arrival.location }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="toc-row flex-div justify-between text-[#606161]">
                                    <div class="other-flight-details">
                                        <div class="ofd-title text-[12px]">Confirmation number</div>
                                        <div class="ofd-detail text-[18px] text-black">{{ ticket.confirmationNumber }}</div>
                                        <div class="ofd-sub-detail text-[8px] uppercase">{{ ticket.name }}</div>
                                    </div>
                                    <div class="other-flight-details">
                                        <div class="ofd-title text-[12px]">Flights</div>
                                        <div class="ofd-detail text-[18px] text-black">{{ ticket.flightType }}</div>
                                        <div class="ofd-sub-detail text-[8px]">{{ ticket.seat }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right-side rel min-h-[200px]">
                        <div class="barcode-wrapper center">
                            <img :src="ticket.barcode" alt="barcode" class="barcode w-[200px] m-auto">
                            <span class="barcode-codes text-[8px] text-[#606161]">{{ ticket.code }}</span>
                        </div>

                        <div class="cup-curves up-curve"></div>
                        <div class="cup-curves down-curve"></div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>

        <!-- Custom navigation icons -->
        <div class="flight-nav-wrapper mt-[30px]">
            <div class="csn-navigation flex-div gap-[27px] justify-end">
                <div class="custom-nav-icon custom-prev pry-bg"> 
                    <img src="~/assets/images/arrow-left.svg" alt="prev">
                </div>
                <div class="custom-nav-icon custom-next pry-bg"> 
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
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

import { DashboardFlightsData } from '~/data/DashboardFlightsData.js'

export default {
    name: "DashboardFlights",
    data() {
        return {
            DashboardFlightsData
        }
    },
    setup() {
        return {
            modules: [ Navigation ],
        };
    },
    props: {},
    methods: {}
}
</script>

<style scoped></style>