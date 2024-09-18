<template>
  <div id="flight-result-page">
    <div class="top-section black-bg">
      <div class="row">
        <div class="container py-5">
          <div class="search-tab-wrapper">
            <FlightTab />
          </div>
        </div>
      </div>
    </div>

    <section class="results-section">
      <div class="row">
        <div class="container c2">
          <div class="result-main-wrapper">
            <div class="result-filter-side">
              <div class="rfs">
                <FlightsFilter />
              </div>
            </div>
            <div class="result-contents-side py-10">
              <div class="px-[30px]">
                <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                  <span class="text-white"
                    >Choose flight from Lagos to London
                  </span>
                  <img
                    src="@/assets/images/chevron-right.svg"
                    alt="chevron-right"
                    class="right-arr"
                  />
                  <span class="text-[#9d9d9d]">Review your trip</span>
                </div>
                <div class="text-[18px] text-[#606161] leading-[26px]">
                  Prices displayed include taxes and may change based on
                  availability. You can review any additional fees before
                  checkout. Prices are not final until you complete your
                  purchase.
                </div>
              </div>

              <!--=== Note to Dev: When the search is empty, uncomment the below component👇🏽 ===-->
              <!-- <div class="full-height rel">
                <EmptySearch
                  title="Sorry, we couldn't find any flights that match your criteria"
                  description="Try searching nearby airports or alternative dates"
                />
              </div> -->

              <div>
                <CheapFlights />

                <FlightStops />

                <SortFlights @view-ticket-clicked="showPopup = true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FlightsSidePopup
      :class="{ open: showPopup }"
      @close-popup="showPopup = false"
    />
  </div>
</template>

<script></script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // setup() {
  //   const showPopup = ref(false);
  //   const searchObject = ref({});
  //   const flightList = ref([]);
  //   const router = useRouter();
  //   onMounted(async () => {
  //     searchObject.value = router.currentRoute.value.query;
  //     searchObject.value = {
  //       ...searchObject.value,
  //       adults: Number(searchObject.value.adults),
  //     };
  //     const { data } = await useApiPost(
  //       "/flight/get/search-offer",
  //       searchObject.value
  //     );
  //     flightList.value = data.value.data;
  //   });
  //   return {
  //     showPopup,
  //   };
  // },
});
</script>

<style></style>
