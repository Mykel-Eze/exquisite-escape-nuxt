<template>
  <section>
    <div class="auth-methods flex-div">
      <div class="auth-method">
        <button @click="showEmailForm = true" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/mail-icon.svg" alt="mail" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Email</span>
        </button>
      </div>

      <div class="auth-method">
        <button @click="signUpWithGoogle" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/google-icon.svg" alt="google" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Google</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithFacebook" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/facebook-icon.svg" alt="facebook" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Facebook</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithApple" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/apple-icon.svg" alt="apple" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Apple</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithTwitter" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/twitter-icon.svg" alt="twitter" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Twitter</span>
        </button>
      </div>
    </div>

    <div v-if="showEmailForm" class="email-form">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="signUpWithEmail">Sign Up</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/auth/useAuth';

const auth = useAuth();
const showEmailForm = ref(false);
const email = ref('');
const password = ref('');

const signUpWithGoogle = () => {
  // Implement Google OAuth flow
  // This usually involves redirecting to Google's OAuth page
  // After successful authentication, Google will redirect back with a code
  // You'll need to handle this redirect in your Nuxt app
  window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...'; // Add your Google OAuth URL here
};

const signUpWithFacebook = () => {
  // Implement Facebook signup
  console.log('Facebook signup not implemented');
};

const signUpWithApple = () => {
  // Implement Apple signup
  console.log('Apple signup not implemented');
};

const signUpWithTwitter = () => {
  // Implement Twitter signup
  console.log('Twitter signup not implemented');
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

<style scoped>
/* Add any additional styles here */
.email-form {
  margin-top: 20px;
}
.email-form input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
}
</style>