<template>
  <div class="knights-category-container">
    <h1 class="category-title">{{ categoryName }}</h1>
    <div ref="knight-category" class="knights-category-content">
      <slot />
    </div>
    <div v-if="hasManagamentStage" class="management-stage">
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
      },

      hasManagamentStage: {
        type: Boolean,
        default: true
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
  .knights-category-container {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    gap: 30px;
  }

  .knights-category-content {
    display: flex;
    flex-flow: row nowrap;
    overflow-x: scroll;
    gap: 15px;
    scroll-behavior: smooth;
  }

  .knights-category-content::-webkit-scrollbar {
    display: none;
  }

  .category-title {
    font-weight: bold;
    color: var(--quaternaryColor);
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .management-stage {
    display: flex;
    justify-content: space-between;
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
</style>
