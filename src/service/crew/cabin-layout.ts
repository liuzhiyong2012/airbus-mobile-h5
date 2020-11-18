import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';



export default class CateringService {
	
	constructor() {
		
	}
	
	//获取座舱布局
	static getFlightSeatInfo(data: Object={}) {
		return request({
			url: '/v1/api/Crm/SeatInfo',
			method: 'GET',
			data: data
		});
	}
	
	//获取座位关联消息
	static getSeatMessageInfo(data: Object={}) {
		return request({
			url: '/v1/api/Message/SeatMessageInfo',
			method: 'POST',
			data: data
		});
	}
	
	
	static getAirBusMessage(data: Object={}) {
		return request({
			url: '/v1/api/Message/GtAirBusMessage',
			method: 'POST',
			data: data
		});
	}
	
	
	static sendToUser(data: Object={}) {
		// to，content
		//sendToUser
		return request({
			url: '/v1/api/Message/SendToUser',
			method: 'POST',
			data: data
		});
		
	}
	
	// /api/Message/SendToUser
	
	
	//读取信息
	static readAirBusMessage(data: Object={}) {
		return request({
			url: '/v1/api/Message/ReadAirBusMessage',
			method: 'POST',
			data: data
		});
	}
	
	//根据用户id获取用户的
	static getUserMessageByUserIdArr(data: Object={}) {
		return request({
			url: '/v1/api/Message/getUserMessageByUserIdArr',
			method: 'POST',
			data: data
		});
	}
	
	
	
	
	
	//获取最新的未读信息与用户的对应消息。
	// /api/Message/SeatMessageInfo
	
}  

//
//SendToManager
//SendToUser
//getUserMessage
//ReadMessage
///notice/List
//ReadNotice