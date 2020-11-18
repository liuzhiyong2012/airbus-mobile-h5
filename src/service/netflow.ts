import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class VideoService {
	
	constructor() {
		
	}
    // 流量包列表
	static postNetFlowList(data?: Object) {   
		return request({
			url: '/v1/api/netFlow/List',
			method: 'POST',
			data: data
		});
	}
    // 流量包购买
	static postNetFlowPlaceOrder(data: Object) {   
		return request({
			url: '/v1/api/netFlow/PlaceOrder',
			method: 'POST',
			data: data
		});
	}
	

	
}  
