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
                        <a href="#" class="dropdown-trigger company-dropdown-trigger" data-target="company-dropdown" @click="scrollToTop()">
                          <div class="flex-div">
                            <span>Company</span>
                            <img src="~/assets/images/caret-down-green.svg" alt="caret" class="nav-caret-icon">
                          </div>
                        </a>

                        <!-- Dropdown Structure -->
                        <ul id="company-dropdown" class="dropdown-content">
                          <li>
                            <NuxtLink to="#!">
                              <div>Our Story</div>
                              <small>Know more about the Exquisite Escape</small>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="#!">
                              <div>Customer stories</div>
                              <small>What the customers say about us</small>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="#!">
                              <div>Careers</div>
                              <small>Join the exceptional Exquisite Escape</small>
                            </NuxtLink>
                          </li>
                          <li>
                            <NuxtLink to="#!">
                              <div>Press</div>
                              <small>Giant strides from the Exquisite Escape</small>
                            </NuxtLink>
                          </li>
                        </ul>
                    </li>
                    <li>
                        <nuxt-link to="/help" class="" @click="scrollToTop()">Help</nuxt-link>
                    </li>
                </ul>

                <ul id="nav-mobile-2" class="right hide-on-med-and-down flex-div gap-2">
                    <li class="rel">
                      <button class="menu-user-btn flex-div dropdown-trigger menu-dropdown-trigger" data-target="menu-dropdown-1">
                        <img src="~/assets/images/menu.svg" alt="menu" class="top-nav-menu">
                        <img src="~/assets/images/no-user-pix.svg" alt="user" class="user-icon">
                      </button>

                       <!-- Dropdown for logged-out users -->
                      <ul v-if="!isLoggedIn" id="menu-dropdown-1" class="dropdown-content menu-dropdown">
                        <li>
                          <NuxtLink to="/signup">Sign Up</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/signin">Login</NuxtLink>
                        </li>
                        <hr class="divider"/>
                        <li>
                          <NuxtLink to="/help">Help</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="#!">Invite friends</NuxtLink>
                        </li>
                      </ul>

                      <!-- Dropdown for logged-in users -->
                      <ul v-else id="menu-dropdown-1" class="dropdown-content menu-dropdown">
                        <li>
                          <NuxtLink to="/dashboard/account">Account</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/dashboard/notifications">Notifications</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/dashboard/flights-history">Bookings</NuxtLink>
                        </li>
                        <hr class="divider"/>
                        <li>
                          <NuxtLink to="/dashboard/profile-info">Profile</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="#!">Invite friends</NuxtLink>
                        </li>
                        <hr class="divider"/>
                        <li>
                          <NuxtLink to="/dashboard/payments">Payments</NuxtLink>
                        </li>
                        <li>
                          <NuxtLink to="/help">Help</NuxtLink>
                        </li>
                        <li>
                          <a href="#" @click.prevent="logout">Logout</a>
                        </li>
                      </ul>
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
              <div>
                <button class="menu-user-btn flex-div dropdown-trigger menu-dropdown-trigger" data-target="menu-dropdown-2">
                  <img src="~/assets/images/menu.svg" alt="menu" class="top-nav-menu">
                  <img src="~/assets/images/no-user-pix.svg" alt="user" class="user-icon">
                </button>

                <!-- Dropdown for logged-out users -->
                <ul v-if="!isLoggedIn" id="menu-dropdown-2" class="dropdown-content menu-dropdown">
                  <li>
                    <NuxtLink to="/signup" class="sidenav-close">Sign Up</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/signin" class="sidenav-close">Login</NuxtLink>
                  </li>
                  <hr class="divider"/>
                  <li>
                    <NuxtLink to="/help" class="sidenav-close">Help</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="#!" class="sidenav-close">Invite friends</NuxtLink>
                  </li>
                </ul>

                <!-- Dropdown for logged-in users -->
                <ul v-else id="menu-dropdown-2" class="dropdown-content menu-dropdown">
                  <li>
                    <NuxtLink to="/dashboard/account" class="sidenav-close">Account</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/dashboard/notifications" class="sidenav-close">Notifications</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/dashboard/flights-history" class="sidenav-close">Bookings</NuxtLink>
                  </li>
                  <hr class="divider"/>
                  <li>
                    <NuxtLink to="/dashboard/profile-info" class="sidenav-close">Profile</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="#!" class="sidenav-close">Invite friends</NuxtLink>
                  </li>
                  <hr class="divider"/>
                  <li>
                    <NuxtLink to="/dashboard/payments" class="sidena-close">Payments</NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/help" class="sidena-close">Help</NuxtLink>
                  </li>
                  <li>
                    <a href="#" @click.prevent="logout">Logout</a>
                  </li>
                </ul>
              </div>

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
import { useAuth } from '~/composables/auth/useAuth';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

export default {
  name: "NavbarComponent",

  setup() {
    const auth = useAuth();
    const authStore = useAuthStore();
    const router = useRouter();
    const isLoggedIn = ref(authStore.isAuthenticated);

    const initAllDropdowns = () => {
      const elemsDropdown1 = document.querySelector('.company-dropdown-trigger');
      if (elemsDropdown1) {
        M.Dropdown.init(elemsDropdown1, {
          coverTrigger: false,
          constrainWidth: false
        });
      }
      
      const elemsDropdown2 = document.querySelectorAll('.menu-dropdown-trigger');
      elemsDropdown2.forEach(el => {
        M.Dropdown.init(el, {
          coverTrigger: false,
          constrainWidth: false
        });
      });
    };

    const initDropdownsWithDelay = () => {
      setTimeout(() => {
        initAllDropdowns();
      }, 100); // 100ms delay
    };

    const logout = async () => {
      try {
        await auth.logout();
        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    onMounted(() => {
      const elemsSidenav = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elemsSidenav);
      initAllDropdowns();
    });

    watch(() => authStore.isAuthenticated, (newValue) => {
      isLoggedIn.value = newValue;
      nextTick(() => {
        initDropdownsWithDelay();
      });
    });

    return {
      isLoggedIn,
      logout,
      scrollToTop: () => {
        window.scrollTo(0, 0);
      }
    };
  }
};
</script>

<style scoped src="~/assets/css/navbar.css"></style>

<style scoped>
.dropdown-content {
  top: 66px !important;
}
</style>
