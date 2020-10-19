<template>
  <section class="abus-layout-ctn">
	  <section class="abus-layout-main-ctn">
		  <!-- <keep-alive> -->
		    <router-view class="abus-layout-view-ctn"/>
		  <!-- </keep-alive> -->
	  </section>
	  <music-player></music-player>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MusicPlayer from '../music/components/player/player.vue';
import FlightService from '../../service/flight';

@Component({
	name:'LayoutIndex',
	components:{
		MusicPlayer
	}
})
export default class LayoutIndex extends Vue {
  @Prop() private msg!: string;
  
  private socket:any = null;
  
  private timer: any = null;
  
  private get airbusId():string{
  	return this.$store.state.login.airbusId;
  }
  
  private get isDemo():string{
  	return this.$store.state.login.isDemo;
  }
  
  /* isDemo */
  
 private created(){
  	  this.getFlightInfo();
  	  this.startTimer();
  }
  
  private mounted(){
	  console.log('index:mounted');
  }
  
  private beforeDestroy(){
	  console.log('beforeDestroy');
  }
  
  private getFlightInfo(){
	  var xhr=new XMLHttpRequest();
	   //使用GET方式请求指定网址的页面
	   xhr.open('GET',process.env.VUE_APP_API_URL + '/v1/api/FlightInfo',false);
	   //发送空内容请求
	   xhr.send(null);
	   
	   if(xhr.status===200){//200状态码表示正常
			let res = JSON.parse(xhr.responseText);
			this.$store.dispatch('setFlightInfo',res.data);
	   }else{
	  		this.$toast('获取航班信息失败!');
	   }  
  }
  
  private startTimer(){
  	let timePeriod = 5000;
  	
  	this.timer = window.setInterval(()=>{
  		FlightService.getFlightInfo().then((res: any) => {
  			if(res.code == 200){
  				//如果飞机航班改变了，则跳转登录页面，并且重新开始实时推送。
  				if((this.airbusId&&(this.airbusId != res.data.Flight.BaseInfo.Id))||(this.airbusId&&(this.isDemo != res.data.Flight.BaseInfo.IsDemo))){
					this.$store.dispatch('setFlightInfo',res.data);
					// this.$store.dispatch('logout');
					// debugger;
					if(this.$route.path.indexOf('/login') < 0){
						this.$toast('飞机航班已经切换,请重新登录!');
						this.$router.push({
							path:'/login'
						});
					}
					
  				}else{
					this.$store.dispatch('setFlightInfo',res.data);
					(this as any).$globalEvent.$emit('updateFlightInfo',res.data);
  				}
  			}
  		});
  	},timePeriod);
  }
  
  
}
</script>


<style lang="scss">
	@import '../../assets/style/index.scss';
	
	.abus-layout-ctn{
		
	}
</style>