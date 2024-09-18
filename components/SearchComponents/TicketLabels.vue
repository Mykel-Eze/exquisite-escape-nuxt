<template>
    <!--=== Plian texts Labels ===-->
    <div v-if="label === 'cheapest'" class="ticket-labels bg-[#DAF0E3] text-[#1C472F]">
        Cheapest
    </div>
    <div v-if="label === 'time-saver'" class="ticket-labels bg-[#D4E2FC] text-[#102C60]">
        Time Saver
    </div>
    <div v-if="label === 'fastest'" class="ticket-labels bg-[#E5F6F5] text-[#00A79D]">
        Fastest
    </div>
    <div v-if="label === 'recommended'" class="ticket-labels bg-[#f9f9f9] text-[#141414]">
        Recommended
    </div>
    <div v-if="label === 'same-day'" class="ticket-labels bg-[rgba(63, 46, 177, 0.1)] text-[#3F2EB1]">
        Same day
    </div>
    <div v-if="label === 'days-after'" class="ticket-labels bg-[#FADBD7] text-[#5C1D16]">
        {{ daysLeft }} Day(s) after
    </div>
    <div v-if="label === 'rooms-left'" class="ticket-labels text-[#3F2EB1]"
        style="background-color: rgba(63, 46, 177, 0.1)">
        100 Rooms Left
    </div>
    <div v-if="label === 'exclusive'" class="ticket-labels text-[#3F2EB1]"
        style="background-color: rgba(63, 46, 177, 0.1)">
        Exclusive
    </div>
    <div v-if="label === 'skip-the-line'" class="ticket-labels text-[#3F2EB1]"
        style="background-color: rgba(63, 46, 177, 0.1)">
        Skip the line
    </div>

    <!--=== Labels with Icons ===-->
    <div v-if="label === 'tickets-left'" class="ticket-labels flex-div tl-2 bg-[#FADBD7] text-[#5C1D16]">
        <img src="@/assets/images/ticket.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>{{ ticketsLeft }} ticket(s) left</span>
    </div>

    <div v-if="label === 'one-way-per-traveller'" class="ticket-labels flex-div">
        <img src="@/assets/images/one.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>One way per traveller</span>
    </div>

    <div v-if="label === 'multi-city-per-traveller'" class="ticket-labels flex-div">
        <img src="@/assets/images/double-arr.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Mult-city per traveller</span>
    </div>

    <div v-if="label === 'round-trip-per-traveller'" class="ticket-labels flex-div">
        <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Round trip per traveller</span>
    </div>

    <div v-if="label === 'carry-one-bag'" class="ticket-labels flex-div">
        <img src="@/assets/images/bag.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Carry - one bag</span>
    </div>

    <div v-if="label === 'no-changes-fee'" class="ticket-labels flex-div">
        <img src="@/assets/images/recycle.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>No changes fee</span>
    </div>

    <div v-if="label === 'seat-choice-included'" class="ticket-labels flex-div">
        <img src="@/assets/images/seat.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Seat choice included</span>
    </div>

    <div v-if="label === 'average-co'" class="ticket-labels flex-div">
        <img src="@/assets/images/cloud.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Average CO<sub>2</sub></span>
    </div>

    <div v-if="label === 'sustainable'" class="ticket-labels flex-div">
        <img src="@/assets/images/sustainable.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Sustainable</span>
    </div>

    <div v-if="label === 'business'" class="ticket-labels flex-div">
        <img src="@/assets/images/business.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Business</span>
    </div>

    <div v-if="label === 'pet-friendly'" class="ticket-labels flex-div">
        <img src="@/assets/images/paw-print.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Pet Friendly</span>
    </div>

    <div v-if="label === 'design'" class="ticket-labels flex-div">
        <img src="@/assets/images/pen.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Design</span>
    </div>

    <div v-if="label === 'sport'" class="ticket-labels flex-div">
        <img src="@/assets/images/sport.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Sport</span>
    </div>

    <div v-if="label === 'spa'" class="ticket-labels flex-div">
        <img src="@/assets/images/spa.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Spa</span>
    </div>

    <div v-if="label === 'golf-hotel'" class="ticket-labels flex-div">
        <img src="@/assets/images/golf.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Golf Hotel</span>
    </div>

    <div v-if="label === 'charms'" class="ticket-labels flex-div">
        <img src="@/assets/images/charms.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Charms</span>
    </div>

    <div v-if="label === 'free-cancellation'" class="ticket-labels flex-div">
        <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Free cancellation 10/06/2023</span>
    </div>

    <div v-if="label === 'safe2stay'" class="ticket-labels flex-div tl-2 bg-[#DAF0E3] text-[#1C472F]">
        <img src="@/assets/images/safe2stay.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Safe2Stay</span>
    </div>

    <div v-if="label === 'services'" class="ticket-labels flex-div">
        <img src="@/assets/images/services.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Meet & greet Service - English </span>
    </div>

    <div v-if="label === 'round-trip'" class="ticket-labels flex-div">
        <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Round Trip</span>
    </div>

    <div v-if="label === 'bus-tickets'" class="ticket-labels flex-div">
        <img src="@/assets/images/pen.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Bus Tickets</span>
    </div>

    <div v-if="label === 'air-conditioned-transportation'" class="ticket-labels flex-div">
        <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Air-conditioned transportation</span>
    </div>

    <div v-if="label === 'guide'" class="ticket-labels flex-div">
        <img src="@/assets/images/golf.svg" alt="ticket-label-icon" class="ticket-label-icon">
        <span>Guide</span>
    </div>
</template>

<script>
export default {
    name: "TicketLabels",
    props: {
        label: {
            type: String,
            required: true,
        },
        daysLeft: {
            type: Number,
            required: false,
            default: 1
        },
        ticketsLeft: {
            type: Number,
            required: false,
            default: 1
        }
    },
}
</script>

<style>

</style>