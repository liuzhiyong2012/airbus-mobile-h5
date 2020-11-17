<template>
  <div class="abus-height">
	  <div class="lang-title">
		  <abus-title :title="$t('Language')" backRouteName="meIndex"></abus-title>
	  </div>
	  
    <div class="lang-box">
      <van-radio-group v-model="radio" checked-color="#00205B">
        <van-radio name="0" class="lang-cell" @click="changeEn">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">English</span>
          </template>
        </van-radio>
        <van-radio name="1" class="lang-cell" @click="changeZh">
          <template #icon="props">
            <svg class="icon icon-text" aria-hidden="true">
              <use v-if="props.checked" xlink:href="#icon-selected" />
              <use v-else xlink:href="#icon-unselected" />
            </svg>
            <span :class="[props.checked ? 'text-selected': 'text-unselected']">简体中文</span>
          </template>
        </van-radio>
      </van-radio-group>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			 "Language": "语言"
		},
		"en":{
			  "Language":"Language"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../../components/AbusTitle.vue';
@Component({
  name: 'Lang',
  components: {
    AbusTitle,
  },
})
export default class Lang extends Vue {
  private radio: string = '0';
  private mounted() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
      this.radio = '0';
    } else {
      this.$i18n.locale = 'zh';
      this.radio = '1';
    }
  }
  public changeEn() {
    this.$i18n.locale = 'en';
    localStorage.setItem('lang', 'en');
    this.$store.commit('changeLanguage', 'en');
  }
  public changeZh() {
    this.$i18n.locale = 'zh';
    localStorage.setItem('lang', 'zh');
    this.$store.commit('changeLanguage', 'zh');
  }
}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.abus-height{
				  .lang-title{
					  
				  }
				  
				  .lang-box {
				    padding: 0 0.3rem;
				    background-color: #fff;
				    .lang-cell {
				      padding: 0.3rem 0;
				    }
				    .text-selected {
				      padding: 0 0 0 0.3rem;
				      font-size: 0.32rem;
				      color: rgba(0, 32, 91, 1);
				      transition: all ease-in-out 0.3s;
				    }
				    .text-unselected {
				      padding: 0 0 0 0.2rem;
				      font-size: 0.32rem;
				      color: #999;
				      transition: all ease-in-out 0.3s;
				    }
				  }
				  .icon-text {
				    width: 0.24rem;
				    height: 0.24rem;
				  }
		}
	}
	
	@media  (orientation:landscape) {
		.abus-height{
			position: relative;
			padding-top:rpx(70);
				  .lang-title{
					 position: fixed; 
					 top:0;
					 left: 0;
					 width: 100%;
				  }
				  
				  .lang-box {
				    padding: 0 rpx(20);
					
				    background-color: #fff;
				    .lang-cell {
				      padding: rpx(20) 0;
				    }
				    .text-selected {
				      padding: 0 0 0 rpx(20);
				      font-size: rpx(16);
				      color: rgba(0, 32, 91, 1);
				      transition: all ease-in-out 0.3s;
				    }
				    .text-unselected {
				      padding: 0 0 0 rpx(20);
				      font-size: rpx(16);
				      color: #999;
				      transition: all ease-in-out 0.3s;
				    }
				  }
				  .icon-text {
				    width: rpx(12);
				    height: rpx(12);
				  }
		}
	}
	
	
	

</style>