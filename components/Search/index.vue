<template>
  <div class="search">
    <form @submit.prevent.stop>
      <input
        v-model="search"
        type="text"
        placeholder="Knight name..."
        @input="searchKnightByNickname"
      />
      <img
        src="@/assets/icons/magnify.png"
        alt="magnify-icon"
      />
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from "vuex";
  import { RootState } from '../../store';

  export default Vue.extend({
    name: 'HomeSearch',
    data: () => ({
      search: null
    }),
    computed: {
      ...mapState({
        "knights": (state: RootState) => state.knights.allKnights,
        "knightsSearch": (state: RootState) => state.knightSearch
      })
    },
    methods: {
      ...mapMutations([
        "setSearchKnightByNicknameResult",
        "clearSearchKnightByNicknameResult"
      ]),
      searchKnightByNickname(){
        const findIfAlreadyExists = this.knightsSearch.nicknameResults.find(({ nickname }) => nickname === this.search);

        if (findIfAlreadyExists)
          return false;

        const findKnightByNickname = this.knights.find(({ nickname }) => nickname === this.search);

        if (!findKnightByNickname){
          this.clearSearchKnightByNicknameResult();
          return false;
        }

        this.setSearchKnightByNicknameResult(findKnightByNickname)
        return true;
      }
    }
  })
</script>

<style scoped>
  .search {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

  .search form {
    display: flex;
    align-items: center;
    background-color: var(--secondaryColor);
    border-radius: 50px;
    flex-shrink: 0;
    width: 35%;
    height: 50px;
    box-shadow: 0px 0px 10px rgb(0 0 0  / 7%);
  }

  .search form input {
    height: 100%;
    width: 90%;
    border-radius: 50px 0px 0px 50px;
    padding: 10px 20px;
    font-size: 15px;
    background: transparent;
    color: var(--quintanaryColor);
  }

  .search form img {
    margin: 10px;
    width: 23px;
    height: 23px;
  }

  @media (max-width: 750px){
    .search form {
      width: 90%;
    }

    .search {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>
