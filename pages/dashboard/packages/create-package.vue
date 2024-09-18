<template>
    <div id="create-package-page" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/packages', text: 'Packages' },
                        { path: '/dashboard/packages/create-package', text: 'Create Package' },
                    ]" />
                    <h2 class="dashboard-page-title">Packages</h2>
                    <p class="dashboard-page-title-desc">
                        Keep track of all your package deals here
                    </p>
                </div>

                <!-- <hr class="my-[50px]" /> -->

                <div class="packages-content-wrapper step-form mt-[30px]">
                    <div v-if="currentStep > 1" class="step-indicators">
                        <div 
                            v-for="(stage, index) in stages" 
                            :key="index" 
                            :class="[
                                'step-indicator-container', 
                                { 'completed': index + 1 < currentStep }, 
                                { 'active': index + 1 <= currentStep }
                            ]"
                        >
                            <div class="step-indicator">
                                {{ index + 1 }}
                            </div>
                            <div class="stage-name">{{ stage }}</div>
                            <div class="stage-progress">
                                <span v-if="index + 1 < currentStep">Completed</span>
                                <span v-else-if="index + 1 == currentStep">In progress</span>
                                <span v-else>Pending</span>
                            </div>
                        </div>
                    </div>

                    <form action="#" @submit.prevent="submitForm">
                        <div class="package-action-btn-wrapper mb-[60px] flex-div gap-[21px]">
                            <button @click="cancel" class="cancel-btn pointer">
                                Cancel
                            </button>
                            <button v-if="currentStep > 1" @click="back" class="back-btn pointer">
                                Back
                            </button>
                            <button @click="next" class="continue-btn pointer">
                                {{ currentStep === 6 ? 'Create Package' : 'Continue' }}
                            </button>
                        </div>

                        <div class="packages-components-wrapper">
                            <component 
                                :is="currentStepComponent" 
                                :formData="formData" 
                                @update:formData="updateFormData"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreatePackage from '~/components/PackagesComponent/CreatePackage.vue'
import flights from '~/pages/search-results/flights.vue';
import tours from '~/pages/search-results/tours.vue';
import transfers from '~/pages/search-results/transfers.vue';
import hotels from '~/pages/search-results/hotels.vue';
import PreviewBlock from '~/components/PackagesComponent/PreviewBlock.vue'

export default {
    name: "CreatePackages",
    data() {
        return {
            currentStep: 1,
            totalSteps: 6,
            formData: {},
            stages: [
                'Package name',
                'Select flight',
                'Add tour',
                'Book transfer',
                'Book hotel',
                'Preview'
            ]
        }
    },
    components: {
        CreatePackage,
        flights,
        tours,
        transfers,
        hotels,
        PreviewBlock
    },
    computed: {
        currentStepComponent() {
            const components = [
                CreatePackage,
                flights,
                tours,
                transfers,
                hotels,
                PreviewBlock
            ]
            return components[this.currentStep - 1]
        }
    },
    methods: {
        updateFormData(newData) {
            this.formData = { ...this.formData, ...newData }
        },
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
        }
    }
}
</script>

<style></style>