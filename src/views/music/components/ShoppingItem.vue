<template>
	<div class="abus-scroller-box" :style="{ backgroundColor: isHaveData ? '#f8f8f8' : '#fff' }">
		<scroller>
			<div slot="list" v-for="(item, index) of recomendList" :key="index">
				<div @click="stepToDetail(item)" class="s-box s-box-right" v-if="index + 1 == recomendList.length">
					<div class="img-box">
						<div class="img"><img :src="item.CoverImgUrl | addBaseUrl" :alt="item.Name" width="100%" /></div>
					</div>
					<div class="name">{{ item.Name }}</div>
					<!-- <div class="price">${{ item.Price }}</div> -->
				</div>
				<div @click="stepToDetail(item)" class="s-box" v-else>
					<div class="img-box">
						<div class="img"><img :src="item.CoverImgUrl | addBaseUrl" :alt="item.Name" width="100%" /></div>
					</div>
					<div class="name">{{ item.Name }}</div>
					
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
import Vue from 'vue';
import Scroller from '@nutui/nutui/dist/packages/scroller/scroller.js'; // 加载构建后的JS
import '@nutui/nutui/dist/packages/scroller/scroller.css';

import UrlUtils from '../../../utils/url-utils';
import MusicService from '../../../service/music';

Scroller.install(Vue);
export default {
	components: {
		Scroller
	},
	data() {
		return {
			recomendList: [],
			isHaveData: false
		};
	},
	created() {
		this.getMusicBanners();
		if (localStorage.getItem('lang') == 'en') {
			this.$i18n.locale = 'en';
		} else {
			this.$i18n.locale = 'zh';
		}
	},
	methods: {
		getMusicBanners() {
			MusicService.getMusicPlaylistHot({
				take: 10,
				skip: 0
			}).then((resData) => {
				if (resData.code == 200) {
					/* this.recomendList = resData.data.Playlists;
	  				   this.recomendList.forEach((item,index)=>{
	  					   	item.CoverImgUrl = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.CoverImgUrl));
	  				   						// item.CoverImgUrl = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.CoverImgUrl));
	  				   }); */

					this.recomendList = resData.data.Playlists.slice(0,5);
					this.recomendList.forEach((item,index)=>{
						  					   	item.CoverImgUrl = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item.CoverImgUrl));
					}); 
					this.isHaveData = true;
				}
			});
		},
		stepToDetail(item) {
			this.$router.push({
							 name:'musicPlaylistDetail',
							 query:{
								 id:item.Id
							 }
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.abus-scroller-box {
	margin: 0;
	padding: 0.28rem 0;
	border-radius: 0%;
}
.nut-hor-scroll {
	background-color: #fff !important;
}
.nut-scroller {
	background-color: #fff !important;
	padding: 0.2rem 0;
}
.s-box {
	float: left;
	// height: 1.6rem;
	margin: 0 0 0 0.28rem;
	border-radius: 0.08rem;
	width: 1.6rem;

	.img-box {
		display: flex;
		align-items: center;
		width: 1.6rem;
		height: 1.6rem;
		text-align: center;
		box-shadow: 0 0 0.08rem #efefef;
		overflow: hidden;
		.img {
			width: 100%;
			border-radius: 0.1rem;
		}
	}
	.name {
		line-height: 0.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
		height: 0.5rem;
		color: rgb(51, 51, 51);
	}
	.price {
		color: rgba(0, 31, 91, 1);
		font-size: 0.24rem;
		font-weight: bold;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		span {
			// display: inline-block;
			margin-left: 0.1rem;
			color: #ccc;
			text-decoration: line-through;
			font-size: 0.19rem;
			font-weight: normal;
		}
	}
}
.s-box-right {
	margin-right: 0.28rem;
}
</style>
