<template>
    <div class="recent-hotel-wrapper mt-[60px]">
        <h4 class="text-[#141414] text-[32px] tracking-tight m-0">Recent hotels</h4>
        <div class="text-[16px] mt-[10px]">Find a breakdown of flight history here</div>

        <div class="recent-hotel-block-wrapper mt-[24px]">
            <div class="recent-hotel-block flex-div gap-[15px]" v-for="(hotel, index) in recentHotels" :key="index">
                <img :src="hotel.image" :alt="hotel.name">
                <div>
                    <h4>{{ hotel.name }}</h4>
                    <b class="pry-color text-[12px]">{{ hotel.date }}</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecentHotelBlock",
    data() {
        return {
            recentHotels: [
                {
                    image: "/places/eko-hotel.jpg",
                    name: "Eko Hotel $ Suite",
                    date: "Sep 22-30, 2023"
                },
                {
                    image: "/places/nairobi.jpg",
                    name: "Eko Hotel $ Suite",
                    date: "Sep 22-30, 2023"
                },
                {
                    image: "/places/zanzibar.jpg",
                    name: "Eko Hotel $ Suite",
                    date: "Sep 22-30, 2023"
                }
            ]
        }
    }
}
</script>

<style>

</style>