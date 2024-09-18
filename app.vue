<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<style src="@/assets/css/filter-block.css"></style>
<style src="@/assets/css/search-results.css"></style>
<style src="@/assets/css/modal.css"></style>

<style>
div#wrapper {
  float: left;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}
div#main-contents-wrapper {
  padding-top: 90px;
  /* min-height: 100vh; */
}
@media(max-width: 600px) {
  div#main-contents-wrapper {
    padding-top: 70px;
  }
}
</style>