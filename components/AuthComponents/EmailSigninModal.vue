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

const signInWithEmail = async () => {
  try {
    const credentials = {
      email: email.value,
      password: password.value,
    };

    console.log('Credentials being sent:', credentials);

    await auth.login(credentials);
    closeModal('email-signin-modal');
    router.push('/dashboard/account');
  } catch (error) {
    // Error is handled in the composable
  }
};

const closeModal = (modalId) => {
  const modal = M.Modal.getInstance(document.getElementById(modalId));
  modal.close();
};
</script>