<template>
  <div class="container mx-auto text-center py-20">
    <h1 class="text-3xl font-bold mb-4">Invalid Flight Selection</h1>
    <p class="mb-4">You've reached this page without selecting a specific flight.</p>
    <p class="mb-4">Redirecting you to the flight search page in {{ countdown }} seconds...</p>
    <NuxtLink to="/search-results/flights" class="pry-color hover:underline">
      Click here if you're not redirected automatically
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(5);
let timer;

definePageMeta({
  middleware: ['flight-review-redirect']
});

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      router.push('/search-results/flights');
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* Add any additional styles here */
</style>