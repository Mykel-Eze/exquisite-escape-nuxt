<template>
    <div id="affiliate-registeration-side" class="mb-[50px]">
        <div class="md:w-[90%]">
            <div class="section-header">
                <h3 class="section-title text-[36px] mt-0">Set up your affiliate account</h3>
                <p class="section-title-desc-2 text-[18px] mt-[20px]">
                    Join our fantastic affiliate program and start earning daily from our incredible deals on
                    flights, hotels, and travel reselling opportunities.
                </p>
            </div>
            <form action="#" id="affiliate-form">
                <div class="grid-block-2">
                    <InputField
                        label="First name"
                        divClass="aff-inp-field-block"
                        id="first_name"
                        inputClass="aff-inp-field"
                        type="text"
                        placeholder="First name"
                    />
                    <InputField
                        label="Last name"
                        divClass="aff-inp-field-block"
                        id="last_name"
                        inputClass="aff-inp-field"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <InputField
                    label="Company name"
                    divClass="aff-inp-field-block"
                    id="company_name"
                    inputClass="aff-inp-field"
                    type="text"
                    placeholder="Company name"
                />
                <InputField
                    label="Email"
                    divClass="aff-inp-field-block"
                    id="email"
                    inputClass="aff-inp-field"
                    type="email"
                    placeholder="Email"
                />
                <InputField
                    label="Phone number"
                    divClass="aff-inp-field-block"
                    id="phone-number"
                    inputClass="aff-inp-field"
                    type="tel"
                    placeholder="Phone number"
                />
                <div class="form-txt">
                    <label class="consent-checkbox">
                        <input type="checkbox" class="filled-in" name="consent" />
                        <span class="text-[16px] leading-[24px]">
                            By proceeding, I acknowledge that I have read and agreed to Exquisite Escape Flight
                            booking <NuxtLink class="pry-color underline">terms & conditions</NuxtLink>
                        </span>
                    </label>
                </div>
                <div class="submit-btn-wrapper mt-[38px]">
                    <button class="submit-btn" :disabled="!consent">Create account</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "AffiliateRegisterationSide",
    data: () => ({
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        phone_number: '',
        consent: true
    }),
}
</script>

<style>

</style>