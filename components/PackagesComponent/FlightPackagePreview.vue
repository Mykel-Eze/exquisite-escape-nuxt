<template>
    <div class="ticket-overview-block">
        <div class="left-side">
            <div class="ticket-labels-wrapper flex-div gap-[18px]">
                <div class="ticket-labels flex-div">
                    <img src="@/assets/images/calendar2.svg" alt="ticket-label-icon" class="ticket-label-icon">
                    <span>{{ ticketDate }}</span>
                </div>
                <div class="ticket-labels capitalize" :class="ticketStatus">
                    {{ ticketStatus }}
                </div>
            </div>

            <div class="ticket-overview-content">
                <div class="tc-row-wrapper">
                    <div class="toc-row flex-div gap-5 w-full">
                        <div class="ticket-airline">
                            <img :src="airlineLogo" :alt="airlineName">
                            <span>{{ airlineName }}</span>
                        </div>

                        <div class="ticket-from-to flex-div">
                            <div class="ticket-from">
                                <div class="ticket-time">{{ departureTime }}</div>
                                <div class="ticket-state-code">{{ departureCode }}</div>
                                <div class="ticket-state">{{ departureLocation }}</div>
                            </div>
                            <div class="from-to-divider">
                                <SvgIcons icon="flight_2" />
                                <div class="text-[7px]">
                                    Flight duration {{ flightDuration }}
                                </div>
                            </div>
                            <div class="ticket-to">
                                <div class="ticket-time">{{ arrivalTime }}</div>
                                <div class="ticket-state-code">{{ arrivalCode }}</div>
                                <div class="ticket-state">{{ arrivalLocation }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="toc-row flex-div justify-between text-[#606161]">
                        <div class="other-flight-details">
                            <div class="ofd-title text-[12px]">Confirmation number</div>
                            <div class="ofd-detail text-[18px] text-black">{{ confirmationNumber }}</div>
                            <div class="ofd-sub-detail text-[8px] uppercase">{{ name }}</div>
                        </div>
                        <div class="other-flight-details">
                            <div class="ofd-title text-[12px]">Flights</div>
                            <div class="ofd-detail text-[18px] text-black">{{ flightType }}</div>
                            <div class="ofd-sub-detail text-[8px]">{{ seat }}</div>
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
    name: "FlightPackagePreview",
    props: {
        name: {
            type: String,
            default: "",
        },
        ticketDate: {
            type: String,
            default: "",
        },
        ticketStatus: {
            type: String,
            default: "",
        },
        airlineName: {
            type: String,
            default: "",
        },
        airlineLogo: {
            type: String,
            default: "",
        },
        departureTime: {
            type: String,
            default: "",
        },
        departureCode: {
            type: String,
            default: "",
        },
        departureLocation: {
            type: String,
            default: "",
        },
        flightDuration: {
            type: String,
            default: "",
        },
        arrivalTime: {
            type: String,
            default: "",
        },
        arrivalCode: {
            type: String,
            default: "",
        },
        arrivalLocation: {
            type: String,
            default: "",
        },
        confirmationNumber: {
            type: String,
            default: "",
        },
        flightType: {
            type: String,
            default: "",
        },
        seat: {
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