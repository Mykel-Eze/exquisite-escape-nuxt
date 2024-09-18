<template>
    <div id="otp-modal" class="modal form-modal otp-modal">
        <div class="modal-content">
            <div class="flex flex-col gap-[5px] mb-[20px] items-center">
                <img src="~/assets/images/featured-email-icon.png" alt="email-icon" class="featured-icon w-[48px]">
                <h4 class="title">Please check your email.</h4>
                <p class="subtitle">We've sent a code to {{ email }}</p>
            </div>
            
            <div class="otp-input">
                <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    v-model="otpDigits[index]"
                    type="text"
                    maxlength="1"
                    @input="onInput(index)"
                    @keydown="onKeyDown($event, index)"
                    ref="inputs"
                />
            </div>
            
            <p class="resend text-[14px]">
                Didn't get a code? 
                <a href="#" class="text-[#848484]" @click.prevent="resendCode">
                    <u class="bold-txt">Click to resend.</u>
                </a>
            </p>
            
            <div class="actions">
                <button class="cancel modal-close" @click="cancel">Cancel</button>
                <button class="verify" @click="verify" :disabled="!isComplete">Verify</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      otpDigits: ['', '', '', ''],
      email: 'olivia@untitledui.com' // Replace with actual email or make it a prop
    }
  },
  computed: {
    isComplete() {
      return this.otpDigits.every(digit => digit !== '')
    }
  },
  methods: {
    onInput(index) {
      if (this.otpDigits[index] && index < 3) {
        this.$refs.inputs[index + 1].focus()
      }
    },
    onKeyDown(event, index) {
      if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
        this.$refs.inputs[index - 1].focus()
      }
    },
    resendCode() {
      // Implement resend logic here
      console.log('Resending code...')
    },
    cancel() {
      // Implement cancel logic here
      console.log('Cancelled')
    },
    verify() {
      if (this.isComplete) {
        const otp = this.otpDigits.join('')
        // Implement verification logic here
        console.log('Verifying OTP:', otp)
      }
    }
  }
}
</script>

<style scoped>
.otp-modal {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}
.title {
  font-size: 18px;
  letter-spacing: 0;
  margin-bottom: 0;
}
.subtitle {
  color: #848484;
  font-size: 14px;
}
.otp-input {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
}
.otp-input input {
    width: 70px;
    height: 70px;
    font-size: 48px;
    text-align: center;
    border: 1px solid #CCEDEB;
    border-radius: 8px;
    color: var(--pry-color);
    box-shadow: none !important;
    outline: none;
}
.actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 30px;
}
.actions button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}
.cancel {
  color: #545454;
  border: 1px solid #545454;
  background-color: transparent !important;
}
.verify {
  background-color: var(--pry-color);
  color: white;
}
.verify:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>