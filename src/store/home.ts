export default {
  state: {
    userInfo: {
    },
    name: '',
    phone: '',
    internetData: '',
    internetCartNum: 1,
    total: 0
  },
  mutations: {

    setInternetCartData(state: any, data: any) {
      state.internetData = data
      state.internetData.total = Number(state.internetData.Price)
    },
    changeInternetStepper(state: any, data: any){
      state.internetCartNum = data
      state.total = (Number(state.internetData.Price) * data).toFixed(2)
    }

  },
  actions: {
    commitInternetCartData(context: any, state: any) {
      context.commit('setInternetCartData', state.data)
    }
  }
}

