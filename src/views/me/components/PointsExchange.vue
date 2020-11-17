<template>
<div class="abus-height exchange-ctn">
	<div class="exchange-title">
		<abus-title :title="$t('title')" backRouteName="meIndex"></abus-title>
	</div>
  
  <div v-if="isHaveList" class="goods-box">
    <div class="goods-item" v-for="(item,index) in shoppingList" :key="index">
      <div class="goods"  @click="stepToDetail(item)">
        <div class="goods-img">
          <img :src="item.SampleImgPath|addBaseUrl" :alt="item.Name" />
        </div>
        <!-- <div class="price">${{item.Price}}</div> -->
        <div class="name">{{item.Name}}</div>
        <div class="qty">
          {{$t('QTY')}} {{item.Stocking}}
          <span class="buy">
            {{$t('Point')}}
            <i class="point">{{item.Price}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="goods-box box-text">
    {{$t('noList')}}
  </div>
</div>
</template>
<i18n>
	{
		"zh":{
			"title":"积分兑换",
      "QTY":"剩余量",
      "noList": "暂无数据",
      "Point":"积分"
		},
		"en":{
			"title":"Points exchange",
      "QTY":"QTY",
      "noList": "No data available",
      "Point":"Point"
		}
	}
</i18n>
<script lang="ts">
import AbusTitle from '../../../components/AbusTitle.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ShoppingService from '../../../service/shopping';
// import Banner from "@/components/banner";
@Component({
  name: 'Shopping',
  components: {
    AbusTitle
  },
})
export default class ShoppingIndex extends Vue {
  private recomendList: Array<any> = [];
  private shoppingList: Array<any> = [];
  private isHaveList: boolean = false
  private options1: Array<any> = [];

  private created() {
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
    // this.getShoppingRecommendedList();
    this.getShoppingList();
    this.options1 = [
      { text: 'Jewellery', value: 1 },
      { text: 'Jewellery', value: 1 },
      { text: 'Jewellery', value: 1 },
    ];
  }
// 点击跳转详情页
  private stepToDetail(item:any){
	  this.$router.push({
		  name:'pointsDetails',
		  params:{
			  pointsInfo:item
		  }
	  });
	  
  }
  // BannerImgPath: "http://172.16.125.11:8081/133b9f0b-dfa4-4cd9-8ebb-958c44bfbf26"
  // Id: "e2dc9e2c-6733-e911-b13c-96af276fddb7"
  // Name: "素食拼盘"
  // Price: 32
  // Remark: null
  // SampleImgPath: "http://172.16.125.11:8081/eb8ea336-9434-4295-8215-3821c76baba8"
  // Status: 0
  // Stocking: 0
  // category: "食物"

  private getShoppingList() {
    let data = {
      type: 2 // 1或者''是默认普通商品，2是积分商品
    };
    ShoppingService.getShoppingList(data).then((res: any) => {
      if(res.code == 200){
        this.shoppingList = res.data.Dishes;
        if(this.shoppingList.length > 0){
          this.isHaveList = true;
        }else {
          this.isHaveList = false;
        }
      }

      // this.shoppingList.forEach((item, index) => {
      //   item.GoodsImgPath =
      //     "http://172.16.125.11:8010/7873f0d1-ac22-e911-bd22-c4209d3e3b89";
      // });
    });
  }
}
</script>

<style lang="scss" scoped>
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.exchange-ctn{
			position: relative;
			padding-top:1rem;
			.exchange-title{
				position: fixed;
				top: 0;
				left:0;
				width:100%;
				z-index: 100;
			}
			.goods-box {
			  margin: 0.3rem 0 0 0;
			  display: flex;
			  flex-wrap: wrap;
			  .goods-item {
			    box-sizing: border-box;
			    width: 50%;
			    padding: 0 0.13rem 0.3rem 0.3rem;
			    .goods {
			      width: 100%;
			      background: #fff;
			      border-radius: 0.08rem;
			      box-shadow: 0 0 0.1rem #efefef;
			      overflow: hidden;
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
			        padding:  0.1rem 0.2rem 0;
			        font-size: 0.36rem;
			        color: #001f5b;
			        font-weight: bold;
			      }
			      .name {
			        padding: 0.14rem 0.2rem;
			        font-family: Helvetica;
			        color: #000;
			        text-overflow: -o-ellipsis-lastline;
			        overflow: hidden;
			        text-overflow: ellipsis;
			        display: -webkit-box;
			        -webkit-line-clamp: 1;
			        -webkit-box-orient: vertical;
			        height: 0.4rem;
			      }
			      .qty {
			        padding: 0 0.2rem 0.3rem 0.2rem;
			        font-size: .28rem !important;
			        color: #999;
			        position: relative;
			        .buy {
			          position: absolute;
			          right: 0.2rem;
			          bottom: 0.2rem;
			          //   width: 1.2rem;
			          height: 0.5rem;
			          border-radius: 0.25rem;
			          text-align: center;
			          line-height: 0.5rem;
			          color: #999;
			          .point {
			            margin: 0 0 0 0.1rem;
			            font-size: 0.36rem;
			            font-weight: bold;
			            color: rgba(0, 31, 91, 1);
			          }
			        }
			      }
			    }
			  }
			  :nth-child(even) {
			    padding: 0 0.3rem 0.3rem 0.13rem;
			  }
			}
			.box-text{
			  display: flex;
			  width: 100%;
			  line-height: 1rem;
			  justify-content: center;
			}
		}
		
	}
	
	@media  (orientation:landscape) {
		.exchange-ctn{
			position: relative;
			padding-top:0.7rem;
			.exchange-title{
				position: fixed;
				top: 0;
				left:0;
				width:100%;
				z-index: 100;
			}
			.goods-box {
			  // margin: 0.3rem 0 0 0;
			  /* display: flex; */
			  // flex-wrap: wrap;
			  text-align: center;
			  .goods-item {
				  display: inline-block;
			    // box-sizing: border-box;
			    width: rpx(200);
			    padding:rpx(8);
				
			    .goods {
					text-align: left;
			      width: 100%;
			      background: #fff;
			      border-radius: rpx(4);
			      box-shadow: 0 0 0.1rem #efefef;
			      overflow: hidden;
			      .goods-img {
			        display: flex;
			        height: rpx(180);
			        align-items: center;
			        background-color: #fafafa;
			        overflow: hidden;
			        img {
			          width: 100%;
			        }
			      }
			
			      .price {
			        padding:  0.1rem 0.2rem 0;
			        font-size: 0.36rem;
			        color: #001f5b;
			        font-weight: bold;
			      }
			      .name {
			        padding: rpx(7) rpx(14);
			        font-family: Helvetica;
			        color: #000;
			        text-overflow: -o-ellipsis-lastline;
			        overflow: hidden;
			        text-overflow: ellipsis;
			        display: -webkit-box;
			        -webkit-line-clamp: 1;
			        -webkit-box-orient: vertical;
					font-size: rpx(14);
			        // height: 0.4rem;
			      }
			      .qty {
			        padding: 0 rpx(14) rpx(18);
			        font-size: rpx(12) !important;
			        color: #999;
			        position: relative;
			        .buy {
			         position: absolute;
			             right: rpx(14);
			             /* bottom: 0.2rem; */
			             /* height: 0.5rem; */
			             border-radius: 0.25rem;
			             text-align: center;
			             line-height: rpx(12);
			             color: #999;
			             font-size: rpx(12);
			          .point {
			            // margin: 0 0 0 0.1rem;
			            font-size: rpx(18) !important;
			            font-weight: bold;
			            color: rgba(0, 31, 91, 1);
			          }
			        }
			      }
			    }
			  }
			/*  :nth-child(even) {
			    padding: 0 0.3rem 0.3rem 0.13rem;
			  } */
			}
			.box-text{
			  display: flex;
			  width: 100%;
			  line-height: 1rem;
			  justify-content: center;
			}
		}
		
	}
	

</style>