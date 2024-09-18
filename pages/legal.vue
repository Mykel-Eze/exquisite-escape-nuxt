<template>
    <div class="container">
        <h2 class="text-dark-gray page-title text-center ls--128 mb-[30px]">
            Legal Agreement
        </h2>
        <div class="text-center flex flex-wrap justify-center gap-4 max-w-[843px] m-auto">
            <base-button :variant="termsObject.termsFlag === 'termsServiced' ? 'primary' : 'neutral'
                " class="rounded-lg" @click="termsHandler('termsServiced')">Terms of service</base-button>
            <base-button :variant="termsObject.termsFlag === 'privacyPolicy' ? 'primary' : 'neutral'
                " class="rounded-lg" @click="termsHandler('privacyPolicy')">Privacy policy</base-button>
            <base-button :variant="termsObject.termsFlag === 'termsCondition' ? 'primary' : 'neutral'
                " class="rounded-lg" @click="termsHandler('termsCondition')">Terms and conditions</base-button>
            <base-button :variant="termsObject.termsFlag === 'cookiesPolicy' ? 'primary' : 'neutral'
                " class="rounded-lg" @click="termsHandler('cookiesPolicy')">Cookies Policy</base-button>
            <base-button :variant="termsObject.termsFlag === 'exquisiteEscapeTermsService'
                    ? 'primary'
                    : 'neutral'
                " class="rounded-lg" @click="termsHandler('exquisiteEscapeTermsService')">Exquisite Escape terms of service -
                customer</base-button>
            <base-button :variant="termsObject.termsFlag === 'refundPolicy' ? 'primary' : 'neutral'
                " class="rounded-lg" @click="termsHandler('refundPolicy')">Refund policy</base-button>
            <base-button :variant="termsObject.termsFlag === 'exquisiteEscapeWebsite'
                    ? 'primary'
                    : 'neutral'
                " class="rounded-lg" @click="termsHandler('exquisiteEscapeWebsite')">Exquisite Escape website & dashboard terms
                of use</base-button>
        </div>
        <section>
            <div class="bg-cyan py-12 mt-16">
                <div class="container">
                    <privacy-policy />
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const termsObject = ref({
            termsFlag: "privacyPolicy",
            isLoading: false,
        });
        const termsHandler = (flag: string) => {
            termsObject.value.termsFlag = flag;
        };
        return {
            termsObject,
            termsHandler,
        };
    },
});
</script>
