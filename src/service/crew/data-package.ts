import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class DataPackageService {
	
	constructor() {
		
	}
	
	//流量订单
	static getNetFlowOrderList(data: Object={}) {
		return request({
			url: '/v1/api/NetFlow/NetFlowOrder',  
			method: 'POST',
			data: data
		});
	}
	
}  
