<template>
  <div class="knights-category-grid-container">
    <h1 class="category-title">{{ categoryName }}</h1>
    <div ref="knight-category" class="knights-category-content">
      <slot />
    </div>
    <div class="management-stage">
      <button
        @click="managementCategoryStage('prev')"
      >Prev</button>
      <button
        @click="managementCategoryStage('next')"
      >Next</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: "KnightCardField",
    props: {
      categoryName: {
        type: String,
        required: true
      }
    },
    data: () => ({
      categoryNextAndPrevStageValue: 150,
      showPrevButton: false,
      showNextButton: true
    }),
    methods: {
      managementCategoryStage(mode: string){
        if (mode === "next"){
          const category = this.$refs["knight-category"] as HTMLElement;
          category.scrollLeft += this.categoryNextAndPrevStageValue;

        }else if (mode === "prev"){
          const category = this.$refs["knight-category"] as HTMLElement;
          category.scrollLeft -= this.categoryNextAndPrevStageValue;
        }
      },
    }
  })
</script>

<style scoped>
  .knights-category-grid-container {
    width: 100%;
  }

  .knights-category-content {
    display: flex;
    flex-flow: row wrap;
    padding: 10px;
    column-gap: 15px;
    row-gap: 30px;
  }

  .category-title {
    font-weight: bold;
    color: var(--quaternaryColor);
    font-size: 30px;
    padding-left: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .management-stage {
    display: none;
    justify-content: space-between;
    margin-top: 15px;
    padding: 0px 10px;
  }

  .knights-category-content::-webkit-scrollbar {
    display: none;
  }

  .management-stage button {
    background-color: var(--tertiaryColor);
    padding: 10px 20px;
    border-radius: 2px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    color: var(--quintanaryColor);
    cursor: pointer;
  }

  .management-stage button:hover {
    transition: .3s;
    background-color: var(--tertiaryColor-actived);
  }

  @media (max-width: 750px){
    .knights-category-content {
      flex-flow: row nowrap;
      overflow-x: scroll;
      scroll-behavior: smooth;
    }

    .management-stage {
      display: flex;
    }
  }
</style>
