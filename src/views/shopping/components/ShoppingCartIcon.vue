<template>
  <div class="cardicon-ctn" @click="toCart()">
    <span v-show="cartLen > 0" class="cart-number">{{cartLen}}</span>
    <i class="icon icon-cart"></i>
  </div>
</template>

<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>

<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'CartIcon',
  components: {},
})
export default class DishCartIcon extends Vue {
  private get cartLen(): number {
    return this.$store.state.shopping.cartList.length;
  }

  private back(): void {
    this.$emit('back');
  }

  public toCart(): void {
    this.$emit('toCart');
  }
}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.cardicon-ctn {
		  position: relative;
		  width: 0.32rem;
		  height: 0.32rem;
		  .cart-number {
		    position: absolute;
		    right: 0;
		    bottom: 0;
		    width: 0.16rem;
		    height: 0.16rem;
		    line-height: 0.16rem;
		    font-size: 0.14rem;
		    color: #ffffff;
		    text-align: center;
		    border-radius: 50%;
		    background: #d40132;
		  }
		
		  .icon {
		    font-size: 0.32rem;
		    color: #011c57;
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.cardicon-ctn {
		  position: relative;
		  width: 0.32rem;
		  height: 0.32rem;
		  .cart-number {
		    position: absolute;
		    right: 0;
		    bottom: 0;
		    width: 0.16rem;
		    height: 0.16rem;
		    line-height: 0.16rem;
		    font-size: 0.14rem;
		    color: #ffffff;
		    text-align: center;
		    border-radius: 50%;
		    background: #d40132;
		  }
		
		  .icon {
		    font-size: 0.32rem;
		    color: #011c57;
		  }
		}
	}
</style>
