import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class CateringService {
	
	constructor() {
		
	}
	
	
	//菜单管理
	/* Route::get(':version/api/Dishes/Recommended', 'api/:version.app.Dishes/Recommended');//推荐菜品
	
	Route::get(':version/api/Dishes/Statistics', 'api/:version.app.Dishes/Statistics');//统计
	
	Route::get(':version/api/Dishes/List', 'api/:version.app.Dishes/index');//菜单列表
	
	Route::get(':version/api/Dishes/MyOrders', 'api/:version.app.Dishes/MyOrders');//我的订单
	Route::post(':version/api/Dishes/PlaceOrder', 'api/:version.app.Dishes/PlaceOrder');//下单
	
	Route::get(':version/api/Dishes/UndoneOrders', 'api/:version.app.Dishes/UndoneOrders');//未完成订单
	Route::get(':version/api/Dishes/DoneOrders', 'api/:version.app.Dishes/DoneOrders');//已完成订单
	Route::put(':version/api/Dishes/OrdersStatus', 'api/:version.app.Dishes/OrdersStatus');//已完成订单
	Route::resource(':version/api/Dishes', 'api/:version.app.Dishes'); */
	
	//pad端
	// Route::post(':version/api/Dishes/DishOrder', 'api/:version.app.Dishes/DishOrder');//菜品报表
	
	// Route::post(':version/api/Dishes/Finish', 'api/:version.app.Dishes/Finish');//完成菜品
	
	// Route::post(':version/api/Dishes/AccountForDish', 'api/:version.app.Dishes/AccountForDish');//菜品占比
	
	// Route::post(':version/api/NetFlow/DishOrder', 'api/:version.app.NetFlow/DishOrder');//流量报表
	// Route::post(':version/api/NetFlow/AccountForNetFlow', 'api/:version.app.NetFlow/AccountForNetFlow');//流量占比
	
	// Route::post(':version/api/Shopping/DishOrder', 'api/:version.app.Shopping/DishOrder');//商品报表
	// Route::post(':version/api/Shopping/AccountForShopping', 'api/:version.app.Shopping/AccountForShopping');//商品报表
	
    //餐品统计
	static getAccountForDish(data: Object={}) {
		return request({
			url: '/v1/api/Dishes/AccountForDish',
			method: 'POST',
			data: data
		});
	}
	
	static getAccountForNetFlow(data: Object={}) {
		return request({
			url: '/v1/api/NetFlow/AccountForNetFlow',
			method: 'POST',
			data: data
		});
	}
	
	static getAccountForShopping(data: Object={}) {
		return request({
			url: '/v1/api/Shopping/AccountForShopping',
			method: 'POST',
			data: data
		});
	}
	
	
}  
