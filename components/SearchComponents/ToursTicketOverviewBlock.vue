<template>
  <div class="tickets-overview-wrapper mt-[30px]">
    <div class="ticket-overview-block" v-for="tour in tours" :key="tour.code">
      <div class="left-side">
        <div class="ticket-labels-wrapper flex-div gap-[18px]">
          <TicketLabels v-for="label in getTourLabels(tour)" :key="label" :label="label" />
        </div>

        <div class="ticket-overview-content">
          <div class="tc-row-wrapper">
            <div class="toc-row flex-div gap-[15px] w-full no-wrap">
              <div class="hotel-ticket-img-wrapper">
                <img :src="getTourImage(tour)" :alt="tour.name">
              </div>
              <div class="overflow-hidden">
                <div class="ticket-name truncate mb-2" :title="tour.name">{{ tour.name }}</div>
                <div class="flex flex-col gap-[6px]">
                  <div class="flex-div gap-[10px]">
                    <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                    <span>{{ tour.content.countries[0].destinations[0].name }}</span>
                  </div>
                </div>
                <div class="ticket-labels flex-div mt-2" style="width: max-content;">{{ getTourCategory(tour) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-labels-wrapper flex-div gap-[10px]">
          <TicketLabels v-for="label in getBottomLabels(tour)" :key="label" :label="label" />
        </div>

        <button @click="showAvailabilityModal(tour)" class="ticket-details-btn flex-div gap-[10px]">
          <span>See more details</span>
          <img src="@/assets/images/receipt.svg" alt="receipt">
        </button>
      </div>
      <div class="right-side rel min-h-[200px]">
        <div class="ticket-amount-wrapper">
          <div class="ticket-amount">
            <small class="text-[14px] tracking-[-1px]">{{ tour.currency }}</small> {{ formatNumber(tour.amountsFrom[0].amount) }}
          </div>

          <div class="view-ticket-btn-wrapper vtbw-vertical w-full">
            <button class="view-ticket-btn flex-div" @click="viewTicketDetails(tour)">
              <span>View tours</span>
              <img src="@/assets/images/chevy-right.svg" alt="right arrow">
            </button>
          </div>
        </div>
        <div class="cup-curves up-curve"></div>
        <div class="cup-curves down-curve"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  tours: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['view-ticket-clicked', 'show-availability-modal']);

const formatNumber = (num) => {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getTourImage = (tour) => {
  return tour.content.media.images[0].urls.find(url => url.sizeType === 'LARGE').resource;
};

const getTourLabels = (tour) => {
  // Implement logic to extract relevant labels from tour data
  return [];
};

const getBottomLabels = (tour) => {
  // Implement logic to extract relevant bottom labels from tour data
  return [];
};

const getTourCategory = (tour) => {
  return tour.content.segmentationGroups.find(group => group.code === 1)?.segments[0]?.name || '';
};

const viewTicketDetails = (tour) => {
  emit('view-ticket-clicked', tour);
};

const showAvailabilityModal = (tour) => {
  emit('show-availability-modal', tour);
};
</script>