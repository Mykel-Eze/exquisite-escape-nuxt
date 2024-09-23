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

definePageMeta({
  layout: "auth-layout"
});

const route = useRoute();
const router = useRouter();
const auth = useAuth();
const toast = useToast();

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