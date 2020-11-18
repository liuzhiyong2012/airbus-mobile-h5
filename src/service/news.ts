import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class NewsService {
	
	constructor() {
		
	}
    // 推荐新闻
	static getNewsRecommended(data?: Object) {   
		return request({
			url: '/v1/api/News/Recommended',
			method: 'GET',
			data: data
		});
	}
    // 新闻列表
	static getNewsList(data?: Object) {   
		return request({
			url: '/v1/api/News/List',
			method: 'GET',
			data: data
		});
	}

	// 新闻详情
	static getNewsDetail(data?: Object) {   
		return request({
			url: '/v1/api/News/Read',
			method: 'GET',
			params: data
		});
	}

	// 新闻种类
	static getNewsCategory(data?: Object){
		return request({
			url:'v1/api/News/Category',
			method:'GET',
			data: data
		})
	}
	// 是否已收藏
	static postNewsIsLike(data?: Object) {   
		return request({
			url: '/v1/api/News/IsLike',
			method: 'POST',
			data: data
		});
	}
	// 新闻收藏
	static postNewsLike(data?: Object) {   
		return request({
			url: '/v1/api/News/Like',
			method: 'POST',
			data: data
		});
	}
	// 我收藏的视频
	static postNewsMyLike(data?: Object) {   
		return request({
			url: '/v1/api/News/MyLike',
			method: 'POST',
			data: data
		});
	}
	// 取消收藏
	static postNewsUnLike(data?: Object) {   
		return request({
			url: '/v1/api/News/UnLike',
			method: 'POST',
			data: data
		});
	}
}  
