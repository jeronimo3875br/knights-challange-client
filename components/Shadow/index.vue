<template>
  <div class="shadow"></div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "AppShadow"
  })
</script>

<style scoped>
  .shadow {
    position: absolute;
    bottom: 0;
    height: 15%;
    width: 100vw;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, .8),
      rgba(0, 0, 0, .6),
      rgba(0, 0, 0, .3),
      rgba(0, 0,0, 0.1),
      transparent
    );
  }
</style>
