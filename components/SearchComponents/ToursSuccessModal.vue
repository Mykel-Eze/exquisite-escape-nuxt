<template>
    <div id="tours-success-modal" class="modal bg-blue-50 p-4 rounded-lg">
        
        <div class="modal-content">
            <div class="flex-div justify-between gap-[24px]">
                <div class="tours-success-title flex-div gap-[24px] text-[32px]">
                    <img src="@/assets/images/check_circle.svg" alt="check_circle" class="check_circle">
                    <span>Your tour activity was successfully added to cart</span>
                </div>

                <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal-2">
            </div>
                
            <div class="flex justify-end">
                <button @click="openCart" class="open-cart-btn flex-div justify-center gap-3 w-[176px] mt-6 modal-close">
                    <span>Open Cart</span>
                    <img src="@/assets/images/cart-check.svg" alt="cart-check">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped src="@/assets/css/tours-modal.css"></style>