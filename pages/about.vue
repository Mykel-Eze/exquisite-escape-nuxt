<template>
    <div id="about-page">
        <section class="about-image-container w-full">
            <img src="@/assets/images/header-images/about-header.png" alt="Old man and woman on a terrance" class="about-image" />
        </section>
        <section class="bg-light-gray pt-10 pb-16">
            <div class="container">
                <div class="lg:w-[90%]">
                    <p class="text-[32px] text-darkgray2 mb-2 lh-42 ls--064">About</p>
                    <h1 class="text-primary page-title mb-2 pry-color font-bold">
                        At Exquisite Escape, we believe that travel is more than just a journey
                        from one place to another
                    </h1>
                    <p class="mt-[10px] mb-[20px] text-[18px]">
                        It's a gateway to experiences, memories, and stories that last a
                        lifetime. With a deep passion for exploration and a commitment to
                        excellence, we are your trusted partner in creating extraordinary travel
                        adventures.
                    </p>
                </div>
                <img src="@/assets/images/illustrations/6-footprints.svg" alt="Foot-Prints" class="about-image" />
            </div>
        </section>
        <section class="sm:my-24 my-20 text-xl ls--048 lh-31">
            <div class="container">
                <p>
                    Exquisite Escape is a trademark of Applause Global Services Nigeria
                    Limited, a travel management company registered in Nigeria and we have
                    set out to deepen the online travel market in Nigeria.
                </p>
                <br />
                <p>
                    We achieve this by constant innovation, creation of new travel
                    experiences, cost disruption and application of best technologies. We
                    also distinguish our brand with incomparable customer service delivery
                </p>
                <br />
                <p class="font-medium text-xl lg:text-3xl text-dark-gray mb-4 lh-42 ls--064">
                    Our Preposition
                </p>

                <p>
                    We seek for you to outsource your travel management activities and
                    process to Exquisite Escape. This includes booking and issuance of
                    flight tickets, protocol management, hotel bookings and advisory amongst
                    other services.
                </p>
                <br />
                <p>
                    We believe that this arrangement will enable you to reduce your annual
                    travel expenses by ten percent (10%) as we constantly use our expertise
                    to seek out deals and discounted rates for our clientele. Our service
                    will also improve your internal efficiencies, reduce time and resources
                    spent on planning travel.
                </p>
                <br />
                <p>
                    Additionally, contracting us as your corporate travel manager gives free
                    access to a dedicated travel consulting team and complimentary protocol
                    management for all air travel. The components of our protocol management
                    service include – assisted check in, collection of boarding passes, fast
                    tracking through all regulatory check points, leading to appropriate
                    gates and carriage of hand luggage to the foot of the plane. <br />These
                    go a long way in maximizing output and time management for staff and
                    executives.
                </p>
            </div>
        </section>
        <section class="lg:flex mb-24 items-center bg-[#E5F6F5]">
            <img src="@/assets/images/header-images/man-with-backpack.png"
                alt="man and woman with backpacks hiking the forest" class="w-full lg:w-1/2" />
            <div class="lg:px-32 2xl:px-40 w-[90%] lg:pb-0 pb-[30px] m-auto lg:w-1/2">
                <h2 class="font-bold text-4xl lg:text-4xl lh-42 ls--064 mt-8 lg:mt-0 text-dark-gray mb-4 lg:mb-8">
                    Exquisite Escape <br> Mission
                </h2>
                <p class="lh-26 text-[18px]">
                    To redefine the way the world explores. We go beyond the ordinary to
                    craft exceptional travel experiences that captivate the senses and
                    ignite the spirit of adventure. Whether you're seeking a relaxing
                    getaway, a thrilling expedition, or a cultural immersion, we are here
                    to turn your dreams into reality.
                </p>
            </div>
        </section>
        <section class="">
            <div class="container">
                <p class="text-2xl lg:text-4xl mb-16 font-bold lh-42 l-sp-1">Why Choose Us</p>
                <div class="md:grid md:grid-cols-2 gap-20">
                    <div v-for="(feat, index) in whyUsFeatures" :key="index" class="flex items-center mb-5 md:mb-0">
                        <div class="feature-container w-3/12">
                            <img v-if="feat.imgPath === 'paper-plane.svg'" src="@/assets/images/illustrations/paper-plane.svg"
                                alt="feature image" class="feature-img" />
                            <img v-if="feat.imgPath === '2-puzzle-pieces.svg'"
                                src="@/assets/images/illustrations/2-puzzle-pieces.svg" alt="feature img" class="feature-img" />
                            <img v-if="feat.imgPath === '3-circle-set.svg'" src="@/assets/images/illustrations/3-circle-set.svg"
                                alt="feature img" />
                            <img v-if="feat.imgPath === 'user-check.svg'" src="@/assets/images/illustrations/user-check.svg"
                                alt="feature img" class="feature-img" />
                            <img v-if="feat.imgPath === 'light-bulb.svg'" src="@/assets/images/illustrations/light-bulb.svg"
                                alt="feature img" class="feature-img" />
                        </div>
                        <div class="pl-3 w-9/12">
                            <p class="text-darkgray2 text-lg lg:text-xl ls--048 lh-31 mb-2">
                                {{ feat.name }}
                            </p>
                            <p class="lh-26">{{ feat.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="pt-[100px] pb-[80px]">
            <div class="container">
                <div class="bg-primary relative text-white py-12 text-center">
                    <div class="max-w-[770px] w-[90%] m-auto relative z-[1]">
                        <h3 class="font-bold text-2xl lg:text-4xl">
                            Come work with us
                        </h3>
                        <p class="text-base md:text-lg lg:text-xl mb-[60px] mt-[30px]">
                            Join us on a journey that transcends travel. Explore the world with
                            us and discover the magic that lies beyond the destination. Your
                            adventure awaits, and we are here to make it extraordinary.
                        </p>

                        <base-button variant="white-outline" class="hover-scale">
                            <span class="font-bold">See Open Position</span>
                        </base-button>
                    </div>

                    <img src="@/assets/images/foot-steps.png" alt="foot-steps" class="foot-prints-img foot-prints-1">
                    <img src="@/assets/images/foot-steps.png" alt="foot-steps" class="foot-prints-img foot-prints-2">
                </div>
            </div>
        </section>
        <section class="pt-[30px] pb-[80px]">
            <div class="container">
                <div class="lg:flex lg:items-center">
                    <img src="@/assets/images/header-images/customer-care-woman.png" alt="female customer rep"
                        class="w-full lg:w-5/12" />
                    <div class="px-0 lg:px-32 2xl:px-40 lg:mt-0 mt-[30px]">
                        <h2 class="font-bold text-4xl lh-42 ls--064 text-dark-gray mt-0 mb-8">
                            Contact Us
                        </h2>
                        <p class="lh-26 mb-6">
                            Our company is a digital-first one. Even though our office is open
                            at all times, it is crucial that you contact us first.
                        </p>
                        <p class="mb-8">
                            <a href="#" target="_blank" rel="noopener noreferrer" class="underline text-dark-blue text-base">
                                Use Google Map ↗
                            </a>
                        </p>

                        <base-button variant="primary" class="hover-scale">
                            <div class="flex">
                                <span>Book an appointment</span>
                                <img src="@/assets/images/icons/calendar-check-white.svg" alt="calendar check" class="ml-2"
                                    width="18px" />
                            </div>
                        </base-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        const whyUsFeatures = ref([
            {
                name: "Passion for Adventure",
                description:
                    "We are driven by a relentless passion for adventure, which fuels our creativity and innovation in designing unique travel itineraries.",
                imgPath: "paper-plane.svg",
            },
            {
                name: "Customer-Centric",
                description:
                    "Your satisfaction is our top priority. We listen, understand, and tailor our services to meet your individual needs and preferences.",
                imgPath: "user-check.svg",
            },
            {
                name: "Sustainability",
                description:
                    "We are committed to responsible and sustainable travel practices, ensuring that our journeys leave a positive impact on the environment and local communities.",
                imgPath: "2-puzzle-pieces.svg",
            },
            {
                name: "Creativity",
                description:
                    "Our team of experts thinks outside the box to offer you one-of-a-kind travel solutions that go beyond your expectations.",
                imgPath: "light-bulb.svg",
            },
            {
                name: "Collaboration",
                description:
                    "We believe in the power of teamwork and collaboration, both within our organization and with our valued clients.",
                imgPath: "3-circle-set.svg",
            },
        ]);
        // const imageHandler = () => {};
        return {
            whyUsFeatures,
            // imageHandler,
        };
    },
});
</script>

<style lang="scss" scoped>
.about {
    &-image {
        height: 100%;
        width: 100%;
        object-position: center;
        object-fit: cover;

        &-container {
            height: 280px;

            @media only screen and (min-width: 768px) {
                height: 300px;
            }

            @media (min-width: 1024px) {
                height: 400px;
            }

            @media (min-width: 1280px) {
                height: 500px;
            }

            @media (min-width: 1500px) {
                height: 530px;
            }
        }
    }
}
img.foot-prints-img {
    position: absolute;
    bottom: 10%;
    z-index: 0;

    &.foot-prints-1 {
        left: 5%;
    }
    &.foot-prints-2 {
        right: 5%;
    }

    @media(max-width: 992px) {
        width: 100px;
    }
}

@media(max-width: 600px) {
    #about-page h1.page-title {
        font-size: 34px;
        line-height: 41px;
        text-align: left;
        margin-bottom: 20px;
    }
}
</style>
