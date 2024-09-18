<template>
    <div class="tickets-overview-wrapper mt-[30px]">
        <div class="ticket-overview-block" v-for="ticket in FlightTicketOverviewData" :key="ticket.id">
            <div class="left-side">
                <div class="ticket-labels-wrapper flex-div gap-[18px]">
                    <TicketLabels v-for="label in ticket.topLabels" :key="label" :label="label" :daysLeft="ticket.daysLeft" />
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
                                    <div>
                                        <span>{{ ticket.travelLength }}</span> ∙ <span>{{ ticket.stops.join(' ') }}</span>
                                    </div>
                                </div>
                                <div class="ticket-to">
                                    <div class="ticket-time">{{ detail.arrival.time }}</div>
                                    <div class="ticket-state-code">{{ detail.arrival.code }}</div>
                                    <div class="ticket-state">{{ detail.arrival.location }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ticket-labels-wrapper flex-div gap-[10px]">
                    <TicketLabels v-for="label in ticket.bottomLabels" :key="label" :label="label" />
                </div>
            </div>
            <div class="right-side rel min-h-[200px]">
                <div class="ticket-left-label" v-if="ticket.ticketsLeft < 10">
                    <TicketLabels label="tickets-left" :ticketsLeft="ticket.ticketsLeft" />
                </div>
                
                <div class="ticket-amount-wrapper">
                    <div class="ticket-amount">₦{{ ticket.ticketPrice }}</div>

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
import { FlightTicketOverviewData } from '~/data/FlightTicketOverviewData.js'

export default {
    name: "FlightTicketOverviewBlock",
    data() {
        return {
            FlightTicketOverviewData
        }
    },
}
</script>
