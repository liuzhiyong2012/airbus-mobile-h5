import {localStore} from '../utils/data-management'
export default {
  state: {
	flightInfo:{
		
	},
    voyageInfo: {
      seatNumber: '12',
      seatClass:'Y',
      seatType: 2,
      seatName:'3D',  
    },
    userInfo: {
		
    },
    name: '',
    phone: '',
    token: '',
    airbusId: '',
	isDemo:'',
	lastNetFlowWaringTime:null
  },
  mutations: {
	setLastNetFlowWaringTime(state: any, lastNetFlowWaringTime: any) {
	    state.lastNetFlowWaringTime = lastNetFlowWaringTime;
	},
    setName(state: any, name: any) {
      state.name = name
      state.userInfo.nickname = name
      localStore.set('nickname',name)
    },
    setToken(state:any, token: string){
      state.token = token
      state.userInfo.token = token
      localStore.set('token',token)
    },
    setPhone(state:any,phone: string){
      state.token = phone
      state.userInfo.token = phone
      localStore.set('phone',phone)
    },
    setAirbusId(state:any,id:string){
		// '4CFC4D33-2C1E-E911-BAD5-F44D307124C0'||
		// debugger;
      state.airbusId =id;
      localStore.set('airbusId',id)
    },
    setSeatNumber(state:any,seat:string){
      state.voyageInfo.seatNumber = seat
      localStore.set('seatNumber',seat)
    },
    setSeatName(state:any,seat:string){
      state.voyageInfo.seatName = seat
      localStore.set('seatName',seat)
    },
    setSeatType(state:any,seat:string){
      state.voyageInfo.seatType = seat
      localStore.set('seatType',seat)
    },
	setVoyageInfo(state:any,voyageInfo:any){
	  state.voyageInfo = voyageInfo;
	},

    setUserInfo(state:any, userInfo: any){
      state.userInfo = userInfo
      localStore.set('userInfo', userInfo)
    },
	setFlightInfo(state:any, flightInfo: any){
	  state.flightInfo = flightInfo;
	},
	setIsDemo(state:any, isDemo: any){
	  state.isDemo = isDemo;
	}
  },
  actions: {
	setFlightInfo(context: any, state: any){
		context.commit('setFlightInfo', state);
		context.commit('setAirbusId', state.Flight.BaseInfo.Id);
		context.commit('setIsDemo', state.Flight.BaseInfo.IsDemo);
		
	},
	logout(context: any, state: any){
		context.commit('setName', '')
		context.commit('setToken', '')
		// context.commit('setAirbusId', '')
		context.commit('setUserInfo', {})
		context.commit('setVoyageInfo', {})
	},
    setUserInfo(context: any, state: any){
      context.commit('setName', state.name)
      context.commit('setToken', state.token)
      // context.commit('setAirbusId', state.airbusId)
      context.commit('setUserInfo', state)
    },
    setUserLoginInfo(context: any,state:any){
      context.commit('setToken', state.token)
      // context.commit('setAirbusId', state.id)
    }
  }
}

