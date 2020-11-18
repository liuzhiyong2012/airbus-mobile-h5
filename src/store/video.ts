export default {
    state: {
      videoList:[],
      myLikeList:[]
    },
    mutations: {
      setVideoList(state: any, list: any) {
        state.videoList = list;
      },
      setMyLikeList(state: any, list: any) {
        state.myLikeList = list;
      },
    },
    actions: {
      setAddressData(context: any, state: any){
        context.commit('addressData', state.data);
      }
    }
  }
  
  
  