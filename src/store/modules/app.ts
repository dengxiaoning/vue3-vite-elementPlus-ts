import { Module } from 'vuex';
import { App, RootStateTypes } from '../interface/index';

export interface State {
	count: 0;
}


const app: Module<App, RootStateTypes> = {
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: App) {
      state.count++
    }
  }
}

export default app;