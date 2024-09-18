<template>
  <footer id="footer">
    <div class="row mag-0">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-block">
                    <div class="footer-block-title">Support</div>
                    <ul class="footer-block-links">
                        <li>
                            <nuxt-link to="/help" class="footer-link" @click="scrollToTop()">Help Center</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/help/topics" class="footer-link" @click="scrollToTop()">Cancel your flight</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/help/topics" class="footer-link" @click="scrollToTop()">Contact customer care</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/help/topics" class="footer-link" @click="scrollToTop()">Cancel your transfer booking </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/help/topics" class="footer-link" @click="scrollToTop()">Cancel your hotel booking</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/help/topics" class="footer-link" @click="scrollToTop()">Refund timeline and polices & process</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="footer-block">
                    <div class="footer-block-title">Exquisite Escape</div>
                    <ul class="footer-block-links">
                        <li>
                            <nuxt-link to="/about" class="footer-link" @click="scrollToTop()">About us</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/blog" class="footer-link" @click="scrollToTop()">Blog</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/careers" class="footer-link" @click="scrollToTop()">Jobs</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Contact us </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Press</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Feedback</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="footer-block">
                    <div class="footer-block-title">Explore</div>
                    <ul class="footer-block-links">
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Hotels</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Flights</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Tours</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Transfers</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Packages</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="footer-block">
                    <div class="footer-block-title">Account</div>
                    <ul class="footer-block-links">
                        <li>
                            <nuxt-link to="/signin" class="footer-link" @click="scrollToTop()">My account</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/#" class="footer-link" @click="scrollToTop()">Become an affliiate</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-note-wrapper flex-div justify-between">
                <div class="footer-copyright-side">
                    © 2023 Exquisite Escape an Applause Global Services Company · 
                    <a href="#">Terms</a>  · <a href="#">Sitemap</a> ·  <a href="#">Privacy</a>
                </div>

                <div class="footer-social-side flex-div gap-[20px]">
                    <div class="flex-div gap-[6px]">
                        <img src="~/assets/images/globe.svg" alt="globe" class="globe-icon">
                        <span>English (US)</span>
                    </div>
                    <div>$ USD</div>
                    <ul class="footer-social-links flex-div gap-[10px]">
                        <li>
                            <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src="~/assets/images/x.svg" alt="twitter" class="social-icon">
                            </a>
                        </li>
                        <li>
                            <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="~/assets/images/fb.svg" alt="facebook" class="social-icon">
                            </a>
                        </li>
                        <li>
                            <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="~/assets/images/ig.svg" alt="instagram" class="social-icon">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: "FooterCompoent",
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>

<style scoped src="~/assets/css/footer.css"></style>
