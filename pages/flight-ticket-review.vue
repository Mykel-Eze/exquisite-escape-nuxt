<template>
    <div class="ticket-review-page pt-[100px] pb-[80px]">
        <div class="row">
            <div class="container">
                <div class="review-top-side">
                    <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                        <span class="text-white">Choose flight from Lagos to London </span>
                        <img src="@/assets/images/chevron-right.svg" alt="chevron-right" class="right-arr">
                        <span class="text-[#9d9d9d]">Review your trip</span>
                    </div>
                    <div class="text-[18px] text-[#606161] leading-[26px] flex-div gap-[10px]">
                        <img src="@/assets/images/check-circle.svg" alt="check-circle">
                        <span>
                            Nice job! You picked one of our best value flights. Book now so you don’t miss out on this
                            price.
                        </span>
                    </div>
                </div>

                <div class="review-content-side">
                    <div class="ticket-summary-side flex flex-col gap-[20px]">
                        <div class="ticket-summary-block">
                            <div class="flex items-start gap-[10px]">
                                <img src="@/assets/images/calendar.svg" alt="calendar-icon">
                                <div class="flex flex-col gap-[5px]">
                                    <div class="bold-txt text-[15px]">
                                        Stay flexible with no charge fees
                                    </div>
                                    <div class="text-[14px]">
                                        We recommend booking a flight with no change fees in case your plans change.
                                    </div>
                                    <nuxt-link to="/search-results/flights" class="pry-color underline text-[14px]">
                                        Change flights
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="flex items-start gap-[10px]">
                                <img src="@/assets/images/check-2.svg" alt="check-2">
                                <div class="flex flex-col gap-[5px]">
                                    <div class="bold-txt text-[15px]">
                                        No change fees for all flights
                                    </div>
                                    <div class="text-[14px]">
                                        You can change these flights without paying a fee if plans change. Because
                                        flexibility matters.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="tsb-top-side text-[14px]">
                                <div class="text-[24px]">Lagos to London</div>
                                <div class="mt-2">1:00pm - 10:23am (26h 23m ∙ 1 stop)</div>
                                <div class="flex-div gap-[10px] my-2">
                                    <img src="/icons/qatar.svg" alt="qatar" class="w-[30px]">
                                    <span>Delta • Fri, Oct 20</span>
                                </div>
                                <div class="flex">
                                    <TicketLabels label="average-co" />
                                </div>

                                <div class="show-more-wrapper-2 flex-div gap-[6px] pry-color mt-[30px]">
                                    <span>Show more</span>
                                    <img src="@/assets/images/caret-down-green.svg" alt="caret-down-green">
                                </div>
                            </div>
                            <div class="tsb-bottom-side">
                                <div class="text-[18px] mb-1">Your fare: Basic Economy</div>
                                <div class="flex-div gap-[10px] text-[14px]">
                                    <img src="@/assets/images/tag.svg" alt="tag" class="w-[24px]">
                                    <span>Upgrade for $60 to get seat choice and no change fees.</span>
                                </div>
                                <div class="upgarde-btn-wrapper mt-[30px]">
                                    <button class="upgrade-btn">See upgrade options</button>
                                </div>
                            </div>
                        </div>

                        <!--=== When No Seats are Selected ===-->
                        <!-- <div class="ticket-summary-block">
                            <div class="text-[18px]">Seats</div>
                            <div class="flex-div gap-[10px] my-[10px]">
                                <img src="@/assets/images/x-close.svg" alt="x-close" class="w-[20px]">
                                <span class="text-[14px]">Seat choice not available</span>
                            </div>
                            <div class="text-[14px]">Fare upgrade required to choose your seat.</div>
                            <div class="upgarde-btn-wrapper mt-[30px]">
                                <button class="upgrade-btn">See upgrade options</button>
                            </div>
                        </div> -->

                        <!--=== When a Seat is Selected ===-->
                        <div class="ticket-summary-block">
                            <div class="text-[18px]">Seats</div>
                            <div class="flex-div gap-[10px] my-[10px]">
                                <img src="@/assets/images/check.svg" alt="check" class="w-[20px]">
                                <span class="text-[14px]">Seat choice Included</span>
                            </div>
                            <div class="text-[14px]">
                                <div class="bold-txt text-[16px] mb-1">Traveler 1: Adult</div>
                                <div class="flex-div text-[#848484] mb-1">
                                    <span>LOS to LHR</span>
                                    <span>Seat 34F</span>
                                </div>
                                <div class="flex-div text-[#848484] mb-1">
                                    <span>ATL to YYZ</span>
                                    <span>Seat 16C</span>
                                </div>
                            </div>
                            <div class="upgarde-btn-wrapper mt-[30px]">
                                <button class="upgrade-btn" @click="showPopup = true">See upgrade options</button>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="text-[18px]">Bags</div>
                            <div class="flex-div gap-[10px] text-[14px] my-[5px]">
                                <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green">
                                <span>Carry-on bag included</span>
                            </div>
                            <div class="flex-div gap-[10px] text-[14px] my-[5px]">
                                <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green">
                                <span>1st checked bag included</span>
                            </div>
                            <div class="text-[14px]">
                                Additional bags for this flight must be purchased through the airline after booking.
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
                                        <span>₦1,000,006.90</span>
                                    </li>
                                    <li class="flex-div justify-between">
                                        <span>Flight</span>
                                        <span>₦20,740.00</span>
                                    </li>
                                    <li class="flex-div justify-between">
                                        <span>Taxes and fees</span>
                                        <span>₦10,436.90</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="px-[20px] py-[10px]">
                                <div class="flex-div justify-between text-[20px] mb-1">
                                    <span>Traveler 1: Adult</span>
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

                        <div class="free-cancellation-block flex items-start gap-[10px]">
                            <img src="@/assets/images/clock-circle.svg" alt="clock-circle">
                            <div>
                                <div class="bold-txt text-[16px]">Free cancellation</div>
                                <div class="text-[14px] leading-[22px]">
                                    There's no fee to cancel within 24 hours of booking.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ChooseSeatsPopup :class="{ open: showPopup }" @close-popup="showPopup = false" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FlightTIcketReview",
    data() {
        return {
            showPopup: false
        }
    }
}
</script>

<style>

</style>