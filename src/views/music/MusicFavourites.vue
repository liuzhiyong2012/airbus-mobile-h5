<template>
	<section class="music-main-ctn">
		<van-sticky>
			<abus-title :title="$t('title')">
				<div slot style="width: 0.3rem"></div>
			</abus-title>
		</van-sticky>
		<music-tab :active="activePage" :tabList="tabList" @switch="switchPage($event)" class="music-tab-ctn"></music-tab>

		<section class="content-ctn">
			<div class="title-top">
				<div class="title-left">
					<span>{{$t('TotalSong')}}:</span>
					<span>{{total}}</span>
				</div>

				<div class="title-right" v-if="activePage == 'song'" @click="playSong(0)">
					<i class="icon icon-play"></i>
					<span class="play-btn">{{$t('PlayAll')}}</span>
				</div>
			</div>

			<div class="item-content-ctn">
				<!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
					<!-- <van-list  v-model="loading" :finished="finished" :finished-text="nomore" @load="onLoad" :offset="100" :immediate-check="false" ref="mylist"> -->
						<div  v-if="activePage == 'song'" refs="aaa" class="collect-list-ctn song">
							<van-swipe-cell v-for="(item, index) in resultList" :key="index" class="mysong-swipe-item">
								<template #right>
									<div class="delete-btn" >
										<i class="icon icon-trash" @click="unSubscribeSong(index,item)"></i>
									</div>
								</template>

								<div class="mysong-item" @click="playSong(index)">
									<div class="song-info">
										<div>{{ item.Name }}</div>
										<div>{{ computeAuthorName(item) }}</div>
									</div>

									<div class="oper-ctn">
										<abus-music-icon v-if="currentSong.id == item.Id" :playingStatus='playing'></abus-music-icon>
									</div>
								</div>
							</van-swipe-cell>
						</div>
						
						<div  v-if="activePage == 'playList'" class="collect-list-ctn play-list"  >
							<van-swipe-cell v-for="(item, index) in resultList" :key="index" class="mysong-swipe-item">
								<template #right>
									<div class="delete-btn">
										<i class="icon icon-trash" @click="unSubscribePlaylist(index,item)"></i>
									</div>
								</template>
								<div class="mysong-item"  @click="stepToPage(item)">
									<div class="mysong-img" :style="{backgroundImage:`url(${item.CoverImgUrl})`}">
																		 
									</div>
									<div class="song-info">
										<div>{{ item.Name }}</div>
										<div>{{$t('TotalSong')}}:{{item.TrackCount}}</div>
									</div>
								</div>
							</van-swipe-cell>
						</div>
						<div class="v-finished-text">
							{{ $t("noMore") }}
						</div>
					<!-- </van-list> -->
				<!-- </van-pull-refresh> -->
			</div>
		</section>
	</section>
</template>
<i18n>
	{
		"zh":{
			"title":"最喜欢的",
			"TotalSong":"全部",
			"PlayAll":"播放全部",
			"CancelledSuccessfully":"取消收藏歌单成功",
			"fail":"获取列表失败!",
			"noMore":"没有更多了"
		},
		"en":{
			"title":"Favourites",
			"TotalSong":"Total song",
			"PlayAll":"Play all",
			"CancelledSuccessfully":"Collection of song list cancelled successfully",
			"fail":"Failed to get list!",
			"noMore":"no more"
		}
	}
</i18n>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import MusicService from '../../service/music';
import MusicTab from './components/MusicTab.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import AbusMusicIcon from '../../components/AbusMusicIcon.vue';
import UrlUtils from '../../utils/url-utils';

@Component({
	name: 'MusicFavourites',
	components: {
		AbusTitle,
		MusicTab,
		MusicPlayer,
		AbusMusicIcon
	}
})
export default class MusicFavourites extends Vue {
	private recomendList: Array<any> = [];
	private activePage = 'song';
	private playing: any;

	private get currentSong() {
		this.playing = this.$store.getters.playing;
		return this.$store.getters.currentSong;
	}

	private tabList: any[] = [
		{
			name: 'Song',
			EName:'Song',
			ZhName:'音乐',
			value: 'song'
		},
		{
			name: 'PlayList',
			EName:'PlayList',
			ZhName:'榜单',
			value: 'playList'
		}
	];
	private nomore: string = "";
	
    private allSongs: any[] = [];
	
	private refreshing: boolean = false;
	private loading: boolean = false;
	private finished: boolean = false;

	private resultList: any[] = [];

	private pageSize: number = 10;
	private pageNumber: number = 1;
	
	private total: number = 0;

	private mounted() {
		this.resetList();
		this.getAllSong();
		if (localStorage.getItem('lang') == 'en') {
			this.$i18n.locale = 'en';
			this.nomore = 'no more'
			this.tabList.forEach(item=>{
				item.name = item.EName
			})
		} else {
			this.$i18n.locale = 'zh';
			this.nomore = '没有更多了'
			this.tabList.forEach(item=>{
				item.name = item.ZhName
			})
		}
	}


	// public deleteSong(item:any){
		
	// }
	
	private stepToPage(item:any):void{
				 this.$router.push({
					 name:'musicPlaylistDetail',
					 query:{
						 id:item.Id
					 }
				 });
	}
	
	//取消收藏歌单
	private unSubscribePlaylist(index:number,item:any):void{
		 MusicService.unSubscribePlaylist({id:item.Id}).then((res)=>{
			if(res.code == '200'){
				this.total = this.total - 1;
				this.resultList.splice(index,1);
				
				this.$toast(this.$i18n.t('CancelledSuccessfully'));
			}
		 }); 
	}
	
	//取消收藏歌曲
	private unSubscribeSong(index:number,item:any):void{
		
		 MusicService.unSubscribeSong({id:item.Id}).then((res)=>{
			if(res.code == '200'){
				this.total = this.total - 1;
				this.resultList.splice(index,1);
				this.$toast(this.$i18n.t('CancelledSuccessfully'));
			}
		 }); 
		 
	}
	
										
	public computeAuthorName(item): string {
		let anthorList = [];

		item.Artists.forEach((artistItem, index) => {
			anthorList.push(artistItem.Name);
		});

		return anthorList.join(',');
	}

	public switchPage($event): void {
		this.resultList = [];
		
		this.$nextTick(()=>{
			this.activePage = $event.value;
			this.resetList();  
		});
		
	}

	public getList() {
		if (this.activePage == 'song') {
			this.getMySongList();
		} else {
			this.getMyPlaylist();
		}
	}

	public getMySongList(): void {
		this.resultList = [];
		MusicService.getMySongList({
			// take: this.pageSize,
			// skip: (this.pageNumber - 1) * this.pageSize
			take: 9999,
			skip: 0
		}).then((resData: any) => {
				if (resData.code == '200'){
					if (resData.data.EOF) {
						this.finished = true;
					}
					// this.resultList = this.resultList.concat(resData.data.palyList);
					this.resultList = resData.data.palyList;
					this.total = resData.data.count;
				} else {
					this.$toast(this.$i18n.t('fail'));
				}
				
				this.loading = false;
				this.refreshing = false;
			})
			.catch((e?: any) => {
				this.loading = false;
				this.refreshing = false;
			});
	}

	public getMyPlaylist(): void {
		this.resultList = [];
		MusicService.getMyPlaylist({
			// take: this.pageSize,
			// skip: (this.pageNumber - 1) * this.pageSize
			take: 9999,
			skip: 0
		}).then((resData: any) => {
			if (resData.code == '200') {
				
				resData.data.Playlist.forEach((item:any,index:any)=>{
					item.CoverImgUrl = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.CoverImgUrl));
				});
				
				// this.resultList = this.resultList.concat(resData.data.Playlist); 
				this.resultList = resData.data.Playlist; 
				this.total = resData.data.count;
				
				this.loading = false;
				this.refreshing = false;
			} else {
				this.$toast(this.$i18n.t('fail'));
				this.loading = false;
				this.refreshing = false;
			}
		});
	}

	resetList() {
		this.pageNumber = 1;
		this.pageSize = 10;
		this.resultList = [];
		this.getList();
	}

	private onRefresh(): void {
		this.refreshing = true;
		this.resetList();
	}

	private playSingleSong(item): void {
		this.$store.dispatch('selectPlay', {
			list: [
				{
					album: 'album',
					duration: item.Duration/1000,
					id: item.Id,
					image: '',
					mid: '',
					isLike:item.isLike,
					name: item.Name,
					singer: this.computeAuthorName(item),
					lyricUrl:UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.LyricUrl)),
					url: UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.Url))
				}
			],
			index: 0
		});
	}
    
	
	
	private playSong(index){
		this.$store.dispatch('selectPlay', {
			list: this.allSongs,
			index: index
		});
	}
	
	private getAllSong(): void {
		MusicService.getMySongList({
			take: 1000,
			skip: 0
		})
			.then((resData: any) => {
				if (resData.code == '200') {
					let songs = [];

					resData.data.palyList.forEach((item, index) => {
						songs.push({
							album: 'album',
							duration: item.Duration/1000,
							id: item.Id,
							image: '',
							mid: '',
							name: item.Name,
							singer: this.computeAuthorName(item),
							lyricUrl:UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.LyricUrl)),
							url: UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.Url))
						});
					});
					
					this.allSongs = songs;
				} else {
					this.$toast(this.$i18n.t('fail'));
				}
			})
			.catch((e?: any) => {
			});
	}

	private onLoad(): void {
		this.pageNumber = this.pageNumber + 1;
		this.pageSize = 10;
		this.getList();
	}
	
}
</script>

<style lang="scss" scoped>
.music-main-ctn {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;

	.music-tab-ctn {
		margin-bottom: 0.2rem;
	}

	.content-ctn {
		position: relative;
		overflow-y: auto;
		overflow-x: hidden;

		flex: 1;
		padding: 0.3rem 0.24rem;
		background: #ffffff;

		.title-top {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.24rem 0.3rem;
			background: #ffffff;
			z-index: 12;
			box-sizing: border-box;
			line-height: 0.42rem;

			.title-left {
				font-size: 0.22rem;
				font-family: Helvetica;
				color: rgba(153, 153, 153, 1);

				span:nth-child(1) {
					font-size: 0.22rem;
					font-family: Helvetica;
					color: rgba(153, 153, 153, 1);
					margin-right: 0.08rem;
				}
				span:nth-child(2) {
				}
			}
			.title-right {
				display: flex;
				align-items: center;
				.icon {
					margin-right: 0.12rem;
					font-size: 0.36rem;
				}

				> span {
					font-size: 0.26rem;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(0, 32, 91, 1);
				}
			}
		}

		.item-content-ctn {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			padding-top: 1rem;

			.collect-list-ctn {
				// padding: 0 0.3rem;
				// overflow: hidden;
				// overflow-y: auto;
				&.song {
					.mysong-swipe-item {
						// padding:0.22rem 0;
						// margin-bottom: 0.44rem;
						.delete-btn {
							width: 1.2rem;
							height: 1.2rem;
							text-align: center;
							line-height: 0.68rem;
							background: rgba(228, 0, 43, 1);
							>.icon{
								color:#ffffff;
								font-size: 0.32rem;
								line-height: 1.12rem;
							}
						}

						.mysong-item {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding:0.22rem 0.30rem;

							.song-info {
								div:nth-child(1) {
									font-size: 0.3rem;
									margin-bottom: 0.14rem;
									font-family: Helvetica;
									color: rgba(46, 46, 46, 1);
								}
								div:nth-child(2) {
									font-size: 0.2rem;
									font-family: Helvetica;
									color: rgba(102, 102, 102, 1);
									line-height: 0.24rem;
								}
							}
							.oper-ctn {
								top: 0.30rem;
								right: 0.30rem;
								position: absolute;
								width: 0.4rem;
								height: 0.4rem;
							}
						}
					}
				}
				&.play-list {
					.mysong-swipe-item {
						position: relative;
						// padding:0.14rem 0;
						// height: 1.2rem;
						// padding-left: 1.40rem;
						
						.delete-btn {
							width: 1.2rem;
							height: 100%;
							text-align: center;
							line-height: 1.48rem;
							background: rgba(228, 0, 43, 1);
							
							>.icon{
								color:#ffffff;
								font-size: 0.32rem;
								line-height: 1.48rem;
							}
						}
						
						
						.mysong-item {
							height:1.20rem;
							padding:0.14rem 0.30rem;
							
							.mysong-img{
								position: absolute;
								border-radius: 0.04rem;
								left:0.30rem;
								top:0.14rem;
								width:1.20rem;
								height:1.20rem;
								background: red;
								background-position: center;
								background-repeat: no-repeat;
								background-size: contain;
							}
							
							

							.song-info {
								margin-left: 1.40rem;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								div:nth-child(1) {
									margin-top:0.12rem;
									
									font-size:0.30rem;
									font-family:Helvetica;
									color:rgba(46,46,46,1);
									line-height:0.36rem;
									margin-bottom: 0.34rem;
									
									overflow: inherit;
									    text-overflow: ellipsis;
									    white-space: nowrap;
								}
								div:nth-child(2) {
									
									font-size:0.22rem;
									font-family:Helvetica;
									color:rgba(102,102,102,1);
									line-height:0.26rem;
									
									overflow: inherit;
									    text-overflow: ellipsis;
									    white-space: nowrap;
									
									/* font-size: 0.2rem;
									font-family: Helvetica;
									color: rgba(102, 102, 102, 1);
									line-height: 0.24rem; */
								}
							}
							.oper-ctn {
								top: 0;
								right: 0;
								position: absolute;
								width: 0.4rem;
								height: 0.4rem;
							}
						}
					}
				}
			}

			.v-finished-text {
				width: 100% !important;
				font-size: .24rem !important;
				text-align: center;
				line-height: 0.5rem;
				color: #969799;
				margin-bottom: 1.2rem;
			}
		}
	}
}
</style>
