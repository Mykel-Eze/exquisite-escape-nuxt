<template>
  <div class="tickets-overview-wrapper mt-[30px]">
    <div class="ticket-overview-block" v-for="tour in tours" :key="tour.code">
      <div class="left-side">
        <div class="ticket-labels-wrapper flex-div gap-[18px]">
          <div class="ticket-labels flex-div" v-if="getDuration(tour)">
            {{ getDuration(tour) }}
          </div>
          <div class="ticket-labels flex-div" v-if="getGroupType(tour)">
            {{ getGroupType(tour) }}
          </div>
          <div class="ticket-labels flex-div" v-if="getMaxGroupSize(tour)">
            {{ getMaxGroupSize(tour) }}
          </div>
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
                    <span>{{ getTourLocation(tour) }}</span>
                  </div>
                </div>
                <div class="ticket-labels flex-div mt-2" style="width: max-content;">{{ getTourCategory(tour) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="ticket-labels-wrapper">
          <div class="text-[16px] mb-2 font-medium">Points of Interest</div>
          <ul class="flex-div gap-[5px]">
            <li 
              v-for="(poi, index) in getPointsOfInterest(tour)" 
              :key="index" 
              class="text-[14px] mb-1 ticket-labels flex-div"
            >
              {{ poi }}
            </li>
          </ul>
        </div>

        <button @click="showAvailabilityModal(tour)" class="ticket-details-btn flex-div gap-[10px] modal-trigger" data-target="tours-availability-modal">
          <span>See more details</span>
          <img src="@/assets/images/receipt.svg" alt="receipt">
        </button>
      </div>
      <div class="right-side rel min-h-[200px]">
        <div class="ticket-amount-wrapper">
          <div class="ticket-amount">
            <!-- <small class="text-[14px] tracking-[-1px]">{{ tour.currency }}</small> 
             {{ formatNumber(getTourPrice(tour)) }} -->
            {{ formatCurrency(getTourPrice(tour), tour.currency) }}
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

const emit = defineEmits(['show-availability-modal', 'view-ticket-details']);

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// const formatNumber = (num) => {
//   return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// };

const getTourImage = (tour) => {
  return tour.content.media.images[0].urls.find(url => url.sizeType === 'LARGE').resource;
};

const getTourLocation = (tour) => {
  const country = tour.content.countries[0];
  const destination = country.destinations[0];
  return `${destination.name}, ${country.name}`;
};

const getTourCategory = (tour) => {
  return tour.content.segmentationGroups.find(group => group.code === 1)?.segments[0]?.name || '';
};

const getTourPrice = (tour) => {
  if (tour.amountsFrom && tour.amountsFrom.length > 0) {
    return tour.amountsFrom[0].amount;
  }
  return 0;
};

const getDuration = (tour) => {
  try {
    const duration = tour.content.scheduling?.duration;
    if (duration && duration.value && duration.metric) {
      return `Duration: ${duration.value} ${duration.metric.toLowerCase()}`;
    } else if (tour.content.scheduling?.routes?.length > 0) {
      const route = tour.content.scheduling?.routes[0];
      return `Duration: ${route.duration.value} ${route.duration.metric.toLowerCase()}`;
    } else {
      console.warn('Duration information not found for tour:', tour.code);
      return 'Duration: Not specified';
    }
  } catch (error) {
    console.error('Error getting tour duration:', error, 'Tour:', tour);
    return 'Duration: Not available';
  }
};

const getGroupType = (tour) => {
  const groupType = tour.content?.guidingOptions?.groupType;
  return groupType ? `Group: ${groupType.toLowerCase()}` : null;
};

const getMaxGroupSize = (tour) => {
  const maxGroupSize = tour.content?.guidingOptions?.maxGroupSize;
  return maxGroupSize ? `Max Group: ${maxGroupSize}` : '';
};

const getPointsOfInterest = (tour) => {
  return tour.content.routes[0]?.points
    .filter(point => point.type === 'POI')
    .map(point => point.pointOfInterest.description) || [];
};

const viewTicketDetails = (tour) => {
  emit('view-ticket-details', tour);
};

const showAvailabilityModal = (tour) => {
  emit('show-availability-modal', tour);
};
</script>