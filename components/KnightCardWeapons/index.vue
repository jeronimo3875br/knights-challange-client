<template>
  <div class="weapons">
      <div
        v-for="weapon in weapons"
        :key="weapon" class="weapon"
        :class="{ 'weapon-equipped': weapon.equipped }"
      >{{ weapon.name }} - ({{ weapon.mod }})</div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "KnightCardWeapons",
    props: {
      weapons: {
        type: Array,
        required: true
      }
    }
  })
</script>

<style scoped>
  .weapons {
    display: flex;
    flex-flow: row nowrap;
    padding-left: 10px;
    padding-right: 10px;
    gap: 15px;
    overflow-x: scroll;
    margin-top: 5px;
  }

  .weapons::-webkit-scrollbar {
    display: none;
  }

  .weapon {
    background-color: var(--tertiaryColor);
    color: var(--quintanaryColor);
    border-radius: 50px;
    padding: 10px 15px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    cursor: pointer;
  }

  .weapon:hover {
    transition: .3s;
    background-color: var(--quintanaryColor);
    color: var(--tertiaryColor);
    border: 1px solid var(--tertiaryColor) !important;
  }

  .weapon-equipped {
    border: 2px solid var(--quintanaryColor);
    box-shadow: 0px 0px 5px var(--tertiaryColor);
  }
</style>
