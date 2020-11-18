<template>
  <div class="abus-height">
    <abus-title :title="$t('title')" backRouteName="shopping"></abus-title>
    <van-search v-model="value"  :placeholder="$t('Search')" @search="getShoppingList"/>
    <div v-if="haveList" class="goods-box">
      <div class="goods-item" v-for="(item,i) in searchData" :key="i">
        <div class="goods" v-if="item.Stocking != 0">
          <div class="goods-img" @click="stepToDetail(item)">
            <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" />
          </div>
          <div class="price">${{item.Price}}</div>
          <div class="name">{{item.Name}}</div>
          <div class="qty">
            {{$t('QTY')}} {{item.Stocking || '--'}}
            <span class="buy" @click="stepToDetail(item)">{{$t('Buy')}}</span>
          </div>
        </div>
        <div class="goods" v-else>
          <div class="goods-img" @click="showToast">
            <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" />
          </div>
          <div class="price">${{item.Price}}</div>
          <div class="name">{{item.Name}}</div>
          <div class="qty">
            {{$t('OutOfStock')}}
            <span class="buy" @click="showToast">{{$t('Buy')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="goods-box no-list">{{$t('noHaveList')}}</div>
  </div>
</template>
<i18n>
{
	"zh":{
	    "title":"商品搜索",
        "Buy":"购买",
        "OutOfStock":"缺货",
        "Search":"请输入搜索关键词",
        "noHaveList": "暂无搜索数据",
        "QTY":"剩余量"
	},
	"en":{
		"title":"Shopping Search",
        "Buy":"Buy",
        "OutOfStock":"Out of stock",
        "Search":"Please enter search keywords",
        "noHaveList": "No search data",
        "QTY":"QTY"
	}
}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../../components/AbusTitle.vue';
import ShoppingService from '../../../service/shopping';
@Component({
  name: 'ShoppingSearch',
  components: {
    AbusTitle,
  },
})
export default class ShoppingSearch extends Vue {
  private haveList: boolean = false;
  private searchData: Array<any> = []
  private value: string = ''
  private mounted() {
      
  }
  private getShoppingList(value) {
    var data = { name: value };
    ShoppingService.getShoppingList(data).then((res: any) => {
      if(res.code == 200){
          this.searchData = res.data.Dishes;
          if(res.data.Dishes.length >0){
              this.haveList = true;
          }else{
              this.haveList = false;
          }
      }

      //   Vue.set(this.options1[0], "data", res.data.Dishes);
    });
  }
  // 点击跳转详情页
  private stepToDetail(item: any) {
    this.$router.push({
      name: 'shoppingDetails',
      query: {
        id: item.Id,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.no-list {
		  align-items: center;
		  line-height: 2rem;
		  justify-content: center;
		}
		.goods-box {
		  display: flex;
		  flex-wrap: wrap;
		  padding: 0.2rem 0 0 0;
		
		  .goods-item {
		    box-sizing: border-box;
		    width: 50%;
		    padding: 0 0.13rem 0.3rem 0.3rem;
		    .goods {
		      width: 100%;
		      background: #fff;
		      border-radius: 0.08rem;
		      box-shadow: 0 0 0.1rem #efefef;
		      .goods-img {
		        display: flex;
		        height: 3.5rem;
		        align-items: center;
		        background-color: #fafafa;
		        overflow: hidden;
		        img {
		          width: 100%;
		        }
		      }
		      .price {
		        padding: 0 0.2rem;
		        font-size: 0.36rem;
		        color: #001f5b;
		        font-weight: bold;
		      }
		      .name {
		        padding: 0.14rem 0.2rem;
		        color: #000;
		        text-overflow: -o-ellipsis-lastline;
		        overflow: hidden;
		        text-overflow: ellipsis;
		        display: -webkit-box;
		        -webkit-line-clamp: 2;
		        -webkit-box-orient: vertical;
		        height: 0.7rem;
		      }
		      .qty {
		        padding: 0 0.2rem 0.3rem 0.2rem;
		        font-size: 0.24rem !important;
		        color: #999;
		        position: relative;
		        .buy {
		          position: absolute;
		          right: 0.2rem;
		          bottom: 0.2rem;
		          width: 1.2rem;
		          height: 0.5rem;
		          background: rgba(0, 31, 91, 1);
		          border-radius: 0.25rem;
		          text-align: center;
		          line-height: 0.5rem;
		          color: #fff;
		        }
		      }
		    }
		  }
		  :nth-child(even) {
		    padding: 0 0.3rem 0.3rem 0.13rem;
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.van-search{
			height: 0.4rem !important;
			box-sizing: border-box !important;
			padding-left: 0.2rem;
		}
		.van-icon-search {
			width: 0.2rem !important;
			height: 0.2rem !important;
		}
		.icon-size {
			width: 0.2rem;
			height: 0.2rem;
		}
		.van-cell__value{
			font-size: 0.16rem;
		}
		.no-list {
		  align-items: center;
		  line-height: 2rem;
		  justify-content: center;
		}
		.goods-box {
		  display: flex;
		  flex-wrap: wrap;
		  padding: 0.2rem 0 0 0;
		
		  .goods-item {
		    box-sizing: border-box;
		    width: 50%;
		    padding: 0 0.13rem 0.3rem 0.3rem;
		    .goods {
		      width: 100%;
		      background: #fff;
		      border-radius: 0.08rem;
		      box-shadow: 0 0 0.1rem #efefef;
		      .goods-img {
		        display: flex;
		        height: 3.5rem;
		        align-items: center;
		        background-color: #fafafa;
		        overflow: hidden;
		        img {
		          width: 100%;
		        }
		      }
		      .price {
		        padding: 0 0.2rem;
		        font-size: 0.36rem;
		        color: #001f5b;
		        font-weight: bold;
		      }
		      .name {
		        padding: 0.14rem 0.2rem;
		        color: #000;
		        text-overflow: -o-ellipsis-lastline;
		        overflow: hidden;
		        text-overflow: ellipsis;
		        display: -webkit-box;
		        -webkit-line-clamp: 2;
		        -webkit-box-orient: vertical;
		        height: 0.7rem;
		      }
		      .qty {
		        padding: 0 0.2rem 0.3rem 0.2rem;
		        font-size: 0.24rem !important;
		        color: #999;
		        position: relative;
		        .buy {
		          position: absolute;
		          right: 0.2rem;
		          bottom: 0.2rem;
		          width: 1.2rem;
		          height: 0.5rem;
		          background: rgba(0, 31, 91, 1);
		          border-radius: 0.25rem;
		          text-align: center;
		          line-height: 0.5rem;
		          color: #fff;
		        }
		      }
		    }
		  }
		  :nth-child(even) {
		    padding: 0 0.3rem 0.3rem 0.13rem;
		  }
		}
	}
</style>