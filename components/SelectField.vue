<template>
  <div class="select-field rel" :class="divClass">
    <label>
      {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
    </label>
    <select class="select-inp" :class="altClass" v-model="selectedValue" ref="select">
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
    modelValue: {
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
      default: "label",
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
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },
  watch: {
    options: {
      handler() {
        this.$nextTick(() => {
          this.initializeSelect();
        });
      },
      deep: true,
    },
    selectedValue(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue(newValue) {
      this.selectedValue = newValue;
    },
  },
  mounted() {
    this.initializeSelect();
  },
  methods: {
    initializeSelect() {
      if (this.$refs.select) {
        M.FormSelect.init(this.$refs.select, {
          dropdownOptions: {
            coverTrigger: false,
          },
        });
      }
    },
  },
};
</script>

<style>
.select-field .dropdown-content {
  border-radius: 6px;
}
</style>