<template>
    <section id="sort-hotels">
        <div class="sort-bar mt-[40px]">
            <div class="container flex-div">
                <span class="text-[18px]">Sort By</span>
                <ul class="flex-div sort-tabs-wrapper">
                    <li class="active">
                        <span>All Hotels</span>
                    </li>
                    <li>
                        <span>Suggested</span>
                    </li>
                    <li>
                        <span>Cheapest</span>
                    </li>
                    <li>
                        <span>Best review</span>
                    </li>
                    <li>
                        <span>Top Hotels</span>
                    </li>
                    <li>
                        <span>Motels</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="other-tickets-overview-wrapper">
                <HotelTicketOverviewBlock @view-ticket-clicked="$emit('view-ticket-clicked')" />

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