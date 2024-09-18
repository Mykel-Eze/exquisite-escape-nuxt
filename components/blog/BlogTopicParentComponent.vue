<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard v-for="index in 6" :key="index" class="w-full" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import BlogCard from "@/components/blog/BlogCard.vue";
export default defineComponent({
  components: {
    BlogCard,
  },
  setup() {},
});
</script>
