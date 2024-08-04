<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <PreviewNavigation />
      <main>
        <PreviewHeader />
        
      </main>
      <PreviewFooter />
    </div>
  </div>
</template>

<script setup>
//= Page Metadata
definePageMeta({
  layout: "preview",
});
//= Page Head
useHead({
  titleTemplate: `WeNext Africa Media: Home`,
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
