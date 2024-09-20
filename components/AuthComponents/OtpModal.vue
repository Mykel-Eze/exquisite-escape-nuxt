<template>
  <div id="otp-modal" class="modal form-modal otp-modal">
    <div class="modal-content">
      <div class="flex flex-col gap-[5px] mb-[20px] items-center">
        <img src="~/assets/images/featured-email-icon.png" alt="email-icon" class="featured-icon w-[48px]">
        <h4 class="title">Please check your email.</h4>
        <p class="subtitle">We've sent a code to {{ email }}</p>
      </div>
      
      <div class="otp-input">
        <input
          v-for="(digit, index) in otpDigits"
          :key="index"
          v-model="otpDigits[index]"
          type="text"
          maxlength="1"
          @input="onInput(index)"
          @keydown="onKeyDown($event, index)"
          ref="inputs"
        />
      </div>
      
      <p class="resend text-[14px]">
        Didn't get a code? 
        <a href="#" class="text-[#848484]" @click.prevent="resendCode" :class="{ 'disabled': authStore.isLoading }">
            <u class="bold-txt">{{ authStore.isLoading ? 'Resending...' : 'Click to resend' }}</u>
        </a>
      </p>
      
      <div class="actions">
        <button class="cancel modal-close" @click="cancel">Cancel</button>
        <button class="verify" @click="verify" :disabled="!isComplete || authStore.isVerifyingOTP">
            {{ authStore.isVerifyingOTP ? 'Verifying...' : 'Verify' }}
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '~/composables/auth/useAuth';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const auth = useAuth();
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const otpDigits = ref(['', '', '', '']);
const email = ref(''); // This should be passed as a prop or through a state management solution

const isComplete = computed(() => otpDigits.value.every(digit => digit !== ''));

const onInput = (index) => {
  if (otpDigits.value[index] && index < 3) {
    inputs.value[index + 1].focus();
  }
};

const onKeyDown = (event, index) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    inputs.value[index - 1].focus();
  }
};

const resendCode = async () => {
  if (!authStore.isLoading) {
    try {
      await auth.resendOTP(email.value);
    } catch (error) {
      // Error is handled in the composable
    }
  }
};

const cancel = () => {
  closeModal('otp-modal');
  openModal('email-signup-modal');
};

const verify = async () => {
  if (isComplete.value && !authStore.isVerifyingOTP) {
    const otp = otpDigits.value.join('');
    try {
      await auth.verifyOTP(otp);
      closeModal('otp-modal');
      router.push('/signin');
    } catch (error) {
      // Error is handled in the composable
    }
  }
};

const closeModal = (modalId) => {
  const modal = M.Modal.getInstance(document.getElementById(modalId));
  modal.close();
};

const openModal = (modalId) => {
  const modal = M.Modal.getInstance(document.getElementById(modalId));
  modal.open();
};
</script>

<style scoped>
.otp-modal {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}
.title {
  font-size: 18px;
  letter-spacing: 0;
  margin-bottom: 0;
}
.subtitle {
  color: #848484;
  font-size: 14px;
}
.otp-input {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
}
.otp-input input {
    width: 70px;
    height: 70px;
    font-size: 48px;
    text-align: center;
    border: 1px solid #CCEDEB;
    border-radius: 8px;
    color: var(--pry-color);
    box-shadow: none !important;
    outline: none;
}
.actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 30px;
}
.actions button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cancel {
  color: #545454;
  border: 1px solid #545454;
  background-color: transparent !important;
}
.verify {
  background-color: var(--pry-color);
  color: white;
}
.verify:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>