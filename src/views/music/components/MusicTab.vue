<template>
	<section class="music-tab-ctn">
		<div v-for="(item,index) in tabList" class="tab-item" :key="index" :class="{active:item.value == active}" @click="switchTab(item)">
			{{item.name}}
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
	import {Vue,Prop,Component} from 'vue-property-decorator';
	
	@Component({
		name:'MusicTab',
		components:{
			
		}
	})
	export default class MusicTab extends Vue{
		@Prop({
			default:'Song'
		})
		active:string;
		
		@Prop()
		tabList:string[];
		
		public switchTab(item):void{
			this.$emit('switch',item);
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.music-tab-ctn{
			height: 0.80rem;
			background: #ffffff;
			display: flex;
			align-items: center;
			
			.tab-item{
				position: relative;
				flex: 1;
				text-align: center;
				line-height: 0.80rem;
				font-size:0.30rem;
				font-family:Helvetica-Bold,Helvetica;
				font-weight:bold;
				color:rgba(0,32,91,1);
				line-height:0.80rem;
				
				&.active{
					&:after{
						content:'';
						position: absolute;
						width:0.42rem;
						height: 0.08rem;
						bottom: 0;
						left:50%;
						transform: translateX(-50%);
						background:rgba(0,32,91,1);
						border-radius:100px 100px 0px 0px;
					}
				}
			}
			
		}
	}
	
	@media  (orientation:landscape) {
		.music-tab-ctn{
			background: #ffffff;
			display: flex;
			align-items: center;
			
			.tab-item{
				position: relative;
				flex: 1;
				text-align: center;
				font-size:rpx(14);
				font-family:Helvetica-Bold,Helvetica;
				font-weight:bold;
				color:rgba(0,32,91,1);
				line-height:rpx(40);
				
				&.active{
					&:after{
						content:'';
						position: absolute;
						width:rpx(20);
						height: rpx(4);
						bottom: 0;
						left:50%;
						transform: translateX(-50%);
						background:rgba(0,32,91,1);
						border-radius:rpx(20) rpx(20) 0px 0px;
					}
				}
			}
			
		}
	}
	
	
	
	
</style>
