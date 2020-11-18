<template>
	<section class="music-icon-ctn">
		  <span class="bar-item" :class="{'bar-item1': playingStatus }" :style="{backgroundColor:color}"></span>
		  <span class="bar-item" :class="{'bar-item2': playingStatus }" :style="{backgroundColor:color}"></span>
		  <span class="bar-item" :class="{'bar-item3': playingStatus }" :style="{backgroundColor:color}"></span>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
	name: 'AbusMusicIcon',
	components: {
		
	} 
})
export default class AbusMusicIcon extends Vue {
	@Prop({
		default:'#00205b'
	})
	color:string;
	
	@Prop({
		type: Boolean,
		required: false, 
		default: true
	}) playingStatus!: boolean;
	@Watch("playingStatus",{ deep: true, immediate: true })
	playingStatusWatch(newVal: boolean, oldVal: boolean) {
		this.playingStatus = newVal;
	}
	
}
</script>

<style lang="scss" scoped>
	@keyframes up-and-down-middle {
	  10% {
	    height: 80%;
	  }
	  30% {
	    height: 70%;
	  }
	  60% {
	    height: 75%;
	  }
	  80% {
	    height: 65%;
	  }
	  100% {
	    height: 50%;
	  }
	}
	
	@keyframes up-and-down-aside {
	  10% {
	    height: 10%;
	  }
	  30% {
	    height: 60%;
	  }
	  60% {
	    height: 50%;
	  }
	  80% {
	    height: 30%;
	  }
	  100% {
	    height: 20%;
	  }
	}
	
.music-icon-ctn {
	    // background: rgba(255, 255, 255, 0.1);
	    width: 0.40rem;
	    height: 0.40rem;
	    border-radius: 0;
	    display: flex;
	    justify-content: space-between;
	    // align-items: flex-end;
	    padding: 0rem 0.04rem;
	    box-sizing: border-box;
		align-items: center;
		justify-content: space-around;
		
		.bar-item{
			&.bar-item1{
				height: 30%;
				-webkit-animation-delay: -0s;
				animation-delay: -0s;
				-webkit-animation: up-and-down-aside 1.3s ease infinite alternate;
				animation: up-and-down-aside 1.3s ease infinite alternate;
			}
			
			&.bar-item2{
				height: 70%;
				-webkit-animation-delay: -1.7s;
				animation-delay: -1.7s;
				-webkit-animation: up-and-down-middle 1.3s ease infinite alternate;
				animation: up-and-down-middle 1.3s ease infinite alternate;
			}
			
			&.bar-item3{
				height: 45%;
				-webkit-animation-delay: -2.0s;
				animation-delay: -2.0s;
				-webkit-animation: up-and-down-aside 1.3s ease infinite alternate;
				animation: up-and-down-aside 1.3s ease infinite alternate;
			}
			
			display: inline-block;
			background: #03225c;
			width: 0.05rem;
			border-radius: 0.02rem;
			height: 100%;
			    
			
		} 
}
</style>
