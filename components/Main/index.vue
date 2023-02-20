<template>
  <main>
    <Shadow />
    <Search />
    <KnightsCategory
      v-if="knightSearch.nicknameResults.length > 0"
      :has-managament-stage="false"
      category-name="Your search"
    >
      <KnightCard
        v-for="knight in knightSearch.nicknameResults"
        :id="knight._id"
        :key="knight"
        :name="knight.name"
        :nickname="knight.nickname"
        :image="knight.image"
        :birthday="knight.birthday"
        :strength="knight.attributes.strength"
        :dexterity="knight.attributes.dexterity"
        :constituition="knight.attributes.constitution"
        :inteligence="knight.attributes.intelligence"
        :wisdom="knight.attributes.wisdom"
        :charism="knight.attributes.charisma"
        :experience="knight.experience"
        :attack="knight.attack"
        :weapons="knight.weapons"
      />
    </KnightsCategory>
    <KnightsCategory v-if="allHeroes.length > 0" category-name="Hall of heroes">
      <KnightCard
        v-for="knight in allHeroes"
        :id="knight._id"
        :key="knight"
        :name="knight.name"
        :nickname="knight.nickname"
        :image="knight.image"
        :birthday="knight.birthday"
        :strength="knight.attributes.strength"
        :dexterity="knight.attributes.dexterity"
        :constituition="knight.attributes.constitution"
        :inteligence="knight.attributes.intelligence"
        :wisdom="knight.attributes.wisdom"
        :charism="knight.attributes.charisma"
        :experience="knight.experience"
        :attack="knight.attack"
        :weapons="knight.weapons"
        :is-hero="knight.isHero"
      />
    </KnightsCategory>
    <knightCategoryGrid v-if="allKnights.length > 0" category-name="All knights">
      <KnightCard
        v-for="knight in allKnights"
        :id="knight._id"
        :key="knight"
        :name="knight.name"
        :nickname="knight.nickname"
        :image="knight.image"
        :birthday="knight.birthday"
        :strength="knight.attributes.strength"
        :dexterity="knight.attributes.dexterity"
        :constituition="knight.attributes.constitution"
        :inteligence="knight.attributes.intelligence"
        :wisdom="knight.attributes.wisdom"
        :charism="knight.attributes.charisma"
        :experience="knight.experience"
        :attack="knight.attack"
        :weapons="knight.weapons"
      />
    </knightCategoryGrid>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from "vuex";
  import { RootState } from '../../store';

  export default Vue.extend({
    name: "HomeMain",
    computed: {
      ...mapState({
        "allKnights": (state: RootState) => state.knights.allKnights,
        "allHeroes": (state: RootState) => state.knights.allHeroes,
        "allWarriors": (state: RootState) => state.knights.allWarriors,
        "knightSearch": (state: RootState) => state.knightSearch
      })
    },
    mounted(){
      this.$store.dispatch("findAllKnights");
      this.$store.dispatch("findAllHeroesKnights");
      this.$store.dispatch("findAllWarriorsKnights");
    }
  })
</script>

<style scoped>
  main {
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    padding-top: 30px;
    padding-bottom: 30%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  main::-webkit-scrollbar {
    background: transparent;
    width: 3px;
  }

  main::-webkit-scrollbar-thumb {
    background: var(--tertiaryColor);
    border-radius: 100px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
  }
</style>
