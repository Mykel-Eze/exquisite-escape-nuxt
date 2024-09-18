<template>
    <section id="blog-page" class="container">
        <h1 class="text-dark-gray page-title">
            Exquisite Escape Blog
        </h1>
        <p class="text-[18px] lh-31 ls--048">Explore our travel-focused articles</p>
        <div class="blog-top-wrapper flex items-center gap-2 mt-4">
            <div class="input-field">
                <input type="text" class="inp-field w-full" v-model="blogObject.emailAddress" placeholder="Enter Email Address" required />
            </div>
            <base-button variant="primary">
                <div class="flex">
                    <span>Subscribe</span>
                    <img src="@/assets/images/icons/email.svg" alt="mail" class="ml-2" width="18" />
                </div>
            </base-button>
        </div>

        <section class="my-16">
            <div class="flex flex-wrap gap-4 blog-categories-buttons">
                <base-button :variant="blogObject.travelTopicFlag === 'travelNews' ? 'primary' : 'neutral'
                    " size="small" class="rounded-lg" @click="travelTopicHandler('travelNews')">Travel news</base-button>
                <base-button :variant="blogObject.travelTopicFlag === 'travelPackage'
                        ? 'primary'
                        : 'neutral'
                    " size="small" class="rounded-lg" @click="travelTopicHandler('travelPackage')">Travel package</base-button>
                <base-button :variant="blogObject.travelTopicFlag === 'travelTips' ? 'primary' : 'neutral'
                    " size="small" class="rounded-lg" @click="travelTopicHandler('travelTips')">Travel tips</base-button>
                <base-button :variant="blogObject.travelTopicFlag === 'topDestinations'
                        ? 'primary'
                        : 'neutral'
                    " size="small" class="rounded-lg" @click="travelTopicHandler('topDestinations')">Top
                    destinations</base-button>
                <base-button :variant="blogObject.travelTopicFlag === 'placesToVisit'
                        ? 'primary'
                        : 'neutral'
                    " size="small" class="rounded-lg" @click="travelTopicHandler('placesToVisit')">Places to visit</base-button>
            </div>
        </section>
        <section class="mb-[90px]">
            <BlogTopicParentComponent />
        </section>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const blogObject = ref({
            emailAddress: "",
            travelTopicFlag: "travelNews",
        });
        // methods

        const travelTopicHandler = (flag: string) => {
            blogObject.value.travelTopicFlag = flag;
        };
        return {
            blogObject,
            travelTopicHandler,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/variables.scss";

.input-field {
    margin: 0;
    width: 300px;
}

input.inp-field {
    border-radius: 10px;
    border: 1px solid $primary;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05) !important;
    height: 58px;
    padding: 0 16px;
    box-sizing: border-box;
    color: #606161;
    //   margin-bottom: 20px;
    background: transparent;
    margin: 0;
}

.blog-top-wrapper button {
    height: 58px;
}
.blog-categories-buttons button {
    font-size: 14px;
}

#blog-page h1.page-title {
    text-align: left;
    letter-spacing: -2px;
}
</style>

<style>
@media(max-width: 600px) {
    .blog-top-wrapper button, 
    .blog-top-wrapper .input-field {
        width: 100%;
    }
    .blog-top-wrapper button .flex {
        justify-content: center;
    }
}
</style>