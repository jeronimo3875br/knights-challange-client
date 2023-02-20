<template>
  <h1>{{ title }}<span>{{ titleDetail }}</span></h1>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'HomeTitle',
    props: {
      title: {
        type: String,
        required: true
      },
      titleDetail: {
        type: String,
        required: true
      }
    }
  })
</script>

<style scoped>
  h1 {
    color: var(--tertiaryColor);
    font-size: 20px;
  }

  h1 span {
    color: var(--quintanaryColor);
  }
</style>
