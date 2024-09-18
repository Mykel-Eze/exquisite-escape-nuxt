<template>
    <section id="sort-flights">
        <div class="sort-bar">
            <div class="container flex-div">
                <span class="text-[18px]">Sort By</span>
                <ul class="flex-div sort-tabs-wrapper">
                    <li class="active">
                        <span>All Flights</span>
                    </li>
                    <li>
                        <span>Cheapest</span>
                    </li>
                    <li>
                        <span>Fastest</span>
                    </li>
                    <li>
                        <span>Recommended</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="container">
            <FlightTicketOverviewBlock @view-ticket-clicked="$emit('view-ticket-clicked')" />

            <div class="other-tickets-header my-[20px] text-[24px] text-[#141414]">Other tickets vailable </div>

            <div class="other-tickets-overview-wrapper my-[30px]">
                <FlightTicketOverviewBlock @view-ticket-clicked="$emit('view-ticket-clicked')" />

                <div class="show-more-wrapper mt-[50px]">
                    <button class="show-more-btn flex-div gap-2">
                        <span>Show More</span> 
                        <img src="@/assets/images/caret-down-white.svg" alt="caret">
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "SortFlights"
}
</script>

<style>

</style>