<template>
  <div class="knight-field">
    <slot/>
    <a href="#" class="knight-field-name">{{ name }}:</a>
    <input
      v-if="isInput"
      v-model="nicknameEdit"
      type="text"
      class="knight-field-value-input"
      @change="updateNickname"
    />
    <a
      v-else
      href="#"
      class="knight-field-value"
    >{{ value }}</a>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: "KnightField",
    props: {
      name: {
        type: String,
        required: true
      },
      value: {
        type: Number || String,
        required: true
      },
      isInput: {
        type: Boolean,
        default: false
      },
      knightId: String
    },

    data: () => ({
      nicknameEdit: null
    }),

    mounted(){
      this.nicknameEdit = this.value;
    },

    methods: {
      updateNickname(){
        this.$store.dispatch("updateKnightByNickname", {
          nickname: this.nicknameEdit,
          knightId: this.knightId
        })
      },

      shortenNickname(nickname: string){
        if  (nickname.length > 10){
          const curtNickname = nickname.substring(0, 10);
          return `${curtNickname}...`;
        }
      }
    }
  });
</script>

<style scoped>
  .knight-field {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .knight-field-name {
    color: var(--tertiaryColor);
    text-decoration: none;
    font-size: 15px;
  }

  .knight-field-value {
    color: var(--quaternaryColor);
    text-decoration: none;
    font-size: 15px;
  }

  .knight-field-value-input {
    color: var(--quaternaryColor);
    font-size: 15px;
    background: transparent;
    width: 100%;
  }

  .knight-field-value-input:hover {
    border-bottom: 1.5px solid var(--tertiaryColor);
  }
</style>
