<template>
    <section id="sort-transfers">
        <div class="container">
            <div class="other-tickets-overview-wrapper">
                <TransfersTicketOverviewBlock @view-ticket-clicked="$emit('view-ticket-clicked')" />

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
    name: "SortTransfers"
}
</script>

<style>

</style>