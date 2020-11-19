<template>
  <div class="abus-height" v-if="isShow">
    <div class="cell-group"  v-for="(item,index) in orderList" :key="index">
      <div class="header">
        <div class="top">
          <div class="title">{{item.FlightNumber}}</div>
          <!-- <div class="status">processing</div> -->
          <div class="status">{{$t('Complete')}}</div>
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
        <div class="item" >
          <div class="img">
            <!-- <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt /> -->
            <img :src="airbusIcon" alt />
          </div>
          <div class="f1">
            <div class="title">{{item.netFlowName}}</div>
            <div class="money">
              ${{item.FinalPrice}}
              <!-- <i>X12312</i> -->
            </div>
          </div>
        </div>

      </div>
      <div class="footer">
        <div class="time">{{item.CreatedAt}}</div>
        <div class="money">{{$t('TotalAmount')}} ${{item.FinalPrice}}</div>
      </div>
    </div>
  </div>
  <div v-else class="abus-height">
    <div class="no-data">{{$t('noData')}}</div>
  </div>
</template>
<i18n>
  {
  "zh":{
  "title":"机上购物",
  "TotalAmount":"总金额",
  "noData":"暂无数据",
  "Complete":"完成"
  },
  "en":{
  "title":"Shopping",
  "TotalAmount":"Total amount",
  "noData":"No data available",
  "Complete":"Complete"
  }
  }
</i18n>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import MeService from "../../../service/me";
  import DateUtils from "../../../utils/date-utils";
  declare function require(type: string): string;
  @Component({
    name: "MyInternetOrder",
    components: {},
  })
  export default class MyInternetOrder extends Vue {
    private orderList: Array<any>=[]
    private isShow: boolean = false
    private airbusIcon = require("../../../assets/airbus_icon.png");
    private created() {
      if (localStorage.getItem("lang") == "en") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
      this.postNetFlowOrder();
    }
    public postNetFlowOrder() {
      MeService.postNetFlowOrder().then((res: any) => {
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
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/index.scss';

  @media  (orientation:portrait) {
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
  }

  @media  (orientation:landscape) {
    .no-data{
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-size: .28rem;
      color: #666;
      text-align: center;
    }
    .cell-group {
      margin: 0.2rem 0 0;
      background: #fff;
      box-shadow: 0 0 0.1rem #efefef;
      .header {
        padding: 0.1rem 0.2rem 0.1rem 0.2rem;
        height: 0.7rem;
        border-bottom: 0.01rem solid #efefef;
        .top {
          display: flex;
          .title {
            flex: 1;
            font-size: 0.16rem;
            font-weight: bold;
            color: rgba(46, 46, 46, 1);
            line-height: 0.3rem;
            width: 0.54rem;
            height: 0.2rem;
          }
          .status {
            padding: 0.07rem 0.16rem;
            border-radius: 0.05rem;
            background-color: #00205b;
            color: #fff;
            font-size: 0.12rem;
          }
        }
        .con {
          margin: 0.1rem 0 0;
          padding: 0.06rem 0;
          display: flex;
          background-color: #f2f4f7;
          align-items: center;
          justify-content: center;
          border-radius: 0.06rem;
          height: 0.23rem;
          .text {
            font-size: 0.14rem;
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
              width: 0.02rem;
              height: 0.02rem;
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
            }
          }
        }
      }
      .main {
        .item {
          display: flex;
          padding: 0.1rem 0.2rem 0.1rem 0.2rem;
          border-bottom: 0.01rem solid #efefef;
          .img {
            display: flex;
            margin: 0 0.1rem 0 0;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 0.06rem;
            background-color: #efefef;
            overflow: hidden;
            align-items: center;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .f1 {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            font-size: 0.16rem;
            align-content: space-between;
            .title {
              width: 100%;
              height: 0.3rem;
              color: rgba(51, 51, 51, 1);
            }
            .money {
              width: 100%;
              font-weight: bold;
              color: rgba(46, 46, 46, 1);
              i {
                margin: 0 0 0 0.1rem;
                color: #999;
                font-weight: 400;
                font-size: 0.16rem;
              }
            }
          }
        }
      }
      .footer {
        display: flex;
        padding: 0 0.2rem;
        line-height: 0.4rem;
        height: 0.4rem;
        .time {
          font-size: 0.14rem;
          color: #999;
        }
        .money {
          flex: 1;
          text-align: right;
          font-size: 0.16rem;
          font-weight: bold;
          color: #383639;
        }
      }
    }
  }
</style>