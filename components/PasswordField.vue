<template>
  <div class="input-field-div password-field rel" :class="divClass">
    <input
      :type="showPassword ? 'text' : 'password'"
      :name="id" 
      :id="id" 
      v-model="innerValue"
      :placeholder="placeholder"
      :required="required"
      ref="passwordInput"
      class="profile-inp-field"
    />
    <button @click="togglePasswordVisibility" type="button" class="show-password-btn">
      {{ showPassword ? 'Hide' : 'Show' }}
    </button>
  </div>
</template>

<script>
export default {
    name: 'PasswordField',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Enter password',
        },
        required: {
            type: Boolean,
            default: true,
        },
        id: {
            type: String,
            default: ""
        },
        divClass: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            showPassword: false,
            innerValue: this.modelValue,
        };
    },
    watch: {
        modelValue(newValue) {
            this.innerValue = newValue;
        },
        innerValue(newValue) {
            this.$emit('update:modelValue', newValue);
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            this.$nextTick(() => {
                const input = this.$refs.passwordInput;
                input.focus();
            });
        },
    },
};
</script>

<style scoped>
.password-field {
  display: flex;
  align-items: center;
}

input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button.show-password-btn {
    position: absolute;
    font-size: 13px;
    background: none;
    font-family: var(--font-smbold);
    top: 48%;
    transform: translateY(-50%);
    right: 20px;
    padding: 0;
}
</style>