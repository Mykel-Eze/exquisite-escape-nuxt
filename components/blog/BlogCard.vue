<template>
  <div class="p-4 rounded-lg border-cyan pointer hover-scale" @click="blogByIdHandler">
    <img
      src="@/assets/images/header-images/blog-beach-thumbnail.png"
      alt="beach photo"
      class="w-full mb-6"
    />
    <div>
      <p class="text-primary mb-2">October 20, 2023 | Travel tips</p>
      <h3 class="mb-2 font-bold text-2xl lh-42 ls--064 text-dark-gray">
        10 places to visit in Lagos, Nigeria
      </h3>
      <p class="text-medium-gray">
        Lagos, Nigeria, is a vibrant and bustling city with a rich cultural
        heritage and plenty of attractions
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const router = useRouter()
    const blogByIdHandler = () => {
        router.push('/blog/2123323')
    };
    return {
      blogByIdHandler,
    };
  },
});
</script>
