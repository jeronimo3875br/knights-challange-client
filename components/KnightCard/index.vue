<template>
  <div class="knight-card-container">
    <a href="#" class="knight-card-title">{{ name }}</a>
    <div class="knight-card-content" :class="{ 'adjust-to-hero': isHero }">
      <img
        class="knight-image"
        :src="image"
        alt="knight-image"
      />
      <div class="knight-status">
        <KnightField
          name="Nickname"
          :value="nickname"
          is-input
          :knight-id="id"
        >
          <img
            class="knight-field-icon"
            src="@/assets/icons/nametag.png"
            alt="nametag-icon"
          />
        </KnightField>
        <KnightField name="Birthday" :value="birthday">
          <img
            class="knight-field-icon"
            src="@/assets/icons/birthday.png"
            alt="birthday-icon"
          />
        </KnightField>
        <KnightField name="Strength" :value="strength">
          <img
            class="knight-field-icon"
            src="@/assets/icons/muscle.png"
            alt="muscle-icon"
          />
        </KnightField>
        <KnightField name="Dexterity" :value="dexterity">
          <img
            class="knight-field-icon"
            src="@/assets/icons/bookmark.png"
            alt="dexterity-icon"
          />
        </KnightField>
        <KnightField name="Constituition" :value="constituition">
          <img
            class="knight-field-icon"
            src="@/assets/icons/lawbook.png"
            alt="bookmark-icon"
          />
        </KnightField>
        <KnightField name="Intelligence" :value="inteligence">
          <img
            class="knight-field-icon"
            src="@/assets/icons/intelligence.png"
            alt="intelligence-icon"
          />
        </KnightField>
        <KnightField name="Wisdom" :value="wisdom">
          <img
            class="knight-field-icon"
            src="@/assets/icons/guru.png"
            alt="guru-icon"
          />
        </KnightField>
        <KnightField name="Charism" :value="charism">
          <img
            class="knight-field-icon"
            src="@/assets/icons/smilling.png"
            alt="smilling-icon"
          />
        </KnightField>
        <KnightField name="Charism" :value="experience">
          <img
            class="knight-field-icon"
            src="@/assets/icons/experience.png"
            alt="experience-icon"
          />
        </KnightField>
        <KnightField name="Attack" :value="attack">
          <img
            class="knight-field-icon"
            src="@/assets/icons/attack.png"
            alt="attack-icon"
          />
        </KnightField>
      </div>
      <KnightCardWeapons
        :weapons="weapons"
      />
      <button
        v-if="!isHero"
        class="view-knight-buttom"
        @click="removeKnight"
      >Raise knight</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapMutations } from "vuex";

  export default Vue.extend({
    name: "KnightCard",
    props: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      nickname: {
        type: String,
        required: true
      },
      birthday: {
        type: String,
        required: true
      },
      strength: {
        type: String,
        required: true
      },
      dexterity: {
        type: String,
        required: true
      },
      constituition: {
        type: String,
        required: true
      },
      inteligence: {
        type: String,
        required: true
      },
      wisdom: {
        type: String,
        required: true
      },
      charism: {
        type: String,
        required: true
      },
      image: {
        type: String,
        default: ""
      },
      experience: {
        type: Number,
        required: true
      },
      attack: {
        type: Number,
        required: true
      },
      weapons: {
        type: Array,
        required: true
      },
      isHero: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      ...mapMutations([
        "setKnightInfo"
      ]),

      removeKnight(){
        this.$store.dispatch("removeKnight", this.id);
      }
    }
  })
</script>

<style scoped>
  .knight-field-icon {
    width: 20px;
    height: 20px;
  }

  .knight-card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color:  var(--secondaryColor);
    width: 100%;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    overflow: hidden;
  }

  .knight-status {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .knight-card-title {
    color: var(--tertiaryColor);
    text-decoration: none;
    background-color: var(--secondaryColor);
    border-radius: 4px 4px 0px 0px;
    font-size: 14px;
    padding: 8px;
    border-top: 2px solid var(--tertiaryColor);
  }

  .knight-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 230px;
    flex-shrink: 0;
  }

  .knight-image {
    width: 100%;
    height: 150px;
    border-radius: 4px 4px 0px 0px;
  }

  .view-knight-buttom {
    background: var(--tertiaryColor);
    padding: 10px;
    color: var(--quintanaryColor);
    border-radius: 0px 0px 4px 4px;
    cursor: pointer;
  }

  .view-knight-buttom:hover {
    transition: .3s;
    background-color: var(--tertiaryColor-actived);
  }

  .adjust-to-hero {
    padding-bottom: 20px;
    border-bottom: 3px solid var(--tertiaryColor);
  }
</style>
