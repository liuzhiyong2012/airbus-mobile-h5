<template>
  <div class="points-detail-ctn">
	  <div class="points-detail-title">
	  	<abus-title :title="$t('title')" backRouteName="pointsExchange">
	  	  <cart-icon @toCart="stepToCart()"></cart-icon>
	  	</abus-title>
	  </div>
	  
 <div class="main-ctn">
	 <div class="shopping-details">
	   <!-- <banner :bannerData="bannerData" /> -->
	   <div class="dish-img" :style="{backgroundImage:`url(${pointsInfo.BannerImgPath})`}"></div>
	 </div>
	 <div class="m-box">
	   <div class="title">{{pointsInfo.Name || '--'}}</div>
	   <div class="info-box">
	     <div class="qty">QTY {{pointsInfo.Stocking || '--'}}</div>
	     <div class="f1">
	       <div>{{pointsInfo.Price || 0}}</div>
	       <van-field class="field-ctn" name="stepper" label>
	         <template #input>
	           <van-stepper v-model="stepper" />
	         </template>
	       </van-field>
	     </div>
	     <!-- <div class="stepper-box">
	       <i class="minus">-</i>
	       <span class="f1">111111</span>
	       <i class="plus">+</i>
	     </div>-->
	   </div>
	 </div>
	 
	 <div class="details-box">
	   <div class="top">{{$t('ProductDetails')}}</div>
	   <div class="details">{{pointsInfo.Remark||$t('NoIntroduction')}}</div>
	 </div>
	 
	 <div class="footer-ctn">
	   <div class="cart-btn primary" @click="addToCart()">{{$t('AddToCart')}}</div>
	   <div class="cart-btn normal" @click="buyNow()">{{$t('BuyNow')}}</div>
	 </div>
 </div>
   
 
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"详情",
      "ProductDetails":"产品详细信息",
      "AddToCart":"添加到购物车",
      "BuyNow": "立即购买",
      "NoIntroduction":"暂无介绍",
      "QTY":"剩余量"
		},
		"en":{
			"title":"Detail",
      "ProductDetails":"ProductDetails",
      "AddToCart":"Add To Cart",
      "BuyNow": "Buy Now",
      "NoIntroduction":"No introduction",
      "QTY":"QTY"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AbusTitle from '../../../components/AbusTitle.vue';
import CartIcon from './PointsCartIcon.vue';
import UrlUtils from '../../../utils/url-utils';
@Component({
  name: 'PointsDetail',
  components: {
    AbusTitle,
    CartIcon
  },
})
export default class PointsDetail extends Vue {
  private stepper: number = 1;
  private recomendList: Array<any> = [];
  private shoppingList: Array<any> = [];

  private pointsInfo: any = {};

  private get seatNumber(): string {
    return this.$store.state.login.voyageInfo.seatNumber;
  }

  private created() {
    // this.shoppingDetail()
  }
  private mounted() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
    // this.$store.commit("setShoppingDetail", this.$route.params.shoppingInfo);
    this.pointsInfo = this.$route.params.pointsInfo;
    this.pointsInfo.BannerImgPath = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(this.pointsInfo.BannerImgPath));
  }
  @Watch('stepper', { immediate: true })
  private watchStepper() {
    this.pointsInfo.orderNumber = this.stepper;
  }
  
  private get pointsDetail() {
    return this.$store.state.shopping.pointsDetail;
  }

  public backToIndex(): void {
      
    this.$router.push({
      name: 'dishIndex',
    });
  }

  public addToCart(): void {
    this.$store.commit('addPointsCartItem', this.pointsInfo);
    this.$toast('成功加入购物车!');
  }

  public buyNow(): void {
    // this.$toast('购买成功!');
    this.$store.commit('addPointsCartItem', this.pointsInfo);
    this.$router.push({
      name: 'pointsCart',
    });
  }
  public stepToCart():void{
		this.$router.push({
			name:'pointsCart'
		});
	}
}
</script>

<style lang="scss" scoped>
	
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.points-detail-ctn{
			position: relative;
			padding-top:1rem;
			.points-detail-title{
				position: fixed;
				top: 0;
				left:0;
				width:100%;
				z-index: 100;
			  }
			  .shopping-details {
			    width: 100%;
			  }
			  .dish-img {
			    height: 6.3rem;
			    background-position: center;
			    background-size: cover;
			    background-repeat: no-repeat;
			    background-color: #7b98bc;
			  }
			  .m-box {
			    margin: 0 0 0.2rem 0;
			    padding: 0.1rem 0.3rem 0.4rem;
			    background-color: #fff;
			  
			    .title {
			      font-size: 0.45rem;
			      font-weight: bold;
			      color: rgba(46, 46, 46, 1);
			      line-height: 0.6rem;
			      text-overflow: -o-ellipsis-lastline;
			      overflow: hidden;
			      text-overflow: ellipsis;
			      display: -webkit-box;
			      -webkit-line-clamp: 2;
			      -webkit-box-orient: vertical;
			    }
			    .info-box {
			      display: flex;
			      padding: 0.1rem 0 0 0;
			      // height: 0.58rem;
			      line-height: 0.58rem;
			      .qty {
			        font-size: 0.28rem !important;
			        color: rgba(96, 116, 153, 1);
			      }
			      .f1 {
			        flex: 1;
			        display: flex;
			        justify-content: flex-end;
			        text-align: right;
			        font-size: 0.5rem;
			        font-weight: bold;
			        color: rgba(46, 46, 46, 1);
			        line-height: 0.58rem;
			      }
			      .van-cell {
			        width: auto;
			        padding: 0;
			        margin: 0 0 0 0.3rem;
			      }
			      .stepper-box {
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
			    }
			  }
			  .details-box {
			    margin: 0 0 0.2rem 0;
			    padding: 0.3rem;
			    background-color: #fff;
			    .top {
			      padding: 0 0 0.2rem 0;
			      font-size: 0.28rem;
			      font-weight: bold;
			      color: rgba(51, 51, 51, 1);
			      line-height: 0.26rem;
			    }
			    .details {
			      font-size: 0.24rem;
			      color: rgba(51, 51, 51, 1);
			      line-height: 0.36rem;
			    }
			  }
			  .footer-ctn {
			    // position: fixed;
			    width: 100%;
			    margin: 0.3rem 0;
			    padding: 0 0.3rem;
			    box-sizing: border-box;
			    // bottom: 0.62rem;
			    display: flex;
			    justify-content: space-between;
			  
			    .cart-btn {
			      border-radius: 0.4rem;
			      border: 0.02rem solid rgba(0, 32, 91, 1);
			      width: 3.3rem;
			      height: 0.8rem;
			      text-align: center;
			      font-weight: bold;
			      line-height: 0.76rem;
			      box-sizing: border-box;
			  
			      font-size: 0.34rem;
			  
			      &.primary {
			        color: rgba(0, 32, 91, 1);
			        border-color: rgba(0, 32, 91, 1);
			        background: #f8f6f9;
			      }
			  
			      &.normal {
			        color: #ffffff;
			        border-color: #00205b;
			        background: #00205b;
			      }
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
			}
	}
	
	@media  (orientation:landscape) {
		.points-detail-ctn{
			position: relative;
			padding-top:rpx(56);
			.points-detail-title{
				position: fixed;
				top: 0;
				left:0;
				width:100%;
				z-index: 100;
			  }
			  .main-ctn{
				  width: rpx(500);
				  margin:auto;
				  .shopping-details {
					  margin-top:rpx(20);
					  overflow: hidden;
				   border-radius: rpx(8) rpx(8) 0 0;
				  }
				  .dish-img {
				    height: rpx(400);
				    background-position: center;
				    background-size: cover;
				    background-repeat: no-repeat;
				    background-color: #7b98bc;
				  }
				  .m-box {
				    margin-bottom:rpx(20);
				    padding: rpx(20);
				    background-color: #fff;
				  
				    .title {
				      font-size: rpx(22);
				      font-weight: bold;
				      color: rgba(46, 46, 46, 1);
				      line-height: rpx(24);
				      text-overflow: -o-ellipsis-lastline;
				      overflow: hidden;
				      text-overflow: ellipsis;
				      display: -webkit-box;
				      -webkit-line-clamp: 2;
				      -webkit-box-orient: vertical;
				    }
				    .info-box {
				      display: flex;
				      padding: rpx(18) 0 0 0;
				      // height: 0.58rem;
				      line-height: rpx(28);
				      .qty {
				        font-size:rpx(14) !important;
				        color: rgba(96, 116, 153, 1);
				      }
				      .f1 {
				        flex: 1;
				        display: flex;
				        justify-content: flex-end;
				        text-align: right;
				        font-size: rpx(24);
				        font-weight: bold;
				        color: rgba(46, 46, 46, 1);
				        line-height: rpx(28);
						
						/deep/ .van-cell {
						  width: auto;
						  padding: 0;
						  
						  .van-stepper {
						    display: flex;
						    margin: 0 0 0 rpx(12);
						    background-color: #f2f4f7;
						    border-radius: 0.08rem;
						    // min-width: 1.75rem;
						    height: rpx(28);
							
							.van-stepper__minus{
								width: rpx(28) !important;
								height: rpx(28) !important;
							}
							.van-stepper__input{
								width: rpx(28) !important;
								height: rpx(28) !important;
								font-size: rpx(14) !important;
							}
							.van-stepper__plus{
								width: rpx(28) !important;
								height: rpx(28) !important;
							}
						    
						  }
						}
						
				      }
				     
				      
				    }
				  }
				  .details-box {
				    margin: 0 0 rpx(20) 0;
				    padding: rpx(20);
				    background-color: #fff;
				    .top {
				      padding: 0 0 0.2rem 0;
				      font-size: rpx(16);
				      font-weight: bold;
				      color: rgba(51, 51, 51, 1);
				      line-height: rpx(18);
				    }
				    .details {
				       font-size: rpx(14);
				      color: rgba(51, 51, 51, 1);
				       line-height: rpx(18);
				    }
				  }
				  .footer-ctn {
				    // position: fixed;
				    width: 100%;
				    margin: 0.3rem 0;
				    padding: 0 0.3rem;
				    box-sizing: border-box;
				    // bottom: 0.62rem;
				    display: flex;
				    justify-content: space-between;
				  
				    .cart-btn {
				      border-radius: 0.4rem;
				      border: 0.02rem solid rgba(0, 32, 91, 1);
				      width: rpx(180);
				      height: rpx(40);
				      text-align: center;
				      font-weight: bold;
				      line-height: rpx(36);
				      box-sizing: border-box;
				  
				      font-size: rpx(16);
				  
				      &.primary {
				        color: rgba(0, 32, 91, 1);
				        border-color: rgba(0, 32, 91, 1);
				        background: #f8f6f9;
				      }
				  
				      &.normal {
				        color: #ffffff;
				        border-color: #00205b;
				        background: #00205b;
				      }
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
			  }
			 
			}
	}
	
	
	

</style>