import ArrayUtils from '../utils/array-utils';

export default {
    state: {
        cartList: [
            /* {
                    Name: '素食拼盘',
                    SampleImgPath: 'http://172.16.125.11:8010/eb8ea336-9434-4295-8215-3821c76baba8',
                    BannerImgPath: 'http://172.16.125.11:8010/50.jpg',
                    Price: 32,
                    orderNumber:3,
                    Remark: null,
                    Status: 0,
                    Stocking: 0,
                    Id: 'e2dc9e2c-6733-e911-b13c-96af276fddb7'
            } */
        ],
        shoppingDetail: {},
        pointsCartList:[],
        pointsDetail:{}
    },
    /* getters:{
         testGetters(state){
             return state.cartList.length;
         }
     }, */
    mutations: {
        // 商品
        addShoppingCartItem(state: any, item: any) {
            let retIndex = ArrayUtils.searchIndexByKey(state.cartList, 'Id', item.Id)

            if (retIndex == -1) {
                state.cartList.push(item);
            } else {
                state.cartList[retIndex].orderNumber = state.cartList[retIndex].orderNumber + item.orderNumber;
            }
        },
        addShoppingCartItemRouter(state: any, item: any) {
            let retIndex = ArrayUtils.searchIndexByKey(state.cartList, 'Id', item.Id)

            if (retIndex == -1) {
                state.cartList.push(item);
            } 
        },
        addShoppingCartList(state: any, list: any){
            state.cartList = list
        },
        setShoppingDetail(state: any, data: any) {
            state.shoppingDetail = data
        },
        delShoppingCartItem(state: any, index: number) {
            state.cartList.splice(index, 1);
        },
        clearShoppingCart(state: any) {
            state.cartList = [];
        },
        // 积分
        addPointsCartItem(state: any, item: any) {
            let retIndex = ArrayUtils.searchIndexByKey(state.pointsCartList, 'Id', item.Id)

            if (retIndex == -1) {
                state.pointsCartList.push(item);
            } else {
                state.pointsCartList[retIndex].orderNumber = state.pointsCartList[retIndex].orderNumber + item.orderNumber;
            }
        },
        setPointsDetail(state: any, data: any) {
            state.shoppingDetail = data
        },
        delPointsCartItem(state: any, index: number) {
            state.pointsCartList.splice(index, 1);
        },
        clearPointsCart(state: any) {
            state.pointsCartList = [];
        }
    },
    actions: {
        setUserInfo(context: any, state: any) {
            context.commit('setName', state.name);
            context.commit('setToken', state.token);
        }
    }
}

