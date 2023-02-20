<template>
  <header>
    <Title
      title="Knights"
      title-detail="Challenge"
    />
    <!-- <Search />
    <Filters /> -->
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component
  export default class HomeHeader extends Vue {}
</script>

<style scoped>
  header {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--secondaryColor);
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    height: 8%;
  }
</style>
