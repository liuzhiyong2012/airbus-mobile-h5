<template>
  <div class="abus-scroller-box" :style="{'backgroundColor': isHaveData?'#f8f8f8':'#fff'}">
    <scroller>
      <div slot="list" v-for="(item, index) of shoppingList" :key="index">
        <div
          @click="stepToDetail(item)"
          class="s-box s-box-right"
          v-if="index+1 == shoppingList.length"
        >
          <div class="img-box">
            <div class="img">
              <img  :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%"/>
            </div>
            
          </div>
          <div class="name">{{item.Name}}</div>
          <div class="price">
            ${{item.Price}}
            <!-- <span>${{item.Price+2}}</span> -->
          </div>
        </div>
        <div @click="stepToDetail(item)" class="s-box" v-else>
          <div class="img-box">
            <div class="img">
              <img  :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" width="100%"/>
            </div>
            
          </div>
          <div class="name">{{item.Name}}</div>
          <div class="price">
            ${{item.Price}}
            <!-- <span>${{item.Price+2}}</span> -->
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import Vue from 'vue';
import Scroller from '@nutui/nutui/dist/packages/scroller/scroller.js'; // 加载构建后的JS
import '@nutui/nutui/dist/packages/scroller/scroller.css';
import ShoppingService from '../../../service/shopping';
Scroller.install(Vue);
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      shoppingList: [],
      isHaveData: false
    };
  },
  created() {
    this.getShoppingList();
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  },
  methods: {
    getShoppingList() {
      var data = {
        type: '1'
      };
      ShoppingService.getShoppingList(data).then((res) => {
        this.shoppingList = res.data.Dishes;
        this.isHaveData = true;
      });
    },
    stepToDetail(item) {
      if (item.Stocking > 0) {
        this.$router.push({
          name: 'shoppingDetails',
          query: {
            id: item.Id,
          },
        });
      } else {
        if (localStorage.getItem('lang') == 'en') {
          this.$toast('Stockout!');
        } else {
          this.$toast('暂时缺货');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.abus-scroller-box{
		    margin: 0;
		    padding: .28rem 0;
		    border-radius: 0%;
		}
		.nut-hor-scroll{
		    background-color: #fff !important;
		}
		.nut-scroller{
		    background-color: #fff !important;
		    padding: .2rem 0;
		}
		.s-box {
		  float: left;
		  // height: 1.6rem;
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
		    color:rgba(0, 31, 91, 1);
		    font-size: 0.24rem;
		    font-weight: bold;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    span {
		      // display: inline-block;
		      margin-left: 0.1rem;
		      color: #ccc;
		      text-decoration: line-through;
		      font-size: 0.19rem;
		      font-weight: normal;
		    }
		  }
		}
		.s-box-right {
		  margin-right: 0.28rem;
		}
	}
	
	@media  (orientation:landscape) {
		.abus-scroller-box{
		    margin: 0;
		    border-radius: 0%;
			padding: 0 2.09rem;
		}
		.nut-hor-scroll{
		    background-color: #fff !important;
		}
		.nut-scroller{
		    background-color: #f7f7f7 !important;
		}
		.s-box {
		  float: left;
		  margin-right: 0.13rem;
		  // border-radius: 0.08rem;
		  width: 0.98rem;
		  height: 1.44rem;
		  background-color: #FFFFFF;
		  .img-box {
		    display: flex;
		    align-items: center;
		    width: 0.75rem;
		    height: 0.76rem;
			padding: 0.09rem 0.115rem 0 0.115rem;
		    text-align: center;
		    box-shadow: 0 0 0.08rem #efefef;
		    overflow: hidden;
		    .img {
		      width: 100%;
		      border-radius: 0.1rem;
		    }
		  }
		  .name {
		    line-height: 0.12rem;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    width: 0.83rem;
		    height: 0.24rem;
			font-size: 0.12rem;
			padding: 0 0.075rem;
		    color: rgb(51, 51, 51);
		  }
		  .price {
		    color:rgba(0, 31, 91, 1);
		    font-size: 0.15rem;
			padding-left: 0.075rem;
		    font-weight: bold;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    span {
		      // display: inline-block;
		      margin-left: 0.1rem;
		      color: #ccc;
		      text-decoration: line-through;
		      font-size: 0.19rem;
		      font-weight: normal;
		    }
		  }
		}
		.s-box-right {
		  margin-right: 0.28rem;
		}
	}
</style>