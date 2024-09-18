<template>
    <div id="wrapper">
      <Navbar />
        <div id="main-contents-wrapper">
          <slot />
        </div>
      
      <NewsletterBlock />
      <Footer />
    </div>
  </template>
  
  <script>
  export default {
    name: "ExternalLayout",
  }
  </script>
  