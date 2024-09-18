<template>
    <div id="payments-page" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/payments', text: 'Payments' },
                    ]" />
                    <h2 class="dashboard-page-title">Payments</h2>
                    <p class="dashboard-page-title-desc">
                        Keep track of all your payments and refunds.
                    </p>
                </div>

                <div class="add-payment-wrapper mt-[60px]">
                    <button class="add-payment-btn flex-div">
                        <img src="@/assets/images/plus.svg" alt="plus" class="plus-ico">
                        <span>Add payment method</span>
                    </button>
                </div>

                <hr class="dashboard-page-divider" />

                <div class="payments-wrapper">
                    <PaymentItem merchant="Stripe" email="Keh******@gmail.com" />
                    <PaymentItem merchant="Paypal" email="Keh******@gmail.com" />
                    <PaymentItem merchant="Paystack" email="Keh******@gmail.com" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileInfoPage",
    layout: "authLayout",
    data() {
        return {}
    }
}
</script>

<style></style>