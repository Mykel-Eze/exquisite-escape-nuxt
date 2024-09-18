<template>
    <div class="ticket-overview-block">
        <div class="left-side">
            <!-- <div class="ticket-labels-wrapper flex-div gap-[18px]">
                <TicketLabels v-for="label in ticket.topLabels" :key="label" :label="label" />
            </div> -->

            <div class="ticket-overview-content">
                <div class="tc-row-wrapper my-[50px]">
                    <div class="toc-row flex-div gap-[15px] w-full no-wrap">
                        <div class="transfers-ticket-img-wrapper">
                            <img :src="ticketPicture" :alt="ticketName" class="max-w-[120px]">
                        </div>
                        <div class="overflow-hidden">
                            <div class="ticket-name truncate mb-2">{{ ticketName }}</div>
                            <div class="flex flex-col gap-[6px]">
                                <div class="flex-div gap-[10px]">
                                    <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                                    <span>{{ ticketPickup }}</span>
                                </div>
                                <div class="flex-div gap-[10px]">
                                    <img src="@/assets/images/ticket-flag.svg" alt="ticket-flag">
                                    <span>{{ ticketDropoff }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <button class="ticket-details-btn flex-div gap-[10px]">
                <span>See more details</span>
                <img src="@/assets/images/receipt.svg" alt="receipt">
            </button> -->
        </div>
        <div class="right-side rel min-h-[200px]">
            <div class="barcode-wrapper center">
                <img :src="barcode" alt="barcode" class="barcode w-[200px] m-auto">
                <span class="barcode-codes text-[8px] text-[#606161]">{{ code }}</span>
            </div>

            <div class="cup-curves up-curve"></div>
            <div class="cup-curves down-curve"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransferPackagePreview",
    props: {
        ticketName: {
            type: String,
            default: "",
        },
        ticketPicture: {
            type: String,
            default: "",
        },
        ticketPickup: {
            type: String,
            default: "",
        },
        ticketDropoff: {
            type: String,
            default: "",
        },
        barcode: {
            type: String,
            default: "",
        },
        code: {
            type: String,
            default: "",
        },
    }
}
</script>

<style>

</style>