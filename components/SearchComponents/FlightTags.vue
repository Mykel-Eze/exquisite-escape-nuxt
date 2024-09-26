<template>
  <div :class="['ticket-labels', getTagClasses]">
    <img v-if="icon" :src="getIconUrl(icon)" alt="tag-icon" class="ticket-label-icon">
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
});

const tagClasses = {
  filter: {
    cheapest: 'bg-[#DAF0E3] text-[#1C472F]',
    'time-saver': 'bg-[#D4E2FC] text-[#102C60]',
    fastest: 'bg-[#E5F6F5] text-[#00A79D]',
    recommended: 'bg-[#f9f9f9] text-[#141414]'
  },
  trip: {
    'tickets-left': 'flex-div tl-2 bg-[#FADBD7] text-[#5C1D16]',
    'multi-city': 'flex-div',
    'round-trip': 'flex-div',
    'one-way': 'flex-div'
  },
  days: {
    'same-day': 'bg-[rgba(63, 46, 177, 0.1)] text-[#3F2EB1]',
    'days-after': 'bg-[#FADBD7] text-[#5C1D16]'
  },
  addon: {
    'carry-one-bag': 'flex-div',
    'no-changes-fee': 'flex-div',
    'seat-choice-included': 'flex-div',
    'average-co': 'flex-div'
  }
};

const getTagClasses = computed(() => {
  const baseClasses = 'flex-div';
  const typeClasses = tagClasses[props.type] || {};
  const specificClasses = typeClasses[props.label.toLowerCase().replace(/ /g, '-')] || '';
  return `${baseClasses} ${specificClasses}`;
});

const getIconUrl = (iconName) => {
  return `/tag-icons/${iconName}`;
};
</script>