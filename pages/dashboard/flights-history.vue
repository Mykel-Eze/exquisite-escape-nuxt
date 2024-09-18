<template>
  <div id="flights-history-page" class="pt-[60px] pb-[40px]">
    <div class="row">
        <div class="container">
            <div class="dashboard-page-header">
                <Breadcrumb :items="[
                    { path: '/dashboard/account', text: 'Account' },
                    { path: '/dashboard/flights-history', text: 'Flights' },
                ]" />
                <h2 class="dashboard-page-title">Flights</h2>
                <p class="dashboard-page-title-desc">
                    Find a breakdown of flight history here
                </p>

                <div class="search-now-btn-wrapper mt-[26px]">
                    <button class="search-now-btn flex-div gap-2" @click="toggleSearch">
                        <span>Search now</span>
                        <img src="~/assets/images/search-icon-white.svg" alt="search-icon" class="search-icon">
                    </button>
                </div>
            </div>

            <div class="search-flight-wrapper my-[30px]" v-if="showSearchBlock">
                <flights />
            </div>

            <div class="flights-content-wrapper">
                <DashboardFlights />
            </div>

            <div id="flight-history" class="history-wrapper mt-[60px]">
                <h2 class="dashboard-page-title">Recent Flights</h2>
                <p class="dashboard-page-title-desc">
                    Find a breakdown of flight history here
                </p>

                <div class="history-table-wrapper">
                    <HistoryTable 
                        :data="flightsData"
                        :headers="['Booking Code', 'Status', 'Departure Date', 'Departure Time', 'Arrival Date', 'Arrival Time', 'Departure Airport', 'Arrival Airport', 'Booking Date']"
                        :statusOptions="['All', 'Upcoming', 'Past', 'Cancelled', 'Suspended']"
                        uniqueKey="bookingCode"
                    />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { FlightsHistoryData } from '~/data/FlightsHistoryData.js'
import flights from '../search-results/flights.vue';

export default {
    name: "DashboardFlights",
    components:{
        flights
    },
    data() {
        return {
            flightsData: FlightsHistoryData,
            showSearchBlock: false,
        }
    },
    methods: {
        toggleSearch() {
            this.showSearchBlock = !this.showSearchBlock;
        }
    }
}
</script>

<style>

</style>