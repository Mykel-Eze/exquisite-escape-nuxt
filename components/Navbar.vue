<template>
  <div>
    <nav class="main-nav">
        <div class="container">
            <div class="nav-wrapper flex-div justify-between">
                <nuxt-link to="/" class="brand-logo" @click="scrollToTop()">
                    <img src="~/assets/images/exquisite-escape-logo.png" alt="Exquisite Escape" class="logo">
                </nuxt-link>

                <a rel="noopener"
                    href="#"
                    data-target="slide-out"
                    class="sidenav-trigger sec-color right"
                >
                  <SvgIcons icon="menu" />
                </a>

                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <nuxt-link to="/" class="" @click="scrollToTop()">Book Flight</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="" @click="scrollToTop()">Find Hotel</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/affiliate" class="" @click="scrollToTop()">Become an Affiliate</nuxt-link>
                    </li>
                    <li>
                        <a href="#" class="dropdown-trigger" data-target="company-dropdown" @click="scrollToTop()">
                          <div class="flex-div">
                            <span>Company</span>
                            <img src="~/assets/images/caret-down-green.svg" alt="caret" class="nav-caret-icon">
                          </div>
                        </a>

                        <!-- Dropdown Structure -->
                        <ul id="company-dropdown" class="dropdown-content">
                          <li><a href="#!">Item 1</a></li>
                          <li><a href="#!">Ittem 2</a></li>
                          <li><a href="#!">Ittem 3</a></li>
                        </ul>
                    </li>
                    <li>
                        <nuxt-link to="/help" class="" @click="scrollToTop()">Help</nuxt-link>
                    </li>
                </ul>

                <ul id="nav-mobile-2" class="right hide-on-med-and-down flex-div gap-2">
                    <li class="rel">
                      <button class="menu-user-btn flex-div">
                          <img src="~/assets/images/menu.svg" alt="menu" class="top-nav-menu">
                          <img src="~/assets/images/no-user-pix.svg" alt="user" class="user-icon">
                      </button>
                    </li>
                    <li class="rel">
                      <div class="flex-div language-div sec-color text-[10px] gap-1">
                        <img src="~/assets/images/globe.svg" alt="globe" class="globe-icon">
                        <span>EN</span>
                      </div>
                    </li>
                </ul>
              </div>
        </div>
    </nav>

    <ul id="slide-out" class="sidenav">
        <div class="center sidenav-logo">
            <nuxt-link to="/" class="sidenav-close" @click="scrollToTop()">
                <img src="~/assets/images/exquisite-escape-logo.png" alt="Exquisite Escape" class="logo m-auto">
            </nuxt-link>
        </div>
        <li>
            <nuxt-link to="/" class="sidenav-close" @click="scrollToTop()">Home</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/#" class="sidenav-close" @click="scrollToTop()">Book Flight</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/#" class="sidenav-close" @click="scrollToTop()">Find Hotel</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/affiliate" class="sidenav-close" @click="scrollToTop()">Become an Affiliate</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/#" class="sidenav-close" @click="scrollToTop()">Company</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/help" class="sidenav-close" @click="scrollToTop()">Help</nuxt-link>
        </li>
        <li class="hire-us-li hul-2">
            <div class="flex-div gap-2 justify-center">
              <button class="menu-user-btn flex-div">
                  <img src="~/assets/images/menu.svg" alt="menu" class="top-nav-menu">
                  <img src="~/assets/images/no-user-pix.svg" alt="user" class="user-icon">
              </button>

              <div class="flex-div language-div sec-color text-[10px] gap-1">
                <img src="~/assets/images/globe.svg" alt="globe" class="globe-icon">
                <span>EN</span>
              </div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "NavbarComponent",

  mounted() {
    document.addEventListener('DOMContentLoaded', function() {
      var elemsSidenav = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elemsSidenav);

      var elemsDropdown = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elemsDropdown, {
        coverTrigger: false,
      });
    });
  },
  methods:{
    scrollToTop() {
        window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped src="~/assets/css/navbar.css"></style>
