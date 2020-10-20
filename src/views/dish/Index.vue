<template>
	<section class="dish-main-ctn">
		<van-sticky>
			<abus-title :title="$t('title')" backRouteName="home">
				<div slot style="width:0.3rem"></div>
			</abus-title>
		</van-sticky>
		<van-swipe :autoplay="3000">
			<van-swipe-item class="dish-recomend-item" v-for="(item, index) in recomendList" :key="index" @click="stepToDetail(item)">
				<!-- <div class="dish-recomend-img" :style="{ backgroundImage: `url(${item.BannerImgPath})` }"></div> -->
				<img class="dish-recomend-img" v-lazy="item.BannerImgPath" />
			</van-swipe-item>
		</van-swipe>

		<section class="dishes-list">
			<div v-for="(item, index) in dishesList" class="dishes-item" :key="index" @click="stepToDetail(item)">
				<div class="img-ctn" :style="{ backgroundImage: `url(${item.BannerImgPath})` }" ></div>
				<div class="dish-info">
					<div class="price-ctn" :class="{ 'is-discount': false }">
						<span>${{ item.Price }}</span>
						<!-- <span>32</span> -->
					</div>

					<div class="name-ctn">{{ item.Name }}</div>
					<div class="bottom-ctn" v-if="item.Stocking">
						<div class="qty-ctn">
							<span>QTY</span>
							<span>{{item.Stocking}}</span>
						</div>
						<div class="order-btn" @click="stepToDetail(item)">{{$t("order")}}</div>
					</div>
					<div v-else class="bottom-ctn">
						<div class="qty-ctn">
							<span v-if="lang=='zh'">缺货</span>
							<span v-if="lang=='en'">Out of stock</span>
						</div>
						<div class="order-btn" @click="showToast">{{$t("order")}}</div>
					</div>
				</div>
			</div>
		</section>
		<!-- 点单列表 -->
	</section>
</template>

<i18n>
	{
		"zh":{
			"title":"餐品列表",
			"order": "下单"
		},
		"en":{
			"title":"Dish",
			"order": "order"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import DishService from '../../service/dish';
import { localStore } from '../../utils/data-management';
import UrlUtils from '../../utils/url-utils';

@Component({
	name: 'DishIndex',
	components: {
		AbusTitle
	}
})
export default class DishIndex extends Vue {
	// @Prop() private msg!: string;
	private recomendList: Array<any> = [];
	private dishesList: Array<any> = [];
	private lang: String = ''

	private created() {
		this.getDishesRecommendedList();
		this.getDishesList();
	}
	
	private mounted() {
		if (localStorage.getItem('lang') == 'en') {
		this.lang = 'en';
		} else {
		this.lang = 'zh';
		}
	}


	private getDishesRecommendedList() {
		DishService.getDishesRecommendedList({
			skip:0,
			take:10000
		}).then((res: any) => {
			if (res.code == 200) {
				this.recomendList = res.data.RecommendedDishes;
				
				this.recomendList.forEach((item,index)=>{
					item.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});
				
			}
		});
	}

	private getDishesList() {
		DishService.getDishesList({}).then((res: any) => {
			if (res.code == 200) {
				this.dishesList = res.data.Dishes;
				
				this.dishesList.forEach((item,index)=>{
					item.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});
			}
		});
	}

	private stepToDetail(item: any) {
		if(item.Stocking==0){
			if (localStorage.getItem('lang') == 'en') {
				this.$toast('Out of stock!');
			} else {
				this.$toast('暂时缺货');
			}
			return;
		}else{
			this.$router.push({
				name: 'dishDetail',
				query: {
					id: item.Id
				}
			});
		}
	}
	private showToast(){
		if (localStorage.getItem('lang') == 'en') {
		
		this.$toast('Stockout!');

		} else {
		this.$toast('暂时缺货');
		}
	}
}
</script>

<style lang="scss" scoped>
.dish-main-ctn {
	.dish-recomend-item {
		position: relative;
		width: 100%;
		height: 4rem;
		.dish-recomend-img {
			width: 100%;
			height: 100%;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 100%;
			background-color: #fff;
		}
	}

	.dishes-list {
		padding: 0.3rem;
		&:after {
			content: '';
			clear: both;
			display: block;
			width: 100%;
			height: 0px;
		}
		overflow: hidden;
		.dishes-item {
			&:nth-child(2n - 1) {
				float: left;
			}
			&:nth-child(2n) {
				float: right;
			}

			&:nth-child(1) {
				margin-top: 0;
			}
			&:nth-child(2) {
				margin-top: 0;
			}

			position: relative;
			margin-top: 0.3rem;
			width: 3.32rem;
			height: 5.3rem;
			background: rgba(255, 255, 255, 1);
			border-radius: 0.08rem;

			.img-ctn {
				width: 100%;
				height: 3rem;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}
			.dish-info {
				padding: 0.2rem;
				.price-ctn {
					font-size: 0.36rem;
					font-weight: bold;
					color: rgba(0, 31, 91, 1);
					line-height: 0.36rem;
					margin-bottom: 0.2rem;

					&.is-discount {
						> span {
							&:nth-child(1) {
								color: #e4002b;
								margin-right: 0.16rem;
							}
							&:nth-child(2) {
								color: rgba(51, 51, 51, 1);
								line-height: 0.28rem;
								font-size: 0.24rem;
								text-decoration: line-through;
							}
						}
					}

					> span {
						&:nth-child(1) {
						}
						&:nth-child(2) {
						}
					}
				}
				.name-ctn {
					height: 0.7rem;
					font-size: 0.28rem;
					font-family: Helvetica;
					color: rgba(0, 0, 0, 1);
					line-height: 0.34rem;
					margin-bottom: 0.14rem;
				}
				.bottom-ctn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.qty-ctn {
						font-size: 0.22rem;
						// color: rgba(51, 51, 51, 1);
						color:gray;
						line-height: 0.26rem;
						> span:nth-child(1) {
							margin-right: 0.12rem;
						}
					}
					.order-btn {
						line-height: 0.5rem;
						text-align: center;
						font-size: 0.26rem;
						color: #ffffff;
						width: 1.2rem;
						height: 0.5rem;
						background: rgba(0, 31, 91, 1);
						border-radius: 0.25rem;
					}
				}
			}
		}
	}
}
</style>
