<template>
  <div class="input-field-div" :class="divClass">
    <label :for="id">{{ label }}</label>
    <!-- <input
      :type="type"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :class="inputClass"
      :value="value"
      @input="inputHandler"
    /> -->
    <a-date-picker :value="value" @change="changeHandler" format="DD-MMM-YYYY"  />
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "InputField",
  props: {
    id: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    inputClass: {
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
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeHandler(date, dateString) {
      const formattedDate = dayjs(date).format('DD-MM-YYYY'); // Use your desired format here
      this.$emit("input", dateString, formattedDate);
    },
  },
};
</script>
