<template>
	<section class="dishcart-main-ctn">
		<div class="dishcart-title"><abus-title backRouteName="dishIndex" :title="$t('title')"></abus-title></div>

		<div class="cart-ctn">
			<van-swipe-cell class="cart-item-ctn" v-for="(item, index) in cartList" :key="index">
				<template #right>
					<van-button square text="删除" type="danger" class="delete-button" @click="deleteCartItem(item, index)" />
				</template>

				<div class="cart-item">
					<div class="dish-img" :style="{ backgroundImage: `url(${item.BannerImgPath})` }"></div>

					<div class="order-info">
						<p class="dish-name">{{ item.Name }}</p>
						<div class="info-bottom-ctn">
							<span class="price-ctn">${{ item.Price }}</span>
							<van-field class="field-ctn" name="stepper" label>
								<template #input>
									<van-stepper v-model="item.orderNumber" @change="chengeStepper" />
								</template>
							</van-field>
						</div>
					</div>
				</div>
			</van-swipe-cell>
		</div>

		<div class="pay-info-ctn">
			<div class="seat-ctn">
				<span>{{ $t('seatNumber') }}</span>
				<span>{{ seatName }}</span>
			</div>

			<div class="pay-ctn">
				<div class="pay-label">{{ $t('payWay') }}</div>
				<div class="pay-way" @click="selectPayType()">
					<svg class="icon i-icon" aria-hidden="true">
						<use v-if="payType == '1'" xlink:href="#icon-wechat-pay" />
						<use v-if="payType == '2'" xlink:href="#icon-ali-pay" />
						<use v-if="payType == '3'" xlink:href="#icon-credit-card" />
						<use v-if="payType == '4'" xlink:href="#icon-cash" />
					</svg>

					<i class="icon icon-back"></i>
				</div>
			</div>
			<div class="total-money">
				<span>{{ $t('totalAmount') }}</span>
				<span>${{ orderAmount }}</span>
			</div>
		</div>

		<div class="pay-outer-btn">
			<div class="pay-btn" @click="placeOrder">{{ $t('payBtn') }}</div>
		</div>
	</section>
</template>

<i18n>
	{
		"zh":{
			"title":"餐品购物车",
			"seatNumber":"座位",
			"payWay":"支付方式",
			"totalAmount":"总金额",
			"payBtn":"支付"
		},
		"en":{
			"title":"Dish Cart",
			"seatNumber":"Seat No:",
			"payWay":"Payment Method",
			"totalAmount":"Total Amount",
			"payBtn":"Pay"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import DishCartIcon from './components/DishCartIcon.vue';
import DishService from '../../service/dish';
import UrlUtils from '../../utils/url-utils';
import { localStore } from '../../utils/data-management';

@Component({
	name: 'DishCart',
	components: {
		AbusTitle,
		DishCartIcon
	}
})
export default class DishCart extends Vue {
	private orderAmount: number = 0;

	private mounted() {
		if (localStorage.getItem('lang') == 'en') {
			this.$i18n.locale = 'en';
		} else {
			this.$i18n.locale = 'zh';
		}
		this.chengeStepper();
	}

	private get payType(): number {
		return this.$store.state.me.payType;
	}

	private get seatName(): number {
		return localStore.get('seatName') || this.$store.state.login.voyageInfo.seatName;
	}
	private get seatType(): number {
		return localStore.get('seatType') || this.$store.state.login.voyageInfo.seatType;
	}
	private get cartList(): Array<any> {
		return this.$store.state.dish.cartList;
	}

	public chengeStepper() {
		let cartList = this.$store.state.dish.cartList;
		let amount = 0;

		cartList.forEach((item: any, index: any) => {
			amount = amount + item.Price * item.orderNumber;
		});
		return (this.orderAmount = amount);
	}
	// private get orderAmount():number{
	//    let cartList = this.$store.state.dish.cartList;
	//    let amount = 0;

	//    cartList.forEach((item:any,index:number)=>{
	// 	   amount = amount + item.Price * item.orderNumber;
	//    });

	//    return amount;
	// }
	private deleteCartItem(item: any, index: number) {
		this.$store.commit('delCartItem', index);
		this.chengeStepper();
	}

	private selectPayType() {
		this.$router.push({
			name: 'payment'
		});
	}

	public placeOrder() {
		/* {
		"Seat":"c20",
		 "Remark":"买",
		 "address":"地址",
		 "Items":[
		  {
		   "Quantity":1,
		   "Id":"e2dc9e2c-6733-e911-b13c-96af276fddb7"
		   
		  }
		 ]
		} */
		/* this.$router.push({
			name:'mePayment'
		}); */
		let orderItems: Array<any> = [];

		if (this.cartList.length == 0) {
			if (localStorage.getItem('lang') == 'en') {
				return this.$toast('No Dish, please go Dish ^_^');
			} else {
				return this.$toast('请先选择餐品!');
			}
		}
		this.cartList.forEach((item: any, index: number) => {
			orderItems.push({
				Quantity: item.orderNumber,
				Id: item.Id
			});
		});

		DishService.placeDishesOrder({
			Seat: this.seatName || '3D',
			Remark: '',
			SeatType: this.seatType || 2,
			Items: orderItems
		})
			.then((res: any) => {
				if (res.code == 200) {
					if (localStorage.getItem('lang') == 'en') {
						this.$toast('Success');
					} else {
						this.$toast('下单成功!');
					}
					this.$store.commit('clearDishCart'); //clearDishCart();
					this.$router.push({
						name: 'home'
					});
					// window.setTimeout(() => {
					//   this.$store.commit("clearDishCart"); //clearDishCart();
					//   this.$router.push({
					//     name: "home",
					//   });
					// }, 1000);
				}
			})
			.catch((e: any) => {});
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/index.scss';

@media (orientation: portrait) {
	.dishcart-main-ctn {
		position: relative;
		padding-top: 1rem;
		padding-bottom: 2.2rem;

		.dishcart-title {
			position: fixed;
			height: 1rem;
			width: 100%;
			top: 0;
			left: 0;
		}

		.cart-ctn {
			margin-bottom: 0.2rem;

			.cart-item-ctn {
				height: 2.4rem;
				background: #ffffff;

				.delete-button {
					height: 2.4rem;
				}

				.cart-item {
					height: 100%;
					height: 2.4rem;
					background: #ffffff;
					box-sizing: border-box;
					padding: 0.3rem;
					display: flex;

					.dish-img {
						width: 1.8rem;
						height: 1.8rem;
						background: grey;
						border-radius: 6px;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
					}

					.order-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						padding-left: 0.3rem;
						.dish-name {
							font-size: 0.36rem;
							font-family: Helvetica;
							color: rgba(51, 51, 51, 1);
							line-height: 0.42rem;
						}

						.info-bottom-ctn {
							display: flex;
							justify-content: space-between;

							.price-ctn {
								font-size: 0.42rem;
								font-family: Helvetica-Bold, Helvetica;
								font-weight: bold;
								color: rgba(46, 46, 46, 1);
								line-height: 0.42rem;
							}

							.field-ctn {
								width: auto;
							}
						}
					}
				}
			}
		}

		.pay-info-ctn {
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
					}
				}
			}

			.pay-ctn {
				height: 1rem;
				display: flex;
				justify-content: space-between;
				padding: 0 0.3rem 0 0.36rem;
				background: #ffffff;
				align-items: center;

				.pay-label {
					font-size: 0.32rem;
					font-family: Helvetica;
					color: rgba(51, 51, 51, 1);
					line-height: 0.32rem;
				}

				.pay-way {
					display: flex;
					align-items: center;
					svg.icon {
						margin-right: 0.2rem;
					}
					.icon-back {
						font-size: 0.32rem;
						color: #e6e8ea;
						transform: rotate(180deg);
					}
				}
			}
			.total-money {
				padding-right: 0.3rem;
				display: flex;
				justify-content: flex-end;
				padding-top: 0.4rem;
				padding-bottom: 0.4rem;
				font-size: 0.36rem;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: 0.42rem;

				> span {
					&:nth-child(1) {
						font-size: 36px;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
						margin-right: 0.4rem;
					}
					&:nth-child(2) {
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
					}
				}
			}
		}
		.pay-outer-btn {
			position: fixed;
			bottom: 1rem;
			width: 100%;

			.pay-btn {
				margin: 0 0.3rem;
				height: 0.8rem;
				text-align: center;
				line-height: 0.8rem;
				background: rgba(0, 32, 91, 1);
				border-radius: 0.5rem;

				font-size: 0.34rem;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
}

@media (orientation: landscape) {
	.dishcart-main-ctn {
		position: relative;
		padding-top: 0.69rem;

		.dishcart-title {
			position: fixed;
			height: 0.56rem;
			width: 100%;
			top: 0;
			left: 0;
			font-size: 0.2rem;
		}

		.cart-ctn {
			margin-top: 0.14rem;
			width: 5rem;
			height: 1.2rem;
			margin: 0 auto;
			.cart-item-ctn {
				height: 1.2rem;
				background: #ffffff;

				.delete-button {
					height: 1.2rem;
				}

				.cart-item {
					height: 100%;
					height: 1.2rem;
					background: #ffffff;
					box-sizing: border-box;
					padding: 0.15rem 0.2rem;
					display: flex;
					.dish-img {
						width: 0.9rem;
						height: 0.9rem;
						background: grey;
						border-radius: 6px;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
					}

					.order-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						padding-left: 0.15rem;
						.dish-name {
							font-size: 0.18rem;
							font-family: Helvetica;
							color: rgba(51, 51, 51, 1);
							line-height: 0.18rem;
						}

						.info-bottom-ctn {
							display: flex;
							justify-content: space-between;

							.price-ctn {
								font-size: 0.22rem;
								font-family: Helvetica-Bold, Helvetica;
								font-weight: bold;
								color: rgba(46, 46, 46, 1);
								line-height: 0.22rem;
							}

							.field-ctn {
								width: auto;
							}
						}
					}
				}
			}
		}

		.pay-info-ctn {
			width: 5rem;
			margin: 0 auto;
			margin-top: 0.1rem;
			.seat-ctn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 0.11rem 0 0.2rem;
				height: 0.56rem;
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
					}
				}
			}

			.pay-ctn {
				height: 0.56rem;
				display: flex;
				justify-content: space-between;
				padding: 0 0.2rem;
				background: #ffffff;
				align-items: center;

				.pay-label {
					font-size: 0.16rem;
					font-family: Helvetica;
					color: rgba(51, 51, 51, 1);
					line-height: 0.16rem;
				}

				.pay-way {
					display: flex;
					align-items: center;
					svg.icon {
						margin-right: 0.1rem;
						width: 0.2rem;
						height: 0.2rem;
					}
					.icon-back {
						font-size: 0.16rem;
						color: #e6e8ea;
						transform: rotate(180deg);
					}
				}
			}
			.total-money {
				padding-right: 0.15rem;
				display: flex;
				justify-content: flex-end;
				padding-top: 0.16rem;
				margin-bottom: 0.4rem;
				font-size: 0.18rem;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: 0.22rem;

				> span {
					&:nth-child(1) {
						font-size: 0.18rem;
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
						margin-right: 0.2rem;
					}
					&:nth-child(2) {
						font-weight: bold;
						color: rgba(51, 51, 51, 1);
					}
				}
			}
		}
		.pay-outer-btn {
			// position: fixed;
			bottom: 1rem;
			width: 3.4rem;
			height: 0.4rem;
			margin: 0 auto;
			.pay-btn {
				height: 0.4rem;
				text-align: center;
				line-height: 0.4rem;
				background: rgba(0, 32, 91, 1);
				border-radius: 0.5rem;

				font-size: 0.16rem;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
}
</style>
