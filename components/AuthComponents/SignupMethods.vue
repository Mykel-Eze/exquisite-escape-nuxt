<template>
  <section>
    <div class="auth-methods flex-div">
      <div class="auth-method">
        <button type="button" data-target="email-signup-modal" class="auth-method-btn flex-div hover-scale modal-trigger">
          <img src="~/assets/images/mail-icon.svg" alt="mail" class="auth-method-icon">
          <span class="auth-method-text">Sign up with Email</span>
        </button>
      </div>

      <div class="auth-method">
        <button @click="signUpWithGoogle" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/google-icon.svg" alt="google" class="auth-method-icon">
          <span class="auth-method-text">Sign up with Google</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithFacebook" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/facebook-icon.svg" alt="facebook" class="auth-method-icon">
          <span class="auth-method-text">Sign up with Facebook</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithApple" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/apple-icon.svg" alt="apple" class="auth-method-icon">
          <span class="auth-method-text">Sign up with Apple</span>
        </button>
      </div>
  
      <div class="auth-method">
        <button @click="signUpWithTwitter" type="button" class="auth-method-btn flex-div hover-scale">
          <img src="~/assets/images/twitter-icon.svg" alt="twitter" class="auth-method-icon">
          <span class="auth-method-text">Sign up with Twitter</span>
        </button>
      </div>
    </div>
  </section>

  <div class="my-5 text-[16px] text-center">
    Have an account? <NuxtLink to="/signin" class="pry-color underline bold-txt">Login instead</NuxtLink>.
  </div>

  <EmailSignupModal />
  <OtpModal />
</template>

<script setup>
// import { useAuth } from '~/composables/auth/useAuth';

// const auth = useAuth();

onMounted(() => {
    const elemsModal = document.querySelectorAll('.modal');
    M.Modal.init(elemsModal);
});
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