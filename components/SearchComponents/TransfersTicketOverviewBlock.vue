<template>
    <div class="tickets-overview-wrapper mt-[30px]">
        <div class="ticket-overview-block" v-for="ticket in TransfersTicketOverviewData" :key="ticket.id">
            <div class="left-side">
                <div class="ticket-labels-wrapper flex-div gap-[18px]">
                    <TicketLabels v-for="label in ticket.topLabels" :key="label" :label="label" />
                </div>

                <div class="ticket-overview-content">
                    <div class="tc-row-wrapper">
                        <div class="toc-row flex-div gap-[15px] w-full no-wrap">
                            <div class="transfers-ticket-img-wrapper">
                                <img :src="ticket.picture" :alt="ticket.name">
                            </div>
                            <div class="overflow-hidden">
                                <div class="ticket-name truncate mb-2">{{ ticket.name }}</div>
                                <div class="flex flex-col gap-[6px]">
                                    <div class="flex-div gap-[10px]">
                                        <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                                        <span>{{ ticket.pickup }}</span>
                                    </div>
                                    <div class="flex-div gap-[10px]">
                                        <img src="@/assets/images/ticket-flag.svg" alt="ticket-flag">
                                        <span>{{ ticket.dropoff }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ticket-labels-wrapper flex-div gap-[10px]">
                    <div class="ticket-labels flex-div tl-2 bg-[#FADBD7] text-[#892C21]">
                        <img src="@/assets/images/nest_cam_indoor.svg" alt="ticket-label-icon"
                            class="ticket-label-icon">
                        <span>Door to door service</span>
                    </div>
                    <div class="ticket-labels flex-div tl-2 bg-[#AEDDC2] text-[#1C472F]">
                        <img src="@/assets/images/time-green.svg" alt="ticket-label-icon" class="ticket-label-icon">
                        <span>
                            Waiting time - <b>Customer ∙ 0 mins</b>
                        </span>
                    </div>
                    <div class="ticket-labels flex-div tl-2 bg-[#DAF0E3] text-[#1D125A]">
                        <img src="@/assets/images/time-blue.svg" alt="ticket-label-icon" class="ticket-label-icon">
                        <span>
                            Waiting time - <b>Supplier</b> ∙ Domestic ∙ <b>75 mins</b>
                        </span>
                    </div>
                </div>

                <button class="ticket-details-btn flex-div gap-[10px]">
                    <span>See more details</span>
                    <img src="@/assets/images/receipt.svg" alt="receipt">
                </button>
            </div>
            <div class="right-side rel min-h-[200px]">
                <div class="ticket-left-label">
                    <TicketLabels label="round-trip" />
                </div>

                <div class="ticket-amount-wrapper">
                    <div class="ticket-amount">₦{{ formatNumber(ticket.price) }}</div>

                    <div class="view-ticket-btn-wrapper w-full">
                        <button class="view-ticket-btn flex-div" @click="$emit('view-ticket-clicked')">
                            <span>View {{ ticket.tickets }} ticket(s)</span>
                            <img src="@/assets/images/chevy-right.svg" alt="right arrow">
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
import { TransfersTicketOverviewData } from '~/data/TransfersTicketOverviewData.js'

export default {
    name: "TransfersTicketOverviewBlock",
    data() {
        return {
            TransfersTicketOverviewData
        }
    },
    methods: {
        formatNumber(num) {
            return num.toLocaleString();
        }
    }
}
</script>
