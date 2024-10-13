<template>
    <div class="radio-field-div" :class="divClass">
        <div class="radio-main-label">
            <span>{{ mainLabel }}</span>
            <sup v-if="requiredSign" class="required-sign">*</sup>
        </div>
        <div class="divClass_2 flex-div gap-[20px]">
            <label v-for="option in options" :key="option.value">
                <input 
                    class="with-gap" 
                    :name="inputName" 
                    type="radio" 
                    :value="option.value" 
                    :required="required"
                    :checked="modelValue === option.value"
                    @change="$emit('update:modelValue', option.value)"
                />
                <span class="text-[16px] text-[#545454]">{{ option.label }}</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RadioField',
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: false
        },
        divClass: {
            type: String,
            required: false
        },
        divClass_2: {
            type: String,
            required: false
        },
        inputName: {
            type: String,
            required: false
        },
        mainLabel: {
            type: String,
            required: false
        },
        requiredSign: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue']
}
</script>