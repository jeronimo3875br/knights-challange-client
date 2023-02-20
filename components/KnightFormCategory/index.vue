<template>
  <div class="knight-category">
    <a href="#">{{ name }}</a>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "KnightModalFormCategory",
    props: {
      name: String
    }
  });
</script>

<style scoped>
  .knight-category {
    width: 70%;
    margin-top: 30px;
  }

  .knight-category a {
    color: var(--quaternaryColor);
    text-decoration: none;
    font-size: 25px;
  }

  @media (max-width: 750px){
    .knight-category {
      width: 85%;
    }
  }
</style>
