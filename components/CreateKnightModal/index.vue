<template>
  <div v-if="knightModalState" class="create-knight-modal">
    <KnightForm />
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapState } from "vuex";
  import { RootState } from "../../store";

  export default Vue.extend({
    name: "CreateKnightModal",
    computed: {
      ...mapState({
        "knightModalState": (state: RootState) => state.createKnightModal.active
      })
    }
  })
</script>

<style scoped>
  .create-knight-modal {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 999;
    backdrop-filter: blur(5px) brightness(40%);
    display: flex;
    justify-content: center;
  }
</style>
