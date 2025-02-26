<template>
  <form @submit.prevent="submitForm" class="ticket-summary-side flex flex-col gap-[20px]">
    <div class="ticket-summary-block grid-div-2">
      <InputField v-model="formData.firstName" label="First name" divClass="checkout-inp-field-block" id="first-name"
        inputClass="checkout-inp-field" type="text" placeholder="John" :requiredSign="true" :required="true" />

      <InputField v-model="formData.middleName" label="Middle name" divClass="checkout-inp-field-block" id="middle-name"
        inputClass="checkout-inp-field" type="text" placeholder="Tom" :required="true" />

      <InputField v-model="formData.lastName" label="Last name" divClass="checkout-inp-field-block" id="last-name"
        inputClass="checkout-inp-field" type="text" placeholder="Doe" :requiredSign="true" :required="true" />

      <RadioField v-model="formData.gender" 
        :options="[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ]" divClass_2="flex-div gap-[20px]" 
      inputName="gender" mainLabel="Gender" :requiredSign="true" :required="true" />
    </div>

    <div class="ticket-summary-block">
      <div class="tsb-inp-wrapper grid-div-2">
        <div>
          <!-- <PhoneNumberField v-model="formData.phoneNumber" label="Phone number" :requiredSign="true" /> -->
           <InputField v-model="formData.phoneNumber" label="Phone number" :requiredSign="true" type="tel" id="phone"
            placeholder="+2348012345678" divClass="checkout-inp-field-block" inputClass="checkout-inp-field" :required="true" />
          <span class="text-[14px] text-[#848484]">
            You will receive text alerts about this trip
          </span>
        </div>

        <div>
          <InputField v-model="formData.email" label="Email" :requiredSign="true" type="email" id="email"
            placeholder="johndoe@company.com" divClass="checkout-inp-field-block" inputClass="checkout-inp-field" :required="true" />
          <span class="text-[14px] text-[#848484]">
            You will receive mail alerts about this trip
          </span>
        </div>

        <DatePickerField v-model="formData.dateOfBirth" label="Date of birth" :requiredSign="true" placeholder="dd/mm/yyyy"
          divClass="checkout-inp-field-block" id="dob" :maxDate="today" />

        <InputField v-model="formData.passportAuthority" label="Passport issuing authority" :requiredSign="true" type="text" id="passportAuthority"
          placeholder="Nigeria Immigration Service" divClass="checkout-inp-field-block" inputClass="checkout-inp-field" :required="true" />

        <InputField v-model="formData.passportNumber" label="Passport number" :requiredSign="true" type="text"
          id="passport-number" placeholder="Passport number" divClass="checkout-inp-field-block" inputClass="checkout-inp-field" />

        <DatePickerField v-model="formData.passportExpiryDate" label="Passport expiry date" :requiredSign="true"
          placeholder="dd/mm/yyyy" divClass="checkout-inp-field-block" id="passport-expiry-date" :minDate="today" />

        <SelectField v-model="formData.nationality" :options="nationalityOptions" label="Nationality" 
            id="nationality" :requiredSign="true" />
      </div>

      <slot name="ticket-detail"></slot>
    </div>

    <div class="ticket-summary-block">
      <div class="mb-[20px]">Membership Card Number / Promo Code</div>

      <div class="grid-div-2">
        <InputField v-model="formData.promoCode" label="Enter discount promo code" divClass="checkout-inp-field-block"
          id="discount-promo-code" inputClass="checkout-inp-field" type="text" placeholder="" />

        <InputField v-model="formData.corporateCode" label="Enter corporate code" divClass="checkout-inp-field-block"
          id="corporate-code" inputClass="checkout-inp-field" type="text" placeholder="" />
      </div>
    </div>

    <div class="ticket-summary-block text-[#848484] text-[14px]">
      <slot name="review-booking-notice"></slot>

      <div class="mt-[30px]">
        <label for="agree-to-terms">
          <input type="checkbox" id="agree-to-terms" v-model="formData.agreeToTerms" class="filled-in">
          <span>
            By clicking on the button below, I acknowledge that I have reviewed the <a href="#" class="pry-color">Privacy
              Statement ↗</a> and <a href="#" class="pry-color">Government Travel Advice↗</a> and have reviewed and accept
            the above <a href="#" class="pry-color">Rules & Restrictions and Terms of Use ↗</a>.
          </span>
        </label>
      </div>

      <div class="complete-booking-btn-wrapper mt-[15px]">
        <button 
          type="submit" 
          class="complete-booking-btn" 
          :disabled="!isFormValid || !formData.agreeToTerms || isFormLoading"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid || !formData.agreeToTerms || isFormLoading }"
        >
          <span v-if="!isFormLoading">Complete Booking</span>
          <span v-else class="btn-loading-spinner">
            <LoadingSpinner />
          </span>
        </button>
        <!-- <button type="button" class="mt-3" @click="console.log(formData)">Test</button> -->
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useApi } from '~/utils/api';
import dayjs from 'dayjs';

const api = useApi();

const props = defineProps({
  isFormLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['form-submitted']);

const formData = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  email: '',
  dateOfBirth: '',
  passportAuthority: '',
  passportNumber: '',
  passportExpiryDate: '',
  nationality: '',
  promoCode: '',
  corporateCode: '',
  agreeToTerms: false
});

const nationalityOptions = ref([]);
const isLoading = ref(false);

const requiredFields = [
  'firstName',
  'lastName',
  'gender',
  'phoneNumber',
  'email',
  'dateOfBirth',
  'passportAuthority',
  'passportNumber',
  'passportExpiryDate',
  'nationality'
];

const isFormValid = computed(() => {
  return requiredFields.every(field => !!formData.value[field]) && formData.value.agreeToTerms;
});

onMounted(async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    nationalityOptions.value = data.map(country => ({
      value: country.cca2,
      label: country.name.common
    })).sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error('Error fetching nationalities:', error);
  }
});

const today = computed(() => {
  return dayjs().format('YYYY-MM-DD');
});

// Helper function to format date from dd/mm/yyyy to YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return ''; // Handle empty dates
  const [day, month, year] = dateString.split('/');
  return dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
};

const submitForm = async () => {
  if (validateForm()) {
    // Format dateOfBirth and passportExpiryDate before emitting
    const formattedFormData = {
      ...formData.value,
      dateOfBirth: formatDate(formData.value.dateOfBirth),
      passportExpiryDate: formatDate(formData.value.passportExpiryDate),
    };

    emit('form-submitted', formattedFormData);
  }
};

const validateForm = () => {
  let isValid = true;
  let firstInvalidField = null;

  for (const field of requiredFields) {
    if (!formData.value[field]) {
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    }
  }

  if (!isValid) {
    const element = document.getElementById(firstInvalidField);
    if (element) {
      element.focus();
    }
    alert('Please fill in all required fields');
  }

  return isValid && formData.value.agreeToTerms;
};
</script>