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
      :value="modelValue"
      @input="updateValue"
      :required="required"
    />
    <p v-if="error" class="error-message">{{ error }}</p>
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
      default: "text"
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
    modelValue: {
      type: String,
      default: ""
    },
    requiredSign: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 12px;
    margin-top: -2px;
}
</style>