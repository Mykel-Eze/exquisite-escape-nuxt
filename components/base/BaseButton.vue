<template>
  <button
    class="z-1000 font-medium centered_row outline-none focus:outline-none rounded-lg"
    :class="[
      styles,
      {
        disabled: disabled || processing,
        'clickable-2': !(disabled || processing),
        'bg-white text-primary button-white': variant === 'white',
        'bg-white text-white button-white-outline': variant === 'white-outline',
        'bg-gray text-dark-gray button-neutral': variant === 'neutral',
        'bg-primary text-white button-primary': variant === 'primary',
        'py-2 px-2 lg:px-3 text-xs md:text-sm': size === 'small',
        'py-2 px-3 md:py-3 md:px-4 lg:px-4 xl:px-6 text-sm md:text-base': size === 'medium',
      },
    ]"
    :disabled="disabled || processing"
    v-bind="$attrs"
    v-on="listeners"
  >
    <div v-if="processing">
      <p>Loading ...</p>
      <!-- <img src="@/assets/images/loader.gif" class="h-12 object-cover w-full" /> -->
    </div>
    <div v-else>
      <div><slot name="preIcon" class="ml-2 lg:ml-0" /></div>
      <span v-if="text !== ''" class="ml-3" :class="[`${textClass}`]">{{
        text
      }}</span>
      <slot v-else name="default"></slot>
      <div v-show="!processing" class="ml-3"><slot name="postIcon" /></div>
    </div>

    <!-- <Spinner
      v-show="processing"
      :size="24"
      :inner-size="18"
      :color="variant !== 'neutral' ? 'white' : 'var(--matte)'"
      class="ml-3"
    />
    <div v-show="!processing" class="ml-3"><slot name="postIcon" /></div> -->
  </button>
</template>

<script setup lang="ts">
import { defineComponent, defineProps } from "vue";

type baseButtonProps = {
  disabled: boolean;
  processing: boolean;
  styles: string;
  text: string;
  textClass: string;
  to: string;
  icon?: string;
  variant: string;
  size?: string;
};
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Boolean,
    default: false,
  },
  styles: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  textClass: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "medium",
  },
});
// export default defineComponent({
//   setup() {},
// });
</script>
<style lang="scss" scoped>
@import "@/assets/scss/base/variables";
.button {
  &-neutral {
    border: 1px solid $primary;
  }
  &-white-outline {
    border: 1px solid white;
    background: transparent;
  }
  &-primary {
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    border: 1px solid $primary-light;
  }
}
.disabled {
  border: 1px solid $cyan-light;
  background: $cyan-light
}
</style>
