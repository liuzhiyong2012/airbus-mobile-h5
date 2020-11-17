<template>
	<div class="shopping-cart">
		<div class="shopping-cart-title"><abus-title :title="$t('title')" backRouteName="pointsExchange"></abus-title></div>



		<div class="shopping-main-ctn">
			<div v-if="pointsCartList.length > 0">
					<van-notice-bar class="notice-bar-ctn" @click="stepToPage('address')" color="#2E2E2E" background="#E5E8EE" left-icon="location" mode="link">{{ this.address || $t('noAdress') }}</van-notice-bar>
				<van-swipe-cell v-for="(item, index) in pointsCartList" :key="index">
					<van-card :title="item.Name" :thumb="item.BannerImgPath | addBaseUrl" class="goods-card" />
					<template #right>
						<van-button @click="delGoods(index)" square :text="$t('del')" type="danger" class="delete-button" />
					</template>
					<div class="price">{{ item.Price }}</div>
					<van-field class="field-ctn" name="stepper" label>
						<template #input>
							<van-stepper v-model="item.orderNumber" @change="chengeStepper" />
						</template>
					</van-field>
				</van-swipe-cell>
			</div>
			<div v-else class="no-goods" @click="stepToPage('pointsExchange')">{{ $t('noGoods') }}</div>
			<div class="cell-group">
				<div class="cell">
					<div class="cell-l">{{ $t('RequiredPoints') }}</div>
					<div class="cell-r">{{ orderAmount }}</div>
				</div>

				<div class="cell">
					<div class="cell-l t-bold">{{ $t('MyPoints') }}</div>
					<div class="cell-r t-bold">{{ userPoints }}</div>
				</div>
			</div>
			<div class="button-box">
				<div class="button" @click="postShoppingPlaceOrder">{{ $t('Pay') }}</div>
			</div>
		</div>
	</div>
</template>
<i18n>
	{
		"zh":{
			"title":"购物车",
      "noGoods":"没有商品，请重新购买 ^_^",
      "PaymentMethod":"支付方式",
      "del": "删除",
      "Pay": "支付",
      "TotalAmount": "总金额",
      "RequiredPoints": "所需积分",
      "MyPoints": "我的积分",
      "noAdress": "暂无地址",
      "Buy":"购买"
		},
		"en":{
			"title":"Cart",
      "noGoods":"No goods, please go shopping ^_^",
      "PaymentMethod":"Payment method",
      "del": "del",
      "Pay": "Pay",
      "TotalAmount": "Total amount",
      "RequiredPoints": "Required points",
      "MyPoints": "My points",
      "noAdress": "No address",
      "Buy":"Buy"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AbusTitle from '../../../components/AbusTitle.vue';
import MeServer from '../../../service/me';
import ShoppingServer from '../../../service/shopping';
import { localStore } from '../../../utils/data-management';
@Component({
	name: 'ShoppingCart',
	components: {
		AbusTitle
	}
})
export default class ShoppingCart extends Vue {
	private address: string = '';
	private orderAmount: number = 0;
	private created() {
		this.postAddress();
	}
	private mounted() {
		if (localStorage.getItem('lang') == 'en') {
			this.$i18n.locale = 'en';
		} else {
			this.$i18n.locale = 'zh';
		}
		this.chengeStepper();
	}
	private get pointsCartList(): number {
		return this.$store.state.shopping.pointsCartList;
	}
	private get userPoints(): number {
		return this.$store.state.me.points;
	}
	// private get orderAmount(): any{
	//   let pointsCartList = this.$store.state.shopping.pointsCartList;
	//   let amount = 0;

	//   pointsCartList.forEach((item: any, index: any) => {
	//     amount = amount + item.Price * item.orderNumber;
	//   });
	//   return amount;
	// }
	public chengeStepper() {
		let pointsCartList = this.$store.state.shopping.pointsCartList;
		let amount = 0;

		pointsCartList.forEach((item: any, index: any) => {
			amount = amount + item.Price * item.orderNumber;
		});
		return (this.orderAmount = amount);
	}
	public postAddress() {
		MeServer.postAddress().then((res: any) => {
			if (res.code == 200) {
				this.address = res.data.Address;
			}
		});
	}
	private get seatName(): string {
		return localStore.get('seatName') || this.$store.state.login.voyageInfo.seatName;
	}
	private get seatType(): number {
		return localStore.get('seatType') || this.$store.state.login.voyageInfo.seatType;
	}
	// 删除操作
	public delGoods(index: any) {
		this.$store.commit('delPointsCartItem', index);
		this.chengeStepper();
	}
	// 下单$requset = $this->selectParam(['Seat','Remark','Items','type'=>1,'address']);
	public postShoppingPlaceOrder() {
		let CartItems: Array<any> = [];
		let pointsCartList = this.$store.state.shopping.pointsCartList;
		pointsCartList.forEach((item: any, index: any) => {
			var items: Object = {
				Id: pointsCartList[index].Id,
				Quantity: pointsCartList[index].orderNumber
			};
			CartItems.push(items);
		});
		console.log(CartItems);
		if (this.userPoints < this.orderAmount) {
			this.$toast('You don\'t have enough points');
			return;
		}
		if (this.address != '' && this.address != null && pointsCartList.length > 0) {
			let data = {
				Seat: this.seatName || '3D',
				Remark: '',
				Items: CartItems,
				type: 2,
				SeatType: this.seatType || 2,
				Address: this.address
			};
			ShoppingServer.postShoppingPlaceOrder(data).then((res: any) => {
				if (res.code == 200) {
					this.$store.commit('clearPointsCart');
					this.$toast('SUCCESS!');
					this.$router.push({
						name: 'pointsExchange'
					});
				}
			});
		} else {
			this.$toast('Address or cart cannot be empty');
		}
	}
	private stepToPage(name: string) {
		this.$router.push({
			name: name
		});
	}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/index.scss';

@media (orientation: portrait) {
	.shopping-cart {
		position: relative;
		min-height: 100vh;
		padding-top: 1rem;
		.shopping-cart-title {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 100;
		}

		.field-ctn {
			position: absolute;
			right: 0;
			bottom: 0;
		}
		.van-card__title {
			line-height: inherit !important;
		}
		.no-goods {
			display: flex;
			width: 100%;
			height: 2.36rem;
			justify-content: center;
			align-items: center;
			color: #999;
		}
		.cell-group-two {
			margin: 0.3rem 0 0 0;
			background: #fff;
			.cell-item {
				display: flex;
				padding: 0 0.3rem;
				line-height: 1rem;
				.title {
					font-size: 0.32rem;
					color: rgba(51, 51, 51, 1);
				}
				.f1 {
					position: relative;
					flex: 1;
					.icon-right {
						position: absolute;
						right: -0.3rem;
						padding: 0.3rem;
					}
					.icon-right-1 {
						position: absolute;
						right: 0.1rem;
						padding: 0.3rem;
					}
					.icon-right-2 {
						position: absolute;
						right: 0.3rem;
						color: #999;
						max-width: 2.2rem;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
		.goods-card {
			margin: 0 0 1px 0;
			padding: 0.3rem;
			background-color: #fff;
			font-size: 0.36rem;
			.van-card-thumb {
				margin-right: 0.3rem;
				width: 1.8rem;
				height: 1.8rem;
			}
			.van-card-title {
				max-height: none;
				font-size: 0.36rem;
				color: rgba(51, 51, 51, 1);
				line-height: 0.43rem;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
		.price {
			position: absolute;
			left: 2.4rem;
			bottom: 0.3rem;
			font-size: 0.42rem;
			font-weight: bold;
			color: rgba(46, 46, 46, 1);
			line-height: 0.42rem;
			.before {
				text-decoration: line-through;
				font-size: 0.24rem;
				color: rgba(51, 51, 51, 1);
				line-height: 0.29rem;
			}
		}
		.delete-button {
			height: 100%;
		}
		.test {
			position: absolute;
			right: 0;
			top: 0;
			width: 1rem;
			height: 1rem;
			background-color: red;
		}
		.cell-group {
			margin: 0.3rem;
			.cell {
				margin: 0 0 0.3rem 0;
				display: flex;
				font-size: 0.3rem;
				color: rgba(155, 154, 170, 1);
				line-height: 0.36rem;
				.cell-l {
				}
				.cell-r {
					flex: 1;
					text-align: right;
				}
				.t-bold {
					font-size: 0.35rem;
					font-weight: bold;
					color: rgba(46, 46, 46, 1);
					line-height: 0.42rem;
				}
			}
		}
		.stepper-box {
			position: absolute;
			right: 0.3rem;
			bottom: 0.3rem;
			display: flex;
			margin: 0 0 0 0.25rem;
			background-color: #f2f4f7;
			border-radius: 0.08rem;
			min-width: 1.75rem;
			height: 0.58rem;
			.minus {
				width: 0.58rem;
				height: 0.58rem;
				text-align: center;
				line-height: 0.5rem;
				color: rgba(0, 32, 91, 1);
				font-size: 0.4rem;
				line-height: 0.5rem;
			}
			.f1 {
				flex: 1;
				font-size: 0.28rem;
				color: rgba(51, 51, 51, 1);
				line-height: 0.58rem;
			}
			.plus {
				width: 0.58rem;
				height: 0.58rem;
				text-align: center;
				line-height: 0.58rem;
				color: rgba(0, 32, 91, 1);
				font-size: 0.4rem;
			}
		}
		.total-amount {
			font-size: 0.35rem;
			font-weight: bold;
			color: rgba(46, 46, 46, 1);
			line-height: 0.2rems;
		}
		.van-cell {
			width: auto;
			// background-color: #ebedf056;
			::after {
				border: none;
			}
		}
		.button-box {
			margin: 0.4rem 0.3rem 0.5rem;
			.button {
				width: 100%;
				height: 0.8rem;
				background: rgba(0, 32, 91, 1);
				border-radius: 0.4rem;
				text-align: center;
				line-height: 0.8rem;
				color: #fff;
				font-weight: bold;
			}
		}
		.discount {
			text-decoration: line-through;
		}
	}
}

@media (orientation: landscape) {
	.shopping-cart {
		position: relative;
		min-height: 100vh;
		padding-top: rpx(70);
		.shopping-cart-title {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 100;
		}

		.shopping-main-ctn {
			/deep/ .notice-bar-ctn{
				padding:0 rpx(16);
				height: rpx(40) !important;
				.van-notice-bar__wrap{
					font-size: rpx(14) !important;
				}
				.van-icon{
					font-size: rpx(16) !important;
				/* 	width: rpx(14);
					height: rpx(14); */
				}
				}
				/* /deep/ {
					
				} */
			// }
			.field-ctn {
				position: absolute;
				right: rpx(20);
				bottom: rpx(16);
			}

			/deep/ .van-swipe-cell {
				.van-cell {
					width: auto;
					padding: 0;

					.van-stepper {
						display: flex;
						margin: 0 0 0 rpx(12);
						background-color: #f2f4f7;
						border-radius: 0.08rem;
						// min-width: 1.75rem;
						height: rpx(28);

						.van-stepper__minus {
							width: rpx(28) !important;
							height: rpx(28) !important;
						}
						.van-stepper__input {
							width: rpx(28) !important;
							height: rpx(28) !important;
							font-size: rpx(14) !important;
						}
						.van-stepper__plus {
							width: rpx(28) !important;
							height: rpx(28) !important;
						}
					}
				}
			}

			.van-card__title {
				font-size: rpx(18);
				line-height: rpx(18);
			}
			.no-goods {
				display: flex;
				width: 100%;
				height: 2.36rem;
				justify-content: center;
				align-items: center;
				color: #999;
			}
			.cell-group-two {
				margin: 0.3rem 0 0 0;
				background: #fff;
				.cell-item {
					display: flex;
					padding: 0 0.3rem;
					line-height: 1rem;
					.title {
						font-size: 0.32rem;
						color: rgba(51, 51, 51, 1);
					}
					.f1 {
						position: relative;
						flex: 1;
						.icon-right {
							position: absolute;
							right: -0.3rem;
							padding: 0.3rem;
						}
						.icon-right-1 {
							position: absolute;
							right: 0.1rem;
							padding: 0.3rem;
						}
						.icon-right-2 {
							position: absolute;
							right: 0.3rem;
							color: #999;
							max-width: 2.2rem;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}
				}
			}
			.goods-card {
				margin: 0 0 1px 0;
				padding: rpx(16) rpx(20);
				background-color: #fff;
				font-size: 0.36rem;
				box-sizing: border-box;

				/deep/ .van-card__thumb {
					width: rpx(90) !important;
					height: rpx(90) !important;
				}
				.van-card-thumb {
					margin-right: 0.3rem;
					width: 1.8rem;
					height: 1.8rem;
				}
				.van-card-title {
					max-height: none;
					font-size: 0.36rem;
					color: rgba(51, 51, 51, 1);
					line-height: 0.43rem;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.price {
				position: absolute;
				left: rpx(130);
				bottom: rpx(20);
				font-size: rpx(18);
				font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: rpx(18);
				.before {
					text-decoration: line-through;
					font-size: 0.24rem;
					color: rgba(51, 51, 51, 1);
					line-height: 0.29rem;
				}
			}
			.delete-button {
				height: 100%;
			}
			.test {
				position: absolute;
				right: 0;
				top: 0;
				width: 1rem;
				height: 1rem;
				background-color: red;
			}
			.cell-group {
				margin: rpx(20) rpx(20) rpx(40);

				.cell {
					&:nth-child(1) {
						font-size: rpx(14);
						line-height: rpx(14);
						margin-bottom: rpx(20);
					}

					&:nth-child(2) {
						font-size: rpx(18);
						line-height: rpx(18);
					}

					margin: 0 0 0.3rem 0;

					display: flex;

					color: rgba(155, 154, 170, 1);

					.cell-l {
					}
					.cell-r {
						flex: 1;
						text-align: right;
					}
					.t-bold {
						font-weight: bold;
						color: rgba(46, 46, 46, 1);
					}
				}
			}
			.stepper-box {
				position: absolute;
				right: 0.3rem;
				bottom: 0.3rem;
				display: flex;
				margin: 0 0 0 0.25rem;
				background-color: #f2f4f7;
				border-radius: 0.08rem;
				min-width: 1.75rem;
				height: 0.58rem;
				.minus {
					width: 0.58rem;
					height: 0.58rem;
					text-align: center;
					line-height: 0.5rem;
					color: rgba(0, 32, 91, 1);
					font-size: 0.4rem;
					line-height: 0.5rem;
				}
				.f1 {
					flex: 1;
					font-size: 0.28rem;
					color: rgba(51, 51, 51, 1);
					line-height: 0.58rem;
				}
				.plus {
					width: 0.58rem;
					height: 0.58rem;
					text-align: center;
					line-height: 0.58rem;
					color: rgba(0, 32, 91, 1);
					font-size: 0.4rem;
				}
			}
			.total-amount {
				font-size: 0.35rem;
				font-weight: bold;
				color: rgba(46, 46, 46, 1);
				line-height: 0.2rems;
			}
			.van-cell {
				width: auto;
				// background-color: #ebedf056;
				::after {
					border: none;
				}
			}
			.button-box {
				margin: 0.4rem 0.3rem 0.5rem;
				.button {
					width: 100%;
					height: rpx(40);
					background: rgba(0, 32, 91, 1);
					border-radius: rpx(20);
					text-align: center;
					line-height: rpx(40);
					font-size: rpx(16);
					color: #fff;
					font-weight: bold;
				}
			}
			.discount {
				text-decoration: line-through;
			}
		}
	}
}
</style>
