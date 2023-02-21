import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { IKnight } from '~/dtos/IKnightDTO';

interface INotification {
  active: boolean;
  type: string;
  content: {
    title: string;
    body: string;
  },
  duration: number;
}

interface IState {
  createKnightModal: {
    active: boolean;
  };
  knights: {
    allKnights: IKnight[],
    allWarriors: IKnight[],
    allHeroes: IKnight[]
  },
  uploadedImageURL: string;
  systemNotification: INotification,
  knightsLoad: {
    active: boolean;
  },
  knightSearch: {
    nicknameResults: IKnight[]
  },
  knightInfo: {
    active: boolean;
    currentKnight: IKnight
  }
}

export const state = (): IState => ({
  createKnightModal: {
    active: false
  },
  knights: {
    allKnights: [],
    allWarriors: [],
    allHeroes: []
  },
  uploadedImageURL: null,
  systemNotification: {
    active: false,
    type: null,
    content: {
      title: null,
      body: null
    },
    duration: 15000
  },
  knightsLoad: {
    active: false
  },
  knightSearch: {
    nicknameResults: []
  },
  knightInfo: {
    active: false,
    currentKnight: null
  }
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  toggleCreateKnightModal: (state)  => {
    state.createKnightModal.active = !state.createKnightModal.active
  },

  pushAllKnights: (state, knights: IKnight[]) => {
    state.knights.allKnights = knights.reverse();
  },

  pushAllHeroesKnights: (state, knights: IKnight[]) => {
    state.knights.allHeroes = knights.reverse();
  },

  pushAllWarriorsKnights: (state, knights: IKnight[]) => {
    state.knights.allWarriors = knights.reverse();
  },

  setUploadedImageURL: (state, imageURL: string) => {
    state.uploadedImageURL = imageURL;
  },

  removeUploadedImageURL: (state) => {
    state.uploadedImageURL = null;
  },

  setNotification: (state, { active, content, duration, type }: INotification) => {
    state.systemNotification.type = type;
    state.systemNotification.active = active;
    state.systemNotification.content.body = content.body;
    state.systemNotification.content.title = content.title;

    if (duration !== null)
      state.systemNotification.duration = duration;
  },

  clearNotification: state => {
    const defaultNotification = {
      active: false,
      content: {
        title: null,
        body: null
      },
      duration: null,
      type: null
    }

    state.systemNotification = defaultNotification;
  },

  setKnightsLoad: (state, load: boolean) => {
    state.knightsLoad.active = load;
  },

  setSearchKnightByNicknameResult: (state, results: IKnight) => {
    state.knightSearch.nicknameResults.push(results);
  },

  clearSearchKnightByNicknameResult: state => {
    state.knightSearch.nicknameResults = [];
  },

  setKnightInfo: (state, knightNickname: string) => {
    const knight = state.knights.allKnights.find(({ nickname }) =>
      nickname === knightNickname
    );

    state.knightInfo.active = true;
    state.knightInfo.currentKnight = knight;
  },

  closeKnightInfo: state => {
    state.knightInfo.active = false;
    state.knightInfo.currentKnight = null;
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async createKnight({ commit, dispatch }, { knight, image }: { knight: IKnight, image?: FormData }) {
    try {
      commit("setKnightsLoad", true);

      if (image){
        const uploadImage = await this.$axios.post("/upload", image);
        knight.image = uploadImage.data.data.url;
      }

      await this.$axios.post("/knights", knight);

      dispatch("findAllKnights");
      dispatch("findAllHeroesKnights");
      dispatch("findAllWarriorsKnights");

      commit("setNotification", {
        active: true,
        content: {
          title: "Congratulations!",
          body: "The new knight has been successfully added :)"
        },
        duration: 1000 * 30,
        type: "success"
      });

      commit("toggleCreateKnightModal");
      commit("setKnightsLoad", false);

    }catch(error){
      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Sorry :(",
          body: error.response.data.message
        },
        duration: 1000 * 30,
        type: "error"
      });
    }
  },

  async uploadImage({ commit }, image: File){
    const request = await this.$axios.post("/upload", image);
    commit("setUploadedImageURL", request.data.data.url);
  },

  async findAllKnights({ commit }){
    try {
      commit("setKnightsLoad", true);
      const request = await this.$axios.get("/knights");
      commit("pushAllKnights", request.data.data.knights);
      commit("setKnightsLoad", false);

    }catch(error){
      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Sorry :(",
          body: error.response.data.message
        },
        duration: 1000 * 30,
        type: "error"
      });
    }
  },

  async findAllHeroesKnights({ commit }){
    try {
      commit("setKnightsLoad", true);
      const request = await this.$axios.get("/knights?filter=heroes");
      commit("pushAllHeroesKnights", request.data.data.knights);
      commit("setKnightsLoad", false);

    }catch(error){
      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Sorry :(",
          body: error.response.data.message
        },
        duration: 1000 * 30,
        type: "error"
      });
    }
  },

  async findAllWarriorsKnights({ commit }){
    try {
      commit("setKnightsLoad", true);
      const request = await this.$axios.get("/knights?filter=warriors");
      commit("pushAllWarriorsKnights", request.data.data.knights);
      commit("setKnightsLoad", false);

    }catch(error){
      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Sorry :(",
          body: error.response.data.message
        },
        duration: 1000 * 30,
        type: "error"
      });
    }
  },

  async updateKnightByNickname({ commit, dispatch }, { nickname, knightId }: { nickname: string; knightId: string | object } ){
    try {
      commit("setKnightsLoad", true);

      await this.$axios.put(`/knights/${knightId}`, {
        nickname
      });

      dispatch("findAllKnights");
      dispatch("findAllHeroesKnights");
      dispatch("findAllWarriorsKnights");

      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Congratulations!",
          body: "The knight has been successfully updated :)"
        },
        duration: 1000 * 30,
        type: "success"
      });

    }catch(error){
      commit("setKnightsLoad", false);
      commit("setNotification", {
        active: true,
        content: {
          title: "Sorry :(",
          body: error.response.data.message
        },
        duration: 1000 * 30,
        type: "error"
      });
    }
  },

  async removeKnight({ commit, dispatch, state }, knightId: string | object){
      try {

        const verifyIfKnightIsHero = state.knights.allHeroes.find(({ _id }) => _id === knightId);

        if (verifyIfKnightIsHero){
          commit("setNotification", {
            active: true,
            content: {
              title: "Oops!",
              body: "This knight is already elevated!"
            },
            duration: 1000 * 30,
            type: "warning"
          });

          return;
        }


        commit("setKnightsLoad", true);
        await this.$axios.delete(`/knights/${knightId}`);

        dispatch("findAllKnights");
        dispatch("findAllHeroesKnights");
        dispatch("findAllWarriorsKnights");

        commit("setKnightsLoad", false);
        commit("setNotification", {
          active: true,
          content: {
            title: "Congratulations!",
            body: "The knight has been elevated, now he's in the hall of heroes!"
          },
          duration: 1000 * 30,
          type: "success"
        });

      }catch(error){
        commit("setKnightsLoad", false);
        commit("setNotification", {
          active: true,
          content: {
            title: "Sorry :(",
            body: error.response.data.message
          },
          duration: 1000 * 30,
          type: "error"
        });
      }
  }
};
