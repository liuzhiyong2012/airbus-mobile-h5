import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class VideoService {

	constructor() {

	}
	// 推荐视频
	static getVideoRecommended(data?: Object) {
		return request({
			url: '/v1/api/Video/Recommended',
			method: 'GET',
			data: data
		});
	}
	// 视频列表
	static postVideoList(data?: Object) {
		return request({
			url: '/v1/api/Video/List',
			method: 'POST',
			data: data
		});
	}
	// Route::get(':version/api/Video/:id', 'api/:version.app.Video/detail');//根据Id获取Video
	static getVideo(id: string, data?: object) {
		return request({
			url: '/v1/api/Video/' + id,
			method: 'GET',
			params: data
		})
	}
	static getVideoCommentsList(data?: object) {
		return request({
			url: '/v1/api/Video/Comments/List',
			method: 'GET',
			params: data
		})
	}
	// Route::get(':version/api/Video/Comments/List', 'api/:version.app.VideoComment/index');//获取评论列表
	// Route::post(':version/api/Video/Comments', 'api/:version.app.Video/comments');//评论视频
	// Route::delete(':version/api/Video/Comments/:id', 'api/:version.app.VideoComment/del');//删除评论
	// Route::post(':version/api/Video/IsLike', 'api/:version.app.VideoComment/is_like');//是否已收藏
	// Route::post(':version/api/Video/Like', 'api/:version.app.VideoComment/like');//收藏视频
	// Route::post(':version/api/Video/MyLike', 'api/:version.app.VideoComment/MyLike');//我收藏的视频
	// Route::post(':version/api/Video/UnLike', 'api/:version.app.VideoComment/un_like');//取消视频收藏
	static postVideoMyLike(data?: object) {
		return request({
			url: '/v1/api/Video/MyLike',
			method: 'POST',
			data: data
		})
	}
	// 收藏视频
	static postVideoLike(data?: object) {
		return request({
			url: '/v1/api/Video/Like',
			method: 'POST',
			data: data
		})
	}
	// 取消收藏视频
	static postVideoUnLike(data?: object) {
		return request({
			url: '/v1/api/Video/UnLike',
			method: 'POST',
			data: data
		})
	}
	// 评论视频
	static postVideoComments(data?: object) {
		return request({
			url: '/v1/api/Video/Comments',
			method: 'POST',
			data: data
		})
	}
	// Route::post(':version/api/Advert/List', 'api/:version.app.Advert/List');//广告列表
	// 广告列表
	static postAdvertList(data?: object) {
		return request({
			url: '/v1/api/Shopping/Advert',
			method: 'POST',
			data: data
		})
	}
}  
