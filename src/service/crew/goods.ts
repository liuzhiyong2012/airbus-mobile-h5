import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class GoodsService {
	
	constructor() {
		
	}
	
	
	
	//流量订单
	static getShoppingOrderList(data: Object={}) {
		return request({
			url: '/v1/api/Shopping/ShoppingOrder',  
			method: 'POST',
			data: data
		});
	}
}  
