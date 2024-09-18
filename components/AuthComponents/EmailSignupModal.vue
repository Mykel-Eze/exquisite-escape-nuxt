<template>
    <div id="email-signup-modal" class="modal form-modal">
        <div class="modal-header relative px-[24px] my-5">
            <h3 class="sm-bold-txt center black-text text-[30px]">Sign Up</h3>
            <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal">
        </div>
        <div class="modal-content">
            <form @submit.prevent="" class="modal-form">
                <div class="name-fields-wrapper grid grid-cols-2 gap-3">
                    <InputField
                        label="First Name"
                        placeholder="First Name"
                        id="first_name"
                        type="text"
                        inputClass="inp-field"
                        divClass="input-wrapper"
                        v-model="first_name"
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Last Name"
                        id="last_name"
                        type="text"
                        inputClass="inp-field"
                        divClass="input-wrapper"
                        v-model="last_name"
                    />
                </div>
                <InputField
                    label="Email"
                    placeholder="Email"
                    id="email"
                    type="email"
                    inputClass="inp-field"
                    divClass="input-wrapper"
                    v-model="email"
                />

                <div class="relative">
                    <PasswordField
                        v-model="password"
                        id="password"
                        label="Password"
                        placeholder="Enter your Password"
                        @input="validatePassword"
                    />
                    <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                </div>

                <div class="text-[12px] my-5">
                    By selecting Agree and continue, I agree to Exquisite Escape’s 
                    <NuxtLink to="#" class="pry-color">Terms of Service</NuxtLink>,
                    <NuxtLink to="#" class="pry-color">Payments Terms of Service</NuxtLink>, and <NuxtLink to="#" class="pry-color">Non-discrimination Policy</NuxtLink>
                    and acknowledge the <NuxtLink to="#" class="pry-color">Privacy Policy</NuxtLink>.
                </div>

                <div class="submit-btn-wrapper">
                    <button class="submit-btn" @click="signUpWithEmail">Sign Up</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
// import { useAuth } from '~/composables/auth/useAuth';

// const auth = useAuth();
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const passwordError = ref('');

const validatePassword = () => {
    if (password.length < 8) {
        passwordError = 'Password must be at least 8 characters long';
    } else if (!/\d/.test(this.newPassword)) {
        passwordError = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword)) {
        passwordError = 'Password must contain at least one special character';
    } else {
        passwordError = '';
    }
};

const signUpWithEmail = async () => {
  try {
    await auth.signup({ email: email.value, password: password.value });
    // Handle successful signup (e.g., show verification message)
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
</script>

<style>

</style>