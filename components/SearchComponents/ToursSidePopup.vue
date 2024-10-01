<template>
    <div hidden>
        <div class="side-popup">
            <div class="side-popup-header">
                <div class="flex-div gap-2 mb-5">
                    <img src="@/assets/images/close-popup.svg" alt="close" class="close-popup-icon"
                        @click="$emit('close-popup')">
                    <span>Select tour</span>
                </div>

                <div class="top-ticket-details-wrapper text-[#606061]">
                    <div class="ttdr-ratings flex-div gap-[10px] text-[16px] mb-3">
                        <img src="@/assets/images/filled-radial.svg" alt="close" />
                        4.7 (0 Reviews)
                    </div>
                    <div class="ttdr-name-address">
                        <div class="text-[24px]">Palace and Gardens of Versailles</div>
                        <small class="text-[14px]">1 Rue de la legion d’Honneur Paris</small>
                    </div>
                </div>
            </div>

            <div class="tickets-wrapper cart-wrapper mt-[50px]">
                <div class="tickets-block">
                    <div class="tickets-top-side">
                        <div class="ticket-items-block cart-block">
                            <div class="ticket-amount-div">
                                <div class="flex-div justify-between">
                                    <h2 class="m-0">₦75,000</h2>

                                    <button class="delete-cart-btn">
                                        <img src="@/assets/images/trash.svg" alt="delete">
                                    </button>
                                </div>
                                <div class="tours-detail-title truncate">Palace and Gardens of Versailles</div>
                                <div class="tours-detail-address flex-div gap-3 mt-[5px] mb-[15px]">
                                    <img src="@/assets/images/location.svg" alt="location-icon" class="location-icon">
                                    <span class="text-[14px]">1 Rue de la legion d'Honneur Paris</span>
                                </div>
                                <div class="tours-detail-tag inline-block rounded-full px-3 py-1 text-sm mr-2">
                                    Art & Culture
                                </div>
                            </div>
                            <div class="ticket-item mt-3">
                                <div class="ticket-item-title">Traveller</div>
                                <div class="ticket-item-content flex-div gap-[10px]">
                                    <img src="@/assets/images/arrow-right-green.svg" alt="arror"
                                        class="ticket-item-icon w-[24px]">
                                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                                        <span class="text-[#606161]">
                                            <span class="pry-color">2</span> Adults
                                        </span>
                                    </div>
                                </div>
                                <div class="ticket-item-content flex-div gap-[10px]">
                                    <img src="@/assets/images/arrow-right-green.svg" alt="arror"
                                        class="ticket-item-icon w-[24px]">
                                    <div class="flex-div gap-[10px] text-[#9D9D9D]">
                                        <span class="text-[#606161]">
                                            <span class="pry-color">1</span> Child
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tickets-bottom-side">
                        <div class="flex-div justify-between">
                            <button class="flex-div gap-2 text-[14px] text-[#141414]">
                                <img src="@/assets/images/trash.svg" alt="" class="empty-icon w-[16px]">
                                <span>Empty clear selection</span>
                            </button>
                            <span>₦75,000</span>
                        </div>

                        <div class="select-ticket-btn-wrapper mt-5">
                            <NuxtLink to="/tours-ticket-review">
                                <button class="select-ticket-btn">Checkout</button>
                            </NuxtLink>

                            <div class="mt-5">
                                <button class="select-ticket-btn stb-2">Add more</button>
                            </div>
                        </div>

                        <div class="cup-curves left-curve"></div>
                        <div class="cup-curves right-curve"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="side-popup-overlay" @click="$emit('close-popup')"></div>
    </div>
</template>

<script>

export default {
    name: "ToursSidePopup",

    setup() {}
}
</script>

<style scoped src="@/assets/css/tours-modal.css"></style>