<template>
  <div class="select-field rel" :class="divClass">
    <label>
      {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
    </label>
    <select class="select-inp" :class="altClass" :value="value" @change="changeHandler">
      <option v-for="option in options" :value="option[selectKey]" :key="option[selectKey]">
        {{ option[selectName] }}
      </option>
    </select>
    <SvgIcons icon="caret" />
  </div>
</template>

<script>
import M from "materialize-css";

export default {
  name: "SelectField",
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    divClass: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      default: "",
      required: false,
    },
    selectKey: {
      type: String,
      default: "value",
    },
    selectName: {
      type: String,
      default: "label",  // Updated default to "label" to match typical usage
    },
    requiredSign: {
      type: Boolean,
      default: false,
    },
    altClass: {
      type: String,
      default: "",
    },
  },
  mounted() {
    const elemsDropdown1 = document.querySelectorAll("select");
    M.FormSelect.init(elemsDropdown1, {
      dropdownOptions: {
        coverTrigger: false,
      },
    });
  },
  methods: {
    changeHandler(e) {
      this.$emit("update:modelValue", e.target.value); // Use "update:modelValue" for v-model compatibility
    },
  },
};
</script>

<style></style>
