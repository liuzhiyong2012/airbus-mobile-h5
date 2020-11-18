<template>
	<section class="dishdetail-main-ctn">
		<div class="dish-title">
			<abus-title :title="$t('title')" backRouteName="dishIndex">
				 <dish-cart-icon @toCart="stepToCart()"></dish-cart-icon>
			</abus-title>
		</div>
		<div class="order-ctn">
			<!-- <div class="dish-img" :style="{backgroundImage:`url(${dishInfo.BannerImgPath})`}"> -->
			<div class="dish-img" >
				<img :src="dishInfo.BannerImgPath|addBaseUrl" alt="">
			</div>
			<div class="order-info">
				<h6 class="dish-name">{{dishInfo.Name}}</h6>
				<p class="dish-desc">
					{{dishInfo.Remark||'暂无介绍'}}
				</p>

				<div class="order-item-ctn">
					<div class="qty-ctn">
						<span>{{$t('qty')}}</span>
						<span>{{dishInfo.Stocking||'--'}}</span>
					</div>

					<div class="order-number-ctn">
						<span class="price-ctn">${{dishInfo.Price}}</span>

						<van-field class="field-ctn" name="stepper" label="">
							<template #input>
								<van-stepper integer disable-input v-model="dishInfo.orderNumber" :max="dishInfo.Stocking"  />
							</template>
						</van-field>
					</div>
				</div>
			</div>

			<div class="seat-ctn">
				<span>{{$t('seatNumber')}}</span>
				<span>{{seatNumber}}</span>
			</div>
		</div>

		<div class="footer-ctn">
			<div class="cart-btn primary" @click="addToCart()">{{$t('addToCart')}} </div>
			<div class="cart-btn normal" @click="buyNow()">{{$t('buyNow')}}</div>
		</div>
	</section>
</template>

<i18n>
	{
		"zh":{
			"title":"餐品详情",
			"addToCart":"添加购物车",
			"buyNow":"立即购买",
			"seatNumber":"座位",
			"qty":"剩余"
		},
		"en":{
			"title":"DishDetail",
			"addToCart":"Add To Cart",
			"buyNow":"Buy Now",
			"seatNumber":"Seat No:",
			"qty":"QTY"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import DishCartIcon from './components/DishCartIcon.vue';
import DishService from '../../service/dish';
import { localStore } from '../../utils/data-management';
import UrlUtils from '../../utils/url-utils';

@Component({
	name: 'DishDetail',
	components: {
		AbusTitle,
		DishCartIcon
	}
})
export default class DishDetail extends Vue {
	private stepper: number = 1;
	private recomendList: Array<any> = [];
	private dishesList: Array<any> = [];

	private dishInfo: any = {};
	private id: any = {};
	
	private get seatNumber():string{
		return localStore.get('seatNumber') || this.$store.state.login.voyageInfo.seatNumber;
	}

	private mounted() {
		this.id = this.$route.query.id;
		this.getDishesDetail();
	}
	
	public getDishesDetail(): void {
		DishService.getDishesDetail({
			id:this.id
		}).then((res:any)=>{
			if(res.code == '200'){
				 this.dishInfo = res.data;
				 this.dishInfo.orderNumber = 1;
				 this.dishInfo.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(this.dishInfo.BannerImgPath));
				
			}else{
				
			}
		});
		
	}

	public toCart(): void {
		
	}
	
	public addToCart():void{
		if(this.dishInfo.Stocking===0){
			return this.showToast();
		}else{
			this.$store.commit('addCartItem',this.dishInfo);
			this.$toast('成功加入购物车!');
		}
	}
	
	public buyNow():void{
		// this.$toast('购买成功!');
		if(this.dishInfo.Stocking===0){
			return this.showToast();
		}else{
			this.$store.commit('addCartItem',this.dishInfo);
			this.$router.push({
				name:'dishCart'
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
	
	public stepToCart():void{
		this.$router.push({
			name:'dishCart'
		});
	}
	
}
</script>

<style lang="scss" scoped>
	
	@import '../../assets/style/index.scss';
	 
	@media  (orientation:portrait) {
		.dishdetail-main-ctn {
			position: relative;
			padding-top: 1rem;
			padding-bottom: 2rem;
		
			.dish-title {
				position: fixed;
				height: 1rem;
				width: 100%;
				top: 0;
				left: 0;
			}
			.order-ctn {
				.dish-img {
					// height: 6.3rem;
					background-position: center;
					background-size:cover ;
					background-repeat: no-repeat;
					// background-color:#7B98BC ;
					img{
						width: 100%;
					}
				}
		
				.order-info {
					padding: 0.3rem 0.4rem;
					margin-bottom: 0.2rem;
					background: #ffffff;
		
					.dish-name {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 0.44rem;
						font-weight: bold;
						color: rgba(46, 46, 46, 1);
						line-height: 0.5rem;
						margin-bottom: 0.2rem;
					}
					.dish-desc {
						font-size: 0.28rem;
						color: rgba(34, 34, 34, 1);
						line-height: 0.28rem;
						margin-bottom: 0.4rem;
					}
					.order-item-ctn {
						display: flex;
						justify-content: space-between;
						align-items: center;
		
						.qty-ctn {
							font-size: 0.28rem;
							color: rgba(51, 51, 51, 1);
							// color: gray;
							line-height: 0.28rem;
		
							> span {
								&:nth-child(1) {
									margin-right: 0.1rem;
								}
								&:nth-child(2) {
								}
							}
						}
		
						.order-number-ctn {
							display: flex;
							align-items: center;
							.price-ctn {
								// font-size: 0.36rem;
								font-size: 0.28rem;
								font-weight: bold;
								color: rgba(46, 46, 46, 1);
								margin-right: 0.4rem;
							}
							.field-ctn {
								margin-right: -0.12rem;
							}
						}
					}
				}
		
				.seat-ctn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 0.3rem 0 0.36rem;
					height: 1rem;
					background: rgba(255, 255, 255, 1);
		
					> span {
						&:nth-child(1) {
							font-size: 0.32rem;
							color: rgba(51, 51, 51, 1);
						}
		
						&:nth-child(2) {
							font-size: 0.32rem;
							font-weight: bold;
							color: rgba(0, 32, 91, 1);
							margin-right: 0.2rem;
						}
					}
				}
			}
		
			.footer-ctn {
				position: fixed;
				width: 100%;
				padding: 0 0.3rem;
				box-sizing: border-box;
				bottom: 0.62rem;
				display: flex;
				justify-content: space-between;
		
				.cart-btn {
					border-radius: 0.4rem;
					// border: 0.02px solid rgba(0, 32, 91, 1);
					border: 1px solid rgba(0, 32, 91, 1);
					width: 3.3rem;
					height: 0.8rem;
					text-align: center;
					font-weight: bold;
					line-height: 0.76rem;
					box-sizing: border-box;
		
					font-size: 0.34rem;
		
					&.primary {
						color: rgba(0, 32, 91, 1);
						border: 2px solid rgba(0, 32, 91, 1);
						background: #f8f6f9;
					}
		
					&.normal {
						color: #ffffff;
						border-color: #00205b;
						background: #00205b;
					}
				}
			}
		}
	}
	 
	@media  (orientation:landscape) {
		.dishdetail-main-ctn {
			position: relative;
			padding-top: 0.14rem;
			// padding-bottom: 2rem;
		
			.dish-title {
				position: fixed;
				height: 0.56rem;
				width: 100%;
				top: 0;
				left: 0;
			}
			.order-ctn {
				width: 5rem;
				margin: 0 auto;
				.dish-img {
					// height: 6.3rem;
					background-position: center;
					background-size:cover ;
					background-repeat: no-repeat;
					// background-color:#7B98BC ;
					img{
						width: 100%;
					}
				}
		
				.order-info {
					padding: 0.3rem 0.4rem;
					margin-bottom: 0.2rem;
					background: #ffffff;
		
					.dish-name {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 0.22rem;
						font-weight: bold;
						color: rgba(46, 46, 46, 1);
						line-height: 0.22rem;
						margin-bottom: 0.1rem;
					}
					.dish-desc {
						font-size: 0.135rem;
						color: rgba(34, 34, 34, 1);
						line-height: 0.135rem;
						margin-bottom: 0.4rem;
					}
					.order-item-ctn {
						display: flex;
						justify-content: space-between;
						align-items: center;
		
						.qty-ctn {
							font-size: 0.14rem;
							color: rgba(51, 51, 51, 1);
							// color: gray;
							line-height: 0.14rem;
		
							> span {
								&:nth-child(1) {
									margin-right: 0.1rem;
								}
								&:nth-child(2) {
								}
							}
						}
		
						.order-number-ctn {
							display: flex;
							align-items: center;
							.price-ctn {
								// font-size: 0.36rem;
								font-size: 0.24rem;
								font-weight: bold;
								color: rgba(46, 46, 46, 1);
								margin-right: 0.4rem;
							}
							.field-ctn {
								margin-right: -0.12rem;
							}
						}
					}
				}
		
				.seat-ctn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 0.3rem 0 0.36rem;
					height: 1rem;
					background: rgba(255, 255, 255, 1);
		
					> span {
						&:nth-child(1) {
							font-size: 0.16rem;
							color: rgba(51, 51, 51, 1);
						}
		
						&:nth-child(2) {
							font-size: 0.16rem;
							font-weight: bold;
							color: rgba(0, 32, 91, 1);
							margin-right: 0.2rem;
						}
					}
				}
			}
		
			.footer-ctn {
				// position: fixed;
				width: 5rem;
				margin: 0 auto;
				padding: 0 0.3rem;
				box-sizing: border-box;
				bottom: 0.62rem;
				display: flex;
				justify-content: space-between;
		
				.cart-btn {
					border-radius: 0.4rem;
					// border: 0.02px solid rgba(0, 32, 91, 1);
					border: 1px solid rgba(0, 32, 91, 1);
					width: 1.8rem;
					height: 0.4rem;
					text-align: center;
					font-weight: bold;
					line-height: 0.4rem;
					box-sizing: border-box;
		
					font-size: 0.16rem;
		
					&.primary {
						color: rgba(0, 32, 91, 1);
						border: 2px solid rgba(0, 32, 91, 1);
						background: #f8f6f9;
					}
		
					&.normal {
						color: #ffffff;
						border-color: #00205b;
						background: #00205b;
					}
				}
			}
		}
	}

</style>
