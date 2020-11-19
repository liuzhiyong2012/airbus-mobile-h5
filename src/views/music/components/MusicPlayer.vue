<template>
	<transition name="small-music-fade">
		<section class="music-play-ctn" @click="toUp" >
			<div class="song-img" :style="{backgroundImage:	`url(${coverImage})`}" :class="{'abus-animat-rotate':playing}"></div>
			<div class="song-name">{{currentSong.name}}</div>
			<div class="play-ctn" @click.stop="togglePlaying">
				<i v-if="!playing" class="icon icon-play"></i>
				<i v-if="playing" class="icon icon-pause"></i>
			</div>
			<div class="play-ctn-close" @click.stop="closePlaying">
				<!-- <i class="icon icon-close"></i> -->
				<i class="icon icon-select_3"></i> 
			</div>
		</section>
	</transition>
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
		name:'MusicPlayer',
		components:{
			
		}
	})
	export default class MusicPlayer extends Vue{
		@Prop({
			default:function(){
				return {};
			}
		})
		currentSong:any;
		
		@Prop()
		playing:boolean = false;
		
		private get coverImage():string{
			if(this.currentSong.image){
				return this.currentSong.image;
			}else{
				return require('../images/default_cover.png');
			}
			
		}
		
		private togglePlaying(){
			this.$emit('togglePlaying');
		}

		private closePlaying(){
			this.$emit('closePlaying')
		}
		
		private playListClick(){
			this.$emit('playListClick');
		}
		
		private toUp(){
			this.$emit('toUp');
		}
		
		// private togglePlaying
		/* @click.stop="togglePlaying"
		@click.stop="playListClick" */
		
	}
</script>

<style lang="scss" scoped>
	
	.music-play-ctn{
		position: fixed;
		bottom: 0;
		z-index: 120;
		width: 100%;
		height: 0.60rem;
		background:#ffffff;
		// display: flex;
		box-sizing: border-box;
		padding: 0.16rem 0 0.28rem 0;
		padding-left:1.52rem;
		padding-right:1.52rem;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px -11px 25px 0px rgba(36,37,51,0.06);
		
		.song-img{
			position: absolute;
			top:-0.20rem;
			left:0.30rem ;
			border-radius: 50%;
			border:0.06rem solid #ffffff; 
			width: 0.50rem;
			height: 0.50rem;
			// background: blue;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			
			
		}
		.song-name{
			font-size:0.16rem;
			font-family:Helvetica-Bold,Helvetica;
			font-weight:bold;
			color:rgba(46,46,46,1);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			line-height:0.24rem;
			
		}
		.play-ctn{
			position: absolute;
			top:0.20rem;
			right: 0.90rem;
			.icon{
				line-height: 0.25rem;
				font-size: 0.24rem;
			}
		}

		.play-ctn-close{
			position: absolute;
			top:0.16rem;
			right: 0.30rem;
			.icon{
				line-height: 0.25rem;
				// font-size: 0.48rem;
				font-size: 0.14rem;
				background: #00205b;
				border-radius: 50%;
				padding: 0.05rem;
				color: #fff;
			}
		}
	}


	.small-music-fade-enter {
		transform: translate3d(0, 100%, 0);
		opacity: 0;
	}
	.small-music-fade-leave-to {
		transform: translate3d(0, 100%, 0);
	}
	.small-music-fade-leave {
		opacity: 1;
	}
	.small-music-fade-enter-active,
	.small-music-fade-leave-active {
		transition: all 0.3s;
	}
	
	
</style>
