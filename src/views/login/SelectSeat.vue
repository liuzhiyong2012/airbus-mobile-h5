<template>
<div  class="registery">
  <abus-title :title="$t('SeatSelection')" backRouteName='backLoginFromSelectSeat' />
  <div>
    <div class="con">
      <div class="main-item">
        <div class="title line-h">{{$t('Name')}}</div>
        <p class="main-p">{{flightData.AirlinesName}} {{flightData.FlightNumber}}</p>
      </div>
      <div class="main-item">
        <div class="title line-h">{{$t('Seat')}}</div>
        <input
          v-model="seat"
          @click="showSeat"
          class="main-item-con"
          type="text"
          readonly="readonly"
          :placeholder="$t('SeatTips')"
        />
        <van-popup v-model="showIssues" position="bottom" :style="{ height: '36%' }">
          <van-picker
            show-toolbar
            :columns="columnsName"
            @cancel="showIssues = false"
            @confirm="onConfirm"
            :default-index="1"
            :cancel-button-text="$t('Cancel')"
            :confirm-button-text="$t('Determine')"
          />
        </van-popup>
      </div>
    </div>
    <div class="button-box">
      <div class="button" @click="getCrmSelectSeat">{{$t('Confirm')}}</div>
    </div>
  </div>
</div>
</template>
<i18n>
{
  "zh":{
    "Name":"航班名称",
    "Seat":"座位",
    "SeatTips":"请选择座位",
    "Cancel":"取消",
    "Determine":"确认",
    "Confirm":"确认",
    "SeatSelection":"座位选择"
  },
  "en":{
    "Name":"Name",
    "Seat":"Seat",
    "SeatTips":"Please enter your seat",
    "Cancel":"Cancel",
    "Determine":"OK",
    "Confirm":"Confirm",
    "SeatSelection":"Seat selection"
  }
}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LoginServer from "../../service/login";
import AbusTitle from '../../components/AbusTitle.vue'
@Component({
  name: "SelectSeat",
  components: {AbusTitle},
})
export default class SelectSeat extends Vue {
  private seat: string = "";
  private seatId: string = "";
  private seatType: number = null;
  private showIssues: boolean = false;
  private columns: Array<any> = [];
  private flightData: any = {};
  private columnsName: Array<string> = [];

  private created() {
    // this.getCrmSeatInfo()
    this.getCrmOtherSeatList();
  }
  private mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }

  public showSeat() {
    this.showIssues = true;
  }
  public onConfirm(value: any) {
    this.seat = value;
    this.showIssues = false;
  }
  public getCrmSeatInfo() {
    LoginServer.getCrmSeatInfo().then((res: any) => {
    });
  }
  public getCrmOtherSeatList() {
    LoginServer.getCrmOtherSeatList().then((res: any) => {
      if (res.code == 200) {
        this.columns = res.data.SeatList;
        this.flightData = res.data.Flight;
        this.columns.forEach((item: any, index: any) => {
          this.columnsName.push(item.Name);
        });
      }else{
        this.$toast(res.data)
      }
    });
  }
  public getCrmSelectSeat() {
    this.columns.forEach((item: any, index: any) => {
      if (item.Name == this.seat) {
        this.seatId = item.Id;
        this.seatType = item.SeatType;
        return;
      }
    });
    if (this.seatId != "") {
      LoginServer.getCrmSelectSeat(this.seatId).then((res: any) => {
        // this.$store.commit('setSeatNumber',this.seatId)
        this.$store.commit('setSeatNumber',this.seat)
        this.$store.commit('setSeatName',this.seat)
        this.$store.commit('setSeatType',this.seatType)
        if (res.code == 200) {
          this.$toast(res.data)
          // user/me
          this.$router.push({
            name: "home",
          });
        }
      });
    }
  }
  public onClickRegistery() {
    // 接口
  }
}
</script>

<style lang="scss" scoped>
.registery {

  box-sizing: border-box;
  height: 100vh;

  .con {
    margin: 0.3rem 0 0;
    background-color: #fff;
    padding: 0.3rem 0.3rem 0;
    .main-item {
      display: flex;
      padding: 0 0 0.3rem 0;
      .title {
        padding: 0.1rem 0 0;
        width: 1.7rem;
        color: #333;
      }
      .main-p {
        flex: 1;
        color: #333;
        line-height: 0.8rem;
      }
      .main-item-con {
        box-sizing: border-box;
        padding: 0 0 0 0.3rem;
        flex: 1;
        height: 0.8rem;
        border-radius: 0.04rem;
        border: 0.02rem solid rgba(51, 51, 51, 0.1);
        color: #333;
      }
      .title.line-h {
        padding: 0;
        line-height: 0.8rem;
      }
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
</style>