<template>
  <section id="cheap-flights">
    <div class="container">
      <div class="rel max-w-full">
        <swiper
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }"
          :spaceBetween="15"
          :navigation="{ nextEl: '.cf-next', prevEl: '.cf-prev' }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(flight, index) in flights" :key="index">
            <div class="cheap-flight-block">
              <div class="flex-div justify-between">
                <span class="text-black">Date</span>
                <span class="text-[#848484]">{{ formatDate(flight.date) }}</span>
              </div>
              <div class="flex-div justify-between">
                <span class="text-black">Min. Price </span>
                 <span class="text-[#848484]">{{ formatCurrency(flight.minPrice, flight.currency) }}</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <!-- Custom navigation icons -->
        <div class="custom-nav-icon custom-prev cf-prev"> 
          <img src="~/assets/images/arrow-left.svg" alt="prev">
        </div>
        <div class="custom-nav-icon custom-next cf-next"> 
          <img src="~/assets/images/arrow-right.svg" alt="next">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { formatCurrency } from '@/utils/currency';

export default {
  name: "CheapFlights",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    flights: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return {
      modules: [Navigation],
      formatDate,
    };
  },
};
</script>