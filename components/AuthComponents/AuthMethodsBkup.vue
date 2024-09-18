<template>
  <section>
    <div class="auth-methods flex-div">
      <div class="auth-method">
        <button type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/mail-icon.svg" alt="mail" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Email</span>
        </button>
      </div>

      <div class="auth-method">
        <button @click="signInWithGoogle" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/google-icon.svg" alt="google" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Google</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signInWithFacebook" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/facebook-icon.svg" alt="facebook" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Facebook</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signInWithApple" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/apple-icon.svg" alt="apple" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Apple</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signInWithTwitter" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/twitter-icon.svg" alt="twitter" class="auth-method-icon">
          <span class="auth-method-text">Sign in with Twitter</span>
        </button>
      </div>
    </div>
    <!-- <div v-if="user">
      {{isLoggedIn}}
      <p>Welcome, {{ user.displayName || user.email }}</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error.message }}</p>
    </div> -->
    <!-- <div>
      <form @submit.prevent="handleEmailSignIn">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign in with Email</button>
      </form>
      <form @submit.prevent="handleEmailSignUp">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign up with Email</button>
      </form>
      <div v-if="user">
        <p>Welcome, {{ user.displayName || user.email }}</p>
      </div>
      <div v-if="error">
        <p>Error: {{ error.message }}</p>
      </div>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { useFirebase } from '../../composables/useFirebase';
const { user, error, signInWithGoogle, signInWithFacebook, signInWithTwitter, signInWithApple, signInWithEmail, signUpWithEmail } = useFirebase();
// const handleEmailSignIn = () => {
//   signInWithEmail(email.value, password.value);
// };

// const handleEmailSignUp = () => {
//   signUpWithEmail(email.value, password.value);
// };
</script>

<style></style>