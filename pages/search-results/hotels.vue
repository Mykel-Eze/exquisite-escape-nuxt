<template>
  <div id="hotel-result-page">
    <div class="top-section black-bg">
        <div class="row">
            <div class="container py-5">
                <div class="search-tab-wrapper">
                    <LazyHotelTab />
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
                            <HotelsFilter />
                        </div>
                    </div>
                    <div class="result-contents-side py-10">
                        <div class="px-[30px]">
                            <div class="top-snack-bar flex-div gap-2 mb-[30px]">
                                <span class="text-white">46 hotels in Oakville-On </span>
                                <img src="@/assets/images/chevron-right.svg" alt="chevron-right" class="right-arr">
                                <span class="text-[#9d9d9d]">Review your trip</span>
                            </div>
                            <div class="text-[18px] text-[#606161] leading-[26px]">
                                Prices displayed include taxes and may change based on availability. You can review any
                                additional fees before checkout. Prices are not final until you complete your purchase.
                            </div>
                        </div>

                        <div>
                            <SortHotels />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- <div class=""></div> -->
  </div>
</template>

<script>
export default {
    name: "HotelsResultPage"
}
</script>

<style>

</style>