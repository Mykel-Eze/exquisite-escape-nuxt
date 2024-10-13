<template>
    <div class="datepicker-field-div" :class="divClass">
        <label>
            {{ label }} <sup v-if="requiredSign" class="required-sign">*</sup>
        </label>

        <a-date-picker 
            :value="dateValue"
            :placeholder="placeholder" 
            :id="id" 
            format="DD/MMM/YYYY" 
            @change="changeHandler" 
            :disabledDate="disabledDate"
        />
    </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue';
import dayjs from 'dayjs';

export default {
    name: "DatePickerField",
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
        modelValue: {
            type: String,
            default: "",
        },
        maxDate: {
            type: String,
            default: null
        },
        minDate: {
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {
        const dateValue = computed(() => {
            return props.modelValue ? dayjs(props.modelValue) : null;
        });

        const changeHandler = (date, dateString) => {
            emit("update:modelValue", dateString);
        };
        const disabledDate = (current) => {
            if (props.maxDate && current > dayjs(props.maxDate).endOf('day')) {
                return true;
            }
            if (props.minDate && current < dayjs(props.minDate).startOf('day')) {
                return true;
            }
            return false;
        }

        return {
            dateValue,
            changeHandler,
            disabledDate
        };
    },
}
</script>