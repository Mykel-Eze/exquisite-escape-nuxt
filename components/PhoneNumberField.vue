<template>
    <div class="phone-field-div" :class="divClass">
        <label for="phone-field">
            {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
        </label>

        <vue-tel-input 
            v-model="phoneNumber"
            @input="updateValue"
            @country-changed="onCountryChange" 
            :inputOptions="{
                id: 'phone-field',
                showDialCode: true,
            }" 
        />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

export default {
    name: 'PhoneNumberField',
    components: {
        VueTelInput,
    },
    props: {
        modelValue: {
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
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const phoneNumber = ref(props.modelValue);
        const countryCode = ref('');

        watch(() => props.modelValue, (newValue) => {
            phoneNumber.value = newValue;
        });

        const updateValue = (formattedNumber, phoneObject) => {
            if (typeof formattedNumber === 'string') {
                emit('update:modelValue', formattedNumber);
            } else if (formattedNumber && formattedNumber.number) {
                emit('update:modelValue', formattedNumber.number);
            }
        };

        const onCountryChange = (country) => {
            countryCode.value = country.dialCode;
        };

        return {
            phoneNumber,
            updateValue,
            onCountryChange
        };
    }
}
</script>