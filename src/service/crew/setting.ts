import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class SettingService {
	
	constructor() {
		
	}
	
	//获取配置信息
	static getSetting(data: Object={}) {
		return request({
			url: '/v1/api/Setting/GetSetting',  
			method: 'POST',
			data: data
		});
	}
	
	//设置配置信息
	static setSetting(data: Object={}) {
		/* RunDemo  RunDemo */
		return request({
			url: '/v1/api/Setting/SaveSetting',  
			method: 'POST',
			data: data
		});
	}
	//重置数据库信息
	static resetDataBase(data: Object={}) {
		/* RunDemo  RunDemo */
		return request({
			url: '/v1/api/Setting/resetDataBase',  
			method: 'POST',
			data: data
		});
	}
	
	
	
	
	
}  
