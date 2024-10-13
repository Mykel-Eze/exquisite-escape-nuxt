<template>
  <div id="signin-view">
    <div class="row">
      <div v-if="authStore.isAuthenticated" class="my-[50px]">
        <div class="page-title-header center">
          <h1 class="page-title-2">Create an account</h1>
          <p class="page-title-desc-2 text-[18px]">
            You are signed in already.
          </p>
          <p class="page-title-desc-2 text-[14px]">
            <nuxt-link to="/" class="pry-color underline">Go home</nuxt-link> or 
            <nuxt-link to="/dashboard/account" class="pry-color underline">See your account page</nuxt-link>
          </p>
        </div>
      </div>

      <div v-else class="container">
        <div class="page-title-header center">
          <h1 class="page-title-2">Create an account</h1>
          <p class="page-title-desc-2 text-[18px]">
            Please enter your details to create a new account
          </p>
        </div>
        <!--=== Auth-Methods Section ===-->
        <SignupMethods />
        <!--=== end of Auth-Methods Section ===-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { useAuth } from '~/composables/auth/useAuth';
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: "auth-layout"
});

const router = useRouter();
const route = useRoute();
// const auth = useAuth();
const authStore = useAuthStore();

const handleSignupSuccess = () => {
  // Show a success message or redirect to email verification page
  alert('Signup successful! Please check your email for verification.');
};

onMounted(() => {
  const code = route.query.code;
  if (code) {
    handleGoogleOAuth(code);
  }
});

const handleGoogleOAuth = async (code) => {
  try {
    await auth.googleOAuth(code);
    handleLoginSuccess();
  } catch (error) {
    console.error('Google OAuth failed:', error);
  }
};
</script>

<style src="~/assets/css/auth.css"></style>