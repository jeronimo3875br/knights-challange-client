<template>
  <div class="filters">
    <button>Filtrar</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component
  export default class HomeFilter extends Vue {}
</script>

<style scoped>
  .filters button {
    background-color: var(--tertiaryColor);
    color: var(--quintanaryColor);
    padding: 10px 15px;
    border-radius: 2px;
    cursor: pointer;
  }

  .filters button:hover {
    transition: .3s;
    background-color: var(--tertiaryColor-actived);
  }
</style>
