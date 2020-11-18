<template>
  <div class="abus-height">

    <abus-title :title="$t('title')" ></abus-title>


    <div class="lang-box">
      <van-radio-group v-model="radio" checked-color="#00205B">
        <van-radio name="1" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-wechat-pay" />
            </svg>

            <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('WechatPay')}}</span>
          </template>
        </van-radio>
        <van-radio name="2" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-ali-pay" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('Alipay')}}</span>
          </template>
        </van-radio>
        <van-radio name="3" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-credit-card" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('InternationalCreditCard')}}</span>
          </template>
        </van-radio>
        <van-radio name="4" class="lang-cell">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <svg class="icon i-icon" aria-hidden="true">
              <use xlink:href="#icon-cash" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">{{$t('Cash')}}</span>
          </template>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<i18n>
  {
  "zh":{
  "title":"支付方式",
  "WechatPay":"微信支付",
  "Alipay":"支付宝",
  "InternationalCreditCard":"国际信用卡",
  "Cash":"现金"
  },
  "en":{
  "title":"Payment",
  "WechatPay":"Wechat Pay",
  "Alipay":"Alipay",
  "InternationalCreditCard":"International Credit Card",
  "Cash":"Cash"
  }
  }
</i18n>
<script lang="ts">
  import {Vue,Prop,Component,Watch} from "vue-property-decorator";
  import AbusTitle from '../../../components/AbusTitle.vue';

  @Component({
    name:'PayMent',
    components:{
      AbusTitle
    }
  })
  export default class PayMent extends Vue{
    private radio:any = this.$store.state.me.payType;

    @Watch('radio')
    private changePayType(){
      this.$store.commit('changePayType',this.radio);
    }
    public mounted() {
      if (localStorage.getItem("lang") == "en") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
    }

  }
</script>

<style lang="scss" scoped>
  .lang-box {
    margin-top:0.14rem;
    padding: 0 0.3rem;
    background-color: #fff;
    .lang-cell {
      padding: 0.3rem 0;
    }
    .van-radio{
      height: 0.01rem;
    }
    .text-selected {
      padding: 0 0 0 0.08rem;
      font-size: 0.16rem;
      color: rgba(0, 32, 91, 1);
      font-weight: bold;
      position: relative;
      bottom: 0.02rem;
    }
    .text-unselected {
      padding: 0 0 0 0.08rem;
      font-size: 0.16rem;
      color: #999;
      font-weight: 400;
      position: relative;
      bottom: 0.02rem;
    }
  }
  .icon-text {
    margin: 0 0 0.08rem 0;
    width: 0.12rem;
    height: 0.12rem;
    position: relative;
    top: 0.04rem;
  }
  .i-icon {
    padding: 0 0 0 0.08rem;
    width: 0.2rem;
    height: 0.2rem;
  }
</style>