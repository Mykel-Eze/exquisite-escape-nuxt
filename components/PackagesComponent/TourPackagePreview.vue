<template>
    <div class="ticket-overview-block">
        <div class="left-side">
            <div class="ticket-overview-content">
                <div class="tc-row-wrapper my-[50px]">
                    <div class="toc-row flex-div gap-[15px] w-full no-wrap">
                        <div class="hotel-ticket-img-wrapper">
                            <img :src="ticketPicture" :alt="ticketName">
                        </div>
                        <div class="overflow-hidden">
                            <div class="ticket-name truncate mb-2">{{ ticketName }}</div>
                            <div class="flex flex-col gap-[6px]">
                                <div class="flex-div gap-[10px]">
                                    <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                                    <span>{{ ticketLocation }}</span>
                                </div>
                            </div>
                            <div class="ticket-labels flex-div mt-2" style="width: max-content;">
                                {{ ticketTag }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    name: "TourPackagePreview",
    props: {
        ticketName: {
            type: String,
            default: "",
        },
        ticketPicture: {
            type: String,
            default: "",
        },
        ticketLocation: {
            type: String,
            default: "",
        },
        ticketTag: {
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