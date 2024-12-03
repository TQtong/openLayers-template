import { defineStore } from 'pinia'

const store = {
  baseLayers: [] as string[],
}

export const useBaseMapStore = defineStore('baseMapStore', {
  state: () => store,

  getters: {
    getBaseLayers(state): string[] {
      return state.baseLayers
    },
  },

  actions: {
    /**
     * @description: 设置地图集合
     * @param {*} state
     * @param {*} baseLayers
     * @return {*}
     */
    setBaseLayers(payload: string[]) {
      this.baseLayers = payload
    },
  },
})
