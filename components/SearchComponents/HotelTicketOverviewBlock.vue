<template>
    <div class="tickets-overview-wrapper mt-[30px]">
        <div class="ticket-overview-block" v-for="ticket in HotelTicketOverviewData" :key="ticket.id">
            <div class="left-side">
                <div class="ticket-labels-wrapper flex-div gap-[18px]">
                    <TicketLabels v-for="label in ticket.topLabels" :key="label" :label="label" />
                </div>

                <div class="ticket-overview-content">
                    <div class="tc-row-wrapper">
                        <div class="toc-row flex-div gap-[15px] w-full no-wrap">
                            <div class="hotel-ticket-img-wrapper">
                                <img :src="ticket.picture" :alt="ticket.name">
                            </div>
                            <div class="overflow-hidden">
                                <div class="ticket-name truncate">{{ ticket.name }}</div>
                                <div class="flex-div gap-[10px] text-[14px]">
                                    <img src="@/assets/images/bed.svg" alt="bed" class="bed-icon">
                                    <span class="bb-label">BB</span>
                                    <span>Superior 1 king, double pullout sofa </span>
                                </div>
                                <div class="rating-stars-wrapper flex-div gap-[10]">
                                    <img v-for="star in ticket.stars" :key="star" src="@/assets/images/star.svg" alt="star" class="rating-star">
                                </div>
                                <div>
                                    <div class="flex-div gap-[10px]">
                                        <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                                        <span>{{ ticket.location }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ticket-labels-wrapper flex-div gap-[10px] min-h-[130px]">
                    <TicketLabels v-for="label in ticket.bottomLabels" :key="label" :label="label" />

                    <div class="tripadvisor-label ticket-labels flex-div gap-[10]">
                        <img src="@/assets/images/tripadvisor.svg" alt="tripadvisor" class="tripadvisor-icon">
                        <div class="ta-stars flex-div gap-[10]">
                            <img v-for="star in ticket.tripAdvisorRating" :key="star" src="@/assets/images/star.svg" alt="star" class="rating-star">
                            <img v-for="star in (5 - ticket.tripAdvisorRating)" :key="star+'-empty'" src="@/assets/images/empty-star.svg" alt="star" class="rating-star">
                        </div>
                        <span>(0 Reviews)</span>
                    </div>
                </div>
            </div>
            <div class="right-side rel min-h-[200px]">
                <!-- <div class="ticket-left-label">
                    <TicketLabels label="tickets-left" :ticketsLeft="ticket.ticketsLeft" />
                </div> -->

                <div class="ticket-amount-wrapper">
                    <div class="ticket-labels flex-div tl-2 bg-[#E5F6F5] text-[#00A79D] mb-[30px]">
                        <img src="@/assets/images/filled-radial.svg" alt="ticket-label-icon" class="ticket-label-icon">
                        <span>2/5 Excellent (0 Reviews)</span>
                    </div>

                    <div class="compare-ticket flex-div gap-[10px] text-[16px]">
                        <img src="@/assets/images/compare.svg" alt="compare">
                        <span>Compare Hotel</span>
                    </div>

                    <div class="ticket-amount">₦{{ formatNumber(ticket.price) }}</div>

                    <div class="view-ticket-btn-wrapper vtbw-vertical w-full">
                        <button class="view-ticket-btn flex-div pry-btn" @click="$emit('view-ticket-clicked')">
                            <span>View hotel</span>
                            <img src="@/assets/images/chevy-right.svg" alt="right arrow">
                        </button>
                        <button class="view-ticket-btn flex-div">
                            <span>Make Payment</span>
                            <img src="@/assets/images/chevy-right.svg" alt="right arrow">
                        </button>
                        <button class="view-ticket-btn flex-div sec-btn">
                            <span>More price & boards (50)</span>
                            <img src="@/assets/images/direction-down-black.svg" alt="down arrow">
                        </button>
                    </div>
                </div>
                <div class="cup-curves up-curve"></div>
                <div class="cup-curves down-curve"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { HotelTicketOverviewData } from '~/data/HotelTicketOverviewData.js'

export default {
    name: "HotelTicketOverviewBlock",
    data() {
        return {
            HotelTicketOverviewData
        }
    },
    methods: {
        formatNumber(num) {
            return num.toLocaleString();
        }
    }
}
</script>
