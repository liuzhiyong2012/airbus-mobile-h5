import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class CateringService {
	
	constructor() {
		
	}
	
	//菜品报表
	static getDishOrderList(data: Object={}) {
		return request({
			url: '/v1/api/Dishes/DishOrder',
			method: 'POST',
			data: data
		});
	}
	
	//完成菜品
	static finishDishes(data: Object={}) {
		return request({
			url: '/v1/api/Dishes/Finish',
			method: 'POST',
			data: data
		});
	}
	
	
}  
