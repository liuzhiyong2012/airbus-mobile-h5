import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class ShoppingService {
	
	constructor() {
		
	}
    
	static getShoppingRecommendedList(data: Object) {   
		return request({
			url: '/v1/api/shopping/Recommended',
			method: 'GET',
			data: data
		});
	}
	// 商品列表
	static getShoppingList(data?: Object) {
		return request({
			url: '/v1/api/shopping/List',
			method: 'GET',
			params: data
		});
	}
	// 商品种类
	static getShoppingCategory(data?: Object) {
		return request({
			url: '/v1/api/shopping/Category',
			method: 'GET',
			data: data
		});
	}
	static getShoppingDetail(data: Object) {
		return request({
			url: '/v1/api/Shopping/Detail',
			method: 'POST',
			data: data
		});
	}
	// 商品下单
	//Route::post(':version/api/Shopping/PlaceOrder', 'api/:version.app.Shopping/PlaceOrder');//下单
	static postShoppingPlaceOrder(data?: Object) {
		return request({
			url: '/v1/api/Shopping/PlaceOrder',
			method: 'POST',
			data: data
		});
	}
}  
