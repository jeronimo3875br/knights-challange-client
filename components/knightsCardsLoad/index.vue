<template>
  <div v-if="loading" class="load">
    <img
      src="@/assets/images/loading.gif"
      alt="laoding-gif"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from "vuex";
  import { RootState } from '../../store';

  export default Vue.extend({
    name: "KnightsLoad",
    computed: {
      ...mapState({
        "loading": (state: RootState) => state.knightsLoad.active
      })
    }
  })
</script>

<style scoped>
  .load {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: var(--primaryColor);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .load img {
    width: 100px;
  }
</style>
