<template>
    <div class="phone-field-div" :class="divClass">
        <label for="phone-field">
            {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
        </label>

        <vue-tel-input :v-model="v_model" :inputOptions="{
            id: 'phone-field',
            showDialCode: true,
        }" />
    </div>
</template>

<script>
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

export default {
    name: 'InputField',
    components: {
        VueTelInput,
    },
    props: {
        v_model: {
            type: String,
            default: ""
        },
        divClass: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        requiredSign: {
            type: Boolean,
            default: false
        },
    },
}
</script>

<style></style>