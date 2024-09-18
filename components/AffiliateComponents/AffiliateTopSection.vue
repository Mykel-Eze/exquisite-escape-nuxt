<template>
  <section id="affiliate-top-section">
    <div class="row">
        <div class="container">
            <div class="affiliate-top-section-wrapper">
              <div class="affiliate-top-txt-side text-center">
                <div class="container tracking-[-2%]">
                  <div class="pry-color text-[40px]">We earned it</div>
                  <div class="text-[#606161] text-[40px] sm:text-[50px] leading-[43px] sm:leading-[53px]">You could earn 6% Commission</div>
                  <div class="mt-[15px] text-[16px]">
                    Imagine selling <span class="pry-color underline">7 tickets</span> at the estimates of ₦18,011,000
                  </div>
                  <h1 id="affiliate-value" class="mt-[20px] mb-[15px]">₦100,000</h1>
                  <div class="affiliate-range-wrapper range-field">
                    <input type="range" id="affiliate-range" v-model="sliderValue" min="0" max="100" @input="updateSliderStyle">
                  </div>
                  <div>
                    <a href="#" class="pry-color underline">Learn how we estimate your earnings</a>
                  </div>
                  <div class="ats-flight-block flex-div gap-5">
                    <img src="@/assets/images/search-icon.svg" alt="search-icon" class="icon-img">
                    <div>
                      <div class="text-[15px] text-black">Find flight tickets, hotel, tours and transfer</div>
                      <span class="text-[12px]">Economy ∙ 1 Passenger </span>
                    </div>
                  </div>
                  <NuxtLink to="/affiliate/register" class="ats-get-started-btn pry-bg flex-div gap-2 justify-center hover-scale">
                    <span>Get Started</span>
                    <img src="@/assets/images/arrow-up-right.svg" alt="arrow-up-right">
                  </NuxtLink>
                </div>
              </div>
              <div class="affiliate-top-img-side">
                <img src="@/assets/images/affiliate-big-img.png" alt="affiliate-big-img">
              </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "AffiliateTopSection",
    data() {
      return {
        sliderValue: 0
      };
    },
}
</script>

<style>

</style>