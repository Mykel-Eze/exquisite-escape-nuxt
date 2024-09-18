<template>
  <div id="signin-view">
    <div class="row">
      <div class="container">
        <div class="page-title-header center">
          <h1 class="page-title-2">Create an account</h1>
          <p class="page-title-desc-2 text-[18px]">
            Please enter your details to create a new account
          </p>
        </div>
        <!--=== Auth-Methods Section ===-->
        <SignupMethods @signup-success="handleSignupSuccess" />
        <!--=== end of Auth-Methods Section ===-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { useAuth } from '~/composables/auth/useAuth';

definePageMeta({
  layout: "auth-layout"
});

const router = useRouter();
const route = useRoute();
// const auth = useAuth();

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