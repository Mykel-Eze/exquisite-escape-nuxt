<template>
    <div class="ticket-review-page pt-[100px] pb-[80px]">
        <div class="row">
            <div class="container">
                <div class="review-top-side">
                    <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                        <span class="text-white">Palace and Gardens of Versailles </span>
                        <img src="@/assets/images/chevron-right.svg" alt="chevron-right" class="right-arr">
                        <span class="text-[#9d9d9d]">Review your trip</span>
                    </div>
                    <div class="text-[18px] text-[#606161] leading-[26px] flex-div gap-[10px]">
                        <img src="@/assets/images/check-circle.svg" alt="check-circle">
                        <span>
                            Nice job! You picked one of our best value tour. Book now so you don’t miss out on this price.
                        </span>
                    </div>
                </div>

                <div class="review-content-side">
                    <div class="ticket-summary-side flex flex-col gap-[20px]">
                        <div class="ticket-summary-block">
                            <div class="text-[14px]">
                                <div class="text-[24px]">Palace and Gardens of Versailles</div>
                                <div class="flex-div gap-[10px] my-2">
                                    <img src="@/assets/images/location.svg" alt="location" class="w-[24px]">
                                    <span>1 Rue de la legion d’Honneur Paris</span>
                                </div>
                                <div class="flex gap-[10px]">
                                    <div class="ticket-labels flex-div">
                                        <span>Art & Culture</span>
                                    </div>
                                    <div class="ticket-labels flex-div">
                                        <img src="@/assets/images/round.svg" alt="ticket-label-icon" class="ticket-label-icon">
                                        <span>Free Cancellation until 19/03/2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="flex items-start gap-[10px]">
                                <img src="@/assets/images/calendar.svg" alt="calendar-icon">
                                <div class="flex flex-col gap-[5px]">
                                    <div class="bold-txt text-[15px]"> Sun, Mar 10, 2024 </div>
                                    <div class="flex-div gap-[10px] mb-3 mt-1">
                                        <div class="flex-div gap-[10px]">
                                            <img src="@/assets/images/check-3.svg" alt="check-icon" class="check-icon">
                                            <span>
                                                <span class="pry-color">2</span> Adults
                                            </span>
                                        </div>
                                        <div class="flex-div gap-[10px]">
                                            <img src="@/assets/images/check-3.svg" alt="check-icon" class="check-icon">
                                            <span>Language: English</span>
                                        </div>
                                    </div>
                                    <nuxt-link to="/search-results/flights" class="pry-color underline text-[14px]">
                                        Change date
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="tsb-top-side text-[14px]">
                                <div class="text-[24px]">Cancellation fee</div>
                                <div class="flex-div gap-[10px] my-2">
                                    After 23:59 on 19/03/2024: <b class="pry-color">₦13,000.00 </b>
                                </div>
                                
                                <div class="text-[24px] mt-[30px]">Remarks</div>
                                <div class="remarks-items-wrapper flex-div gap-[10px] my-3">
                                    <div class="remarks-item flex-div gap-[10px]">
                                        <img src="@/assets/images/time1.svg" alt="time">
                                        <span>45 min. Estimated activity time</span>
                                        <img src="@/assets/images/remove.svg" alt="remove">
                                    </div>
                                    <div class="remarks-item flex-div gap-[10px]">
                                        <img src="@/assets/images/bag-2.svg" alt="bag">
                                        <span>1 bag allowed</span>
                                        <img src="@/assets/images/remove.svg" alt="remove">
                                    </div>
                                    <div class="remarks-item flex-div gap-[10px]">
                                        <img src="@/assets/images/user.svg" alt="user">
                                        <span>Ticket valid for one traveller</span>
                                        <img src="@/assets/images/remove.svg" alt="remove">
                                    </div>
                                </div>
                                <div class="text-[#848484] text-[14px]">
                                    If the incorrect details are provided, the provider will not be held
                                    responsible for the correct service provision and you may be subject to
                                    cancellation / no-show-fees
                                </div>
                            </div>
                            <div class="tsb-bottom-side">
                                <div class="text-[18px] mt-5">Best Available Rate</div>
                                <div class="flex-div gap-[10px] my-[10px]">
                                    <img src="@/assets/images/badge-percent.svg" alt="badge-percent" class="w-[24px]">
                                    <span class="text-[14px]">
                                        This rate does not allow any changes. You must cancel the existing booking
                                        and issue a new one. Cancellation fees may apply according to the rate
                                        conditions.
                                    </span>
                                </div>

                                <div class="mt-[30px]">
                                    <button class="addmore-btn flex-div gap-[6px] text-[14px]">
                                        <img src="@/assets/images/plus-circle2.svg" alt="plus-circle2" class="">
                                        <span>Add more</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ticket-price-summary-side">
                        <div class="price-summary-block">
                            <div class="psb px-[20px] py-[10px]">
                                <div class="price-summary-block-title text-[22px]">Price summary</div>
                                <ul class="price-summary-list text-[14px] text-[#848484]">
                                    <li class="flex-div justify-between">
                                        <span>Traveler 1: Adult</span>
                                        <span>₦65,000.00</span>
                                    </li>
                                    <li class="flex-div justify-between">
                                        <span>Taxes and fees</span>
                                        <span>₦10,500.00</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-[20px] py-[10px]">
                                <div class="flex-div justify-between text-[20px] mb-1">
                                    <span>Traveler 1: Adult</span>
                                    <span>₦75,500.000</span>
                                </div>
                                <div class="text-[14px] text-[#848484]">Rates are quoted in NG Naira</div>
                            </div>

                            <div class="summary-checkout-btn-wrapper px-[20px] py-[14px]">
                                <nuxt-link to="/flight-checkout">
                                    <button class="summary-checkout-btn">Checkout</button>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToursTIcketReview",

    setup(){}
}
</script>

<style>

</style>