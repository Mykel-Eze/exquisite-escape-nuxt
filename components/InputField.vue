<template>
    <div class="input-field-div" :class="divClass">
        <label :for="id">
            {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
        </label>
        <input 
          :type="type"
          :name="id" 
          :id="id" 
          :placeholder="placeholder" 
          :class="inputClass" 
          :value="value"
          @input="updateValue"
        />
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        id: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        inputClass: {
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
        value: {
            type: String,
            default: ""
        },
        requiredSign: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>

<style></style>
