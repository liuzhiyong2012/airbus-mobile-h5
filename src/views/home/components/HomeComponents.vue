<template>
  <div>
    <h2 class="abus-block-title">
      <van-cell :title="$t(titleConfig.value)" class="block-title-background">
        <template #right-icon>
		  <i class="icon icon-more" @click="stepTo(titleConfig.value)"></i> 
        </template>
      </van-cell>
    </h2>    
    <slot></slot>
  </div>
</template>

<i18n>
	{
		"zh":{
			"flight":"航班",
			"dish":"餐品",
			"shopping":"机上购物",
			"music":"音乐",
			"game":"游戏",
			"video":"视频",
			"news":"新闻",
			"aboutUs":"关于我们"
		},
		"en":{
			"flight":"Flight",
			"dish":"Dish",
			"shopping":"Shopping",
			"music":"Music",
			"game":"Game",
			"video":"Video",
			"news":"News",
			"aboutUs":"About Us"
		}
	}
</i18n>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
	name:'HomeComponents',
	components:{
		
	}
})
export default class HomeComponents extends Vue{
	@Prop({
		default:()=>{
			return {};
		}
	})
	private titleConfig:any;
	
	public stepTo(value:string){
		this.$emit('stepTo',value);
	}
};
</script>


<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.block-title-background {
		  background: transparent;
		}
		.van-cell {
		  font-size: 0.36rem;
		      padding: 0.1rem 0.3rem !important; 
		}
		.i-icon{
			font-size: .5rem !important;
		}
		.icon-more{
			    color: #818181;
			    font-size: 0.32rem;
			    padding-left: 0.30rem;
			    padding-right: 0.10rem;
		}
	}
	
	@media  (orientation:landscape) {
		.block-title-background {
		  background: transparent;
		}
		.van-cell {
		  font-size: rpx(18) !important;
		  line-height: rpx(18) !important;;
		      padding: rpx(20) rpx(20) rpx(10) !important;; 
		}
		.i-icon{
			font-size: .5rem !important;
		}
		.icon-more{
			    color: #818181;
			    font-size: 0.32rem;
			    padding-left: 0.30rem;
			    padding-right: 0.10rem;
		}
	}
	

</style>