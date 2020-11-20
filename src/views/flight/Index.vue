<template>
  <section class="flight-main-ctn" :class="{ collapsed: isCollapsed }">
    <abus-title :title="$t('Flight')">
      <div slot style="width:0.3rem"></div>
    </abus-title>

    <section class="flight-content-ctn">
      <abus-map class="map-ctn" :style="calcStyle('map')" @demoIndexChange = "demoIndexChange"></abus-map>
      <section class="camera-ctn" :style="calcStyle('camera')">
        <div class="camera-switch-ctn">
          <div class="camera-switch-item">
            <svg
              v-if="activeCamera == 'frontCamera'"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-front-camera" />
            </svg>
            <svg
              v-if="activeCamera != 'frontCamera'"
              class="icon"
              aria-hidden="true"
              @click="toggleCameraTo('frontCamera', false)"
            >
              <use xlink:href="#icon-front-camera-disable" />
            </svg>
          </div>

          <div class="camera-switch-item">
            <svg
              v-if="activeCamera == 'centralCamera'"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-central-camera" />
            </svg>
            <svg
              v-if="activeCamera != 'centralCamera'"
              class="icon"
              aria-hidden="true"
              @click="toggleCameraTo('centralCamera', false)"
            >
              <use xlink:href="#icon-central-camera-disable" />
            </svg>
          </div>

          <div class="camera-switch-item">
            <svg
              v-if="activeCamera == 'backCamera'"
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-back-camera" />
            </svg>
            <svg
              v-if="activeCamera != 'backCamera'"
              class="icon"
              aria-hidden="true"
              @click="toggleCameraTo('backCamera', false)"
            >
              <use xlink:href="#icon-back-camera-disable" />
            </svg>
          </div>
        </div>
        <div class="camera-video-ctn">
          <video
            muted
            autoplay
            loop
            class="camera-video"
            v-if="cameraUrl[activeCamera] && active == 'camera'"
            :src="cameraUrl[activeCamera] | addBaseUrl"
            alt
            x5-playsinline
            playsinline
            webkit-playsinline
            x5-video-player-type="h5"
          ></video>
        </div>
      </section>
      <section ref="infoContentCtn" class="content-ctn" :class="{isAnimate:isAnimate}" :style="{bottom:bottomDistance + 'px'}">
        <div ref="switchCtn" class="switch-ctn">
          <div class="switch-item" @click="switchPageTo('map')">
            <svg v-if="active == 'map'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-map" />
            </svg>
            <svg v-if="active != 'map'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-map-disable" />
            </svg>
          </div>

          <div class="switch-item" @click="switchPageTo('camera')">
            <svg v-if="active == 'camera'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-camera" />
            </svg>
            <svg v-if="active != 'camera'" class="icon" aria-hidden="true">
              <use xlink:href="#icon-camera-disable" />
            </svg>
          </div>
        </div>

        <div class="voyage-ctn">
          <div ref="topCtn" class="top-ctn">
            <abus-flight></abus-flight>
          </div>
          <div class="bottom-ctn">
            <div class="chart-ctn" ref="chartCtn"></div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>
<i18n>
	{
		"zh":{
			"Flight":"航线",
			"message":"消息",
			"Send":"发送",
			"QTY":"剩余量"
		},
		"en":{
			"Flight":"Flight",
			"message":"message",
			"Send":"Send",
			"QTY":"QTY"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VoyageInfo from './components/VoyageInfo.vue';
import AbusMap from '../../components/AbusMap.vue';
import AbusTitle from '../../components/AbusTitle.vue';
import AbusFlight from '../../components/AbusFlight.vue';
import echarts from 'echarts';
import FlightService from '../../service/flight';
import DateUtils from '../../utils/date-utils';
import { localStore } from '@/utils/data-management';

@Component({
  name: 'FlightIndex',
  components: {
    AbusMap,
    AbusFlight,
    AbusTitle,
    VoyageInfo,
  },
})
export default class FlightIndex extends Vue {
  @Prop() private msg!: string;
  
  private active: string = 'map'; //"camera,map"
  private dataList: any = [];

  private activeCamera: string = 'frontCamera'; //header,body,footer

  private cameraUrl: any = {
    frontCamera: null,
    centralCamera: null,
    backCamera: null,
  };

  private chart: any = {};
  private flightInfo: any = {
    name: '刘志勇',
  };

  private isCollapsed: boolean = false;
  
   private isAnimate: boolean = false;

  private touchStartHandle: any = null;
  private touchMoveHandle: any = null;
  private touchEndHandle: any = null;
  
  //@doing
  private bottomDistance: number = 10;
  //隐藏状态下的距离
  private hideDistance: number = 0;

  private updateFlightHandler: any = null;

  private get airbusId(): string {
    return this.$store.state.login.airbusId;
  }

  private get flightResData(): string {
    return this.$store.state.login.flightInfo;
  }
  
  private demoIndex: number = 0; 
  
  private get isDemo():string{
  	return this.$store.state.login.isDemo;
  }

  private created() {
	  this.demoIndex = localStore.get('flightIndex') || 0;
  }

  private mounted() {
	 this.$nextTick(()=>{
		 this.hideDistance = (this as any).$refs.infoContentCtn.clientHeight - (this as any).$refs.switchCtn.clientHeight - (this as any).$refs.topCtn.clientHeight;
	 });
	  
    this.listenScroll();
    this.getFlightInfo();

    this.updateFlightHandler = (e) => {
      this.getFlightInfo();
	  
	  if(!this.isDemo){
		  this.renderCharts();
	  }
	  
    };
	
    (this as any).$globalEvent.$on('updateFlightInfo', this.updateFlightHandler);

    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
	
	if(this.isDemo){
		this.renderCharts(this.demoIndex);
	}else{
		this.renderCharts();
	}
    
  }
 
  private demoIndexChange(index){
	  console.log('demoIndexChange:' + index);
    this.demoIndex = index;
    this.renderCharts(this.demoIndex);
  }
  
  private beforeDestroy() {
    (this as any).$globalEvent.$off('updateFlightInfo', this.updateFlightHandler);
    (this as any).$refs.infoContentCtn.removeEventListener('touchstart', this.touchStartHandle);
    (this as any).$refs.infoContentCtn.removeEventListener('touchmove', this.touchMoveHandle);
    (this as any).$refs.infoContentCtn.removeEventListener('touchend', this.touchEndHandle);
	
  }

  public listenScroll(): void {
    var startX: any, startY: any, endX: any, endY: any;
	var startBottomDistance = 0;

    this.touchStartHandle = (event: any) => {
		return;
	  this.isAnimate = false;
      var touch = event.touches[0];
      startY = touch.pageY;
      startX = touch.pageX;
	  startBottomDistance = this.bottomDistance;
    };

    this.touchMoveHandle = (event: any) => {
		return;
		this.isAnimate = false;
      var touch = event.touches[0];
      endY = startY - touch.pageY;
      endX = startX - touch.pageX;
	  
	  this.bottomDistance = startBottomDistance + endY;
	  console.log('startBottomDistance:' + startBottomDistance);
	  console.log('endY:' + endY);
	  if(this.bottomDistance > 0){
		  this.bottomDistance = 0;
	  }
	  if(this.bottomDistance < (- this.hideDistance)){
		  this.bottomDistance = - this.hideDistance;
	  }
	  
    };

    this.touchEndHandle = (event: any) => {
		return;
		this.isAnimate = true;
      //100是给定触上下方向摸起始的坐标差
      if (endY > 25) {
        console.log('向上滑动');
       // this.isCollapsed = false; 
	     this.bottomDistance = 0;
      } else if (endY < -25) {
		  console.log('向下滑动');
		  this.bottomDistance = - this.hideDistance;
		  
      } else {
		  this.bottomDistance = startBottomDistance;
        //啥也不干
        console.log('啥也不干');
      }
    };

    (this as any).$refs.infoContentCtn.addEventListener('touchstart', this.touchStartHandle, false);
    (this as any).$refs.infoContentCtn.addEventListener('touchmove', this.touchMoveHandle, false);
    (this as any).$refs.infoContentCtn.addEventListener('touchend', this.touchEndHandle, false);
	
  }

  public getFlightInfo(): void {
    this.flightInfo = this.flightResData;

    this.cameraUrl = {
      frontCamera: this.flightInfo.Flight.BaseInfo.FrontLink
        ? this.flightInfo.Flight.BaseInfo.FrontLink
        : this.flightInfo.Flight.BaseInfo.FrontVideo,
      centralCamera: this.flightInfo.Flight.BaseInfo.MiddleLink
        ? this.flightInfo.Flight.BaseInfo.MiddleLink
        : this.flightInfo.Flight.BaseInfo.MiddleVideo,
      backCamera: this.flightInfo.Flight.BaseInfo.RearLink
        ? this.flightInfo.Flight.BaseInfo.RearLink
        : this.flightInfo.Flight.BaseInfo.RearVideo,
    };
  }

  public calcStyle(page: string) {
    if (this.active == 'camera') {
      if (page == 'camera') {
        return {
          visibility: 'visible',
          zIndex: 100,
        };
      } else {
        return {
          visibility: 'hidden',
          zIndex: 10,
        };
      }
    } else {
      if (page == 'camera') {
        return {
          visibility: 'hidden',
          zIndex: 10,
        };
      } else {
        return {
          visibility: 'visible',
          zIndex: 100,
        };
      }
    }
  }

  public toggleCameraTo(camera: string): void {
    this.activeCamera = camera;
  }

  public switchPageTo(page: string): void {
    this.active = page;
    if (page == 'camera') {
      this.toggleCameraTo('frontCamera');
    }
  }

  public renderCharts(demoIndex?:number) {
    let timesData: Array<any> = [];
    let speedsData: Array<any> = [];
    let altitudesData: Array<any> = [];

    if(this.flightInfo.FlightAltitudes.length==0){
      return;
    }

    this.flightInfo.FlightAltitudes.forEach((item: any, index: number) => {
      let time = DateUtils.formate(item.TimePoint, 'hh:mm');
      timesData.push(time);
      speedsData.push(this.flightInfo.FlightSpeeds[index].Speed);
      altitudesData.push(item.Altitude);
    });

    let FlightFirst = this.flightInfo.FlightSpeeds[0].TimePoint;
    let FlightEnd = this.flightInfo.FlightSpeeds[this.flightInfo.FlightSpeeds.length - 1].TimePoint;

    let headTimeArr = [];
    let headSpeedArr = [];
    let headAltitudeArr = [];

    let tailTimeArr = [];
    let tailSpeedArr = [];
    let tailAltitudeArr = [];

    let headEnpty = FlightFirst - this.flightInfo.Flight.BaseInfo.DeparturePlanTimestamp;
    if (headEnpty > 0) {
      headTimeArr.push(DateUtils.formate(this.flightInfo.Flight.BaseInfo.DeparturePlanTimestamp, 'hh:mm'));
      headSpeedArr.push('-');
      headAltitudeArr.push('-');
      let len = Math.floor(headEnpty / (5 * 60 * 1000));
      for (let i = 1; i <= len; i++) {
        headTimeArr.push(DateUtils.formate( this.flightInfo.Flight.BaseInfo.DeparturePlanTimestamp + i * 5 * 60 * 1000,'hh:mm'));
        headSpeedArr.push('-');
        headAltitudeArr.push('-');
      }
    }

    let tailEnpty = this.flightInfo.Flight.BaseInfo.ArrivalPlanTimestamp - FlightEnd;
    if (tailEnpty > 0) {
      let len = Math.floor(tailEnpty / (5 * 60 * 1000));
      for (let i = 1; i <= len; i++) {
        tailTimeArr.push(DateUtils.formate(FlightEnd + i * 5 * 60 * 1000, 'hh:mm'));
        tailSpeedArr.push('-');
        tailAltitudeArr.push('-');
      }
      tailTimeArr.push(DateUtils.formate(this.flightInfo.Flight.BaseInfo.ArrivalPlanTimestamp,'hh:mm'));
      tailSpeedArr.push('-');
      tailAltitudeArr.push('-');
    }

    if(this.isDemo){
      let demoFlightAltitude = this.flightInfo.FlightAltitudes.slice(0,demoIndex+1);
      speedsData=[];
      altitudesData=[];
      demoFlightAltitude.forEach((item: any, index: number) => {
        speedsData.push(this.flightInfo.FlightSpeeds[index].Speed);
        altitudesData.push(item.Altitude);
      });
    }

    if (headEnpty > 0 && tailEnpty > 0) {
      timesData = [...headTimeArr, ...timesData, ...tailTimeArr];
      speedsData = [...headSpeedArr, ...speedsData, ...tailSpeedArr];
      altitudesData = [ ...headAltitudeArr, ...altitudesData, ...tailAltitudeArr];
    } else if (headEnpty <= 0 && tailEnpty > 0) {
      timesData = [...timesData, ...tailTimeArr];
      speedsData = [...speedsData, ...tailSpeedArr];
      altitudesData = [...altitudesData, ...tailAltitudeArr];
    } else if (headEnpty > 0 && tailEnpty <= 0) {
      timesData = [...headTimeArr, ...timesData];
      speedsData = [...headSpeedArr, ...speedsData];
      altitudesData = [...headAltitudeArr, ...altitudesData];
    }

    this.chart = echarts.init((this as any).$refs.chartCtn);
    this.chart.clear();

    const optionData = {
      grid: {
        /* left: '13.5%',
        right: '12%', */
		    left: '15%',
		    right: '15%',
        top: '18%',
        bottom: '25%',
      },
      legend: {
        orient: 'horizontal',
        backgroundColor: '#ccc',
        borderRadius: 5,
        x: 'center',
        // y: 'bottom',
		 bottom:4,
        // padding: [5, 20, 15, 20],
        padding: [2, 20, 2, 20],
        data: ['Altitude m', 'Speed km/h'],
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: timesData,
        axisTick: {
          show: false,
        }
        /* axisLine: {
          show: false,
        } */
      },
      yAxis: [
        {
          name: 'Altitude',
          nameTextStyle: {
            padding: [0, 0, -7, -40], // 四个数字分别为上右下左与原位置距离
          },
          type: 'value',
        /*  max: 12000, */
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
		  
		   splitLine:{show: true},//去除网格线
		//    splitArea : {show : true}//保留网格区域
        },
        {
			splitLine:{show: false},//去除网格线
		//	 splitArea : {show : true},//保留网格区域
          name: 'Speed',
          nameTextStyle: {
            padding: [0, 0, -7, 40], // 四个数字分别为上右下左与原位置距离
          },
          type: 'value',
          /* max: 1200, */
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 'auto',
            show: true,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Altitude m',
          data: altitudesData,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#02AEC8', //改变折线点的颜色
              lineStyle: {
                color: '#02AEC8', //改变折线颜色
              },
            },
          },
        },
        {
          name: 'Speed km/h',
          data: speedsData,
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              color: '#00205B', //改变折线点的颜色
              lineStyle: {
                color: '#00205B', //改变折线颜色
              },
            },
          },
        },
      ],
    };

    this.chart.setOption(optionData);
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.flight-main-ctn {
		  position: fixed;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  left: 0;
		
		  &.collapsed {
		    .content-ctn {
		      height: 4.4rem !important;
		      .voyage-ctn {
		        .top-ctn {
		          margin-bottom: 0;
		        }
		        .bottom-ctn {
		          display: none;
		        }
		      }
		    }
		  }
		
		  .flight-content-ctn {
		    position: absolute;
		    top: rpx(56);
		    width: 100%;
		    bottom: 0;
		
		    .map-ctn {
		      position: absolute;
		      width: 100%;
		      height: 100%;
		    }
		
		    .camera-ctn {
		      position: absolute;
		      width: 100%;
		      height: 100%;
		      background: black;
		      z-index: 10;
		      .camera-switch-ctn {
		        position: absolute;
		        width: 0.5rem;
		        top: 0.44rem;
		        right: 0.3rem;
		        font-size: 0;
		        line-height: 0;
		        z-index: 100;
		        text-align: center;
		
		        .camera-switch-item {
		          margin-bottom: 0.2rem;
		          height: 0.5rem;
		
		          > .icon {
		            display: block;
		            width: 100%;
		            height: 100%;
		          }
		        }
		      }
		
		      .camera-video-ctn {
		        z-index: -100;
		        width: 100%;
		        height: 100%;
		
		        > video {
		          :focus {
		            overflow: hidden;
		            border: none !important;
		            box-shadow: none !important;
		            outline: none;
		          }
		          :active {
		            overflow: hidden;
		            border: none !important;
		            box-shadow: none !important;
		            outline: none;
		          }
		          // object-fit: fill;
		          outline: none;
		          border: none;
		          display: block;
		          width: 100%;
		          object-fit: cover;
		          object-position: center center;
		        }
		
		      }
		    }
		
		    .content-ctn {
		      position: absolute;
		      padding: 0 0.3rem 0.5rem 0.3rem;
		      width: 100%;
		      height: 7.8rem;
		      bottom: 0;
		      z-index: 200;
		      box-sizing: border-box;
			  
			  &.isAnimate{
				  transition: all  linear 0.2s;
				  
			  }
		
		      .switch-ctn {
		        width: 1.72rem;
		        margin-left: auto;
		        display: flex;
		        justify-content: space-between;
		        align-items: center;
		        padding-bottom: 0.28rem;
		        .switch-item {
		          width: 0.76rem;
		          height: 0.5rem;
		          background: rgba(255, 255, 255, 1);
		          border-radius: 0.26rem;
		          text-align: center;
		          display: flex;
		          justify-content: center;
		          align-items: center;
		
		          svg.icon {
		            width: 0.42rem;
		            height: 0.42rem;
		          }
		        }
		      }
		
		      //实不相瞒
		      .voyage-ctn {
		        .top-ctn {
		          width: 100%;
		          height: 3.4rem;
		          padding-bottom: 0.4rem;
		        }
		        .bottom-ctn {
		          .chart-ctn {
		            height: 3.1rem;
		            background: rgba(255, 255, 255, 1);
		            border-radius: 0.12rem;
		          }
		        }
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.flight-main-ctn {
		  position: fixed;
		  top: 0;
		  right: 0;
		  bottom: 0;
		  left: 0;
		
		  &.collapsed {
		    .content-ctn {
		      height: 4.4rem !important;
		      .voyage-ctn {
		        .top-ctn {
		          margin-bottom: 0;
		        }
		        .bottom-ctn {
		          display: none;
		        }
		      }
		    }
		  }
		
		  .flight-content-ctn {
		    position: absolute;
		    top: rpx(56);
		    width: 100%;
		    bottom: 0;
		
		    .map-ctn {
		      position: absolute;
		      width: 100%;
		      height: 100%;
		    }
		
		    .camera-ctn {
		      position: absolute;
		      width: 100%;
		      height: 100%;
		      background: black;
		      z-index: 10;
		      .camera-switch-ctn {
		        position: absolute;
		        width: rpx(24);
		        top:  rpx(20);
		        right:rpx(20);
		        font-size: 0;
		        line-height: 0;
		        z-index: 100;
		        text-align: center;
		
		        .camera-switch-item {
		          margin-bottom: rpx(12);
		          height: rpx(24);
		
		          > .icon {
		            display: block;
		            width: 100%;
		            height: 100%;
		          }
		        }
		      }
		
		      .camera-video-ctn {
		        z-index: -100;
		        width: 100%;
		        height: 100%;
		
		        > video {
		          :focus {
		            overflow: hidden;
		            border: none !important;
		            box-shadow: none !important;
		            outline: none;
		          }
		          :active {
		            overflow: hidden;
		            border: none !important;
		            box-shadow: none !important;
		            outline: none;
		          }
		          // object-fit: fill;
		          outline: none;
		          border: none;
		          display: block;
		          width: 100%;
		          object-fit: cover;
		          object-position: center center;
		        }
		
		      }
		    }
		
		    .content-ctn {
		      position: absolute;
		      padding: rpx(44) rpx(20) rpx(20) rpx(20);
		      width: 100%;
		      height: rpx(256);
		      bottom: 0;
		      z-index: 200;
		      box-sizing: border-box;
			  
			  &.isAnimate{
				  transition: all  linear 0.2s;
				  
			  }
		
		      .switch-ctn {
				  position: absolute;
				  top:0;
				  right: rpx(20);
		        width: rpx(88);
		        margin-left: auto;
		        display: flex;
		        justify-content: space-between;
		        align-items: center;
		        padding-bottom: rpx(20);
		        .switch-item {
		          width: rpx(38);
		          height: rpx(24);
		          background: rgba(255, 255, 255, 1);
		          border-radius: rpx(12);
		          text-align: center;
		          display: flex;
		          justify-content: center;
		          align-items: center;
		
		          svg.icon {
		            width: rpx(20);
		            height: rpx(20);
		          }
		        }
		      }
		
		     
			  
			  .voyage-ctn {
			  		display: flex;
			  		justify-content: space-between;
					width: 100%;
					height: 100%;
			    .top-ctn {
					height: 100%;
			  		margin-right: rpx(20);
					width: 50%;
					box-sizing: border-box;
					border-radius: rpx(4);
					overflow: hidden;
					border-right: rpx(10);
			    }
			    .bottom-ctn {
			  		// flex: 1;
					width: 50%;
					border-left: rpx(10);
			      .chart-ctn {
			        height: 100%;
			        background: rgba(255, 255, 255, 1);
			        border-radius: rpx(4);
					overflow: hidden;
			      }
			    }
			  }
		    }
		  }
		}
	}
	

</style>
