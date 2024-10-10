<template>
  <div class="container mx-auto text-center py-20">
    <h1 class="text-3xl font-bold mb-4">Invalid Tours Selection</h1>
    <p class="mb-4">You've reached this page without selecting a specific tours activity.</p>
    <p class="mb-4">Redirecting you to the tours search page in {{ countdown }} seconds...</p>
    <NuxtLink to="/search-results/tours" class="pry-color hover:underline">
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
  middleware: ['tour-review-auth']
});

onMounted(() => {
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      router.push('/search-results/tours');
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