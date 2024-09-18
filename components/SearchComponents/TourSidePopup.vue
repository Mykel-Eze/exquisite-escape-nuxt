<template>
  <div v-if="isVisible" class="side-popup">
    <div class="popup-content">
      <h3>{{ selectedTour.name }}</h3>
      <p>{{ selectedTour.description }}</p>
      <!-- Display more tour details here -->
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidePopup',
  props: {
    tour: {
      type: Object,
      default: null,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
  },
};
</script>

<style scoped>
.side-popup {
  position: relative;
}
</style>
