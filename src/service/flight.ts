import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class FlightService {
	
	constructor() {
		
	}
    
	static getFlightInfo(data?: Object) {   
		return request({
			url: '/v1/api/FlightInfo',
			method: 'GET',
			data: data
		});
	}
	
}  


