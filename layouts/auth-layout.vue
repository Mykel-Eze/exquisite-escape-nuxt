<template>
    <div id="wrapper">
        <Navbar />
        <div id="main-contents-wrapper">
            <slot />
        </div>
        <Footer />
    </div>
</template>
  
<script>

export default {
    name: "AuthLayout",
}
</script>

<style src="~/assets/css/auth.css"></style>
  