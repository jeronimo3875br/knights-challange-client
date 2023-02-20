<template>
  <button
    @mouseenter="currentImage = 'white'"
    @mouseleave="currentImage = 'normal'"
    @click="toggleCreateKnightModal"
  >
    <img
      v-if="currentImage === 'normal'"
      src="@/assets/icons/swords.png"
    />
    <img
      v-else-if="currentImage === 'white'"
      src="@/assets/icons/swords-white.png"
    />
  </button>
</template>

<script lang="ts">
  import Vue from "vue";
  import { mapMutations } from "vuex";

  interface IData {
    currentImage: string;
  }

  export default Vue.extend({
    name: "CreateKnightFloatButton",
    data: (): IData => ({
      currentImage: "normal"
    }),
    methods: {
      ...mapMutations([
        "toggleCreateKnightModal"
      ])
    }
  })
</script>

<style scoped>
  button {
    width: 70px;
    height: 70px;
    border-radius: 50px;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 10px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    background-color: var(--secondaryColor);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: addKnightFloatButtonAnimation .3s linear;
  }

  @keyframes addKnightFloatButtonAnimation {
    from {
      opacity: 0;
      transform: translateY(200px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  button:hover {
    transition: .3s;
    background-color: var(--tertiaryColor);
  }

  button img {
    width: 35px;
    height: 35px;
  }
</style>
