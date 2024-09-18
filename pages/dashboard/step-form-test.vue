<template>
  <div class="step-form">
    <div v-if="currentStep > 1" class="step-indicators">
      <div 
        v-for="step in 6" 
        :key="step" 
        :class="['step-indicator', { 'completed': step < currentStep, 'active': step <= currentStep }]"
      >
        {{ step }}
      </div>
    </div>

    <div class="form-content">
      <template v-if="currentStep === 1">
        <h2>Personal Information</h2>
        <input v-model="formData.fullName" placeholder="Full Name" />
        <input v-model="formData.dob" type="date" placeholder="Date of Birth" />
        <select v-model="formData.gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </template>

      <template v-else-if="currentStep === 2">
        <h2>Company Information</h2>
        <input v-model="formData.companyName" placeholder="Company Name" />
        <input v-model="formData.position" placeholder="Position" />
        <input v-model="formData.yearsOfExperience" type="number" placeholder="Years of Experience" />
      </template>

      <template v-else-if="currentStep === 3">
        <h2>Contact Information</h2>
        <input v-model="formData.email" type="email" placeholder="Email" />
        <input v-model="formData.phone" placeholder="Phone Number" />
        <textarea v-model="formData.address" placeholder="Address"></textarea>
      </template>

      <template v-else-if="currentStep === 4">
        <h2>Next of Kin Information</h2>
        <input v-model="formData.kinName" placeholder="Next of Kin Name" />
        <input v-model="formData.kinRelationship" placeholder="Relationship" />
        <input v-model="formData.kinPhone" placeholder="Next of Kin Phone Number" />
      </template>

      <template v-else-if="currentStep === 5">
        <h2>Other Information</h2>
        <textarea v-model="formData.hobbies" placeholder="Hobbies"></textarea>
        <input v-model="formData.favoriteColor" placeholder="Favorite Color" />
        <input v-model="formData.petName" placeholder="Pet Name (if any)" />
      </template>

      <template v-else-if="currentStep === 6">
        <h2>Preview</h2>
        <div v-for="(value, key) in formData" :key="key" class="preview-item">
          <strong>{{ formatLabel(key) }}:</strong> {{ value }}
        </div>
      </template>
    </div>

    <div class="form-actions">
      <button @click="cancel" class="cancel-btn">Cancel</button>
      <button v-if="currentStep > 1" @click="back" class="back-btn">Back</button>
      <button @click="next" class="next-btn">
        {{ currentStep === 6 ? 'Submit' : 'Continue' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 6,
      formData: {
        fullName: '',
        dob: '',
        gender: '',
        companyName: '',
        position: '',
        yearsOfExperience: '',
        email: '',
        phone: '',
        address: '',
        kinName: '',
        kinRelationship: '',
        kinPhone: '',
        hobbies: '',
        favoriteColor: '',
        petName: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    back() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    next() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      } else {
        console.log('Form submitted', this.formData)
        // Handle form submission here
      }
    },
    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str) { return str.toUpperCase(); })
        .replace(/([a-z])([A-Z])/g, '$1 $2')
    }
  }
}
</script>

<style scoped>
.step-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.step-indicators {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.step-indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.step-indicator.active {
  background-color: #007bff;
  color: white;
}

.step-indicator.completed {
  background-color: green;
  color: white;
}

.step-indicator:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  width: calc(100% - 30px);
  height: 2px;
  background-color: #e0e0e0;
}

.step-indicator.active:not(:last-child)::after {
  background-color: #007bff;
}

.form-content {
  margin-bottom: 30px;
}

.form-content input,
.form-content select,
.form-content textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.back-btn {
  background-color: #e0e0e0;
}

.next-btn {
  background-color: #007bff;
  color: white;
}

.preview-item {
  margin-bottom: 10px;
}
</style>