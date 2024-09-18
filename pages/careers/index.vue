<template>
    <div id="careers-page">
        <section class="bg-light-gray header pt-12 pb-20 mb-20">
            <div class="container">
                <div class="w-full lg:w-8/12 xl:w-7/12">
                    <p class="text-dark-gray text-xl md:text-2xl lg:text-3xl lh-42 ls--064">
                        Careers
                    </p>
                    <h1 class="page-title pry-color font-bold ls--128">
                        To us, it is more than just travel, let's transform travel together
                    </h1>
                    <p class="mt-4 lh-26 w-2/3">
                        Join our exceptional team and be part of the travel revolution, where
                        we strive to make travel seamless and effortless for travelers
                        worldwide. We are dedicated to simplifying and creating unforgettable
                        travel experiences for today and tomorrow.
                    </p>
                    <base-button variant="primary" class="mt-10 w-[227px] h-[59px] hover-scale">
                        <div class="flex">
                            <span class="font-bold text-[18px]">See job openings</span>
                            <img src="@/assets/images/icons/arrow-right.svg" alt="mail" class="ml-2" width="18" />
                        </div>
                    </base-button>
                </div>
            </div>
        </section>

        <section class="my-24">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-[50px] container">
                <div class="w-full relative h-full min-h-[300px] overflow-hidden rounded-[20px]">
                    <!-- <img
                        :src="
                            activeKey === 1
                            ? '@/assets/images/header-images/career/counselling.png'
                            : activeKey === 2
                            ? '@/assets/images/header-images/career/man-woman-on-plane.png'
                            : '@/assets/images/header-images/career/man-on-mountain.png'
                        "
                        alt="career feature img"
                    /> -->
                    <img src="@/assets/images/header-images/career/counselling.png" alt="career feature image"
                        class="w-full h-full object-cover object-top absolute" />
                </div>
                <div class="w-full">
                    <p class="font-bold lh-52 ls--08 text-4xl mb-8">
                        Exquisite Escape Culture + Values
                    </p>
                    <div>
                        <a-collapse v-model:activeKey="activeKey" :bordered="false" accordion>
                            <template #expandIcon="{ isActive }">
                                <div v-if="isActive" class="collapse-active" />
                            </template>
                            <a-collapse-panel key="1" header="Client-Centered Excellence">
                                <p>
                                    Our unwavering commitment to placing our clients' needs at the
                                    forefront ensures that every travel experience we craft is a
                                    masterpiece of personalized service and meticulous attention to
                                    detail.
                                </p>
                            </a-collapse-panel>
                            <a-collapse-panel key="2" header="Boundless Creativity">
                                <p>
                                    Innovation and imagination are the hallmarks of our travel
                                    solutions. We're constantly pushing the boundaries to redefine
                                    travel, offering our clients unique and tailored experiences.
                                </p>
                            </a-collapse-panel>
                            <a-collapse-panel key="3" header="Passion for Exceptional Adventures">
                                <p>
                                    We're driven by an unrelenting passion to create extraordinary
                                    journeys that go beyond the ordinary, leaving indelible memories
                                    in the hearts of our travelers.
                                </p>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="lg:flex justify-between container">
                <div class="w-full lg:w-1/3 mb-8 lg:mb-0">
                    <p class="text-[24px] text-dark-gray mb-3">At Exquisite escape, we...</p>
                    <p class="text-primary font-bold text-[40px] lh-52 ls--048">
                        we work on important problems
                    </p>
                </div>
                <div class="w-full lg:w-1/2">
                    <p class="text-xl">
                        Our fundamental mission revolves around enhancing efficiency within
                        the realm of travel and addressing the various challenges that
                        travelers often encounter. We're here to streamline the travel
                        experience, making it more convenient, less complicated, and
                        ultimately, problem-free.
                    </p>
                    <br />
                    <p class="text-xl">
                        Whether it's simplifying the booking process, providing real-time
                        updates, or offering solutions to common travel issues, our goal is to
                        ensure that your journey is as seamless and stress-free as possible.
                    </p>
                    <base-button variant="primary" class="mt-10 hover-scale">
                        <div class="flex">
                            <span class="font-bold">Read our Story</span>
                            <img src="@/assets/images/icons/arrow-right.svg" alt="mail" class="ml-2" width="18" />
                        </div>
                    </base-button>
                </div>
            </div>
        </section>

        <section class="flex my-24">
            <div class="w-1/3">
                <img src="@/assets/images/header-images/career/hiking-in-forest.png" alt="hiking-in-forest"
                    class="w-full object-cover" />
            </div>
            <div class="w-1/3">
                <img src="@/assets/images/header-images/career/glasses-in-desert.png" alt="glasses-in-desert"
                    class="w-full object-cover" />
            </div>
            <div class="w-1/3">
                <img src="@/assets/images/header-images/career/hot-air-ballon.png" alt="hot-air-ballon"
                    class="w-full object-cover" />
            </div>
        </section>

        <section>
            <div class="container">
                <p class="text-primary mb-4 text-[24px] l-sp-1">Have a look at some of the perks we enjoy</p>
                <div>
                    <a-carousel arrows autoplay :after-change="carouselHandler">
                        <div class="flex sm:flex-row flex-col gap-[20px] items-center lg:items-start">
                            <div class="sm:w-7/12 w-full mt-12">
                                <h3 class="text-[36px] font-bold ls--072 lh-42 max-w-[312px] mb-2">
                                    Personal growth opportunities
                                </h3>
                                <p class="text-[18px] text-[#606161] mt-[10px]">
                                    We aspire to witness your progression from being a member to
                                    achieving chieftancy status within the Exquisite membership.
                                    Whatever path you choose for personal growth and development, we
                                    are here to support and nurture your positive journey.
                                </p>
                            </div>
                            <div class="sm:w-5/12 w-full mt-[20px]">
                                <img src="@/assets/images/illustrations/career/personal-growth.svg"
                                    alt="man with a rocket on his back" />
                            </div>
                        </div>
                        <div class="flex sm:flex-row flex-col gap-[20px] items-center lg:items-start">
                            <div class="sm:w-7/12 w-full mt-12">
                                <h3 class="text-[36px] font-bold ls--072 lh-42 max-w-[312px] mb-2">
                                    Flexible public holidays
                                </h3>
                                <p class="text-[18px] text-[#606161] mt-[10px]">
                                    At Exquisite Escape, your well-being is our top priority. We
                                    respect your values and beliefs when scheduling swap days off,
                                    and we also make sure to celebrate your birthday with you.
                                </p>
                            </div>
                            <div class="sm:w-5/12 w-full mt-[20px]">
                                <img src="@/assets/images/illustrations/career/public-holiday.svg" alt="public holiday"
                                    class="w-full" />
                            </div>
                        </div>
                        <div class="flex sm:flex-row flex-col gap-[20px] items-center lg:items-start">
                            <div class="sm:w-7/12 w-full mt-12">
                                <h3 class="text-[36px] font-bold ls--072 lh-42 max-w-[312px] mb-2">
                                    Finance
                                </h3>
                                <p class="text-[18px] text-[#606161] mt-[10px]">
                                    Being a part of Exquisite Escape comes with enticing benefits,
                                    including a competitive salary, the chance to obtain staff stock
                                    options, and paid leave opportunities.
                                </p>
                            </div>
                            <div class="sm:w-5/12 w-full mt-[20px]">
                                <img src="@/assets/images/illustrations/career/finance.svg" alt="woman with coin"
                                    class="w-full" />
                            </div>
                        </div>
                        <div class="flex sm:flex-row flex-col gap-[20px] items-center lg:items-start">
                            <div class="sm:w-7/12 w-full mt-12">
                                <h3 class="text-[36px] font-bold ls--072 lh-42 max-w-[312px] mb-2">
                                    Growing <br> together
                                </h3>
                                <p class="text-[18px] text-[#606161] mt-[10px]">
                                    We dream big and move fast, solving challenging problems
                                    together. We also never forget to have fun!
                                </p>
                            </div>
                            <div class="sm:w-5/12 w-full mt-[20px]">
                                <img src="@/assets/images/illustrations/career/growing-together.svg"
                                    alt="Man and woman shaking hand through the window" class="w-full" />
                            </div>
                        </div>

                        <template #prevArrow>
                            <div class="custom-slick-arrow">
                                <base-button size="medium">
                                    <img src="@/assets/images/icons/arrow-left.svg" alt="arrow left" />
                                </base-button>
                            </div>
                        </template>
                        <template #nextArrow>
                            <div class="custom-slick-arrow" style="left: 90px">
                                <base-button size="medium">
                                    <img src="@/assets/images/icons/arrow-right.svg" alt="arrow left" />
                                </base-button>
                            </div>
                        </template>
                    </a-carousel>
                    <div class="slider-captions-w mt-[120px] text-[#141414]">
                        <div class="lg:basis-1/4 flex items-start max-w-[218px]" :class="{ 'text-primary': carouselActiveKey === 0 }">
                            <span class="font-bold text-32 ls--064 lh-42 mr-2">01</span>
                            <span class="lh-31 text-[24px] ls--048 mt-1">Personal growth opportunities</span>
                        </div>
                        <div class="lg:basis-1/4 flex items-start max-w-[218px]" :class="{ 'text-primary': carouselActiveKey === 1 }">
                            <span class="font-bold text-32 ls--064 lh-42 mr-2">02</span>
                            <span class="lh-31 text-[24px] ls--048 mt-1">Flexible Holidays</span>
                        </div>
                        <div class="lg:basis-1/4 flex items-start max-w-[218px]" :class="{ 'text-primary': carouselActiveKey === 2 }">
                            <span class="font-bold text-32 ls--064 lh-42 mr-2">03</span>
                            <span class="lh-31 text-[24px] ls--048 mt-1">Finance</span>
                        </div>
                        <div class="lg:basis-1/4 flex items-start max-w-[218px]" :class="{ 'text-primary': carouselActiveKey === 3 }">
                            <span class="font-bold text-32 ls--064 lh-42 mr-2">04</span>
                            <span class="lh-31 text-[24px] ls--048 mt-1">Growing together</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="lg:my-24 mb-24 mt-[150px]">
            <div class="container">
                <h1 class="mb-5 lg:mb-[40px] page-title lh-77 ls--128" style="color: #606161">
                    All open roles
                </h1>
                <div class="flex flex-col gap-[36px]">
                    <p class="text-dark-gray text-[20px]">6 Job positions available</p>
                    <div v-for="(role, index) in openRolesList" :key="index"
                        class="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-6 flex flex-wrap md:gap-0 gap-[10px] justify-between border-primary rounded-xl bg-[#F9F9F9] pointer"
                        @click="jobByIdHandler(role.id)">
                        <p class="w-6/12 md:w-1/4 sm:font-normal font-bold">{{ role.roleName }}</p>
                        <p class="md:block lg:w-1/4">{{ role.location }}</p>
                        <p class="w-3/12 md:w-1/4">{{ role.category }}</p>
                        <p class="text-primary flex items-center">
                            <span class="mr-2"> {{ role.roleType }}</span>
                            <span class="ml-2"><img src="@/assets/images/icons/arrow-right-primary.svg"
                                    alt="arrow right in cyan color" class="arrow-right-primary" /></span>
                        </p>
                    </div>
                </div>
                <div class="m-auto mt-[48px] text-center">
                    <div class="flex gap-[27px] justify-center all-roles-btn-wrapper">
                        <base-button size="small" class="w-[80px] h-[56px]">
                            <img src="@/assets/images/icons/arrow-left.svg" alt="arrow left" class="w-6" />
                        </base-button>
                        <base-button size="small" class="w-[80px] h-[56px]">
                            <img src="@/assets/images/icons/arrow-right.svg" alt="arrow right" class="w-6" />
                        </base-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const activeKey = ref([1]);
        const carouselActiveKey = ref(1);
        const openRolesList = ref([
            {
                id: 1,
                roleName: "Travel Consultant/Advisor",
                location: "Lagos, Nigeria",
                category: "Business",
                roleType: "Hybrid",
            },
            {
                id: 2,
                roleName: "Social Media Manager",
                location: "Lagos, Nigeria",
                category: "Marketing",
                roleType: "Hybrid",
            },
            {
                id: 3,
                roleName: "Full Stack Developer",
                location: "Lagos, Nigeria",
                category: "Engineering",
                roleType: "Hybrid",
            },
            {
                id: 4,
                roleName: "Office Admin",
                location: "Lagos, Nigeria",
                category: "Business",
                roleType: "Hybrid",
            },
            {
                id: 5,
                roleName: "Brand Designer",
                location: "Lagos, Nigeria",
                category: "Marketing",
                roleType: "Hybrid",
            },
            {
                id: 6,
                roleName: "Product Designer",
                location: "Lagos, Nigeria",
                category: "Engineering",
                roleType: "Hybrid",
            },
        ]);
        const carouselHandler = (current: number) => {
            carouselActiveKey.value = current;
        };
        const router = useRouter();
        const jobByIdHandler = (id: number) => {
            router.push(`/careers/${id}`);
        };
        return {
            activeKey,
            carouselActiveKey,
            openRolesList,
            carouselHandler,
            jobByIdHandler,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variables";

.header {
    position: relative;

    &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: none;
        background-size: contain;
        background-position: bottom;
        background-position-x: right;
        background-repeat: no-repeat;
        width: 50%;
        height: 64%;

        @media only screen and (min-width: 768px) {}

        @media (min-width: 1024px) {
            background-image: url("@/assets/images/illustrations/one-footprint.svg");
        }

        @media (min-width: 1280px) {
            height: 500px;
        }

        @media (min-width: 1500px) {
            height: 530px;
        }
    }
}

.ant-collapse-borderless {
    background: transparent !important;
}

.collapse-active {
    width: 50px;
    height: 4px;
    //   stroke-width: 4px;
    background: $primary;
}

.ant-collapse-header-text {
    font-size: 32px !important;
    line-height: 42px;
    /* 131.25% */
    letter-spacing: -0.64px;
    color: $dark-gray;
}

.custom-slick-arrow {
    bottom: -40px !important;
    top: auto !important;
    left: 0;

    button {
        width: 80px;
        height: 56px;
        position: relative;
        
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.flex {
    display: flex !important;
}

.arrow-right-primary {
    width: 18px;
}

.slider-captions-w {
    display: none;

    @media(min-width: 993px) {
        display: flex;
        justify-content: space-between;
    }
}

.all-roles-btn-wrapper button {
    position: relative;

    img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

@media(max-width: 600px) {
    #careers-page .page-title {
        text-align: left;
        font-size: 46px;
        line-height: 56px;
    }
}
</style>
