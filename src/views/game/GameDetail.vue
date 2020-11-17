<template>
  <div class="game-detail-ctn">
        <abus-title :title="$t('title')" backRouteName="game">
			<div slot style="width: 0.3rem"></div>
        </abus-title>
		
		<div class="content-ctn">
			<iframe class="game-cotent" :src="gameUrl" frameborder="0"></iframe>
		</div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"游戏详情"
		},
		"en":{
			"title":"Game Detail"
		}
	}
</i18n>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator';
	
	import AbusTitle from '../../components/AbusTitle.vue'; 
	
	@Component({
		name: 'GameDetail',
		components: {
			AbusTitle
		}
	})
	export default class GameDetail extends Vue {
		@Prop()
		curUserId: string;
		
		gameUrl:string = null;

		async mounted() {
			this.gameUrl = process.env.VUE_APP_HOST + this.$route.query.gameUrl;
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.game-detail-ctn{
			position: relative;
			.content-ctn{
				position: fixed;
				   
				    top: 1.00rem;
				    left: 0;
				    bottom: 0;
					right: 0;
					
				.game-cotent{
					position: relative;
					width: 100%;
					height: 100%;
					
				}
			}
		}
		
	}
	
	@media  (orientation:landscape) {
		.game-detail-ctn{
			position: relative;
			.content-ctn{
				position: fixed;
				    top: rpx(56);
				    left: 0;
				    bottom: 0;
					right: 0;
					
				.game-cotent{
					position: relative;
					width: 100%;
					height: 100%;
					
				}
			}
		}
		
	}
	

</style>
