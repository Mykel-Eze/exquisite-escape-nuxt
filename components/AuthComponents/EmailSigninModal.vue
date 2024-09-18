<template>
    <div id="email-signin-modal" class="modal form-modal">
        <div class="modal-header relative px-[24px] my-5">
            <h3 class="sm-bold-txt center black-text text-[30px]">Sign In</h3>
            <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal">
        </div>
        <div class="modal-content">
            <form @submit.prevent="" class="modal-form">
                <InputField
                    label="Email"
                    placeholder="Email"
                    id="email"
                    type="email"
                    inputClass="inp-field"
                    divClass="input-wrapper"
                    v-model="email"
                />

                <PasswordField
                    v-model="password"
                    id="password"
                    label="Password"
                    placeholder="Enter your Password"
                    @input="validatePassword"
                />

                <div class="submit-btn-wrapper mt-[30px]">
                    <button class="submit-btn" @click="signInWithEmail">Sign In</button>
                </div>
            </form>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
// import { useAuth } from '~/composables/auth/useAuth';

// const auth = useAuth();
const email = ref('');
const password = ref('');


const signInWithEmail = async () => {
  try {
    await auth.login(email.value, password.value);
    // Handle successful login (e.g., redirect to dashboard)
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style>

</style>