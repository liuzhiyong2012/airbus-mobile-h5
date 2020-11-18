<template>
  <div class="news">
    <van-sticky>
      <!-- <van-nav-bar title="News">
        <template #left>
          <van-icon name="arrow-left" size="18" @click="goBack" />
        </template>
      </van-nav-bar> -->
      <abus-title :title="$t('title')">
        <div slot style="width:0.3rem"></div>
      </abus-title>
    </van-sticky>

    <div class="abus-scroller-box">
      <banner :bannerData="bannerData" @stepTo="gotoNews($event)" />
    </div>

    <van-tabs
      v-model="active"
      @click="changeTab"
      sticky
      line-width="20"
      line-height="4"
      color="rgb(0,32,91)"
      title-active-color="rgb(0,32,91)"
    >
      <van-tab
        v-for="(val, index) in navTar"
        :title="val.endName"
        title-active-color="#3056EF"
        :key="index"
      >
        <div v-if="val.endName == navTar[index].endName" class="">
          <ul class="news-list">
            <news-list-item
              v-for="(item, index) in newsListBackup"
              :key="index"
              :newsItem="item"
            ></news-list-item>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"新闻"
		},
		"en":{
			"title":"News"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Banner from "../../components/banner.vue";
import NewsListItem from "./components/NewsListItem.vue";
import NewsService from "../../service/news";
import { localStore } from "../../utils/data-management";
import AbusTitle from "../../components/AbusTitle.vue";
import Tile from "ol/Tile";
@Component({
  name: "NewsList",
  components: {
    Banner,
    NewsListItem,
    AbusTitle,
  },
})
export default class NewsList extends Vue {
  private bannerData: any = [];
  private active: any = 0;
  private navTar: any = [
    {
      Id: "-1",
      Name: "所有",
      CreatedAt: false,
      Description: null,
      DisplayOrder: null,
      EName: 'All',
    },
    {
      Id: "0",
      Name: "收藏",
      CreatedAt: false,
      Description: null,
      DisplayOrder: null,
      EName: 'Collect',
    },
  ];
  private newsList: any = [];
  private newsListBackup: any = [];

  private created() {
    
    this.getCategory(); //获取分类
    this.getNewsList(); //获取新闻列表
    // this.postNewsMyLike(); //收藏列表
  }
  private mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
      this.navTar.forEach(item=>{
        item.endName = item.EName
      })
    } else {
	
      this.$i18n.locale = "zh";
      this.navTar.forEach(item=>{
        item.endName = item.Name
      })
    }
  }
  private destroyed() {}

  public goBack(): void {
    this.$router.go(-1);
  }

  // 获取新闻列表
  public getNewsList() {
    NewsService.getNewsList({}).then((res) => {
      if (res.code == 200) {
        res.data.News.forEach((item: any) => {
          if (item.isLike) {
            item.isCollect = true;
          } else {
            item.isCollect = false;
          }
        });
        this.newsList = res.data.News;
        this.newsListBackup = res.data.News;
        this.bannerData = res.data.News;
        this.bannerData.forEach((item: any) => {
          item.img = item.BannerImg;
        });
      }
    });
  }

  // 获取新闻的分类
  public getCategory() {
    NewsService.getNewsCategory({}).then((res) => {
      if (res.code == 200) {
        this.navTar = [...this.navTar, ...res.data];
      }

      if (localStorage.getItem("lang") == "en") {
        this.$i18n.locale = "en";
        this.navTar.forEach(item=>{
          item.endName = item.EName
        })
      } else {
        this.$i18n.locale = "zh";
        this.navTar.forEach(item=>{
          item.endName = item.Name
        })
      }
    });
  }

  // 切换分类
  public changeTab(name: number, title: string) {
    this.newsListBackup = [];
    if (title == "所有" || title == "All") {
      this.newsListBackup = this.newsList;
    } else if (title == "收藏" || title == "Collect") {
      this.newsList.forEach((item: any) => {
        if (item.isCollect == true) {
          this.newsListBackup.push(item);
        }
      });
    } else {
      let i = "";
      this.navTar.forEach((item: any) => {
        if (item.endName == title) {
          i = item.Id;
        }
      });
      this.newsList.forEach((item: any) => {
        if (i == item.CategoryId) {
          this.newsListBackup.push(item);
        }
      });
    }
  }

  // 我收藏的新闻-先解决下冲突
  public postNewsMyLike() {
    NewsService.postNewsMyLike({}).then((res: any) => {
      if (res.code == 200) {
      }
    });
  }

  public gotoNews(item:any): void {
    // 先将详情存入store
    if (localStore.get("newsDetails")) {
      localStore.remove("newsDetails");
    }
    this.$store.dispatch("setNewsDetails", item);
    //进入新闻详情
    this.$router.push({
      name: "newsDetail",
      query:{
        Id: item.Id
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.abus-scroller-box {
  margin: 0.2rem auto;
  padding: 0;
  width: 5rem;
  overflow: hidden;
  height: 2.32rem;
  background: #fff;
  border-radius: 0rem!important;
}
.van-cell {
  font-weight: 500;
  padding-top: 0;
  padding-bottom: 0;
  span {
    color: #2e2e2e;
  }
}
.news-filter {
  /deep/ .van-ellipsis {
    font-size: 0.13rem;
  }
  /deep/ .van-dropdown-menu__bar {
    height: 0.7rem;
    box-shadow: 0 0 0 rgba(100, 101, 102, 0.08);
  }
  /deep/ .van-cell__title,
  .van-cell__value {
    font-size: 0.12rem;
  }
  .filter-btn {
    color: linear-gradient(to right, #4bb0ff, #6149f6);
  }
}
.news-list {
  background: #fff;
}
</style>
