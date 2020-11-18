import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class DishService {
	
	constructor() {
		
	}
    
	static getDishesRecommendedList(data: Object) {   
		return request({
			url: '/v1/api/Dishes/Recommended',
			method: 'GET',
			data: data
		});
	}
	
	static getDishesList(data: Object) {
		return request({
			url: '/v1/api/Dishes/List',
			method: 'GET',
			data: data
		});
	}
	
	static placeDishesOrder(data: Object) {
		return request({ 
			url: '/v1/api/Dishes/PlaceOrder',
			method: 'POST',
			data: data
		});
	}
	
	static getDishesDetail(data: Object) {
			return request({
				url: '/v1/api/Dishes/Detail',
				method: 'POST',
				data: data
			});
		}
	/* static getDishesRecommendedList(data: Object) {
		return request({
			url: '/v1/api/Video/Like/',
			method: 'POST',
			data: data
		});
	} */
	
}  
