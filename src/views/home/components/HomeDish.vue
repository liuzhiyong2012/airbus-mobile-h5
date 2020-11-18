<template>
  <div>
    <div class="abus-scroller-box home-dish-ctn" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
      <scroller>
        <div
          slot="list"
          v-for="(item, index) of recomendList"
          :key="index"
          @click="stepToDetail(item)"
        >
          <div class="s-box s-box-right" v-if="index+1 == recomendList.length">
            <div class="img-box">
              <div class="img">
                <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%" />
              </div>
            </div>
            <div class="name">{{item.Name}}</div>
            <div class="price">${{item.Price}}</div>
          </div>
          <div class="s-box" v-else>
            <div class="img-box">
              <div class="img">
                <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%" />
              </div>
            </div>
            <div class="name">{{item.Name}}</div>
            <div class="price">${{item.Price}}</div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Scroller from '@nutui/nutui/dist/packages/scroller/scroller.js'; // 加载构建后的JS
import '@nutui/nutui/dist/packages/scroller/scroller.css';
import DishService from '../../../service/dish';
Scroller.install(Vue);
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      recomendList: [],
      isHaveData: false,
      dishData: [
        {
          img: require('../images/food.png'),
          name: 'Pock rice',
          price: '10',
        },
        {
          img: require('../images/shopping.jpg'),
          name: 'Pock rice',
          price: '14',
        },
        {
          img: require('../images/food.png'),
          name: 'Pock ricePock ricePock rice',
          price: '10',
        },
        {
          img: require('../images/shopping.jpg'),
          name: 'Pock rice',
          price: '14',
        },
        {
          img: require('../images/food.png'),
          name: 'Pock rice',
          price: '10',
        },
        {
          img: require('../images/shopping.jpg'),
          name: 'Pock rice',
          price: '14',
        },
        {
          img: require('../images/food.png'),
          name: 'Pock rice',
          price: '10',
        },
        {
          img: require('../images/shopping.jpg'),
          name: 'Pock rice',
          price: '14',
        },
      ],
    };
  },
  created() {
    this.getDishesRecommendedList();
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  },
  methods: {
    stepToDetail(item) {
      var _this = this;
      if (item.Stocking > 0) {
        _this.$router.push({
          name: 'dishDetail',
          query: {
            id: item.Id,
          },
        });
      } else {
        if (localStorage.getItem('lang') == 'en') {
          _this.$toast('Stockout!');
        } else {
          _this.$toast('暂时缺货');
        }
      }
    },
    getDishesRecommendedList() {
      DishService.getDishesRecommendedList({}).then((res) => {
        this.isHaveData = true;
        this.recomendList = res.data.RecommendedDishes;

        this.recomendList.forEach((item, index) => {
          item.BannerImgPath =
            'http://172.16.125.11:8010/fcf29d23-6af0-45d5-a2e6-90ccc95d0457';
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
	
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.home-dish-ctn{
			.s-box {
			  float: left;
			  margin: 0 0 0 0.28rem;
			  border-radius: 0.08rem;
			  width: 1.6rem;
			  .img-box {
			    display: flex;
			    align-items: center;
			    width: 1.6rem;
			    height: 1.6rem;
			    text-align: center;
			    box-shadow: 0 0 0.08rem #efefef;
			    overflow: hidden;
			    .img {
			      width: 100%;
			      border-radius: 0.1rem;
			    }
			  }
			
			  .name {
			    line-height: 0.5rem;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    width: 100%;
			    height: 0.5rem;
			    color: rgb(51, 51, 51);
			  }
			  .price {
			    color: rgb(0, 32, 91);
			    font-size: 0.24rem;
			    font-weight: bold;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			  }
			}
			.s-box-right {
			  margin-right: 0.82rem;
			}
		}
	}
	
	@media  (orientation:landscape) {
		
			.home-dish-ctn{
				margin: 0 rpx(20);
                border-radius: rpx(4);
				padding:rpx(20);
				.s-box {
				  float: left;
				  margin: 0 rpx(28) 0 0;
				  border-radius: 0.08rem;
				  width: rpx(120);
				  .img-box {
				    display: flex;
				    align-items: center;
				    width: rpx(120);
				    height: rpx(120);
				    text-align: center;
				    box-shadow: 0 0 0.08rem #efefef;
					margin-bottom: rpx(6);
				    overflow: hidden;
				    .img {
				      width: 100%;
				      border-radius: 0.1rem;
				    }
				  }
				
				  .name {
				    line-height: rpx(16);
					font-size: rpx(14);
					margin-bottom: rpx(6);
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    width: 100%;
				    // height: 0.5rem;
				    color: rgb(51, 51, 51);
				  }
				  .price {
				    color: rgb(0, 32, 91);
				    line-height: rpx(12);
					font-size: rpx(12);
				    font-weight: bold;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				  }
				}
				.s-box-right {
				  margin-right: 0.82rem;
				}
			}
		
	}
	

</style>