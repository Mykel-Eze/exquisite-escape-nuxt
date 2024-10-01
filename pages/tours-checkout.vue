<template>
    <div class="flight-checkout-page pt-[100px] pb-[80px]">
        <div class="row">
            <div class="container">
                <div class="review-top-side">
                    <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                        <span class="text-white">Secure booking - only takes a few minutes! </span>
                        <img src="@/assets/images/check-circle-2.svg" alt="check-circle" class="right-arr">
                        <span class="text-[#9d9d9d]">Checkout</span>
                    </div>
                    <div class="text-[18px] text-[#606161] mt-[30px]">
                        <h1 class="text-[52px] m-[-2px]">Hello,</h1>
                        <div class="text-[24px]">Who's travelling</div>
                        <div class="mt-[10px] text-[18px]">Traveler names must match government-issued photo ID exactly.
                        </div>
                    </div>
                </div>

                <div class="review-content-side">
                    <form action="#" class="ticket-summary-side flex flex-col gap-[20px]">
                        <div class="ticket-summary-block grid-div-2">
                            <InputField label="First name" divClass="checkout-inp-field-block" id="first-name"
                                inputClass="checkout-inp-field" type="text" placeholder="John" :requiredSign="true" />
                            <InputField label="Middle name" divClass="checkout-inp-field-block" id="middle-name"
                                inputClass="checkout-inp-field" type="text" placeholder="Tom" />
                            <InputField label="Last name" divClass="checkout-inp-field-block" id="last-name"
                                inputClass="checkout-inp-field" type="text" placeholder="Doe" :requiredSign="true" />
                            <RadioField :options="[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                ]" divClass_2="flex-div gap-[20px]" inputName="gender" mainLabel="Gender"
                                :requiredSign="true" />
                        </div>

                        <div class="ticket-summary-block">
                            <div class="tsb-inp-wrapper grid-div-2">
                                <div>
                                    <PhoneNumberField label="Phone number" :requiredSign="true" v_model="phone" />
                                    <span class="text-[14px] text-[#848484]">
                                        You will receive text alerts about this trip
                                    </span>
                                </div>
                                <div>
                                    <InputField label="Email" :requiredSign="true" type="email" id="email"
                                        placeholder="johndoe@company.com" divClass="checkout-inp-field-block"
                                        inputClass="checkout-inp-field" />
                                    <span class="text-[14px] text-[#848484]">
                                        You will receive mail alerts about this trip
                                    </span>
                                </div>
                                <DatePickerField label="Date of birth" :requiredSign="true" placeholder="dd/mm/yyyy"
                                    divClass="checkout-inp-field-block" id="dob" />
                                <SelectField :options="[
                                        { value: 'Nigeria Immigration Service', label: 'Nigeria Immigration Service' },
                                        { value: 'US Department of State', label: 'US Department of State' },
                                        { value: 'UK Passport Office', label: 'UK Passport Office' }
                                    ]" label="Passport issuing authority" modelValue="passportAuthority"
                                    id="passportAuthority" :requiredSign="true" />
                                <InputField label="Passport number" :requiredSign="true" type="text"
                                    id="passport-number" placeholder="Passport number"
                                    divClass="checkout-inp-field-block" inputClass="checkout-inp-field" />
                                <DatePickerField label="Passport expiry date" :requiredSign="true"
                                    placeholder="dd/mm/yyyy" divClass="checkout-inp-field-block"
                                    id="passport-expiry-date" />
                                <SelectField :options="[
                                        { value: 'Nigeria', label: 'Nigeria' },
                                        { value: 'USA', label: 'USA' },
                                        { value: 'UK', label: 'UK' }
                                    ]" label="Nationality" modelValue="nationality" id="nationality"
                                    :requiredSign="true" />
                            </div>
                            <div class="tsb-seats-wrapper text-[14px] text-[#848484]">
                                <div class="tsb-seats-title text-[18px] text-[#606161]">Transfer time</div>
                                <div class="flex flex-col gap-[5px] mt-[6px]">
                                    <div class="flex-div gap-[70px]">
                                        <span>Arrival time</span>
                                        <span>01:00 H</span>
                                    </div>
                                    <div class="flex-div gap-[70px]">
                                        <span>Pick up time</span>
                                        <span>01:30 H</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ticket-summary-block">
                            <div class="mb-[20px]">Membership Card Number / Promo Code</div>
                            <div class="grid-div-2">
                                <InputField label="Enter discount promo code" divClass="checkout-inp-field-block"
                                    id="discount-promo-code" inputClass="checkout-inp-field" type="text"
                                    placeholder="" />
                                <InputField label="Enter corporate code" divClass="checkout-inp-field-block"
                                    id="corporate-code" inputClass="checkout-inp-field" type="text" placeholder="" />
                            </div>
                        </div>

                        <div class="ticket-summary-block text-[#848484] text-[14px]">
                            <div class="text-[24px] text-[#606161]">Review and book your trip</div>
                            <div class="flex-div gap-[18px] py-3">
                                <img src="@/assets/images/check.svg" alt="check" />
                                <span>
                                    Free cancellation within <span class="pry-color">24 hours of booking!</span>
                                </span>
                            </div>
                            <ol class="list-decimal">
                                <li>
                                    Review your trip details to make sure the dates and times are correct.
                                </li>
                                <li>
                                    Check your spelling. Flight passenger names must match government-issued photo ID
                                    exactly.
                                </li>
                                <li>
                                    Review the terms of your booking:
                                </li>
                            </ol>
                            <ul class="list-disc">
                                <li>
                                    We understand that sometimes plans change. We do not charge a cancel or change
                                    fee. When the airline charges such fees in accordance with its own policies, the
                                    cost will be passed on to you.
                                </li>
                                <li>
                                    Tickets are nonrefundable and nontransferable. Itinerary changes are permitted, fee
                                    may apply.
                                </li>
                                <li>
                                    Please read the <a href="#" class="pry-color">complete penalty rules for changes and
                                        cancellations or charter contract ↗.</a>
                                </li>
                                <li>
                                    Please read important information regarding <a href="#" class="pry-color">airline
                                        liability limitations ↗</a>.
                                </li>
                                <li>
                                    Prices may not include baggage fees or other fees charged directly by the airline.
                                </li>
                            </ul>

                            <div class="mt-[30px]">
                                <label for="agree-to-terms">
                                    <input type="checkbox" id="agree-to-terms" v-model="selectedCustomers"
                                        class="filled-in">
                                    <span>
                                        By clicking on the button below, I acknowledge that I have reviewed the <a
                                            href="#" class="pry-color">Privacy
                                            Statement ↗</a> and <a href="#" class="pry-color">Government Travel
                                            Advice↗</a> and have reviewed and accept the above
                                        <a href="#" class="pry-color">Rules & Restrictions and Terms of Use ↗</a>.
                                    </span>
                                </label>
                            </div>

                            <div class="complete-booking-btn-wrapper mt-[15px]">
                                <button class="complete-booking-btn">Complete Booking</button>
                            </div>
                        </div>
                    </form>
                    <div class="ticket-price-summary-side">
                        <div class="tpsss-block">
                            <div class="tpss-block-header">
                                <div class="tpss-title truncate">Palace and Gardens of Versailles</div>
                                <span>1 Rue de la legion d’Honneur Paris</span>
                            </div>

                            <div class="tpss-block-body">
                                <div class="tpss-body-item">
                                    <div class="tpss-title">Traveller: 2 Adults, 1 Infant</div>
                                    <div class="flex-div">
                                        <div>Sun, Mar 10, 2024 </div>
                                    </div>

                                    <div class="flex flex-col gap-1 mt-2">
                                        <div class="flex-div gap-[10px]">
                                            <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green" />
                                            <span>
                                                <span class="pry-color">2</span> Adults
                                            </span>
                                        </div>
                                        <div class="flex-div gap-[10px]">
                                            <img src="@/assets/images/arrow-right-green.svg" alt="arrow-right-green" />
                                            <span>
                                                <span class="pry-color">1</span> Infant
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="tpss-block-footer">
                                <div class="tpss-title">Your price summary</div>
                                <div class="text-right">Total: $150</div>

                                <div class="tpss-footer-total flex-div justify-between">
                                    <div class="flex-div gap-[10px]">
                                        <span>Traveler: 3 People</span>
                                        <img src="@/assets/images/direction-down.svg" alt="icon">
                                    </div>
                                    <b>₦75,500</b>
                                </div>
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
    name: "FlightCheckoutPage",
    
}
</script>

<style>

</style>