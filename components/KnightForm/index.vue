<template>
  <form class="create-knight-form" @submit.prevent.stop>
    <div class="image-upload">
      <input
        id="knight-image"
        type="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        @change="setCurrentKnightImage"
      />
      <label for="knight-image">
        <img v-if="previewKnightImageURL !== null" :src="previewKnightImageURL" />
        <img
          v-else
          class="default-upload-image"
          src="@/assets/images/default-upload-image.png"
        />
      </label>
      <button
        class="delete-current-image-button"
        @click="removeCurrentKnightImageToUpload"
        @mouseenter="currentDeleteIconImage = 'white'"
        @mouseleave="currentDeleteIconImage = 'normal'"
      >
        <img
          v-if="currentDeleteIconImage === 'normal'"
          src="@/assets/icons/trash.png"
          alt="delete-icon"
        />
        <img
          v-else-if="currentDeleteIconImage === 'white'"
          src="@/assets/icons/trash-white.png"
          alt="delete-icon"
        />
      </button>
    </div>
    <div class="create-knight-form-field">
      <label>Name*</label>
      <input
        v-model="knight.name"
        type="text"
        placeholder="Knight name"
      />
    </div>
    <div class="create-knight-form-field-group">
      <div
        class="create-knight-form-field"
      >
        <label>Nickname*</label>
        <input
          v-model="knight.nickname"
          type="text"
          placeholder="Knight nickname"
        />
      </div>
      <div class="create-knight-form-field">
        <label>Birthday*</label>
        <input
          v-model="knight.birthday"
          type="text"
          placeholder="Birthday"
        />
      </div>
    </div>
    <div class="create-knight-form-field">
      <label>KeyAttribute*</label>
      <select v-model="knight.keyAttribute">
        <option value="intelligence">Intelligence</option>
        <option value="strength">Strength</option>
        <option value="dexterity">Dexterity</option>
        <option value="charisma">Charisma</option>
        <option value="wisdom">Wisdom</option>
        <option value="constituition">Constituition</option>
      </select>
    </div>
    <KnightFormCategory name="Attributes" />
    <div class="create-knight-form-field">
        <label class="slider-field-label">Intelligence* <span>({{ knight.attributes.intelligence }})</span></label>
        <input
          v-model="knight.attributes.intelligence"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <div class="create-knight-form-field">
        <label class="slider-field-label">Strength* <span>({{ knight.attributes.strength }})</span></label>
        <input
          v-model="knight.attributes.strength"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <div class="create-knight-form-field">
        <label class="slider-field-label">Dexterity* <span>({{ knight.attributes.dexterity }})</span></label>
        <input
          v-model="knight.attributes.dexterity"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <div class="create-knight-form-field">
        <label class="slider-field-label">Costitution* <span>({{ knight.attributes.constitution }})</span></label>
        <input
          v-model="knight.attributes.constitution"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <div class="create-knight-form-field">
        <label class="slider-field-label">Wisdom* <span>({{ knight.attributes.wisdom }})</span></label>
        <input
          v-model="knight.attributes.wisdom"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <div class="create-knight-form-field">
        <label class="slider-field-label">Charisma* <span>({{ knight.attributes.charisma }})</span></label>
        <input
          v-model="knight.attributes.charisma"
          type="range"
          min="0"
          max="100"
          @input="setSliderStage($event)"
        />
    </div>
    <KnightFormCategory name="Weapons" />
    <div v-for="(weapon, index) in knight.weapons" :key="weapon" class="weapons">
      <div class="create-knight-form-field">
        <label>Name*</label>
        <input
          v-model="knight.weapons[index].name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div
        class="create-knight-form-field"
      >
        <label>Mod*</label>
        <input
          v-model="knight.weapons[index].mod"
          type="number"
          placeholder="Knight nickname"
        />
      </div>
      <div class="create-knight-form-additional">
        <div class="create-knight-form-equipped">
          <input v-model="knight.weapons[index].equipped" type="checkbox" />
          <label>Equipped</label>
        </div>
        <a
          href="#"
          class="add-more-weapon"
          @click="addMoreWeapons"
        >Add more weapons?</a>
      </div>
    </div>
    <div class="create-knight-form-operations">
        <button
          class="cancel-knight-creation"
          @click="toggleCreateKnightModal"
        >Cancel</button>
        <button
          class="save-knight-creation"
          @click="createKnight"
        >Save</button>
    </div>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from "vuex";
  import { RootState } from "../../store";
  import { IKnight, IKnightWeapon } from "../../dtos/IKnightDTO";

  interface IData {
    knight: IKnight;
    temporaryKnightWeapon: IKnightWeapon;
    previewKnightImageURL: string | null;
    currentKnightImageToUpload: object;
    currentDeleteIconImage: string;
  }

  export default Vue.extend({
    name: 'KnightModalForm',
    data: (): IData => ({
      knight: {
        name: "",
        image: "",
        nickname: "",
        birthday: "",
        attributes: {
          intelligence: 0,
          charisma: 0,
          constitution: 0,
          dexterity: 0,
          strength: 0,
          wisdom: 0
        },
        weapons: [
          {
            name: "",
            equipped: false,
            mod: 0
          },
        ],
        keyAttribute: "",
      },
      temporaryKnightWeapon: {
        equipped: false,
        mod: 0,
        name: "",
      },
      previewKnightImageURL: null,
      currentKnightImageToUpload: null,
      currentDeleteIconImage: "normal",
    }),
    computed: {
      ...mapState({
        "uploadedImageURL": (state: RootState) => state.uploadedImageURL
      })
    },
    methods: {
      ...mapMutations([
        "removeUploadedImageURL",
        "toggleCreateKnightModal"
      ]),
      setSliderStage(event){
        const target = event.target;

        const min = target.min;
        const max = target.max;
        const val = target.value;

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
      },

      clearTemporaryWeapon(){
        this.temporaryKnightWeapon = {
          equipped: false,
          mod: 0,
          name: ""
        };
      },

      setWeapon(){
        this.knight.weapons.push(this.temporaryKnightWeapon);
      },

      setCurrentKnightImage(event: Event){
        const file = event.target as HTMLInputElement;
        this.currentKnightImageToUpload = file.files[0];
        this.previewKnightImageURL = URL.createObjectURL(file.files[0]);
      },

      removeCurrentKnightImageToUpload(){
        this.previewKnightImageURL = null;
        this.currentKnightImageToUpload = null;
      },

      createKnight(){
        const uploadFormData = new FormData();
        uploadFormData.append("image", this.currentKnightImageToUpload);

        this.$store.dispatch("createKnight", {
          image: uploadFormData,
          knight: this.knight
        });
      },

      addMoreWeapons(){
        this.knight.weapons.push({
            name: "",
            equipped: false,
            mod: 0
        });
      }
    }
  })
</script>

<style scoped>
  .create-knight-form {
    width: 50%;
    background-color: var(--primaryColor);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    overflow-y: scroll;
    animation: createKnightFormAnimation .3s linear;
  }

  @keyframes createKnightFormAnimation {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .weapons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .create-knight-form::-webkit-scrollbar {
    width: 3px;
    background: transparent;
  }

  .create-knight-form::-webkit-scrollbar-thumb {
    background-color: var(--tertiaryColor);
  }

  .create-knight-form-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 70%;
    margin-bottom: 15px;
  }

  .create-knight-form-field label {
    color: var(--quintanaryColor);
    font-size: 15px;
  }

  .create-knight-form-field label span {
    color: var(--tertiaryColor);
  }

  .create-knight-form-field input:not(input[type='range']), select {
    padding: 10px;
    border-radius: 2px;
    background-color: var(--secondaryColor);
    color: var(--quaternaryColor)
  }

  .create-knight-form-field input::-webkit-inner-spin-button {
    display: none;
  }

  .create-knight-form-field-group {
    display: flex;
    width: 70%;
    gap: 20px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    margin-right: 15px;
    height: 7px;
    background: var(--secondaryColor);
    border-radius: 5px;
    background-image: linear-gradient(var(--tertiaryColor), var(--tertiaryColor));
    background-size: 0% 100%;
    background-repeat: no-repeat;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--tertiaryColor-actived);
    cursor: ew-resize;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
  }

  input[type=range]::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  .slider-field-label {
    text-align: center;
  }

  .create-knight-form-additional {
    display: flex;
    width: 70%;
    align-items: center;
    justify-content: space-between;
  }

  .create-knight-form-equipped {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .create-knight-form-equipped label {
    color: var(--quaternaryColor);
    font-size: 15px;
  }

  .create-knight-form-equipped input[type="checkbox"]{
    appearance: none;
    background-color: var(--secondaryColor);
    width: 17px;
    height: 17px;
    cursor: pointer;
    border-radius: 2px;
  }

  .add-more-weapon {
    color: var(--quaternaryColor);
    font-size: 15px;
  }

  .add-more-weapon:hover {
    color: var(--quintanaryColor);
  }

  .create-knight-form-operations {
    width: 85%;
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .create-knight-form-operations button {
    color: var(--quintanaryColor);
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgb(0 0 0 / 7%);
    padding: 10px 15px;
    cursor: pointer;
  }

  .cancel-knight-creation {
    background-color: #bf341f;
  }


  .cancel-knight-creation:hover {
    transition: .3s;
    background-color: #a02815;
  }

  .save-knight-creation {
    background-color: var(--tertiaryColor);
  }

  .save-knight-creation:hover {
    transition: .3s;
    background-color: var(--tertiaryColor-actived);
  }

  .default-upload-image {
    width: 50px;
    height: 50px;
  }

  .image-upload {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .image-upload input[type="file"] {
    display: none;
  }

  .image-upload label {
    display: block;
    flex-shrink: 0;
    width: 150px !important;
    height: 150px !important;
    border-radius: 50%;
    background: var(--secondaryColor);
    cursor: pointer;
    overflow: hidden;
  }

  .image-upload label:hover {
    border: 2px solid var(--tertiaryColor);
  }

  .image-upload label img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .delete-current-image-button {
    background: transparent;
    cursor: pointer;
  }


  @media (max-width: 750px){
    .create-knight-form {
      width: 100%;
    }

    .create-knight-form-field-group {
      flex-direction: column;
      width: 85%;
    }

    .create-knight-form-field {
      width: 85%;
    }

    .create-knight-form-field-group .create-knight-form-field {
      width: 100% !important;
    }

    .create-knight-form-additional {
      width: 85%;
    }
  }
</style>
