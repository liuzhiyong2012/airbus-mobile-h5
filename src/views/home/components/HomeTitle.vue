<template>
	
	<section class="home-title-ctn">
		
		<div class="title-left-ctn">
			<svg aira-hidden="true" class="icon"  @click="stepToScan">
				<use xlink:href="#icon-scan"></use>
			</svg>
			<span v-if="!isVip" class="flow-ctn" @click="stepTo('internet')">
				{{flowLable}}
			</span>
			<span v-else class="flow-ctn" @click="stepTo('internet')">
				VIP
			</span>
			<!-- <i class="icon"></i> -->
			
			<!-- <svg v-if="active == 'map'" class="icon" aria-hidden="true"><use xlink:href="#icon-map"></use></svg> -->
		</div>
		<div class="logo">
			<img src="../images/logo.png" alt="">
		</div>
	
		<div class="title-right-ctn">
			<i class="icon icon-user"  @click="stepTo('me')"></i>
			<i class="icon icon-message show-red"  @click="stepTo('message')"></i>
		</div>
		
	</section>
</template>
<!-- :class="{'show-red': showRed}" -->
<i18n>
	{
	"en":{
	  "waringMsg":"You need to purchase internet data package for using the app ",
	  "lessWarning":"Internet data package is going to be used up"
	},
	"zh":{
	  "waringMsg":"非VIP用户需购买流量套餐",
	  "lessWarning":"流量即将用尽,请及时购买流量"
	}
	}
</i18n>

<script lang="ts">
	import {Vue,Prop,Component, Watch} from 'vue-property-decorator';
    import LoginService from '../../../service/login';
	@Component({
		name:'HomeTitle',
		components:{
			
		}
	})
	export default class HomeTitle extends Vue{
		// private userData: any = {}
		private isVip: boolean = true
		
		private flowLable = '0Mb';
		
		private warningTime:any = 2 * 60 * 1000;
		//private warningTime:any = 20*1000;
		
		private timer:any = null;
		
		private get lastNetFlowWaringTime():string{
			return this.$store.state.login.lastNetFlowWaringTime;
		}
		
		@Prop() private showRed!: boolean;
		@Watch('showRed', { immediate: true })
		showRedWatch(newVal: boolean, oldVal: boolean) {
			this.showRed = newVal;
		}
		public stepTo(page:any):void{
			this.$emit('stepTo',page);
		}
		
		public created() {
			if (localStorage.getItem('lang') == 'en') {
			  this.$i18n.locale = 'en';
			} else {
			  this.$i18n.locale = 'zh';
			}
			
			this.getUserMe();
			this.startTimer();
		}
		
		private beforeDestroy(){
			window.clearInterval(this.timer);
		}
		
		private startTimer(){
			let timePeriod = 5000;
			
			this.timer = window.setInterval(()=>{
				this. getUserMe();
			},timePeriod);
		}
		
		public getUserMe(){
			LoginService.getUserMe().then((res:any) => {
				if(res.code == 200){
					let userData = res.data;
					if(res.data.Vip == 1 || res.data.Flow.Flow == -1){
						this.isVip = true;
					}else{
						this.isVip = false;
						let overTime:boolean = false;
						let remaingFlow = 0;;
						
						/* if(this.lastWarningTime){
							
						} */
						let nowTime:any = new Date(); 
						/* debugger; */
						if(this.lastNetFlowWaringTime){
						  let interTime = 	nowTime.getTime() - Number(this.lastNetFlowWaringTime);
							if(interTime > this.warningTime){
								overTime = true;
							}
						}else{
							overTime = true;
						}
						/* "waringMsg":"非VIP用户需购买流量套餐",
						"lessWarning":"流量即将用尽,请及时购买流量" */
						
						
						
						if(userData.Flow.Flow === null){
							this.flowLable = '0 MB';
							
							if(overTime){
								//this.$toast(this.$i18n.t('waringMsg'));
								this.$store.commit('setLastNetFlowWaringTime', nowTime.getTime());
							}
							
						}else{
							remaingFlow = userData.Flow.Flow - userData.Flow.Used;
							if(remaingFlow <= 1024){
								this.flowLable = remaingFlow + 'MB';
							}else{
								this.flowLable = (remaingFlow/1024).toFixed(1) + 'GB';
							}
							//系统用户购买流量
							if(remaingFlow <= 5&&overTime){
								this.$store.commit('setLastNetFlowWaringTime', nowTime.getTime());
								//this.$toast(this.$i18n.t('lessWarning'));
							}
						}
						//private lastWarningTime:any = null;
						//private warningTime:any = 2 * 60 * 1000;
					}
					
					//setLastNetFlowWaringTime
					this.$store.commit('setSeatNumber', res.data.Seat.Name);
					
					
				}else{
					this.$toast(res.message);
				}
			});
		}
		
		public stepToScan(){
			this.$router.push({
				name:'scan'
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.home-title-ctn{
			height: 1.00rem;
			background: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:0 0.30rem;
			
			.title-left-ctn{
				flex: 1;
				display: flex;
				align-items: center;
				svg.icon{
					width: 0.40rem;
					height: 0.40rem;
					margin-right: 0.20rem;
				}
				
				.flow-ctn{
					line-height: 0.40rem;
					// background: #001f5e;
					border-radius: 0.04rem;
					font-size:0.28rem;
					font-weight:normal;
					// color:rgba(255,255,255,1);
					color:#001f5e;
					line-height:0.40rem;
					padding:0 0.20rem;
					transform: skewX(-15deg);
					font-weight: 600;
				}
				
			}
			.logo{
				flex: 1;
				text-align: center;
				>img{
					height: 0.40rem;
				}
				
			}
			.title-right-ctn{
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				.icon-user{
					font-size: 0.40rem;
					margin-right: 0.20rem;
				}
				
				.icon-message{
					font-size: 0.40rem;
				}
				.show-red{
					&:after{
						content: "";
						position: absolute;
						top: 0.55rem;
						right: 0.3rem;
						background: red;
						width: 0.1rem;
						height: 0.1rem;
						border-radius: 50%;
					}
				}
			}
		}
	}
	
	@media  (orientation:landscape) {
		.home-title-ctn{
			height: rpx(56);
			background: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:0 rpx(20);
			
			.title-left-ctn{
				flex: 1;
				display: flex;
				align-items: center;
				svg.icon{
					width: rpx(20);
					height: rpx(20);
					margin-right: rpx(14);
				}
				
				.flow-ctn{
					line-height: rpx(20);
					// background: #001f5e;
					border-radius: 0.04rem;
					font-size:rpx(14);
					font-weight:normal;
					color:#001f5e;
					padding:0 rpx(10);
					transform: skewX(-15deg);
					font-weight: 600;
				}
				
			}
			.logo{
				flex: 1;
				text-align: center;
				>img{
					height: rpx(20);
				}
				
			}
			.title-right-ctn{
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				.icon-user{
					font-size: rpx(20);
					margin-right: rpx(10);
				}
				
				.icon-message{
					font-size: rpx(20);
				}
				.show-red{
					&:after{
						content: "";
						    position: absolute;
						    top: rpx(20);
						    background: red;
						    width: rpx(6);
						    height: rpx(6);
						    border-radius: 50%;
						    right: rpx(20);
					}
				}
			}
		}
	}
	
	
</style>