<template>
	<div class="abus-height shopping-ctn">
		<van-sticky>
			<abus-title :title="$t('title')" backRouteName="home"><cart-icon @toCart="stepToCart()"></cart-icon></abus-title>
		</van-sticky>

		<van-search :placeholder="$t('Search')" class="search-ctn" @focus="stepToSearch" />
		
		<div class="content-ctn">
			<div class="banner">
				<shopping-item />
				<div v-if="isShowMenu" :class="[isActive ? 'menu active' : 'menu']">
					<div v-if="isFilter" @click="clickIsFilter">
						Price
						<svg class="icon i-icon icon-size" aria-hidden="true"><use xlink:href="#icon-priceCopy2" /></svg>
					</div>
					<div v-else @click="clickIsFilter">
						Price
						<svg class="icon i-icon icon-size" aria-hidden="true"><use xlink:href="#icon-priceCopy" /></svg>
					</div>
				</div>
			</div>
			<div class="shopping-box">
				<van-tabs
					id="ibox"
					class="f1"
					line-width="20"
					line-height="4"
					color="rgba(0,0,0,0)"
					title-active-color="#2E2E2E"
					title-inactive-color="#B5B6B8"
					animated
					sticky
					@click="getGoodsList"
				>
					<van-tab v-for="(item, index) in options1" :title="item.Category" :name="item.Id" :key="index" class="vant-tab">
						<div class="goods-box">
							<div class="goods-item" v-for="(item, i) in options1[index].data" :key="i">
								<div class="goods" v-if="item.Stocking != 0">
									<div class="goods-img" @click="stepToDetail(item)"><img :src="item.SampleImgPath | addBaseUrl" :alt="item.Name" /></div>
									<div class="price">${{ item.Price }}</div>
									<div class="name">{{ item.Name }}</div>
									<div class="qty">
										{{ $t('QTY') }} {{ item.Stocking }}
										<span class="buy" @click="stepToDetail(item)">{{ $t('Buy') }}</span>
									</div>
								</div>
								<div class="goods" v-else>
									<div class="goods-img" @click="showToast"><img :src="item.SampleImgPath | addBaseUrl" :alt="item.Name" /></div>
									<div class="price">${{ item.Price }}</div>
									<div class="name">{{ item.Name }}</div>
									<div class="qty">
										{{ $t('OutOfStock') }}
										<span class="buy" @click="showToast">{{ $t('Buy') }}</span>
									</div>
								</div>
							</div>
						</div>
					</van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
					<van-tab disabled></van-tab>
				</van-tabs>
			</div>
		</div>
		
	</div>
</template>
<i18n>
	{
		"zh":{
			"title":"机上购物",
      "Buy":"购买",
      "OutOfStock":"缺货",
      "Search":"请输入搜索关键词",
      "QTY":"剩余量"
		},
		"en":{
			"title":"Shopping",
      "Buy":"Buy",
      "OutOfStock":"Out of stock",
      "Search":"Please enter search keywords",
      "QTY":"QTY"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DishService from '../../service/shopping';
import ShoppingService from '../../service/shopping';
import AbusTitle from '../../components/AbusTitle.vue';
import CartIcon from './components/ShoppingCartIcon.vue';
import UrlUtils from '../../utils/url-utils';
import ShoppingItem from './components/ShoppingItem.vue';

@Component({
	name: 'Shopping',
	components: {
		AbusTitle,
		CartIcon,
		ShoppingItem
	}
})
export default class ShoppingIndex extends Vue {
	private recomendList: Array<any> = [];
	private shoppingList: Array<any> = [];
	private options1: Array<any> = [];
	private tapIndex: any = '1';
	private categoryId: any = '';
	private isActive: boolean = false;
	private isShowMenu: boolean = true;
	private isNewest: boolean = false;
	private isFilter: boolean = false;
	private isShowFilter: boolean = false;
	private filterInfo: string = 'Price';
	private listDesc: string = 'Desc';
	private listAsc: string = 'Asc';

	private created() {
		// this.getShoppingRecommendedList();
		this.getShoppingCategory();
	}
	private mounted() {
		if (localStorage.getItem('lang') == 'en') {
			this.$i18n.locale = 'en';
		} else {
			this.$i18n.locale = 'zh';
		}
		document.addEventListener('scroll', this.handleScroll);
		var object = document.getElementById('ibox');
	}
	private beforeDestroy() {
		document.removeEventListener('scroll', this.handleScroll);
	}
	private showToast() {
		this.$toast(this.$i18n.t('OutOfStock'));
	}
	public stepToCart(): void {
		this.$router.push({
			name: 'shoppingCart'
		});
	}
	public stepToSearch(): void {
		this.$router.push({
			name: 'shoppingSearch'
		});
	}
	private getShoppingCategory() {
		ShoppingService.getShoppingCategory().then((res: any) => {
			// CreatedAt: 1550707757
			// Id: "1"
			// category: "珠宝首饰"
			if (res.code == 200) {
				this.options1 = res.data;
				this.categoryId = this.options1[0].Id;
				this.getShoppingList();
			}
		});
	}
	// 点击弹出筛选
	public clickShowFilter() {
		this.isShowFilter = !this.isShowFilter;
	}
	// 点击筛选
	public changeVal(e: any) {
		this.isShowFilter = false;
		this.filterInfo = e.target.innerText;
		this.getShoppingListFilter();
	}
	// public clickIsNewest() {  
	//   this.isNewest = !this.isNewest;
	// }
	// 点击升降序
	public clickIsFilter() {
		this.isFilter = !this.isFilter;
		this.getShoppingListFilter();
	}

	// 首次获取
	private getShoppingList() {
		var data = { category: this.categoryId };
		// var data = { Category: "1" };
		ShoppingService.getShoppingList(data).then((res: any) => {
			Vue.set(this.options1[0], 'data', res.data.Dishes);
		});
	}
	// 点击Tap切换获取
	private getGoodsList(name: any, title: any) {
		this.tapIndex = 0;
		for (let i = 0; i < this.options1.length; i++) {
			if (this.options1[i].Id == name) {
				break;
			}
			this.tapIndex += 1;
		}

		this.categoryId = name;
		this.getShoppingListFilter();
	}
	// 获取筛选后列表
	public getShoppingListFilter() {
		var data = {
			orderName: this.filterInfo,
			orderFlag: this.isFilter ? this.listDesc : this.listAsc,
			category: this.categoryId
		};
		ShoppingService.getShoppingList(data).then((res: any) => {
			Vue.set(this.options1[this.tapIndex], 'data', res.data.Dishes);
		});
	}
	// 点击跳转详情页
	private stepToDetail(item: any) {
		this.$router.push({
			name: 'shoppingDetails',
			query: {
				id: item.Id
			}
		});
	}
	private getShoppingRecommendedList() {
		ShoppingService.getShoppingRecommendedList({}).then((res: any) => {
			if (res.code == 200) {
				// this.isShowMenu = true;
				this.recomendList = res.data.RecommendedShopping;
				this.recomendList.forEach((item: any, index: any) => {
					item.CoverImgUrl = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.BannerImgPath));
				});
			}
		});
	}

	private handleScroll() {
		let object: any = document.getElementById('ibox');
		let rectObject = object.getBoundingClientRect().top;
		if (rectObject <= 0) {
			this.isActive = true;
		} else {
			this.isActive = false;
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/responsive.scss';

@media (orientation: portrait) {
	.shopping-recomend-item {
	  position: relative;
	  width: 100%;
	  height: 4rem;
	  .shopping-recomend-img {
	    width: 100%;
	    height: 100%;
	    background-size: contain;
	    background-position: center center;
	    background-repeat: no-repeat;
	    background-size: 100%;
	    background-color: #fff;
	  }
	}
	.f1 {
	  position: relative;
	  /deep/ .van-tab {
	    line-height: 0.4rem;
	  }
	  /deep/ .van-tab__text--ellipsis {
	    font-size: 0.28rem !important;
	  }
	}
	.van-icon-search {
	  width: 0.4rem !important;
	  height: 0.4rem !important;
	}
	.icon-size{
	  width: .3rem;
	  height: .3rem;
	}
	.menu {
	  box-sizing: border-box;
	  // padding: 10px 0;
	  position: absolute;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  right: 0;
	  width: 22%;
	  height: 0.88rem;
	  line-height: 0.88rem;
	  // background-color: #fff;
	  z-index: 9999;
	  box-shadow: -0.1rem 0 0.2rem rgba(0, 0, 0, 0.05);
	  text-align: center;
	  color: rgb(181, 182, 184);
	  background: linear-gradient(
	    rgba(255, 255, 255, 0.7),
	    #fff,
	    rgba(255, 255, 255, 0.7)
	  );
	  // background: linear-gradient(to left, #fff, rgba(255,255,255,.7));
	  .wap-menu {
	    font-size: 0.48rem !important;
	  }
	}
	.menu.active {
	  position: fixed;
	  top: 0;
	  right: 0;
	}
	.search-ctn{
		padding:0 rpx(20);
	}
	
	.content-ctn{
		
		.banner {
		  position: relative;
		  width: 100%;
		  min-height: 2.5rem;
		}
		.shopping-box {
		  width: 100%;
		  .nav-menu {
		    width: 1rem;
		    height: 1rem;
		  }
		}
	}
	
	
	
	.van-tabs__wrap--scrollable .van-tabs__nav {
	  padding-right: 1rem;
	}
	.filter {
	  position: relative;
	  padding: 0.3rem;
	  display: flex;
	  justify-content: space-between;
	  color: #333;
	  box-sizing: border-box;
	  height: 1rem;
	  line-height: 0.4rem;
	  .i-icon {
	    width: 0.2rem;
	    height: 0.2rem;
	    padding: 0.1rem 0 0.05rem;
	    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
	  }
	  .icon-up {
	    transform: rotate(-180deg);
	    padding: 0.05rem 0 0;
	  }
	  .f-box {
	    display: none;
	    position: absolute;
	    left: 0;
	    top: 1rem;
	    width: 100%;
	    &.active {
	      display: block;
	    }
	  }
	  .van-cell {
	    padding: 0.2rem 0.3rem !important;
	    font-size: 0.3rem !important;
	    color: #666 !important;
	  }
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
	.filter-box {
	  font-size: 0.26rem;
	  font-weight: 400;
	  color: rgba(46, 46, 46, 1);
	  line-height: 0.8rem;
	  position: relative;
	  padding: 0 0.3rem;
	  width: 100%;
	  height: 0.8rem;
	}
}

@media (orientation: landscape) {
	.shopping-recomend-item {
	  position: relative;
	  width: 100%;
	  height: 4rem;
	  .shopping-recomend-img {
	    width: 100%;
	    height: 100%;
	    background-size: contain;
	    background-position: center center;
	    background-repeat: no-repeat;
	    background-size: 100%;
	    background-color: #fff;
	  }
	}
	
	/deep/  .van-tabs--line .van-tabs__wrap {
			 height: rpx(56) !important;
	}
	.f1 {
	  position: relative;
	  /deep/ .van-tab {
	    line-height: rpx(56);
	  }
	        
	 /deep/  .van-tabs--line .van-tabs__wrap {
		 height: rpx(56) !important;
	 }
	
	  /deep/ .van-tab__text--ellipsis {
	    font-size:rpx(14) !important;
	  }
	}
	.van-icon-search {
	  width: 0.4rem !important;
	  height: 0.4rem !important;
	}
	.icon-size{
	  width: rpx(20);
	  height: rpx(20);
	  position: relative;
	  top:rpx(6);
	}
	.menu {
	  box-sizing: border-box;
	  // padding: 10px 0;
	  position: absolute;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  right: 0;
	 padding:0 rpx(12);
	 font-size: rpx(14);
	  height: rpx(56);
	  line-height: rpx(56);
	  // background-color: #fff;
	  z-index: 9999;
	  box-shadow: -0.1rem 0 0.2rem rgba(0, 0, 0, 0.05);
	  text-align: center;
	  color: rgb(181, 182, 184);
	  background: linear-gradient(
	    rgba(255, 255, 255, 0.7),
	    #fff,
	    rgba(255, 255, 255, 0.7)
	  );
	  // background: linear-gradient(to left, #fff, rgba(255,255,255,.7));
	  .wap-menu {
	    font-size: 0.48rem !important;
	  }
	}
	.menu.active {
	  position: fixed;
	  top: 0;
	  right: 0;
	}
	
	.search-ctn{
		// padding:0 rpx(20);
	}
	
	.content-ctn{
		width: rpx(544);
		margin:auto;
		margin-top:rpx(12);
		.banner {
		  position: relative;
		  width: 100%;
		  // min-height: 2.5rem;
		  
		  .abus-scroller-box{
			  margin: 0 !important;
			  padding:0 !important;
		  }
		}
		.shopping-box {
		  width: 100%;
		  .nav-menu {
		    width: 1rem;
		    height: 1rem;
		  }
		}
	}
	
	
	
	.van-tabs__wrap--scrollable .van-tabs__nav {
	  padding-right: 1rem;
	}
	.filter {
	  position: relative;
	  padding: 0.3rem;
	  display: flex;
	  justify-content: space-between;
	  color: #333;
	  box-sizing: border-box;
	  height: 1rem;
	  line-height: 0.4rem;
	  .i-icon {
	    width: 0.2rem;
	    height: 0.2rem;
	    padding: 0.1rem 0 0.05rem;
	    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
	  }
	  .icon-up {
	    transform: rotate(-180deg);
	    padding: 0.05rem 0 0;
	  }
	  .f-box {
	    display: none;
	    position: absolute;
	    left: 0;
	    top: 1rem;
	    width: 100%;
	    &.active {
	      display: block;
	    }
	  }
	  .van-cell {
	    padding: 0.2rem 0.3rem !important;
	    font-size: 0.3rem !important;
	    color: #666 !important;
	  }
	}
	.goods-box {
	  display: flex;
	  flex-wrap: wrap;
	  padding: 0.2rem 0 0 0;
	  	padding-bottom: rpx(60);
	  .goods-item {
	    box-sizing: border-box;
		overflow: hidden;
		padding:0;
	    width:rpx(172);
		height: rpx(274);
		float: left;
		&:nth-child(3n - 2){
			margin-right: rpx(12);
		}
		&:nth-child(3n - 1){
			margin-right: rpx(12);
		}
		&:nth-child(3n){
			margin-right: 0;
		}
		
	    // width: 50%;
	    // padding: 0 0.13rem 0.3rem 0.3rem;
	    .goods {
	      width: 100%;
	      background: #fff;
	      border-radius: 0.08rem;
	      box-shadow: 0 0 0.1rem #efefef;
	      .goods-img {
	        display: flex;
	        height: rpx(156);
	        align-items: center;
	        background-color: #fafafa;
	        overflow: hidden;
	        img {
	          width: 100%;
	        }
	      }
	      .price {
	        padding: 0 rpx(10);
	        font-size: rpx(18);
	        color: #001f5b;
	        font-weight: bold;
	      }
	      .name {
			  font-size: rpx(14);
	        padding: 0 rpx(10);
	        color: #000;
	        text-overflow: -o-ellipsis-lastline;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        display: -webkit-box;
	        -webkit-line-clamp: 2;
	        -webkit-box-orient: vertical;
	         height: rpx(32);
	      }
	      .qty {
			  font-size: rpx(12);
	        padding: 0 rpx(10) rpx(10);
	        color: #999;
			line-height: rpx(24);
	        position: relative;
	        .buy {
	          position: absolute;
	          right: rpx(10);
	          bottom: rpx(10);
	          width: rpx(62);
	          height: rpx(24);
	          background: rgba(0, 31, 91, 1);
	          border-radius:rpx(12);
	          text-align: center;
	          line-height: rpx(24);
	          color: #fff;
	        }
	      }
	    }
	  }
	 
	}
	.filter-box {
	  font-size: 0.26rem;
	  font-weight: 400;
	  color: rgba(46, 46, 46, 1);
	  line-height: 0.8rem;
	  position: relative;
	  padding: 0 0.3rem;
	  width: 100%;
	  height: 0.8rem;
	}
}
</style>
