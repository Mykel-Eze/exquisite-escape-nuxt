<template>
    <div class="payments-block">
        <div class="payment-block-details">
            <div>
                <div>Merchant</div>
                <span class="text-[#6F6F6F] text-[12px]">{{ merchant }}</span>
            </div>
            <div>
                <div>Email</div>
                <span class="text-[#6F6F6F] text-[12px]">{{ email }}</span>
            </div>
        </div>
        <div class="delete-btn-wrapper">
            <button class="delete-btn">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentsBlock",
    props: {
        merchant: String,
        email: String,
    },
}
</script>

<style>

</style>