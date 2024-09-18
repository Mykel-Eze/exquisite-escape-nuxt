<template>
    <div id="profile-info" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/profile-info', text: 'Profile info' },
                    ]" />
                    <h2 class="dashboard-page-title">Profile info</h2>
                    <p class="dashboard-page-title-desc">
                        Provide personal details and how we can reach you
                    </p>
                </div>

                <hr class="dashboard-page-divider" />

                <div class="profile-items-wrapper">
                    <ProfileItemBlock 
                        title="Full name" 
                        description="This updates your full name, please note that it should be the same and the name on your government ID"
                        label="Full name"
                        id="full-name" 
                        type="text" 
                        :value="fullName"
                        @update:value="fullName = $event"
                    />

                    <ProfileItemBlock 
                        title="Email address" 
                        description="Enter your email address"
                        label="Email Address"
                        id="email" 
                        type="email" 
                        :value="email"
                        @update:value="email = $event"
                    />

                    <ProfileItemBlock 
                        title="Phone number" 
                        description="Enter your phone number"
                        label="Phone number"
                        id="phone" 
                        type="tel" 
                        :value="phone"
                        @update:value="phone = $event"
                    />

                    <ProfileItemBlock 
                        title="Government ID" 
                        description="Change uploaded document"
                        label="Upload file"
                        id="upload-file" 
                        type="file" 
                        :value="file"
                        @update:value="file = $event"
                    />

                    <ProfileItemBlock 
                        title="Address" 
                        description="Enter your residential address"
                        label="Address"
                        id="address" 
                        type="text" 
                        :value="address"
                        @update:value="address = $event"
                    />

                    <ProfileItemBlock 
                        title="Emergency contact" 
                        description="Enter the phone number of someone close to you that we can reach out to if there is an emergency"
                        label="Emergency phone number"
                        id="emergency-phone" 
                        type="tel" 
                        :value="emergency_phone"
                        @update:value="emergency_phone = $event"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileInfoPage",
    layout: "authLayout",
    data() {
        return {
            fullName: "Kehinde Olagoke",
            email: "kenzo@gmail.com",
            phone: "+2348192039393",
            file: "IntPassport.jpg",
            address: "",
            emergency_phone: ""
        }
    }
}
</script>

<style>

</style>