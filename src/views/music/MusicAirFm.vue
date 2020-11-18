<template>
	<section class="music-main-ctn">
		<abus-title :title="$t('title')"></abus-title>
		FM
		<section class="content-ctn">
			<div class="content-main-ctn">
			</div>
		</section>
	</section>
</template>
<i18n>
	{
		"zh":{
			"title":"FM",
			"favourites":"我的收藏",
			"airFm":"机上FM",
			"topRanks":"排名置顶",
			"popAlbum":"流行专辑"
		},
		"en":{
			"title":"FM",
			"favourites":"Favourites",
			"airFm":"Air Fm",
			"topRanks":"Top ranks",
			"popAlbum":"Pop Album"
		}
	}
</i18n>

<script lang="ts">
	import {Vue,Prop,Component} from 'vue-property-decorator';
	import AbusTitle from '../../components/AbusTitle.vue';
	import MusicService from '../../service/music';
	
	@Component({
		name:'MusicAirFm',
		components:{
			AbusTitle
		}
	})
	export default class MusicAirFm extends Vue {
		 private recomendList:Array<any> = [];
		 
		 private mounted(){
			
		 }
		
	}
</script>


<style lang="scss" scoped>
	.music-main-ctn{
		
	}
</style>
