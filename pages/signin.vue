<template>
  <div id="signin-view">
    <div class="row">
      <div class="container">
        <div class="page-title-header center">
          <h1 class="page-title-2">Sign in</h1>
          <p class="page-title-desc-2 text-[18px]">
            Please enter your details to sign in
          </p>
        </div>
        <!--=== Auth-Methods Section ===-->
        <SigninMethods @login-success="handleLoginSuccess" />
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

const handleLoginSuccess = () => {
  // Redirect to dashboard or home page after successful login
  router.push('/dashboard');
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