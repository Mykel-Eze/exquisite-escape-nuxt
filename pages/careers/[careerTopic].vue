<template>
  <div id="job-opening-page">
    <section class="bg-light-gray py-16">
      <div class="container">
        <p class="lg:text-xl text-dark-gray">
          {{ `${careerObj.category} team` }}
        </p>
        <p class="text-primary text-2xl md:text-3xl lg:text-5xl font-bold lh-77">
          {{ `${careerObj.roleName}` }}
        </p>
        <div class="lg:flex justify-between lg:text-lg">
          <p>{{ `${careerObj.location} | ${careerObj.roleType} | Full time` }}</p>
          <NuxtLink to="/career" class="underline text-primary"
            >See open roles</NuxtLink
          >
        </div>
      </div>
    </section>
    <section class="py-10">
      <div class="container">
        <div class="lg:flex">
          <div class="hidden lg:block w-3/12">
            <p class="text-dark-gray text-lg mb-8">Introduction</p>
            <p class="text-dark-gray text-lg mb-8">Role</p>
            <p class="text-dark-gray text-lg mb-8">Responsibilities</p>
            <p class="text-dark-gray text-lg mb-8">Required Qualifications</p>
            <p class="text-dark-gray text-lg mb-8">Preferred Qualifications</p>
            <p class="text-dark-gray text-lg mb-12">Renumeration</p>
          </div>
          <CareerDescription class="w-9/12" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import type { RoleObjInterface } from "@/constants/interface/career";
  import CareerDescription from "@/components/careers/CareerDescription.vue";
  export default defineComponent({
    components: {
      CareerDescription,
    },
    setup() {
      const careerObj = ref<RoleObjInterface>({});
      const activeKey = ref(1);
      const router = useRouter();
      onMounted(() => {
        careerObj.value = router.currentRoute.value.query;
      });
      return {
        careerObj,
        activeKey,
      };
    },
  });
</script>
