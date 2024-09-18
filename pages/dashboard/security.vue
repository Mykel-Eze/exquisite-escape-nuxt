<template>
    <div id="security-page" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/security', text: 'Security' },
                    ]" />
                    <h2 class="dashboard-page-title">Security</h2>
                    <p class="dashboard-page-title-desc">
                        Edit your account security preferences
                    </p>
                </div>

                <div class="settings-content-wrapper mt-[60px]">
                    <div class="settings-content-block change-password-block">
                        <div class="block-header">
                            <h4>Change Password</h4>
                            <span>Change your current password</span>
                        </div>

                        <form @submit.prevent="changePassword" id="change-password-form">
                            <div class="current-field-wrapper">
                                <PasswordField
                                    v-model="currentPassword"
                                    id="current_password"
                                    placeholder="Current Password"
                                />
                            </div>
                            <div class="new-field-wrapper">
                                <div class="mb-[10px]">
                                    <PasswordField
                                        v-model="newPassword"
                                        id="new_password"
                                        placeholder="New Password"
                                        @input="validateNewPassword"
                                    />
                                    <p v-if="newPasswordError" class="error-message">{{ newPasswordError }}</p>
                                </div>
                                
                                <div>
                                    <PasswordField
                                        v-model="repeatPassword"
                                        id="repeat_password"
                                        placeholder="Repeat New Password"
                                        @input="validateRepeatPassword"
                                    />
                                    <p v-if="repeatPasswordError" class="error-message">{{ repeatPasswordError }}</p>
                                </div>
                            </div>
                            <div class="right-align mt-[40px]">
                                <button type="submit" :disabled="!isFormValid" class="submit-button">Change Password</button>
                            </div>
                        </form>
                    </div>

                    <div class="_2fa-n-deactivate-blocks">
                        <div class="settings-content-block 2fa-block">
                            <div class="block-header">
                                <h4>Two-Factor authentication (2FA)</h4>
                                <span>Decide your prefered method of receiving one time passwords (OTP)</span>
                            </div>
                            <div class="_2fa-options">
                                <div>
                                    <label>
                                        <input 
                                            class="with-gap" 
                                            name="_2fa-option" 
                                            type="radio" 
                                            value="email-sms"
                                            v-model="selectedOption"
                                        />
                                        <span>Receive OTP via email and SMS</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input 
                                            class="with-gap" 
                                            name="_2fa-option" 
                                            type="radio" 
                                            value="authenticator-app"
                                            v-model="selectedOption"
                                        />
                                        <span>Receive OTP via authenticator app</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="settings-content-block deactivate-block">
                            <div class="block-header">
                                <h4 class="pry-color">Deactivate account</h4>
                                <span>How would you like to deactivate your Kiakia account</span>
                            </div>
                            <div class="deactivate-options">
                                <div class="flex-div gap-[4px] pry-color cursor-pointer">
                                    <img src="@/assets/images/icons/disable-account.svg" alt="icon">
                                    <span>Temporarily disable account </span>
                                </div>
                                <div class="flex-div gap-[4px] pry-color cursor-pointer">
                                    <img src="@/assets/images/icons/close-account.svg" alt="icon">
                                    <span>Close account </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "security",
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            repeatPassword: '',
            newPasswordError: '',
            repeatPasswordError: '',
            selectedOption: ''
        }
    },
    computed: {
        isFormValid() {
            return this.currentPassword && this.newPassword && this.repeatPassword && 
                   !this.newPasswordError && !this.repeatPasswordError;
        }
    },
    methods: {
        validateNewPassword() {
            if (this.newPassword.length < 8) {
                this.newPasswordError = 'Password must be at least 8 characters long';
            } else if (!/\d/.test(this.newPassword)) {
                this.newPasswordError = 'Password must contain at least one number';
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword)) {
                this.newPasswordError = 'Password must contain at least one special character';
            } else {
                this.newPasswordError = '';
            }
            this.validateRepeatPassword();
        },
        validateRepeatPassword() {
            if (this.repeatPassword !== this.newPassword) {
                this.repeatPasswordError = 'Passwords do not match';
            } else {
                this.repeatPasswordError = '';
            }
        },
        changePassword() {
            if (this.isFormValid) {
                // Implement password change logic here
                console.log('Password change submitted');
            }
        }
    }
}
</script>

<style scoped>
.submit-button {
    padding: 10px 20px;
    background-color: var(--pry-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    width: 192px;
    height: 48px;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>