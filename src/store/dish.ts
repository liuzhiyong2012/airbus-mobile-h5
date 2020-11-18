import  ArrayUtils from '../utils/array-utils';

export default {
  state: {
    cartList:[
		/* {
				Name: '素食拼盘',
				SampleImgPath: 'http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8',
				BannerImgPath: 'http://172.16.125.11:8010/50.jpg',
				Price: 32,
				orderNumberL:3,
				Remark: null,
				Status: 0,
				Stocking: 0,
				Id: 'e2dc9e2c-6733-e911-b13c-96af276fddb7'
		} */
	]
  },
 /* getters:{
	  testGetters(state){
		  return state.cartList.length;
	  }
  }, */
  mutations: {
    addCartItem(state: any, item: any) {
	  let retIndex = ArrayUtils.searchIndexByKey(state.cartList,'Id',item.Id);
	  
	  if(retIndex == -1){
		  state.cartList.push(item);
	  }else{
		  state.cartList[retIndex].orderNumber = state.cartList[retIndex].orderNumber + item.orderNumber;
	  }
    },
	
	delCartItem(state: any, index: number) {
	  state.cartList.splice(index,1);
	},
	clearDishCart(state:any){
		state.cartList = [];
	}
  },
  actions: {
    setUserInfo(context: any, state: any){
      context.commit('setName', state.name);
      context.commit('setToken', state.token);
    }
  }
}

