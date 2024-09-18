<template>
    <div :class="[
        'preview-item-block',
        { 'closed-preview': !moreDetails }
    ]">
        <div class="preview-item-header pointer flex-div justify-between mb-[22px]" @click="showMoreDetails()">
            <div class="flex-div gap-[26px]">
                <span class="preview-item-title text-[#0A0A0A] text-[24px] smbold-txt">{{ previewItemTitle }}</span>
                <span>&#10230;</span>
                <span class="preview-value pry-color truncate">{{ previewValue }}</span>
            </div>

            <img src="@/assets/images/caret-down-green.svg" alt="caret" class="caret-icon">
        </div>

        <div class="preview-item-wrapper mb-[22px]" v-if="moreDetails">
            <slot></slot>
        </div>

        <div class="preview-item-footer">
            <div class="preview-item-price">₦{{ formatNumber(previewItemPrice) }}</div>

            <div class="flex-div justify-between mt-[22px]" v-if="moreDetails">
                <button class="view-preview-info">view {{ previewItemTitle.toLowerCase() }} information</button>
                <button class="edit-preview-btn flex-div gap-[10px]">
                    <span>Edit</span>
                    <img src="@/assets/images/icons/edit.svg" alt="edit" class="edit-icon">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PreviewItemWrapper",
    props: {
        previewItemTitle: {
            type: String,
            default: "",
        },
        previewValue: {
            type: String,
            default: "",
        },
        previewItemPrice: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            moreDetails: false
        }
    },
    methods: {
        formatNumber(num) {
            if (typeof num !== 'number' || isNaN(num)) {
                return '0';
            }
            return num.toLocaleString();
        },

        showMoreDetails () {
            this.moreDetails = !this.moreDetails;
        }
    }
}
</script>