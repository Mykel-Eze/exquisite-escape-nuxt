<template>
  <section id="why-join-affiliate">
    <div class="row">
        <div class="container">
            <div class="section-header text-center max-w-[846px] mx-auto">
                <h3 class="section-title text-[40px]">Why join Exquisite Escape’s affiliate program?</h3>
                <p class="section-title-desc text-[24px]">
                    Become a part of Exquisite Escape's affiliate program and gain access to a wide range
                    of products and user-friendly tools.
                </p>
            </div>
        </div>

        <div class="affiliate-banner my-[30px]">
            <img src="@/assets/images/happy-man-banner.png" alt="happy-man-banner" class="full-width">
        </div>

        <div class="container">
            <div class="affiliate-reasons-banner">
                <div class="affiliate-reasons-block">
                    <div class="arb-title">Join the program</div>
                    <p class="arb-desc">
                        Apply for our affiliate program today and enjoy instant access to a suite of tools, including
                        trackable links, widgets, and website banners. <br>
                        <NuxtLink to="/affiliate/register" class="pry-color underline">Join now ↗</NuxtLink>
                    </p>
                </div>

                <div class="affiliate-reasons-block">
                    <div class="arb-title">Share to customers</div>
                    <p class="arb-desc">
                        Utilize our affiliate tools to channel traffic from your website or social platforms to Exqusite Escape
                    </p>
                </div>

                <div class="affiliate-reasons-block">
                    <div class="arb-title">Start earning</div>
                    <p class="arb-desc">
                        Unlock a lucrative revenue opportunity with commissions earned for each eligible booking originating
                        from your website, links, or widgets. Monitor your performance and earnings
                    </p>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "WhyJoinAffiliateSection"
}
</script>

<style>

</style>