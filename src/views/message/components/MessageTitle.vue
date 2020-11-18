<template>
  <section class="message-title-ctn">
    <div class="title-left-ctn" @click="back()">
      <!-- <i class="icon icon-back"></i> -->
      <svg class="icon icon-p" aria-hidden="true">
        <use xlink:href="#icon-back" />
      </svg>
    </div>
    <div class="title-center">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>

    <div class="title-right-ctn">
      <i class="icon icon-user" @click="stepTo('me')"></i>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({
  name: 'MessageTitle',
  components: {},
})
export default class MessageTitle extends Vue {
  public stepTo(page: any): void {
    this.$router.push({
      name: 'meIndex',
    });
  }
  public back(): void {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
	
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.message-title-ctn {
		  display: flex;
		  justify-content: space-between;
		  height: 0.4rem;
		  padding: 0.3rem;
		  align-items: center;
		  background: #ffffff;
		  .icon-p {
		    width: 0.3rem;
		    height: 0.3rem;
		  }
		  .title-left-ctn {
		    flex: 1;
		    display: flex;
		    align-items: center;
		  }
		
		  .title-center {
		    font-size: 0.38rem;
		    font-weight: bold;
		    color: rgba(51, 51, 51, 1);
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
		  }
		
		  .title-right-ctn {
		    flex: 1;
		    display: flex;
		    justify-content: flex-end;
		    align-items: center;
		
		    .icon-user {
		      font-size: 0.4rem;
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		
			.message-title-ctn {
			  display: flex;
			  justify-content: space-between;
			  height: rpx(20);
			  padding: rpx(18) rpx(20);
			  align-items: center;
			  background: #ffffff;
			  .icon-p {
			    width: rpx(24);
			    height: rpx(24);
			  }
			  .title-left-ctn {
			    flex: 1;
			    display: flex;
			    align-items: center;
			  }
			
			  .title-center {
			    font-size: rpx(20);
			    font-weight: bold;
			    color: rgba(51, 51, 51, 1);
			    display: flex;
			    align-items: center;
			    justify-content: space-between;
			  }
			
			  .title-right-ctn {
			    flex: 1;
			    display: flex;
			    justify-content: flex-end;
			    align-items: center;
			
			    .icon-user {
			      font-size: rpx(24);
			    }
			  }
			}
		
	}
	

</style>
