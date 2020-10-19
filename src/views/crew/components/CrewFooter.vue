<template>
  <div class="crew-footer" v-if="flightResData&&flightResData.Flight">
    <div class="info-ctn first">
      <i class="icon icon-crew-flight"></i>
      <span class="seat-number">
        {{ flightResData.Flight.BaseInfo.FlightNumber }}
      </span>
    </div>
    <div class="info-ctn second">
      <i class="icon icon-location"></i>
      <span class="start-position">
        {{ flightResData.Flight.BaseInfo.DepartureTerminal }}</span
      >
      <span>--</span>
      <i class="icon icon-flight-horizatal"></i>
      <span>--</span>
      <span class="end-position">
        {{ flightResData.Flight.BaseInfo.ArrivalTerminal }}</span
      >
    </div>

    <div class="info-ctn ">
      <i class="icon icon-time"></i>
      <span class="start-time">{{
        flightResData.Flight.BaseInfo.DeparturePlanTimestamp | dateFormate("YYYY-MM-DD")
      }}</span>
    </div>

    <div class="info-ctn third">
      <i class="icon icon-time"></i>
      <span class="start-time">{{
        flightResData.Flight.BaseInfo.DeparturePlanTimestamp | dateFormate("hh:mm")
      }}</span>
      <div class="progress-ctn">
        <div
          class="progress"
          :style="{ width: '78%'||flightResData.Flight.BaseInfo.OntimeRate }"
        ></div>
      </div>
      <span class="end-time">{{
        flightResData.Flight.BaseInfo.ArrivalPlanTimestamp | dateFormate("hh:mm")
      }}</span>
    </div>

    <div class="info-ctn fourth">
      <i class="icon icon-weather"></i>
      <span class="temperature-ctn">
        {{ flightResData.Weather.Desc }} {{ flightResData.Weather.Temper }}
      </span>
    </div>
    <div class="set-up" @click="showSetWindow">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-setting" />
      </svg>
    </div>
  </div>
</template>


<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>

<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'crew-footer',
  components: {},
})
export default class CrewFooter extends Vue {
  @Prop({
    default: () => {
      return null;
    },
  })
  flightResData;
  
public created() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  private mounted() {}

  public getFlightInfo(): void {}
  public showSetWindow(){
	  this.$emit('showSetWindow');
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/index.scss";
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-footer {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  padding: 0.6rem;

  font-size: rem(24px);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: rem(24px);
  background: rgba(0, 55, 126, 1);
  .set-up {
    position: absolute;
    right: 1rem;
    top: 0.4rem;
  }
  .info-ctn {
    display: flex;
    align-items: center;
    margin-right: rem(60px);
    .icon {
      margin-right: rem(4px);
      font-size: 0.36rem;
      color: #ffffff;
    }
    &.first {
    }
    &.second {
      .icon-flight-horizatal {
        margin: 0;
      }
    }
    &.third {
      .progress-ctn {
       /* position: relative;
        margin: 0 rem(4px);
        width: rem(200px);
        height: rem(16px);
        background: rgba(255, 255, 255, 1);
        border-radius: rem(8px);
        opacity: 0.2;
        overflow: hidden;*/
		
		position: relative;
		    margin: 0 0.12rem;
		    width: 2rem;
		    height: 0.16rem;
		    background: white;
		    border-radius: 0.08rem;
		    opacity: 0.2;
		    overflow: hidden;
		    box-sizing: border-box;
			

        .progress {
          overflow: hidden;
          // width:rem(130px);
          height: 100%;
          background: #00aec7;
          border-radius: rem(8px);
        }
      }
    }
    &.fourth {
      .temperature-ctn {
      }
    }
  }
}
</style>

