<template>
  <div class="input-field-div" :class="divClass">
    <label :for="id">{{ label }}</label>
    <a-date-picker 
      :value="displayValue" 
      @change="changeHandler" 
      :format="displayFormat"
      :disabled-date="disabledDate"
    />
    <input 
      type="hidden" 
      :name="id" 
      :value="hiddenValue"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import dayjs from "dayjs";

export default {
  name: "DatePicker",
  props: {
    id: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    divClass: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    minDate: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const displayFormat = "DD-MMM-YYYY";
    const hiddenFormat = "YYYY-MM-DD";

    const displayValue = computed(() => {
      return props.modelValue ? dayjs(props.modelValue, hiddenFormat) : null;
    });

    const hiddenValue = computed(() => {
      return props.modelValue || '';
    });

    const changeHandler = (date, dateString) => {
      const formattedDate = date ? date.format(hiddenFormat) : '';
      emit("update:modelValue", formattedDate);
    };

    const disabledDate = (current) => {
      const today = dayjs().startOf('day');
      const minDate = props.minDate ? dayjs(props.minDate, hiddenFormat) : today;
      return current && current < minDate;
    };

    return {
      displayValue,
      hiddenValue,
      changeHandler,
      disabledDate,
      displayFormat,
    };
  },
};
</script>