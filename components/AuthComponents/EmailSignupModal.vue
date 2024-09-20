<template>
  <div id="email-signup-modal" class="modal form-modal">
    <div class="modal-header relative px-[24px] my-5">
      <h3 class="sm-bold-txt center black-text text-[30px]">Sign Up</h3>
      <img src="~/assets/images/close-icon.svg" alt="close" class="modal-close close-modal">
    </div>
    <div class="modal-content">
      <form @submit.prevent="signUpWithEmail" class="modal-form">
        <div class="name-fields-wrapper grid grid-cols-2 gap-3">
          <InputField
            label="First Name"
            placeholder="First Name"
            id="first_name"
            type="text"
            inputClass="inp-field"
            divClass="input-wrapper"
            v-model="firstName"
            :required="true"
            @input="validateField('firstName')"
            :error="firstNameError"
          />
          <InputField
            label="Last Name"
            placeholder="Last Name"
            id="last_name"
            type="text"
            inputClass="inp-field"
            divClass="input-wrapper"
            v-model="lastName"
            :required="true"
            @input="validateField('lastName')"
            :error="lastNameError"
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
          :required="true"
          @input="validateField('email')"
          :error="emailError"
        />

        <div class="relative">
          <PasswordField
            v-model="password"
            id="password"
            label="Password"
            placeholder="Enter your Password"
            @input="validatePassword"
          />
          <ul v-if="passwordErrors.length" class="error-list">
            <li v-for="error in passwordErrors" :key="error" class="error-message">{{ error }}</li>
          </ul>
        </div>

        <div class="text-[12px] my-5">
          By selecting Agree and continue, I agree to Exquisite Escape's 
          <NuxtLink to="#" class="pry-color">Terms of Service</NuxtLink>,
          <NuxtLink to="#" class="pry-color">Payments Terms of Service</NuxtLink>, and <NuxtLink to="#" class="pry-color">Non-discrimination Policy</NuxtLink>
          and acknowledge the <NuxtLink to="#" class="pry-color">Privacy Policy</NuxtLink>.
        </div>

        <div class="submit-btn-wrapper">
          <button class="submit-btn" type="submit" :disabled="authStore.isRegistering || !isFormValid">
            {{ authStore.isRegistering ? 'Signing Up...' : 'Sign Up' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '~/composables/auth/useAuth';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const $toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const firstNameError = ref('');
const lastNameError = ref('');
const emailError = ref('');
const passwordErrors = ref([]);

const isFormValid = computed(() => {
  return firstName.value.trim() !== '' && 
         lastName.value.trim() !== '' && 
         email.value.trim() !== '' && 
         password.value.trim() !== '' &&
         passwordErrors.value.length === 0;
});

const validateField = (field) => {
  switch (field) {
    case 'firstName':
      firstNameError.value = firstName.value.trim() ? '' : 'First name is required';
      break;
    case 'lastName':
      lastNameError.value = lastName.value.trim() ? '' : 'Last name is required';
      break;
    case 'email':
      emailError.value = email.value.trim() ? 
        (!/\S+@\S+\.\S+/.test(email.value) ? 'Please enter a valid email address' : '') 
        : 'Email is required';
      break;
  }
};

const validatePassword = () => {
  passwordErrors.value = [];
  if (!password.value.trim()) {
    passwordErrors.value.push('Password is required');
  }
  if (password.value.length < 8) {
    passwordErrors.value.push('Password must be at least 8 characters long');
  }
  if (!/\d/.test(password.value)) {
    passwordErrors.value.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
    passwordErrors.value.push('Password must contain at least one special character');
  }
};

const signUpWithEmail = async () => {
  validateField('firstName');
  validateField('lastName');
  validateField('email');
  validatePassword();

  if (!isFormValid.value) {
    return;
  }

  try {
    const userData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value,
    };

    await auth.register(userData);
    $toast.success('Registration successful! You can now log in.');
    closeModal('email-signup-modal');
    router.push('/signin');
  } catch (error) {
    console.error('Signup error:', error);
    $toast.error(error.message || 'Registration failed. Please try again.');
  }
};

const closeModal = (modalId) => {
  const modal = M.Modal.getInstance(document.getElementById(modalId));
  if (modal) {
    modal.close();
  } else {
    console.error(`Modal with id ${modalId} not found`);
  }
};
</script>

<style scoped>
.error-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 5px;
}
.error-list li {
    list-style-type: disc;
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>