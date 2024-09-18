<template>
    <div class="datepicker-field-div" :class="divClass">
        <label>
            {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
        </label>

        <a-date-picker v-model:value="value" :placeholder="placeholder" :id="id" format="DD/MM/YYYY" />
    </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue';

export default {
    name: "DatePickerField",
    data() {
        return {
            value: ""
        }
    },
    components: {
        DatePicker
    },
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: "date"
        },
        divClass: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: ""
        },
        requiredSign: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style></style>