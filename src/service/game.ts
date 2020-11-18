import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class GameService {
	
	constructor() {
		
	}
    // 获取游戏列表
	static getGameList(data?: Object) {   
		return request({
			url: '/v1/api/Game/List',
			method: 'GET',
			data: data
		});
	}
	
}  
