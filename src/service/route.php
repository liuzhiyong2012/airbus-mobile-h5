<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;
use think\Request;

//定时同步数据
Route::get(':version/api/timer/sync_user', 'api/:version.app.timer/sync_user');//同步用户数据
Route::get(':version/api/timer/sync_order', 'api/:version.app.timer/sync_order');//同步订单数据
Route::get(':version/api/timer/flight_sync', 'api/:version.app.timer/flight_sync');//同步飞行数据
Route::get(':version/api/timer/test', 'api/:version.app.timer/test');//Ceshi
Route::get(':version/api/timer/downloadFile','api/:version.app.timer/downloadFile');//同步文件到服务器
Route::post(':version/api/timer/getUrl','api/:version.app.timer/getUrl');//假装获取文件列表数据
//登录
Route::post(':version/Token', 'api/:version.app.Token/Token');//登录
Route::post(':version/Register', 'api/:version.app.Token/register');//注册
Route::get(':version/clientToken', 'api/:version.app.Token/clientToken');//获取token
Route::get(':version/api/Qiniu/video_type', 'api/:version.app.Qiniu/video_type');//添加video头部
Route::get(':version/api/Game/List', 'api/:version.app.Game/index');//游戏列表
Route::resource(':version/api/Today', 'api/:version.app.Today');//今日资讯
//忘记密码
Route::post(':version/CheckPhone', 'api/:version.app.Token/checkPhone');//校验电话号码
Route::post(':version/SendCode', 'api/:version.app.Token/sendCode');//发送验证码
Route::post(':version/CheckCode', 'api/:version.app.Token/checkCode');//校验验证码
Route::post(':version/CheckAnswer', 'api/:version.app.Token/checkAnswer');//校验问题答案
Route::post(':version/ResetPassword', 'api/:version.app.Token/ResetPassword');//重置密码

//音乐管理
Route::get(':version/api/Music/Banners', 'api/:version.app.Music/Banners');//音乐轮播图
Route::post(':version/api/Music/Playlist/Hot', 'api/:version.app.Music/Hot');//热门歌单
Route::get(':version/api/Music/Playlist/:id', 'api/:version.app.Music/detail');//歌单详情
Route::post(':version/api/Music/Song/Subscribe', 'api/:version.app.Music/subscribe');//收藏歌曲
Route::post(':version/api/Music/Song/UnSubscribe', 'api/:version.app.Music/un_subscribe');//取消收藏歌曲
Route::post(':version/api/Music/SongSubscribe/List', 'api/:version.app.Music/index');//我收藏的歌曲列表
// Route::get(':version/api/Music/Song/Subscribe/Playlist', 'api/:version.app.Music/play_list');//我收藏的歌曲列表(歌单对象)
Route::get(':version/api/Music/FM', 'api/:version.app.Music/fm');//空中FM
Route::get(':version/api/Music/Top', 'api/:version.app.Music/top');//榜单

Route::get(':version/api/Music/PlaylistSubscribe/:id', 'api/:version.app.Music/PlaylistSubscribe');//收藏歌单
Route::get(':version/api/Music/PlaylistUnSubscribe/:id', 'api/:version.app.Music/PlaylistUnSubscribe');//取消收藏专辑
Route::post(':version/api/Music/PlaylistSubscribe/List', 'api/:version.app.Music/PlaylistSubscribeList');//我收藏的专辑列表

//广告
Route::post(':version/api/Advert/List', 'api/:version.app.Advert/List');//广告列表
//视频管理
Route::get(':version/api/Video/Comments/List', 'api/:version.app.VideoComment/index');//获取评论列表

Route::get(':version/api/Video/Recommended', 'api/:version.app.Video/Recommended');//推荐视频
Route::post(':version/api/Video/List', 'api/:version.app.Video/index');//视频列表   +点赞
Route::get(':version/api/Video/:id', 'api/:version.app.Video/detail');//根据Id获取Video
Route::post(':version/api/Video/Category', 'api/:version.app.Video/Category');//视频类型 
Route::post(':version/api/Video/Comments', 'api/:version.app.Video/comments');//评论视频
Route::delete(':version/api/Video/Comments/:id', 'api/:version.app.VideoComment/del');//删除评论
Route::post(':version/api/Video/IsLike', 'api/:version.app.VideoComment/is_like');//是否已收藏
Route::post(':version/api/Video/Like', 'api/:version.app.VideoComment/like');//收藏视频
Route::post(':version/api/Video/MyLike', 'api/:version.app.VideoComment/MyLike');//我收藏的视频
Route::post(':version/api/Video/UnLike', 'api/:version.app.VideoComment/un_like');//取消视频收藏


//新闻管理
Route::get(':version/api/News/Recommended', 'api/:version.app.News/Recommended');//推荐新闻
Route::get(':version/api/News/Category', 'api/:version.app.News/Category');//新闻种类
Route::get(':version/api/News/List', 'api/:version.app.News/index');//新闻列表
Route::post(':version/api/News/IsLike', 'api/:version.app.News/is_like');//是否已收藏
Route::post(':version/api/News/Like', 'api/:version.app.News/like');//收藏视频
Route::post(':version/api/News/MyLike', 'api/:version.app.News/MyLike');//我收藏的视频
Route::post(':version/api/News/UnLike', 'api/:version.app.News/un_like');//取消视频收藏


Route::resource(':version/api/News', 'api/:version.app.News');

Route::get(':version/api/FlightInfo', 'api/:version.app.flight/FlightInfo');//飞行资讯

Route::get(':version/api/User/Me', 'api/:version.app.User/Me');//用户详情
//信息
// Route::post(':version/api/info/UserInfo', 'api/:version.app.info/UserInfo');//用户信息
Route::get(':version/api/Crm/SeatInfo', 'api/:version.app.Crm/SeatInfo');//当前航班座位列表
Route::get(':version/api/Crm/OtherSeatList', 'api/:version.app.Crm/OtherSeatList');//剩余座位。
Route::get(':version/api/Crm/SelectSeat/:id', 'api/:version.app.Crm/SelectSeat');//选择座位。
//菜单管理
Route::get(':version/api/Dishes/Recommended', 'api/:version.app.Dishes/Recommended');//推荐菜品
Route::get(':version/api/Dishes/Statistics', 'api/:version.app.Dishes/Statistics');//统计
Route::get(':version/api/Dishes/List', 'api/:version.app.Dishes/index');//菜品列表
Route::post(':version/api/Dishes/Detail', 'api/:version.app.Dishes/read');//菜品详情
Route::get(':version/api/Dishes/MyOrders', 'api/:version.app.Dishes/MyOrders');//我的订单
Route::post(':version/api/Dishes/PlaceOrder', 'api/:version.app.Dishes/PlaceOrder');//下单
Route::get(':version/api/Dishes/UndoneOrders', 'api/:version.app.Dishes/UndoneOrders');//未完成订单
Route::get(':version/api/Dishes/DoneOrders', 'api/:version.app.Dishes/DoneOrders');//已完成订单
Route::put(':version/api/Dishes/OrdersStatus', 'api/:version.app.Dishes/OrdersStatus');//已完成订单
Route::resource(':version/api/Dishes', 'api/:version.app.Dishes');

//商品管理
Route::get(':version/api/Shopping/Recommended', 'api/:version.app.Shopping/Recommended');//推荐商品
Route::get(':version/api/Shopping/Statistics', 'api/:version.app.Shopping/Statistics');//统计
Route::get(':version/api/Shopping/List', 'api/:version.app.Shopping/index');//商品列表
Route::get(':version/api/Shopping/MyOrders', 'api/:version.app.Shopping/MyOrders');//商品的订单
Route::post(':version/api/Shopping/PlaceOrder', 'api/:version.app.Shopping/PlaceOrder');//下单

Route::get(':version/api/Shopping/UndoneOrders', 'api/:version.app.Shopping/UndoneOrders');//未完成订单
Route::get(':version/api/Shopping/DoneOrders', 'api/:version.app.Shopping/DoneOrders');//已完成订单
Route::put(':version/api/Shopping/OrdersStatus', 'api/:version.app.Shopping/OrdersStatus');//已完成订单

Route::get(':version/api/Shopping/Category', 'api/:version.app.Shopping/Category');//商品种类
Route::post(':version/api/Shopping/Size', 'api/:version.app.Shopping/Size');//商品规格
Route::post(':version/api/Shopping/Advert', 'api/:version.app.Shopping/ShoppingAdvert');//商品广告

//流量包
Route::post(':version/api/NetFlow/List', 'api/:version.app.NetFlow/list');//流量包列表
Route::post(':version/api/NetFlow/PlaceOrder', 'api/:version.app.NetFlow/PlaceOrder');//流量包购买
Route::post(':version/api/NetFlow/MyOrders', 'api/:version.app.NetFlow/MyOrders');//我的流量包订单
Route::get(':version/api/NetFlow/DoneOrders', 'api/:version.app.NetFlow/DoneOrders');//已完成订单
//地址
Route::post(':version/api/Address/UpdateAddress', 'api/:version.app.Address/UpdateAddress');//地址修改
Route::post(':version/api/Address/GetAddress', 'api/:version.app.Address/GetAddress');//地址获取


//系统通知
Route::post(':version/api/notice/List', 'api/:version.app.Notice/List');//我的通知
Route::post(':version/api/notice/ReadNotice', 'api/:version.app.Notice/ReadNotice');//通知已读
//消息
Route::post(':version/api/Message/SendToManager', 'api/:version.app.Message/SendToManager');//用户对空乘发送信息
Route::post(':version/api/Message/SendToUser', 'api/:version.app.Message/SendToUser');//空乘对发送信息
Route::post(':version/api/Message/ReadMessage', 'api/:version.app.Message/ReadMessage');//消息已读
Route::post(':version/api/Message/getUserMessage', 'api/:version.app.Message/getUserMessage');//用户当前航班的消息

//pad端
Route::post(':version/api/Dishes/DishOrder', 'api/:version.app.Dishes/DishOrder');//菜品报表
Route::post(':version/api/Dishes/Finish', 'api/:version.app.Dishes/Finish');//完成菜品
Route::post(':version/api/Dishes/AccountForDish', 'api/:version.app.Dishes/AccountForDish');//菜品占比


Route::post(':version/api/NetFlow/DishOrder', 'api/:version.app.NetFlow/DishOrder');//流量报表
Route::post(':version/api/NetFlow/AccountForNetFlow', 'api/:version.app.NetFlow/AccountForNetFlow');//流量占比

Route::post(':version/api/Shopping/DishOrder', 'api/:version.app.Shopping/DishOrder');//商品报表
Route::post(':version/api/Shopping/AccountForShopping', 'api/:version.app.Shopping/AccountForShopping');//商品报表


Route::miss('Error/index');
$request = Request::instance();
if ($request->method() === "OPTIONS") {
    exit (json_encode(array('error' => 200, 'message' => 'Options Success.')));
}

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
];
