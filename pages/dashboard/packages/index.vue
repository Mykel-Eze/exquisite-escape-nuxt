<template>
    <div id="security-page" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/packages', text: 'Packages' },
                    ]" />
                    <h2 class="dashboard-page-title">Packages</h2>
                    <p class="dashboard-page-title-desc">
                        Keep track of all your package deals here
                    </p>

                    <div class="search-now-btn-wrapper mt-[26px] w-[fit-content]">
                        <NuxtLink to="/dashboard/packages/create-package" class="search-now-btn flex-div gap-2">
                            <span>Create package</span>
                            <img src="~/assets/images/add-circle2.svg" alt="add-circle-icon" class="search-icon">
                        </NuxtLink>
                    </div>
                </div>

                <hr class="my-[50px]" />

                <div class="packages-content-wrapper mt-[60px]">
                    <PackagesBlock />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "packages"
}
</script>

<style></style>