<template>
    <section id="sort-transfers">
        <div class="container">
            <div class="other-tickets-overview-wrapper">
                <div v-for="tour in tours" :key="tour.id">
                    <ToursTicketOverviewBlock :tour="tour" @view-ticket-clicked="viewTicketDetails(tour)" />
                </div>

                <SidePopup 
                    :tour="selectedTour" 
                    :isVisible="isPopupVisible" 
                    @close-popup="isPopupVisible = false" 
                />

                <div class="show-more-wrapper mt-[50px]">
                    <button class="show-more-btn flex-div gap-2">
                        <span>Show More</span>
                        <img src="@/assets/images/caret-down-white.svg" alt="caret">
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useToursStore } from '~/store/tours';

export default {
  name: "SortTours",
  setup() {
    const store = useToursStore();
    const tours = computed(() => store.filteredTours); // Assuming 'filteredTours' holds the filtered results

    const selectedTour = ref(null);
    const isPopupVisible = ref(false);

    const viewTicketDetails = (tour) => {
      selectedTour.value = tour;
      isPopupVisible.value = true;
    };


    return {
      tours,
      selectedTour,
      isPopupVisible,
      viewTicketDetails,
    };
  }
}

</script>

<style></style>