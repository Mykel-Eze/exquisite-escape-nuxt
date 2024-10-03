<template>
  <div class="tickets-overview-wrapper mt-[30px]">
    <div class="ticket-overview-block" v-for="ticket in toursTicketOverviewData" :key="ticket.id">
      <div class="left-side">
        <div class="ticket-labels-wrapper flex-div gap-[18px]">
          <TicketLabels v-for="label in ticket.topLabels" :key="label" :label="label" />
        </div>

        <div class="ticket-overview-content">
          <div class="tc-row-wrapper">
            <div class="toc-row flex-div gap-[15px] w-full no-wrap">
              <div class="hotel-ticket-img-wrapper">
                <img :src="ticket.picture" :alt="ticket.name">
              </div>
              <div class="overflow-hidden">
                <div class="ticket-name truncate mb-2">{{ ticket.name }}</div>
                <div class="flex flex-col gap-[6px]">
                  <div class="flex-div gap-[10px]">
                    <img src="@/assets/images/ticket-location.svg" alt="ticket-location">
                    <span>{{ ticket.location }}</span>
                  </div>
                </div>
                <div class="ticket-labels flex-div mt-2" style="width: max-content;">{{ ticket.tag }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-labels-wrapper flex-div gap-[10px]">
          <TicketLabels v-for="label in ticket.bottomLabels" :key="label" :label="label" />
        </div>

        <button data-target="tours-availability-modal" class="ticket-details-btn flex-div gap-[10px] modal-trigger">
          <span>See more details</span>
          <img src="@/assets/images/receipt.svg" alt="receipt">
        </button>
      </div>
      <div class="right-side rel min-h-[200px]">
        <div class="ticket-amount-wrapper">
          <div class="ticket-amount">₦{{ formatNumber(ticket.price) }}</div>

          <div class="view-ticket-btn-wrapper vtbw-vertical w-full">
            <button class="view-ticket-btn flex-div" @click="$emit('view-tours-ticket-clicked')">
              <span>View tours</span>
              <img src="@/assets/images/chevy-right.svg" alt="right arrow">
            </button>
            <!-- <button class="view-ticket-btn flex-div sec-btn">
              <span>More options available (4)</span>
              <img src="@/assets/images/direction-down-black.svg" alt="down arrow">
            </button> -->
          </div>
        </div>
        <div class="cup-curves up-curve"></div>
        <div class="cup-curves down-curve"></div>
      </div>
    </div>
  </div>

  <ToursAvailabilityModal />
  <ToursSuccessModal />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ToursTicketOverviewData } from '~/data/ToursTicketOverviewData.js';
// import { useApi } from '@/utils/api';

const toursTicketOverviewData = ref(ToursTicketOverviewData);

onMounted(() => {
  const elemsModal = document.querySelectorAll('.modal');
  M.Modal.init(elemsModal);
});

const formatNumber = (num) => {
  return num.toLocaleString();
};

const emitViewTicketClicked = (ticket) => {
  emit('view-ticket-clicked', ticket);
};

defineEmits(['view-ticket-clicked']);
</script>