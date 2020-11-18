export default {
  state: {
    payType:"1",
    address:'',
    points: 0,
    userData: {},
    seatType: 2,
    language: ''
  },
  mutations: {
    changePayType(state: any, payType: any) {
      state.payType = payType;
    },
    addressData(state: any, data: string){
      state.address = data
    },
    setUserData(state: any, data: string){
      state.userData = data
      state.points = state.userData.points
      state.seatType = state.userData.Seat.seatType
    },
    changeLanguage(state:any,data:string){
      state.language = data
    },
  },
  actions: {
    setAddressData(context: any, state: any){
      context.commit('addressData', state.data);
    }
  }
}


