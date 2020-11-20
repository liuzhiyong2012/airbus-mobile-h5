<template>
  <div class="shopping-details-ctn">
	  
    <abus-title class="abus-title-ctn" :title="$t('title')" backRouteName="shopping">
      <cart-icon @toCart="stepToCart()"></cart-icon>
    </abus-title>
	
    <div calss="shopping-details">
      <!-- <banner :bannerData="bannerData" /> -->
      <!-- <div class="dish-img" :style="{backgroundImage:`url(${shoppingInfo.BannerImgPath})`}"></div> -->
      <div class="dish-img" >
        <img :src="shoppingInfo.SampleImgPath|addBaseUrl" alt="">
      </div>
    </div>
    <div class="m-box">
      <div class="title">{{shoppingInfo.Name || '--'}}</div>
      <div class="info-box">
        <div class="qty">{{$t('QTY')}} {{shoppingInfo.Stocking || '--'}}</div>
        <div class="f1">
          <div class="price">${{shoppingInfo.Price || 0}}</div>
          <van-field class="field-ctn" name="stepper" label>
            <template #input>
              <van-stepper v-model="stepper" integer disable-input :max="shoppingInfo.Stocking" />
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
      <div class="details">{{shoppingInfo.Remark|| $t('NoIntroduction')}}</div>
    </div>

    <div class="footer-ctn">
      <div class="cart-btn primary" @click="addToCart()">{{$t('AddToCart')}}</div>
      <div class="cart-btn normal" @click="buyNow()">{{$t('BuyNow')}}</div>
    </div>
    <!-- <div class="button-box">
      <div class="button">Buy Now</div>
    </div>-->
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
      "success": "加入购物车成功!",
      "QTY":"剩余量"
		},
		"en":{
			"title":"Shopping Detail",
      "ProductDetails":"ProductDetails",
      "AddToCart":"Add To Cart",
      "BuyNow": "Buy Now",
      "NoIntroduction":"No introduction",
      "success": "Successfully added to shopping cart!",
      "QTY":"QTY"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import CartIcon from './components/ShoppingCartIcon.vue';
import UrlUtils from '../../utils/url-utils';
import ShoppingService from '../../service/shopping';
import { localStore } from '@/utils/data-management';
@Component({
  name: 'ShoppingDetail',
  components: {
    AbusTitle,
    CartIcon,
  },
})
export default class ShoppingDetail extends Vue {
  private stepper: number = 1;
  private recomendList: Array<any> = [];
  private shoppingList: Array<any> = [];

  private shoppingInfo: any = {};
  private id: any = ''
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
    // this.shoppingInfo = this.$route.params.shoppingInfo;
    this.id = this.$route.query.id;
    this.getShoppingDetail();
    // this.shoppingInfo.BannerImgPath = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(this.shoppingInfo.BannerImgPath));
  }
  @Watch('stepper', { immediate: true })
  private watchStepper() {
    this.shoppingInfo.orderNumber = this.stepper;
  }
  private get shoppingDetail() {
    return this.$store.state.shopping.shoppingDetail;
  }

  public backToIndex(): void {
    this.$router.push({
      name: 'dishIndex',
    });
  }
  public getShoppingDetail(){
    ShoppingService.getShoppingDetail({
			id:this.id
		}).then((res:any)=>{
      console.log(this.id);
			if(res.code == '200'){
				 this.shoppingInfo = res.data;
				 this.shoppingInfo.orderNumber = 1;
				 this.shoppingInfo.BannerImgPath = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(this.shoppingInfo.BannerImgPath));
				// localStore.set('GoodsDetails',this.shoppingInfo)
			}else{
				
			}
		});
  }
  public addToCart(): void {
    if(this.shoppingInfo.Stocking===0){
      return this.showToast();
    }else{
      this.$store.commit('addShoppingCartItem', this.shoppingInfo);
      this.$toast(this.$i18n.t('success'));
    }
    
  }

  public buyNow(): void {
    // this.$toast('购买成功!');
    if(this.shoppingInfo.Stocking===0){
      return this.showToast();
    }else{
      this.$store.commit('addShoppingCartItemRouter', this.shoppingInfo);
      this.stepToCart();
    }
    
  }

  public stepToCart():void{
		this.$router.push({
			name:'shoppingCart'
		});
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
	
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.shopping-details-ctn{
			padding-top:1.00rem;
			
			.abus-title-ctn{
				position: fixed;
				width: 100%;
				left:0;
				top:0;
				
			}
			
			.shopping-details {
			  width: 100%;
			}
			.dish-img {
			  // height: 6.3rem;
			  background-position: center;
			  background-size: cover;
			  background-repeat: no-repeat;
			  // background-color: #7b98bc;
			  img{
			    width: 100%;
			    height: 100%;
			  }
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
			      font-size: 0.28rem;
			      // color: rgba(96, 116, 153, 1);
			      color: rgba(51, 51, 51, 1);
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
			      .price{
			        font-size: 0.28rem;
			      }
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
			  margin: 0.3rem 0 ;
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
		
		.shopping-details-ctn{
			margin: 0 auto;
			width: 5rem;
			.abus-title-ctn{
				position: fixed;
				width: 100%;
				left:0;
				top:0;
				font-size: 0.2rem;
			}
			
			.shopping-details {
			  width: 100%;
			}
			.dish-img {
			  // height: 6.3rem;
			  background-position: center;
			  background-size: cover;
			  background-repeat: no-repeat;
			  // background-color: #7b98bc;
			  img{
			    width: 100%;
			    height: 100%;
			  }
			}
			.m-box {
			  // margin: 0 0 0.2rem 0;
			  padding: 0.2rem;
			  background-color: #fff;
			
			  .title {
			    font-size: 0.22rem;
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
			    padding: 0.2rem 0 0 0;
			    // height: 0.58rem;
			    line-height: 0.28rem;
			    .qty {
			      font-size: 0.14rem;
			      // color: rgba(96, 116, 153, 1);
			      color: rgba(51, 51, 51, 1);
			    }
			    .f1 {
			      flex: 1;
			      display: flex;
			      justify-content: flex-end;
			      text-align: right;
			      // font-size: 0.14rem;
			      font-weight: bold;
			      color: rgba(46, 46, 46, 1);
			      line-height: 0.30rem;
			      .price{
			        font-size: 0.24rem;
			      }
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
			  // margin: 0 0 0.2rem 0;
			  padding: 0.2rem;
			  background-color: #fff;
			  .top {
			    padding: 0 0 0.1rem 0;
			    font-size: 0.14rem;
			    font-weight: bold;
			    color: rgba(51, 51, 51, 1);
			    line-height: 0.26rem;
			  }
			  .details {
			    font-size: 0.135rem;
			    color: rgba(51, 51, 51, 1);
			    line-height: 0.18rem;
			  }
			}
			.footer-ctn {
			  // position: fixed;
			  width: 100%;
			  margin-top: 0.2rem;
			  padding: 0 0.8rem;
			  box-sizing: border-box;
			  // bottom: 0.62rem;
			  display: flex;
			  justify-content: space-between;
			
			  .cart-btn {
			    border-radius: 0.4rem;
			    border: 0.02rem solid rgba(0, 32, 91, 1);
			    width: 1.5rem;
			    height: 0.4rem;
			    text-align: center;
			    font-weight: bold;
			    line-height: 0.40rem;
			    box-sizing: border-box;
			    font-size: 0.16rem;
			
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

</style>