<template>
  <li class="news-list-wrap">
    <div class="news-list-item">
      <div class="item-img" @click="goToDetail(recommedNewsItem)">
        <img :src="recommedNewsItem.BannerImg | addBaseUrl" width="100%" height="100%" />
        <!-- <img :src="recommedNewsItem.ThumbsImg[0] | addBaseUrl" /> -->
      </div>

      <div class="item-info">
        <div class="name" @click="goToDetail(recommedNewsItem)">
          <div class="line-two">{{ recommedNewsItem.Title }}</div>
        </div>
        <div class="author">
          <div class="line-one">
            <span class="author-left-info">{{
              recommedNewsItem.ShortDescription
            }}</span>

            <div @click="changeHot(recommedNewsItem.Id)">
              <span
                class="author-right-heart"
                v-show="recommedNewsItem.isCollect == true"
              >
                <img :src="loveTrue" alt="" />
              </span>
              <span
                class="author-right-heart"
                v-show="recommedNewsItem.isCollect == false"
              >
                <img :src="loveFalse" alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { localStore } from "../../../utils/data-management";
import NewsService from "../../../service/news";
declare function require(type: string): string;

@Component({
  name: "NewsListItem",
  components: {},
})
export default class NewsListItem extends Vue {
  @Prop() private newsItem!: object;

  @Watch("newsItem", { deep: true, immediate: true })
  newsItemWatch(newVal: object, oldVal: object) {
    this.newsItem = newVal;
    this.recommedNewsItem = newVal;
  }

  private recommedNewsItem: any = this.newsItem;
  private loveTrue = require("../images/love_true.png");
  private loveFalse = require("../images/love_false.png");

  private created() {}
  private mounted() {}

  public goToDetail(item:any): void {
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

  public changeHot(Id: string): void {
    this.postNewsIsLike(Id);
  }

  // 是否已收藏
  public postNewsIsLike(val: string) {
    NewsService.postNewsIsLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        if (res.data == true) {
          this.postNewsUnLike(val);
        } else if (res.data == false) {
          this.postNewsLike(val);
        }
      }
    });
  }

  // 进行收藏
  public postNewsLike(val: string) {
    NewsService.postNewsLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        this.recommedNewsItem.isCollect = true;
      }
    });
  }

  // 取消收藏
  public postNewsUnLike(val: string) {
    NewsService.postNewsUnLike({
      id: val,
    }).then((res) => {
      if (res.code == 200) {
        this.recommedNewsItem.isCollect = false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/index.scss';

  @media  (orientation:portrait) {
    .news-list-wrap {
      width: 92%;
      background: #fff;
      margin: 0 auto;
      border-radius: 0.1rem;

      .news-list-item {
        display: flex;
        padding: 0.28rem 0;
        align-items: center;

        .item-img {
          width: 2.1rem;
          height: 1.38rem;
          border-radius: 0.12rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }

        .item-info {
          flex: 1;
          margin: 0 0 0 0.16rem;
          display: flex;
          flex-direction: column;
          align-content: space-around;
          height: 1.38rem;
          .name {
            flex: 3;
            font-size: 0.3rem;
            color: #333333;
            line-height: 0.35rem;
            font-weight: 600;
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
          .author {
            flex: 1;
            font-size: 0.24rem;
            color: #999;
            .line-one {
              width: 100%;
              height: 0.35rem;
              line-height: 0.35rem;
              display: flex;
              justify-content: space-between;

              .author-left-info {
                display: inline-block;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                width: 92%;
              }
              .author-right-heart {
                display: inline-block;
                width: 0.3rem;
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  @media  (orientation:landscape) {
    .news-list-wrap {
      width: 5rem;
      height: 1rem;
      background: #fff;
      margin: 0 auto;
      border-radius: 0.1rem;
      .news-list-item {
        display: flex;
        padding: 0.2rem;
        align-items: center;
        .item-img {
          width: 1.06rem;
          height: 0.7rem;
          border-radius: 0.12rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .item-info {
          flex: 1;
          margin: 0 0 0 0.2rem;
          display: flex;
          flex-direction: column;
          align-content: space-around;
          height: 1.1rem;
          .name {
            flex: 3;
            font-size: 0.16rem;
            color: #333333;
            line-height: 0.7rem;
            font-weight: 600;
            width: 2.98rem;
            .line-two {
              height: 0.52rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .author {
            flex: 1;
            font-size: 0.12rem;
            color: #333333;
            .line-one {
              width: 100%;
              height: 0.32rem;
              line-height: 0.16rem;
              display: flex;
              justify-content: space-between;
              position: relative;
              bottom: 0.25rem;
              .author-left-info {
                display: inline-block;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                width: 92%;
              }
              .author-right-heart {
                position: relative;
                bottom: 0.25rem;
                display: inline-block;
                width: 0.16rem;
                height: 0.14rem;
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
