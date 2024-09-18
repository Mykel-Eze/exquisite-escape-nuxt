<template>
  <img :src="imgPath" alt="icon" />
</template>

<script lang="ts">
import { defineComponent, defineProps } from "vue";
import paperPlane from "@/assets/images/illustrations/paper-plane.svg";

export default defineComponent({
  components:{
  },
  setup() {
    defineProps({
      imgPath: {
        type: String,
        default: "",
      },
    });
  },
});
</script>
