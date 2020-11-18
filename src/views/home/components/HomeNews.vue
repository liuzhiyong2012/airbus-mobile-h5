<template>
  <div class="abus-scroller-box news-box" :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}">
    <div
      v-for="(item, index) in newsList.slice(0, 2)"
      class="news-list"
      :key="index"
      @click="goToDetail(item)"
    >
      <div class="news-l">
        <div class="img">
          <img :src="item.BannerImg |addBaseUrl" :alt="item.Title" width="100%" height="100%"/>
        </div>
      </div>
      <div class="f1">
        <div class="name">
          <div class="line-two">{{ item.Title }}</div>
        </div>
        <div class="details">
          <div class="line-one">{{ item.ShortDescription }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NewsService from '../../../service/news';
import { localStore } from '../../../utils/data-management';
declare function require(string:any): string;

@Component({
  name: 'HomeNews',
  components: {},
})
export default class HomeNews extends Vue {
  private musicData: Array<any> = [];
  private newsList: Array<any> = [];
  private isHaveData: boolean = false

  private created() {
    this.getNewsRecommended();
    this.musicData = [
      {
        img: require('../images/news.jpg'),
        name: 'Let Me Down Slowly',
        details: 'Alec Benjamin / Alessia Cara',
      },
      {
        img: require('../images/news.jpg'),
        name:
          'Let Me Down SlowlyLet Me Down SlowlyLet Me Down SlowlyLet Me Down Slowly',
        details: 'Alec Benjamin / Alessia CaraAlec Benjamin / Alessia Cara',
      },
    ];
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }
  private getNewsRecommended() {
    NewsService.getNewsRecommended().then((res: any) => {
      if (res.code == 200) {
        this.isHaveData = true;
        res.data.RecommendedNews.forEach((item:any) => {
          item.img = item.BannerImg;
          if (item.isLike) {
            item.isCollect = true;
          } else {
            item.isCollect = false;
          }
        });
        this.newsList = res.data.RecommendedNews;
      } else {
        this.$toast(res.message);
      }
    });
  }
  public goToDetail(item:any): void {
    // 先将详情存入store
    if (localStore.get('newsDetails')) {
      localStore.remove('newsDetails');
    }
    this.$store.dispatch('setNewsDetails', item);
    //进入新闻详情
    this.$router.push({
      name: 'newsDetail',
      query:{
        Id: item.Id
      }
    });
  }
}
</script>

<style lang="scss" scoped>
	
	@import '../../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.news-box {
		  background-color: #fff;
		  padding: 0 0.28rem;
		  margin: 0 0.28rem;
		  border-radius: 0.1rem;
		  :last-child {
		    border-bottom: none;
		  }
		  
		  .news-list {
		    display: flex;
		    padding: 0.28rem 0;
		    border-bottom: 0.02rem solid #efefef;
		    align-items: center;
		    .news-l {
		      width: 2.1rem;
		      height: 1.38rem;
		      border-radius: 0.12rem;
		      overflow: hidden;
		      .img {
		        width: 100%;
		        height: 100%;
		      }
		    }
		    .f1 {
		      flex: 1;
		      margin: 0 0 0 0.16rem;
		      display: flex;
		      flex-direction: column;
		      align-content: space-around;
		      height: 1.38rem;
		      .name {
		        flex: 3;
		        font-size: 0.28rem;
		        color: #666;
		        line-height: 0.35rem;
		        font-weight: 500;
		        .line-two {
		          height: 0.7rem;
		          text-overflow: -o-ellipsis-lastline;
		          overflow: hidden;
		          text-overflow: ellipsis;
		          display: -webkit-box;
		          -webkit-line-clamp: 2;
		          -webkit-box-orient: vertical;
		        }
		      }
		      .details {
		        flex: 1;
		        font-size: 0.24rem;
		        color: #999;
		        line-height: 0.4rem;
		        .line-one {
		          text-overflow: -o-ellipsis-lastline;
		          overflow: hidden;
		          text-overflow: ellipsis;
		          display: -webkit-box;
		          -webkit-line-clamp: 1;
		          -webkit-box-orient: vertical;
		        }
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.news-box {
		  background-color: #fff;
		  padding: 0 rpx(20);
		  margin: 0 rpx(20);
		  border-radius: 0.1rem;
		  :last-child {
		    border-bottom: none;
		  }
		  
		  .news-list {
		    display: flex;
		    padding: rpx(20) 0;
		    border-bottom: 0.02rem solid #efefef;
		    align-items: center;
			
			&:last-child{
				border-bottom: none;
			}
			
		    .news-l {
		      width: rpx(106);
		      height: rpx(70);
		      border-radius: rpx(4);
		      overflow: hidden;
		      .img {
		        width: 100%;
		        height: 100%;
		      }
		    }
		    .f1 {
		      flex: 1;
		      margin: 0 0 0 0.16rem;
		      display: flex;
		      flex-direction: column;
		      justify-content: space-between;
		      height: rpx(70);
		      .name {
		        // flex: 3;
		        font-size: rpx(16);
		        color: #666;
		        line-height: rpx(18);
		        font-weight: 500;
		        .line-two {
		          // height: 0.7rem;
		          text-overflow: -o-ellipsis-lastline;
		          overflow: hidden;
		          text-overflow: ellipsis;
		          display: -webkit-box;
		          -webkit-line-clamp: 2;
		          -webkit-box-orient: vertical;
		        }
		      }
		      .details {
		        // flex: 1;
		        font-size: rpx(12);
		        color: #999;
		        line-height: rpx(16);
		        .line-one {
		          text-overflow: -o-ellipsis-lastline;
		          overflow: hidden;
		          text-overflow: ellipsis;
		          display: -webkit-box;
		          -webkit-line-clamp: 1;
		          -webkit-box-orient: vertical;
		        }
		      }
		    }
		  }
		}
	}
	


</style>
