<template>
  <div class="container">
    <knightsCardsLoad />
    <Notification />
    <CreateKnightModal />
    <Header />
    <Main />
    <AddKnightFloatButton />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'HomePage'
  })
</script>

<style scoped>
  .container {
    width: 100vw;
    height: 100vh;
    background-color: var(--primaryColor);
  }
</style>
