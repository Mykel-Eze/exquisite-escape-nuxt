<template>
  <div id="hotel-and-tours" class="pt-[60px] pb-[40px]">
    <div class="row">
      <div class="container">
        <div class="dashboard-page-header">
          <Breadcrumb :items="[
            { path: '/dashboard/account', text: 'Account' },
            { path: '/dashboard/hotel-and-tours', text: 'Hotel and tour' },
          ]" />
          <h2 class="dashboard-page-title">Hotel and Tours</h2>
        </div>

        <div class="hotel-tours-wrapper">
          <div class="htw-tab-wrapper my-[60px]">
            <ul class="htw-tabs flex-div gap-[20px]">
              <li :class="{ 'active': activeTab === 'hotel' }" @click="activeTab = 'hotel'">
                <span>HOTEL</span>
              </li>
              <li :class="{ 'active': activeTab === 'tours' }" @click="activeTab = 'tours'">
                <span>TOURS</span>
              </li>
            </ul>
          </div>

          <div class="htw-content">
            <div v-if="activeTab === 'hotel'">
              <HotelBlock />
              <RecentHotelBlock />
            </div>

            <div v-if="activeTab === 'tours'">
              <ToursBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotelAndToursPage",
  layout: "authLayout",
  data() {
    return {
      activeTab: "hotel"
    }
  },
}
</script>

<style>

</style>