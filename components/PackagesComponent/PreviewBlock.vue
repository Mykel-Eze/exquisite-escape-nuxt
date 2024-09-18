<template>
  <div class="preview-block-wrapper">
    <div class="preview-items-side">
        <PreviewItemWrapper
            previewItemTitle="Flight"
            previewValue="LOS - LHR"
            :previewItemPrice="4562000"
        >
            <!-- <h1>Preview</h1> -->
             <FlightPackagePreview 
                name="MR OLAMIDE IFEDOLAPO BISI OLAGUNJU"
                ticketDate="5 OCT 2023"
                ticketStatus="pending"
                airlineName="Qatar Airways"
                airlineLogo="/icons/qatar.svg"
                departureTime="02 OCT ∙ 3:10"
                departureCode="LAG"
                departureLocation="Lagos"
                flightDuration="17h 55m"
                arrivalTime="03 OCT ∙ 17:05"
                arrivalCode="LHR"
                arrivalLocation="London"
                confirmationNumber="FPOSQX"
                flightType="Economy"
                seat="Class S ∙ Seat(s) 17A"
                barcode="/barcode.svg"
                code="LOS-0712140848697-LHR"
             />
        </PreviewItemWrapper>

        <PreviewItemWrapper
            previewItemTitle="Tour"
            previewValue="Palace and Gardens of Versailles"
            :previewItemPrice="664000"
        >
             <TourPackagePreview
                ticketName="Palace and Gardens of Versailles" 
                ticketPicture="/places/zanzibar.jpg"
                ticketLocation="1 Rue de la legion d’Honneur Paris"
                ticketTag="Arts & Culture"
                barcode="/barcode.svg"
                code="LOS-0712140848697-LHR"
             />
        </PreviewItemWrapper>

        <PreviewItemWrapper
            previewItemTitle="Tour"
            previewValue="Private Premium - Minivan"
            :previewItemPrice="1064000"
        >
             <TransferPackagePreview
                ticketName="Private Premium - Minivan" 
                ticketPicture="/vehicles/vehicle-3.png"
                ticketPickup="1 Rue de la legion d’Honneur Paris"
                ticketDropoff="Arts & Culture"
                barcode="/barcode.svg"
                code="LOS-0712140848697-LHR"
             />
        </PreviewItemWrapper>

        <PreviewItemWrapper
            previewItemTitle="Hotel"
            previewValue="Novotel Ottawa City Centre"
            :previewItemPrice="3664000"
        >
             <HotelPackagePreview
                ticketName="Novotel Ottawa City Centre" 
                ticketPicture="/places/eko-hotel.jpg"
                ticketBedAbbr="BB"
                ticketBed="Superior 1 king, double pullout sofa"
                ticketLocation="Downtown ∙ Ottawa-ON"
                :ticketStars="5"
                barcode="/barcode.svg"
                code="LOS-0712140848697-LHR"
             />
        </PreviewItemWrapper>
    </div>
    
    <div class="price-summary-side">
        <div class="price-summary-block mb-[30px]">
            <div class="psb px-[20px] py-[10px]">
                <div class="price-summary-block-title text-[22px]">Price summary</div>
                <ul class="price-summary-list text-[14px] text-[#848484]">
                    <li class="flex-div justify-between">
                        <span>Flight</span>
                        <span>₦1,000,006.90</span>
                    </li>
                    <li class="flex-div justify-between">
                        <span>Tour</span>
                        <span>₦20,740.00</span>
                    </li>
                    <li class="flex-div justify-between">
                        <span>Transfer</span>
                        <span>₦10,436.90</span>
                    </li>
                    <li class="flex-div justify-between">
                        <span>Hotel</span>
                        <span>₦10,436.90</span>
                    </li>
                </ul>
            </div>
            <div class="px-[20px] py-[10px]">
                <div class="flex-div justify-between text-[20px] mb-1">
                    <span>Total</span>
                    <span>₦1,200,176.90</span>
                </div>
                <div class="text-[14px] text-[#848484]">Rates are quoted in NG Naira</div>
            </div>

            <div class="summary-checkout-btn-wrapper px-[20px] py-[14px]">
                <nuxt-link to="/flight-checkout">
                    <button class="summary-checkout-btn">Checkout</button>
                </nuxt-link>
            </div>
        </div>

        <div class="free-cancellation-block flex items-start gap-[10px] bg-[]">
            <img src="@/assets/images/information.svg" alt="information">
            <div>
                <div class="bold-txt text-[16px]">Note</div>
                <div class="text-[14px] leading-[22px]">
                    All prices are subject to change, please confirm prices before booking
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "PreviewBlock",
}
</script>

<style scoped>
.preview-item-header {
    font-family: var(--font-smbold);
    font-size: 16px;
}
.free-cancellation-block {
    background-color: #CCEDEB;
    border: 1px solid #EDEDED;
}
.preview-items-side {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>