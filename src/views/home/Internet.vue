<template>
  <div class="internet">
    <abus-title :title="$t('Internet')" backRouteName="home">
      <div slot style="width: 0.3rem"></div>
    </abus-title>
    <div class="padding">
      <div class="card" v-for="(item, index) in cardList" :key="index">
        <div class="header">
          <div class="time">{{item.Name}}</div>
          <div class="price">${{item.Price}}</div>
        </div>
        <div class="con">
          <div class="con-l">{{item.Remark}}
            </div>
          <div class="pay" @click="routerInternetCard(item)">{{$t('Pay')}}</div>
        </div>
        <p class="text">{{$t('EstimatedUse')}}</p>
        <div class="bottom">
          <div class="f1">
            <img class="icon" src="./images/icon_01.png" alt="icon_01" />
            <span class="time-t">{{item.TextTime}}</span>
          </div>
          <div class="f1">
            <img class="icon" src="./images/icon_02.png" alt="icon_02" />
            <span class="time-t">{{item.MusicTime}}</span>
          </div>
          <div class="f1 f2">
            <img class="icon" src="./images/icon_03.png" alt="icon_03" />
            <span class="time-t">{{item.VideoTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			  "Internet":"网络套餐",
			  "Pay":"购买",
			  "EstimatedUse":"预估使用"
		},
		"en":{
			  "Internet":"Internet",
			  "Pay":"Pay",
			  "EstimatedUse":"Estimated use"
		}
	}
</i18n>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import NetflowService from '../../service/netflow';
import AbusTitle from "../../components/AbusTitle.vue";
@Component({
  name: 'Internet',
  components:{
    AbusTitle
  }
})
export default class InternetIndex extends Vue{
  private cardList: Array<any> = [];

  private created() {
    this.postNetFlowList()
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }

  public routerInternetCard(data:any){
    this.$store.dispatch("commitInternetCartData",{
      data: data
    })
    this.$router.push({
      name: 'internetCart',
      params:{
        key: data
      }
    })
  }
  public postNetFlowList(){
      NetflowService.postNetFlowList().then((res: any) => {
        if(res.code == 200){
          this.cardList = res.data
        }
      })
    }
}
</script>

<style lang="scss" scoped>
.internet {
  min-height: 100vh;
  .padding {
    padding: 0.3rem 0.3rem 0;
    box-sizing: border-box;
    width: 100%;
    .card {
      box-sizing: border-box;
      margin: 0 0 0.3rem 0;
      padding: 0.3rem;
      border-radius: 0.08rem;
      box-shadow: 0 0 0.1rem #efefef;
      width: 100%;
      background-color: #fff;
      .header {
        display: flex;
        .time {
          flex: 1;
          font-size: 0.42rem;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 0.5rem;
        }
        .price {
          font-size: 0.42rem;
          font-weight: bold;
          color: rgba(0, 32, 91, 1);
          line-height: 0.5rem;
        }
      }
      .con {
        display: flex;
        margin: 0.3rem 0 0 0;
        .con-l {
          flex: 1;
          font-size: 0.22rem;
          color: rgba(51, 51, 51, 1);
          line-height: 0.26rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .pay {
          margin: 0 0 0 1rem;
          width: 1.21rem;
          height: 0.5rem;
          background: rgba(0, 31, 91, 1);
          border-radius: 0.25rem;
          color: #fff;
          line-height: 0.5rem;
          text-align: center;
        }
      }
      .text {
        margin: 0.3rem 0 0 0;
        font-size: 0.22rem;
        color: rgba(51, 51, 51, 1);
        line-height: 0.26rem;
      }
      .bottom {
        display: flex;
        margin: 0.3rem 0 0;
        width: 100%;
        height: 0.6rem;
        background: rgba(0, 31, 91, 0.05);
        border-radius: 0.04rem;
        .f1 {
          display: flex;
          min-width: 1.3rem;
          padding: 0 0 0 0.3rem;
          line-height: 0.6rem;
          align-items: center;
          justify-content: center;
          .icon {
            width: 0.36rem;
            height: 0.36rem;
          }
          .time-t {
            flex: 1;
            margin-left: 0.1rem;
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(46, 46, 46, 1);
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
  }
}
</style>