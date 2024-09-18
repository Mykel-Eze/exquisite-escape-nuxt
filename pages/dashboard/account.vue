<template>
    <div id="account-overview-page" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="account-overview-content container">
                    <div class="account-page-header">
                        <h1 class="account-page-title">Account</h1>
                        <p v-if="user" class="account-page-title-desc">
                            Welcome {{ user.name }}, {{ user.email }} · <NuxtLink to="#" class="underline">Go to profile
                            </NuxtLink>
                        </p>
                        <p v-else class="account-page-title-desc">
                            Loading user information...
                        </p>
                    </div>

                    <div class="account-items-wrapper">
                        <NuxtLink to="/dashboard/profile-info" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/profile-icon.svg" alt="profile-icon" class="aib-icon">
                            <div class="aib-title">Profile</div>
                            <p class="aib-desc">
                                Provide personal details and how we can reach you
                            </p>
                        </NuxtLink>
                        <NuxtLink to="/dashboard/flights-history" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/airplane-icon.svg" alt="airplane-icon" class="aib-icon">
                            <div class="aib-title">Flights</div>
                            <p class="aib-desc">
                                Update your password and secure your account
                            </p>
                        </NuxtLink>
                        <NuxtLink to="/dashboard/hotel-and-tours" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/location-icon.svg" alt="location-icon" class="aib-icon">
                            <div class="aib-title">Hotel and Tours</div>
                            <p class="aib-desc">
                                Update your password and secure your account
                            </p>
                        </NuxtLink>

                        <NuxtLink to="" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/user-icon.svg" alt="user-icon" class="aib-icon">
                            <div class="aib-title">Travelers</div>
                            <p class="aib-desc">
                                All your contacts and saved recipients on Exquisite Escape account
                            </p>
                        </NuxtLink>

                        <NuxtLink to="" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/location-icon.svg" alt="location-icon" class="aib-icon">
                            <div class="aib-title">Transfer</div>
                            <p class="aib-desc">
                                Update your password and secure your account
                            </p>
                        </NuxtLink>

                        <NuxtLink to="/dashboard/payments" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/wallet-icon.svg" alt="wallet-icon" class="aib-icon">
                            <div class="aib-title">Payments</div>
                            <p class="aib-desc">
                                You get to Setup and manage all payments here
                            </p>
                        </NuxtLink>
                        <NuxtLink to="/dashboard/notifications" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/notification-icon.svg" alt="notification-icon"
                                class="aib-icon">
                            <div class="aib-title">Notifications</div>
                            <p class="aib-desc">
                                Choose notification preferences and how you want to be contacted
                            </p>
                        </NuxtLink>

                        <NuxtLink to="/dashboard/security" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/security-icon.svg" alt="security-icon" class="aib-icon">
                            <div class="aib-title">Security</div>
                            <p class="aib-desc">
                                Update your password and secure your account
                            </p>
                        </NuxtLink>
                        <NuxtLink to="" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/help-icon.svg" alt="help-icon" class="aib-icon">
                            <div class="aib-title">Support</div>
                            <p class="aib-desc">
                                Need help with a recent activity? or talk to our support team
                            </p>
                        </NuxtLink>

                        <NuxtLink to="/dashboard/booking-history" class="account-item-block hover-scale">
                            <img src="@/assets/images/icons/booking-history-icon.svg" alt="help-icon" class="aib-icon">
                            <div class="aib-title">Booking history</div>
                            <p class="aib-desc">
                                Check out the list of all your previous <br class="hidden-xs"> bookings
                            </p>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/auth/useAuth'

const auth = useAuth()
const user = ref(null)

onMounted(async () => {
    try {
        // Assuming your useAuth composable has a method to get the current user
        // If it doesn't, you might need to implement one or use an existing API call
        user.value = await auth.getCurrentUser()
    } catch (error) {
        console.error('Failed to fetch user data:', error)
    }
})

definePageMeta({
    layout: "auth-layout"
})
</script>

<style src="~/assets/css/dashboard.css"></style>