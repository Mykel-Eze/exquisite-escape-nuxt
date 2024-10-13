<template>
  <div id="signin-view">
    <div class="row">
      <div v-if="authStore.isAuthenticated" class="my-[50px]">
        <div class="page-title-header center">
          <h1 class="page-title-2">Sign in</h1>
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
          <h1 class="page-title-2">Sign in</h1>
          <p class="page-title-desc-2 text-[18px]">
            Please enter your details to sign in
          </p>
        </div>
        <!--=== Auth-Methods Section ===-->
        <SigninMethods />
        <!--=== end of Auth-Methods Section ===-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '~/composables/auth/useAuth';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: "auth-layout"
});

const route = useRoute();
const router = useRouter();
const auth = useAuth();
const toast = useToast();
const authStore = useAuthStore();

// const handleSuccessfulAuth = () => {
//   const redirectPath = localStorage.getItem('authRedirectPath');
//   if (redirectPath) {
//     localStorage.removeItem('authRedirectPath');
//     router.push(redirectPath);
//   } else {
//     router.push('/dashboard/account');
//   }
// };

onMounted(async () => {
  const token = route.query.token;
  if (token) {
    try {
      const response = await auth.activateAccount(token);
      toast.success(response.msg);
      // Remove the token from the URL
      router.replace({ query: {} });
    } catch (error) {
      toast.error(error.message || 'Account activation failed. Please try again.');
    }
  }
});
</script>

<style src="~/assets/css/auth.css"></style>