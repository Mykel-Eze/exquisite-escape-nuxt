<template>
  <div id="email-signin-modal" class="modal form-modal">
    <div class="modal-header relative px-[24px] my-5">
      <h3 class="sm-bold-txt center black-text text-[30px]">Sign In</h3>
      <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal">
    </div>
    <div class="modal-content">
      <form @submit.prevent="signInWithEmail" class="modal-form">
        <InputField
          label="Email"
          placeholder="Email"
          id="email"
          type="email"
          inputClass="inp-field"
          divClass="input-wrapper"
          v-model="email"
          :required="true"
        />

        <PasswordField
          v-model="password"
          id="password"
          label="Password"
          placeholder="Enter your Password"
        />

        <div class="submit-btn-wrapper mt-[30px]">
            <button class="submit-btn" type="submit" :disabled="authStore.isLoggingIn">
                {{ authStore.isLoggingIn ? 'Signing In...' : 'Sign In' }}
            </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/auth/useAuth';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

// const handleSuccessfulAuth = () => {
//   const redirectPath = localStorage.getItem('authRedirectPath');
//   if (redirectPath) {
//     localStorage.removeItem('authRedirectPath');
//     router.push(redirectPath);
//   } else {
//     router.push('/dashboard/account');
//   }
// };

const signInWithEmail = async () => {
  try {
    const redirectPath = localStorage.getItem('authRedirectPath');
    
    const credentials = {
      email: email.value,
      password: password.value,
    };

    await auth.login(credentials);
    $toast.success('Login successful');
    closeModal('email-signin-modal');

    if (redirectPath) {
      localStorage.removeItem('authRedirectPath');
      router.push(redirectPath);
    } else {
      router.push('/dashboard/account');
    }
    
    // router.push('/dashboard/account');
  } catch (error) {
    let errorMessage = 'An error occurred during sign in. Please try again.';
    
    if (error.response && error.response._data && error.response._data.error) {
      if (Array.isArray(error.response._data.error) && error.response._data.error.length > 0) {
        errorMessage = error.response._data.error[0].message;
      } else if (typeof error.response._data.error === 'string') {
        errorMessage = error.response._data.error;
      }
    }

    // console.error('Signin error:', error.response._data.error[0].message);
    $toast.error(errorMessage);
  }
};

const closeModal = (modalId) => {
  const modal = M.Modal.getInstance(document.getElementById(modalId));
  modal.close();
};
</script>