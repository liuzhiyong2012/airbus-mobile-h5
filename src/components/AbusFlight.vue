<template>
	<section class="homeflight-main-ctn">
		<div class="home-flight-box">
			<div class="home-flight-t">
				<span classs="flight-model">{{ airplane.AirplaneModels }} </span>
				<span classs="flight-number">{{baseInfo.AirlinesName + ' '+ baseInfo.FlightNumber }}</span>
			</div>

			<div class="home-flight-info">
				<span class="home-flight-seat">
					<span>Seat No:</span>
					<span>{{ seatNumber }}</span>
					<i class="home-flight-g">{{seatClass}}</i>
				</span>
				<span class="flight-duration-time">
					<span>Remaining:</span>
					<span>{{remainingTime.hour}} hours {{remainingTime.mimute}} min</span>
				</span>
				<span class="home-flight-c">{{ weather.Temper+' '+weather.Desc}}</span>
			</div>

			<div class="home-flight-place">
				<div class="place place-l">
					<div class="time">
						<span>{{ baseInfo.Departure }}</span>
						<span v-show="baseInfo.Departure != baseInfo.DepartureTerminal">{{ baseInfo.DepartureTerminal }}</span>
					</div>
					<div class="address">{{ baseInfo.DeparturePlanTimestamp | dateFormate('hh:mm') }}</div>
				</div>
				
				<div class="f1">
					<i class="dot light"></i>
					<i class="dot grey"></i>
					<i class="dot dark"></i>
					<i class="icon icon-plane"></i>
					<i class="dot dark"></i>
					<i class="dot grey"></i>
					<i class="dot light"></i>
				</div>
				
				<div class="place place-r">
					<div class="time">
						<span>{{ baseInfo.Arrival }}</span>
						<span v-show="baseInfo.Arrival != baseInfo.ArrivalTerminal">{{ baseInfo.ArrivalTerminal }}</span>
					</div>
					<div class="address">{{ baseInfo.ArrivalPlanTimestamp | dateFormate('hh:mm') }}</div>
				</div>
			</div>
			
			<div class="map-box">
				<slot></slot>
			</div>
		</div>
	</section>
</template>

<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlightService from '../service/flight';
import { localStore } from '../utils/data-management';
import DateUtils from '../utils/date-utils';

@Component({
	name: 'HomeFlight',
	components: {
	}
})
export default class HomeFlight extends Vue {
	public flightResData: any = {};
	public baseInfo: any = {};
	public airplane: any = {};
	public flightAltitudes: any = {};
	public weather: any = {};
	private updateFlightHandler: any = null;
	
	public currentTime: any = null;
	
	private get isDemo():string{
		return this.$store.state.login.isDemo;
	}
	
	private remainingTime :any = {
		  hour:'--',
		  mimute:'--'
	};

	private get seatNumber(): string {
		return localStore.get('seatNumber') || this.$store.state.login.voyageInfo.seatNumber;
	}
	
	private get airbusId():string{
		return this.$store.state.login.airbusId;
	}
	
	private get flightInfo():string{
		return this.$store.state.login.flightInfo;
	}
	
	private get seatClass(): string {
		if(localStore.get('seatType')==1){
			return 'F';
		}else if(localStore.get('seatType')==2){
			return 'Y';
		}else if(localStore.get('seatType')==3){
			return 'C';
		}
	}

	created() {
		this.updateFlightHandler = (e)=>{
				this.getFlightInfo();
		};
		(this as any).$globalEvent.$on('updateFlightInfo',this.updateFlightHandler);
		this.getFlightInfo();
	}
    
	private beforeDestroy() {
		(this as any).$globalEvent.$off('updateFlightInfo',this.updateFlightHandler);
	}
	
	public getFlightInfo(): void {
		this.flightResData = this.flightInfo;
		this.baseInfo = this.flightResData.Flight.BaseInfo;
		this.airplane = this.flightResData.Flight.Airplane;
		this.flightAltitudes = this.flightResData.FlightAltitudes;
		this.weather = this.flightResData.Weather;
		
		if(this.flightAltitudes&&this.flightAltitudes.length >0){
			this.currentTime = this.flightAltitudes[this.flightAltitudes.length - 1].TimePoint;
		}else{
			this.currentTime = null;
		}
		
		if(this.isDemo){
			this.remainingTime = DateUtils.calcRemaingTime(this.baseInfo.DeparturePlanTimestamp,this.baseInfo.ArrivalPlanTimestamp,this.currentTime);
		}else{
			this.remainingTime = DateUtils.calcRemaingTimeByRtppd(this.baseInfo.rtppd);
		}
		
	}

	public stepToFlight(): void {
		this.$router.push({
			name: 'flightIndex'
		});
	}
}
</script>

<style lang="scss" scoped>
	
	@import '../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.homeflight-main-ctn {
				.home-flight-box {
					border-radius: 0.12rem;
					padding: 0.32rem 0.3rem;
					background: rgba(255, 255, 255, 1);
					box-sizing: border-box;
					.home-flight-t {
						margin-bottom: 0.2rem;
						font-size: 0.38rem;
						color: rgba(46, 46, 46, 1);
						line-height: 0.42rem;
					}
					
					.home-flight-info {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 0.26rem;
					
						.home-flight-seat {
							white-space: nowrap;
							display: flex;
							align-items: center;
							padding:0 0.04rem 0 0.10rem;
							line-height: 0.32rem;
							background:rgba(0,32,91,1);
							border-radius:0.16rem;
							font-size: 0.0rem;
							font-weight: bold;
							color:rgba(255,255,255,1);
							margin-right: 0.16rem;
							> *{
								font-size: 0.20rem;
							}
					
							.home-flight-g {
								margin-left: 0.12rem;
								font-size:0.20rem;
								font-weight:bold;
								color:rgba(0,32,91,1);
								
								border-radius: 50%;
								line-height: 0.24rem;
								text-align: center;
								display: inline-block;
								width: 0.24rem;
								height: 0.24rem;
								background:#ffffff;
							}
						}
					
						.flight-duration-time {
							display: flex;
							border-radius: 0.18rem;
							padding:0 0.12rem;
							background:rgba(0,174,199,1);
							height: 0.32rem;
							line-height: 0.32rem;
							
							font-size:0.20rem;
							font-weight:bold;
							color:rgba(255,255,255,1);
							margin-right: 0.16rem;
							
							>span{
								&:nth-child(1){
									margin-right: 0.20rem;
									
								}
								&:nth-child(2){
									
								}
							}
							
						}
					
						.home-flight-c {
							white-space: nowrap;
							border-radius:0.16rem;
							border:1px solid rgba(0,174,199,1);
							height: 0.30rem;
							text-align: center;
							padding:0 0.16rem;
							line-height: 0.30rem;
							box-sizing: border-box;
							background:#ffffff;
							
							font-size: 0.20rem;
							font-weight:bold;
							color:rgba(0,174,199,1);
							
							
						}
					}
					
					.home-flight-place {
						display: flex;
						justify-content: center;
						height: 1.30rem;
						background:#FAFAFA;
						border-radius:4px;
						margin-bottom: 0.26rem;
						padding-top:0.28rem;
						box-sizing: border-box;
						
						.place{
							// font-size:0.30rem;
							font-size:0.24rem;
							font-weight:bold;
							color:rgba(46,46,46,1);
							line-height:0.36rem;
							
							.time{
								text-align: center;
								margin-bottom: 0.16rem;
								>span{
									&:nth-child(1){
										margin-right: 0.16rem;
									}
								}
							}
							
							.address{
								text-align: center;
								font-size:0.20rem;
								color:rgba(51,51,51,1);
								line-height:0.24rem;
							}
						}
						
						
					
						
					
						.f1 {
							display: flex;
							align-items: center;
							justify-content: center;
							height: 0.36rem;
							// width:1.80rem;
							width: 1.2rem;
							font-size: 0;
							
							>i{
								&:not(:last-child){
									margin-right: 0.06rem;
								}
							}
							
							>.dot{
								display: inline-block;
								width:0.04rem;
								height: 0.04rem;
								border-radius: 50%;
								&.dark{
									background:rgba(0,0,0,1);
								}
								&.grey{
									background:rgba(0,0,0,0.3);
								}
								&.light{
									background:rgba(0,0,0,0.1);
								}
							}
							
							>.icon{
								color:#000000;
								font-size: 0.14rem;
								line-height: 0.20rem;
								font-size:0.20rem;
							}
						}
					
						
					
						.map-box {
							display: none;
						}
					}
			}
		}
	}
	
	@media  (orientation:landscape) {
		
			.homeflight-main-ctn {
				height: 100%;
				width: 100%;
			  .abus-block-title {
			    .block-title-background {
			      background-color: #fafafa00;
			    }
			  }
			
			  .home-flight-box {
				  height: 100%;
				  padding: 0.2rem;
				  background-color: #fff;
			    background: rgba(255, 255, 255, 1);
			    box-sizing: border-box;
			    .home-flight-t {
			      margin-bottom: rpx(10);
			      font-size: rpx(20);
			      color: rgba(46, 46, 46, 1);
			      line-height: rpx(20);
			
			    }
			
			    .home-flight-info {
			      display: flex;
			      align-items: center;
			      justify-content: space-between;
			      margin-bottom: rpx(22);
			
			      .home-flight-seat {
					    white-space: nowrap;
			        display: flex;
			        align-items: center;
			        padding:0 0.02rem 0 0.1rem;
			        line-height: rpx(16);
			        background: rgba(0, 32, 91, 1);
			        border-radius: 0.16rem;
			        font-size: 0rem;
			        font-weight: bold;
			        color: rgba(255, 255, 255, 1);
			        margin-right: 0.16rem;
			        > * {
			          font-size: rpx(12);
			        }
			
			        .home-flight-g {
			              margin-left: rpx(12);
			              margin-top: 0;
			              font-size: rpx(12);
			              font-weight: bold;
			              color: #00205b;
			              border-radius: 50%;
			              line-height: rpx(12);
			              text-align: center;
			              display: inline-block;
			              width: rpx(12);
			              height: rpx(12);
			              background: #ffffff;
			        }
			      }
			
			      .flight-duration-time {
			        display: flex;
			            border-radius:rpx(8);
			            padding: 0 rpx(12);
			            background: #00aec7;
			            height: rpx(16);
			            line-height: rpx(16);
			            font-size: rpx(12);
			            font-weight: bold;
			            color: white;
			            margin-right: rpx(16);
			
			        > span {
			          &:nth-child(1) {
			            margin-right: rpx(14);
			          }
			          &:nth-child(2) {
			          }
			        }
			
			      }
			
			      .home-flight-c {
					 white-space: nowrap;
					     border-radius: rpx(8);
					     border: 1px solid #00aec7;
					     height: rpx(16);
					     text-align: center;
					     padding: 0 rpx(8);
					     line-height: rpx(14);
					     box-sizing: border-box;
					     background: #ffffff;
					     font-size: rpx(12);
					     font-weight: bold;
					     color: #00aec7;
			      }
			    }
			
			    .home-flight-place {
			      display: flex;
			      justify-content: center;
			      background: #fafafa;
			      border-radius: 4px;
			      padding-top: 0.1rem;
			      padding-bottom: 0.1rem;
			      box-sizing: border-box;
			
			      .place {
			        font-size: rpx(18);
			        font-weight: bold;
			        color: rgba(46, 46, 46, 1);
			        line-height: rpx(22);
			
			        .time {
			          text-align: center;
			          margin-bottom: 0.1rem;
			          > span {
			            &:nth-child(1) {
			              margin-right: 0.16rem;
			            }
			          }
			        }
			
			        .address {
			          text-align: center;
			          font-size: rpx(12);
			          color: rgba(51, 51, 51, 1);
			          line-height:  rpx(16);
			        }
			      }
			
			      .f1 {
			        display: flex;
			        align-items: center;
			        justify-content: center;
			        height: 0.36rem;
			        width: 1.2rem;
			        font-size: 0;
			
			        > i {
			          &:not(:last-child) {
			            margin-right: 0.06rem;
			          }
			        }
			
			        > .dot {
			          display: inline-block;
			          width: 0.04rem;
			          height: 0.04rem;
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
			
			        > .icon {
			          color: #000000;
			          font-size: 0.14rem;
			          line-height: 0.2rem;
			          font-size: 0.2rem;
			        }
			      }
			    }
			    .map-box {
					display: none;
				}
			  }
			}
		
	}
	

</style>
