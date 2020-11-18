<template>
  <div class="abus-height" v-if="isShow">
    <div class="cell-group" v-for="(item,index) in orderList" :key="index">
      <div class="header">
        <div class="top">
          <div class="title">{{item.FlightNumber}}</div>
          <div class="status" v-if="item.Status == 0">{{$t('Undetermined')}}</div>
          <div class="status" v-else-if="item.Status == 1 && item.Type == 1">{{$t('Making')}}</div>
          <div class="status" v-else-if="item.Status == 1 && item.Type == 2">{{$t('Packing')}}</div>
          <div class="status" v-else-if="item.Status == 2">{{$t('Delivery')}}</div>
          <div class="status" v-else-if="item.Status == 3">{{$t('Complete')}}</div>
          <div class="status" v-else-if="item.Status == 4">{{$t('Cancel')}}</div>
        </div>
        <div class="con">
          <div class="text">{{item.Departure}}</div>
          <div class="flight">
            <i class="dot light"></i>
            <i class="dot grey"></i>
            <i class="dot dark"></i>
            <i class="icon icon-plane"></i>
            <i class="dot dark"></i>
            <i class="dot grey"></i>
            <i class="dot light"></i>
          </div>
          <div class="text">{{item.Arrival}}</div>
        </div>
      </div>
      <div class="main">
        <div class="item" v-for="(aItem,aIndex) in item.Items" :key="aIndex">
          <div class="img">
            <img :src="aItem.Shopping.BannerImgPath|addBaseUrl" alt />
          </div>
          <div class="f1">
            <div class="title">{{aItem.Shopping.Name}}</div>
            <div class="money" v-if="item.Type == 1">
              ${{aItem.Price}}
              <i>X{{aItem.Quantity}}</i>
            </div>
            <div class="money" v-if="item.Type == 2">
              {{aItem.Shopping.Price}}
              <i>X{{aItem.Quantity}}</i>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="time">{{getTime(item.CreatedAt)}}</div>
        <div class="money" v-if="item.Type == 1">{{$t('TotalAmount')}} ${{item.FinalPrice}}</div>
        <div class="money" v-if="item.Type == 2">{{$t('TotalPoints')}} {{pointNum(item.FinalPrice)}}</div>
      </div>
    </div>
  </div>
  <div v-else  class="abus-height">
    <div class="no-data">{{$t('noData')}}</div>
  </div>
</template>
<i18n>
	{
		"zh":{
      "TotalAmount":"总金额",
      "TotalPoints":"总积分",
      "Undetermined":"待定",
      "Making":"处理中",
      "Packing":"打包中",
      "Delivery":"派送",
      "Complete":"完成",
      "noData":"暂无数据",
      "Cancel":"取消"
		},
		"en":{
      "TotalAmount":"Total amount",
      "TotalPoints":"Total points",
      "Undetermined":"Undetermined",
      "Making":"Making",
      "Packing":"packing",
      "Delivery":"Delivery",
      "Complete":"Complete",
      "noData":"No data available",
      "Cancel":"Cancel"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MeService from "../../../service/me";
import DateUtils from '../../../utils/date-utils';
@Component({
  name: "MyShoppingOrder",
})
export default class MyShoppingOrder extends Vue {
  private orderList: Array<any>=[]
  private isShow: boolean = false
  private created() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
    this.getShoppingOrder();
  }
  public getShoppingOrder() {
    MeService.getShoppingOrder().then((res: any) => {
      if(res.code == 200) {
        this.orderList = res.data.Orders
        if(this.orderList.length > 0){
          this.isShow = true
        } else {
          this.isShow = false
        }
      }
    });
  }
  public getTime(time:number){
    return DateUtils.formate(time)
  }
  public pointNum(point: any){
    return Number(point).toFixed(0)
  }
}
</script>

<style lang="scss" scoped>
.no-data{
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: .28rem;
  color: #666;
  text-align: center;
}
.cell-group {
  margin: 0.3rem 0 0;
  background: #fff;
  box-shadow: 0 0 0.1rem #efefef;
  .header {
    padding: 0.3rem;
    border-bottom: 0.01rem solid #efefef;
    .top {
      display: flex;
      .title {
        flex: 1;
        font-size: 0.32rem;
        font-weight: bold;
        color: rgba(46, 46, 46, 1);
        line-height: 0.4rem;
      }
      .status {
        padding: 0.07rem 0.16rem;
        border-radius: 0.05rem;
        background-color: #00205b;
        color: #fff;
      }
    }
    .con {
      margin: 0.3rem 0 0;
      padding: 0.18rem 0;
      display: flex;
      background-color: #f2f4f7;
      align-items: center;
      justify-content: center;
      border-radius: 0.06rem;
      .text {
        font-size: 0.28rem;
        color: rgba(46, 46, 46, 1);
      }
      .flight {
        margin: 0 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          margin-right: 0.06rem;
          :last-child {
            margin: 0;
          }
        }
        .dot {
          display: inline-block;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;

          &.dark {
            background: rgba(0, 0, 0, 1);
          }
          &.grey {
            background: rgba(0, 0, 0, 0.3);
          }
          &.light {
            background: rgba(0, 0, 0, 0.1);
          }
        }
        .icon {
          color: #000000;
          line-height: 0.2rem;
          font-size: 0.25rem;
        }
      }
    }
  }
  .main {
    .item {
      display: flex;
      padding: 0.3rem;
      border-bottom: 0.01rem solid #efefef;
      .img {
        display: flex;
        margin: 0 0.3rem 0 0;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.06rem;
        background-color: #efefef;
        overflow: hidden;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .f1 {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        font-size: 0.32rem;
        align-content: space-between;
        .title {
          width: 100%;
          color: rgba(51, 51, 51, 1);
        }
        .money {
          height: 0.32rem;
          width: 100%;
          font-weight: bold;
          color: rgba(46, 46, 46, 1);
          i {
            margin: 0 0 0 0.3rem;
            color: #999;
            font-weight: 400;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    padding: 0 0.3rem;
    line-height: 0.8rem;
    .time {
      font-size: 0.28rem;
      color: #999;
    }
    .money {
      flex: 1;
      text-align: right;
      font-size: 0.32rem;
      font-weight: bold;
      color: #383639;
    }
  }
}
</style>