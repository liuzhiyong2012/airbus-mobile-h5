import {localStore} from '@/utils/data-management'
export default {
  state: {
    newsDetails: {},
  },
  mutations: {
    addNewsDetails(state: any, item: any) {
      state.newsDetails = {};
      state.newsDetails = item;
      localStore.set('newsDetails', item)
    },
  },
  actions: {
    setNewsDetails(context: any, state: any) {
      context.commit("addNewsDetails", state);
    }
  },
};
