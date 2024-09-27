<template>
  <div class="input-field-div" :class="divClass">
    <label :for="id">{{ label }}</label>
    <a-date-picker 
      :value="dateValue" 
      @change="changeHandler" 
      format="YYYY-MM-DD"  
    />
  </div>
</template>

<script>
import { computed } from 'vue';
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
  },
  setup(props, { emit }) {
    const dateValue = computed(() => {
      return props.modelValue ? dayjs(props.modelValue) : null;
    });

    const changeHandler = (date, dateString) => {
      emit("update:modelValue", dateString);
    };

    return {
      dateValue,
      changeHandler,
    };
  },
};
</script>