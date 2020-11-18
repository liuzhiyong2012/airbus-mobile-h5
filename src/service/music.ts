import request, { request as http } from '@/utils/request';
import { AxiosPromise } from 'axios';


export default class MusicService {
	
	constructor() {
		
	}
	
    // 音乐轮播图
	static getMusicBanners(data: Object) {   
		return request({
			url: '/v1/api/Music/Banners',
			method: 'GET',
			data: data
		});
	}
	 
    // 热门歌单
	static getMusicPlaylistHot(data?: Object) {   
		return request({
			url: '/v1/api/Music/Playlist/Hot',
			method: 'POST',
			data: data
		});
	}
	
	// FM
	static getMusicFM(data?: Object){
		return request({
			url: '/v1/api/Music/FM',
			method: 'GET',
			data: data
		})
	}
	
    // 榜单
	static getMusicTop(data?: Object) {   
		return request({
			url: '/v1/api/Music/Top',
			method: 'GET',
			data: data
		});
	}
    // 我收藏的歌曲列表(歌单对象)
	static getMySongList(data?: Object) {   
		// Playlist
		return request({
			url: `/v1/api/Music/SongSubscribe/List`, 
			method: 'POST',
			data: data
		});
	}
	
	static getPlaylistDetail(data?: any) {
		return request({
			url: '/v1/api/Music/Playlist/' + data.id, 
			method: 'GET',
			data: data
		});
	}
	
	//收藏歌单
	static subscribePlaylist(data?: any) {
		return request({
			url: '/v1/api/Music/PlaylistSubscribe/' + data.id, 
			method: 'GET',
			data: data
		});
	}
	
	//取消收藏歌单
	static unSubscribePlaylist(data?: any) {
		
		return request({
			url: '/v1/api/Music/PlaylistUnSubscribe/' + data.id, 
			method: 'GET',
			data: data
		});
		
	}
	
	//我收藏的歌单
	static getMyPlaylist(data?: Object) {
		return request({
			url: '/v1/api/Music/PlaylistSubscribe/List', 
			method: 'POST',
			data: data
		});
	}
	
	
	
	//收藏歌曲
	static subscribeSong(data?: Object) {
		return request({
			url: '/v1/api/Music/Song/Subscribe', 
			method: 'POST',
			data: data
		});
	}
	
	//取消收藏歌曲
	static unSubscribeSong(data?: Object) {
		return request({
			url: '/v1/api/Music/Song/UnSubscribe',
			method: 'POST',
			data: data
		});
	}
	
	
	// Route::post(':version/api/Music/Song/Subscribe/:id', 'api/:version.app.Music/subscribe');
	//收藏歌曲
	// Route::post(':version/api/Music/Song/UnSubscribe/:id', 'api/:version.app.Music/un_subscribe');
	// //取消收藏歌曲
	
/* 	
    Route::get(':version/api/Music/PlaylistSubscribe/:id', 'apiersion.app.Music/PlaylistSubscribe');//收藏歌单
	Route::get(':version/api/Music/PlaylistUnSubscribe/:id', 'apiersion.app.Music/PlaylistUnSubscribe');//取消收藏专辑
	Route::post(':version/api/Music/PlaylistSubscribe/List', 'apiersion.app.Music/PlaylistSubscribeList');//我收藏的专辑列表 
	
*/

// Route::get(':version/api/Music/PlaylistSubscribe/:id', 'apiersion.app.Music/PlaylistSubscribe');//收藏歌单
// Route::get(':version/api/Music/PlaylistUnSubscribe/:id', 'apiersion.app.Music/PlaylistUnSubscribe');//取消收藏专辑
// Route::post(':version/api/Music/PlaylistSubscribe/List', 'apiersion.app.Music/PlaylistSubscribeList');//我收藏的专辑列表
	
/* 	//音乐管理
	Route::get(':version/api/Music/Banners', 'api/:version.app.Music/Banners');//音乐轮播图
	Route::get(':version/api/Music/Playlist/Hot', 'api/:version.app.Music/Hot');//热门歌单
	Route::get(':version/api/Music/Playlist/:id', 'api/:version.app.Music/detail');//歌单详情
	Route::post(':version/api/Music/Song/Subscribe/:id', 'api/:version.app.Music/subscribe');//收藏歌曲
	Route::post(':version/api/Music/Song/UnSubscribe/:id', 'api/:version.app.Music/un_subscribe');//取消收藏歌曲
	Route::get(':version/api/Music/Song/Subscribe/List', 'api/:version.app.Music/index');//我收藏的歌曲列表
	Route::get(':version/api/Music/Song/Subscribe/Playlist', 'api/:version.app.Music/play_list');//我收藏的歌曲列表(歌单对象)
	Route::get(':version/api/Music/FM', 'api/:version.app.Music/fm');//空中FM
	Route::get(':version/api/Music/Top', 'api/:version.app.Music/top');//榜单
*/
	
}  
