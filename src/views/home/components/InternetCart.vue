<template>
  <div class="internet-cart">
    <abus-title :title="$t('title')" backRouteName="internet"></abus-title>
    <div class="cart">
      <div class="name-bg text-two" v-if="getInternetData.DisplayOrder == 0">10 G</div>
      <div class="name-bg" v-else-if="getInternetData.DisplayOrder == 1">ALL DAY</div>
      <div class="name-bg text-two" v-else-if="getInternetData.DisplayOrder == 2">1 G</div>
      <div class="name-bg text-two" v-else-if="getInternetData.DisplayOrder == 3">50 M</div>
      <div v-else class="name-bg text-two">--</div>
      <div class="f1">
        <div class="name">{{getInternetData.Name || "暂无"}}</div>
        <div class="price">
          <div>${{getInternetData.Price || '--'}}</div>
          <!-- <van-field class="field-ctn" name="stepper" label>
            <template #input>
              <van-stepper v-model="stepper" />
            </template>
          </van-field>-->
        </div>
      </div>
      <!-- <div class="stepper-box">
        <i class="minus">-</i>
        <span class="f2">1</span>
        <i class="plus">+</i>
      </div>-->
    </div>
    <div class="cell-group-two">
      <div class="cell-item" @click="stepToPage('payment')">
        <div class="title">{{$t('PaymentMethod')}}</div>
        <div class="f1">
          <svg class="icon icon-right-1" aria-hidden="true">
            <use v-if="payType == '1'" xlink:href="#icon-wechat-pay" />
            <use v-if="payType == '2'" xlink:href="#icon-ali-pay" />
            <use v-if="payType == '3'" xlink:href="#icon-credit-card" />
            <use v-if="payType == '4'" xlink:href="#icon-cash" />
          </svg>

          <svg class="icon icon-right" aria-hidden="true">
            <use xlink:href="#icon-youjiantou_1" />
          </svg>
        </div>
      </div>
    </div>
    <div class="cell-group">
      <!-- <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div>
      <div class="cell">
        <div class="cell-l">12323123</div>
        <div class="cell-r">$12332</div>
      </div>-->

      <div class="cell">
        <!-- <div class="cell-l t-bold">12323123</div> -->
        <div class="cell-r t-bold">{{$t('TotalAmount')}} ${{internetCartTotal}}</div>
      </div>
    </div>
    <div class="button-box">
      <div class="button" @click="goHome">{{$t('Pay')}}</div>
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
			"title":"Internet Cart",
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
import NetflowService from '../../../service/netflow';
import AbusTitle from '../../../components/AbusTitle.vue';
import { localStore } from '../../../utils/data-management';
@Component({
  name: 'InternetCart',
  components: {
    AbusTitle,
  },
})
export default class InternetCart extends Vue {
  private internetData: any = '';
  private stepper: number = 1;
  private created() {
    // this.postNetFlowList()
    // this.internetData = this.$route.params.key
  }
  private mounted() {
    this.stepper = this.$store.state.home.internetCartNum;
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  @Watch('stepper', { immediate: true })
  private changeInternetStepper() {
    this.$store.commit('changeInternetStepper', this.stepper);
  }

  // private get internetCartNum(): number {
  //   return this.$store.state.home.getInternetData.internetCartNum;
  // }
  private get internetCartTotal(): number {
    return this.$store.state.home.total;
  }
  private get getInternetData() {
    
    return this.$store.state.home.internetData;
  }
  private get payType(): number {
    return this.$store.state.me.payType;
  }
   private get seatType():number{
		return localStore.get('seatType') || this.$store.state.login.voyageInfo.seatType;
	}
  private get seatName(): string {
    return (
      localStore.get('seatName') || this.$store.state.login.voyageInfo.seatName
    );
  }
  public stepToPage(pageType: any) {
    let routeMap: any = {
      exchange: 'pointsExchange',
      address: 'address',
      payment: 'payment',
      myorder: 'myOrder',
      lang: 'lang',
      thirdaccount: 'thirdAccount',
    };
    if (routeMap[pageType]) {
      this.$router.push({
        name: routeMap[pageType],
      });
    }
  }
  public goHome() {
    // ['Seat','Remark','id']
    // console.log(this.$store.state.me.seatType);
    let data = {
      Seat: this.seatName || '3D',
      Remark: '',
      id: this.getInternetData.Id,
      SeatType: this.seatType || 2,
    };
    NetflowService.postNetFlowPlaceOrder(data).then((res: any) => {
      if (res.code == 200) {
        this.$toast('Success');
        setTimeout(() => {
          this.$router.push({
            name: 'home',
          });
        }, 1000);
      }
    });
  }
  public postNetFlowList() {
    NetflowService.postNetFlowList().then((res: any) => {
      console.log(res);
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/index.scss';

@media  (orientation:portrait) {
    .internet-cart {
        min-height: 100vh;
        .cart {
            position: relative;
            display: flex;
            padding: 0.3rem;
            background-color: #fff;
            .name-bg {
                margin: 0 0.3rem 0 0;
                padding: 0.15rem;
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background-color: #00205b;
                color: #fff;
                text-align: center;
                line-height: 0.4rem;
                &.text-two {
                    font-size: 0.4rem;
                    line-height: 0.8rem;
                }
            }
            .f1 {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: center;

                .name {
                    flex: 1;
                    font-size: 0.36rem;
                    color: rgba(51, 51, 51, 1);
                    line-height: 0.55rem;
                }
                .price {
                    flex: 1;
                    display: flex;
                    font-size: 0.42rem;
                    color: rgba(51, 51, 51, 1);
                    font-weight: bold;
                    line-height: 0.55rem;
                    justify-content: space-between;
                    .van-cell {
                        padding: 0;
                        width: auto;
                    }
                }
            }
            .f2 {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .cell-group {
        margin: 0.3rem;
        .cell {
            margin: 0 0 0.3rem 0;
            display: flex;
            font-size: 0.3rem;
            color: rgba(155, 154, 170, 1);
            line-height: 0.36rem;

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
            font-size: 0.32rem;
        }
    }
}

@media  (orientation:landscape) {
    .internet-cart {
        min-height: 100vh;
        .cart {
            position: relative;
            display: flex;
            padding: 0.4rem 0.5rem;
            background-color: #fff;
            .name-bg {
                margin: 0 0.3rem 0 0;
                padding: 0.15rem;
                width: 0.56rem;
                height: 0.56rem;
                border-radius: 50%;
                background-color: #00205b;
                color: #fff;
                text-align: center;
                line-height: 0.4rem;
                &.text-two {
                    font-size: 0.14rem;
                    line-height: 0.56rem;
                }
            }
            .f1 {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: center;

                .name {
                    flex: 1;
                    font-size: 0.18rem;
                    color: rgba(51, 51, 51, 1);
                    line-height: 0.55rem;
                }
                .price {
                    flex: 1;
                    display: flex;
                    font-size: 0.2rem;
                    color: rgba(51, 51, 51, 1);
                    font-weight: bold;
                    line-height: 0.2rem;
                    justify-content: space-between;
                    .van-cell {
                        padding: 0;
                        width: auto;
                    }
                }
            }
            .f2 {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-content: center;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .cell-group {
        margin: 0.16rem 0.1rem 0.4rem 0;
        .cell {
            margin: 0 0 0.3rem 0;
            display: flex;
            font-size: 0.3rem;
            color: rgba(155, 154, 170, 1);
            line-height: 0.36rem;

            .cell-r {
                flex: 1;
                text-align: right;
            }
            .t-bold {
                font-size: 0.18rem;
                font-weight: bold;
                color: rgba(46, 46, 46, 1);
                line-height: 0.18rem;
            }
        }
    }
    .cell-group-two {
        margin: 0.1rem 0 0 0;
        background: #fff;
        .cell-item {
            display: flex;
            padding: 0 0.2rem;
            line-height: 0.56rem;
            height: 0.56rem;
            .title {
                font-size: 0.16rem;
                color: rgba(51, 51, 51, 1);
            }
            .f1 {
                position: relative;
                flex: 1;
                .icon-right {
                    position: absolute;
                    right: -0.2rem;
                    padding: 0.13rem 0.2rem 0.12rem 0;
                    width: 0.24rem;
                    height: 0.24rem;
                }
                .icon-right-1 {
                    position: absolute;
                    right: 0.2rem;
                    padding: 0.1rem;
                    width: 0.3rem;
                    height: 0.3rem;
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
    .button-box {
        margin: 0.4rem 0.3rem 0.5rem;
        .button {
            margin: 0 auto;
            width: 3.4rem;
            height: 0.4rem;
            background: rgba(0, 32, 91, 1);
            border-radius: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            color: #fff;
            font-weight: bold;
            font-size: 0.17rem;
        }
    }
}
</style>