<template>
    <section class="news-detail">
        <van-sticky>
            <abus-title :title="$t('News')">
                <div slot style="width:0.3rem"></div>
            </abus-title>
        </van-sticky>

        <div class="news-img" v-if="bannerData.length != 0">
            <banner :bannerData="bannerData"/>
        </div>
        <div class="news-title-heart">
            <div class="news-title">{{ newsDetail.Title }}</div>
            <div @click="changeCollect(newsDetail.Id)" class="news-right-heart-box">
        <span class="news-right-heart" v-show="newsDetail.isCollect == true">
          <img :src="loveTrue" alt=""/>
        </span>
                <span class="news-right-heart" v-show="newsDetail.isCollect == false">
          <img :src="loveFalse" alt=""/>
        </span>
            </div>
        </div>
        <div class="news-time">{{ newsDetail.CreatedAt }}</div>
        <div class="news-info" v-html="newsDetail.FullDescription"></div>
    </section>
</template>
<i18n>
    {
    "zh":{
    "News":"新闻"
    },
    "en":{
    "News":"News"
    }
    }
</i18n>
<script lang="ts">
    import {Component, Prop, Vue, Watch, Emit} from "vue-property-decorator";
    import {localStore} from "../../utils/data-management";
    import Banner from "../../components/banner.vue";
    import DateUtils from "../../utils/date-utils";
    import NewsService from "../../service/news";
    import AbusTitle from "@/components/AbusTitle.vue";

    declare function require(type: string): string;

    @Component({
        name: "NewsDetailPage",
        components: {
            Banner,
            AbusTitle,
        },
    })
    export default class NewsDetailPage extends Vue {
        private loveTrue = require("./images/love_true.png");
        private loveFalse = require("./images/love_false.png");
        private newsDetail: any = {};
        private bannerData: any = [];

        private created() {
            const _this = this;
            _this.newsDetail = {};
            _this.bannerData = [];
            _this.newsDetail = localStore.get("newsDetails");
            _this.bannerData.push(_this.newsDetail);
            _this.newsDetail.CreatedAt = DateUtils.formate(_this.newsDetail.CreatedAt);
            _this.getNewsDetail()
        }

        private mounted() {
            if (localStorage.getItem("lang") == "en") {
                this.$i18n.locale = "en";
            } else {
                this.$i18n.locale = "zh";
            }
            window.scrollTo(0, 0);
        }

        public goBack(): void {
            this.$router.go(-1);
        }

        public changeCollect(Id: string): void {
            this.postNewsIsLike(Id);
        }

        public getNewsDetail() {
            const _this = this;
            NewsService.getNewsDetail({
                Id: this.$route.query.Id,
            }).then((res) => {
                if (res.code == 200) {
                    _this.$set(_this.newsDetail, 'FullDescription', res.data.FullDescription);
                }
            });
        }

        // 是否已收藏
        public postNewsIsLike(val: string) {
            const _this = this;
            NewsService.postNewsIsLike({
                id: val,
            }).then((res) => {
                if (res.code == 200) {
                    if (res.data == true) {
                        _this.postNewsUnLike(val);
                    } else if (res.data == false) {
                        _this.postNewsLike(val);
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
                    this.newsDetail.isCollect = true;
                }
            });
        }

        // 取消收藏
        public postNewsUnLike(val: string) {
            NewsService.postNewsUnLike({
                id: val,
            }).then((res) => {
                if (res.code == 200) {
                    this.newsDetail.isCollect = false;
                }
            });
        }
    }
</script>
<style lang="scss" scoped>

    @import '../../assets/style/index.scss';

    @media  (orientation:portrait) {
        .news-right-heart {
            // display: inline-block;
            img {
                // position: absolute;
                // right: 0;
                // top: 0.1rem;
                // padding: 0.2rem;
                width: 0.3rem;
            }
        }

        .news-title-heart{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            .news-right-heart-box{
                margin-right: 0.3rem;
            }
        }


        .news-title {
            padding: 0.25rem;
            line-height: 0.46rem;
            background: #fff;
            font-weight: bold;
            font-size: 0.32rem;
            color: #2e2e2e;
        }
        .news-time {
            padding: 0.1rem 0.25rem;
            height: 0.2rem;
            background: #fff;
            line-height: 0.2rem;
            font-size: 0.24rem;
            color: #ddc8c8;
        }
        .news-info {
            padding: 0.25rem;
            background: #fff;
            line-height: 0.36rem;
            text-align: justify;
            font-size: 0.28rem;
            font-weight: 400;
            color: #666666;
            /deep/ img{
                width: 100%;
            }
        }
    }
    @media  (orientation:landscape) {
        .news-img {
            width: 5rem;
            margin: 0 auto;
            .banner {
                width: 100%;
            }
        }
        .news-right-heart {
            img {
                width: 0.3rem;
            }
        }
        .news-title-heart {
            width: 5rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            .news-right-heart-box {
                margin-right: 0.3rem;
                .news-right-heart {
                    position: relative;
                    left: 0.2rem;
                    img {
                        width: 0.16rem;
                        height: 0.14rem;
                    }
                }
            }
        }
        .news-title {
            padding: 0.1rem 0rem;
            line-height: 0.3rem;
            background: #fff;
            font-weight: bold;
            font-size: 0.18rem;
            color: #2e2e2e;
        }
        .news-time {
            height: 0.2rem;
            width: 5rem;
            margin: 0 auto;
            background: #fff;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: #BFBFBF;
        }
        .news-info {
            width: 5rem;
            margin: 0 auto;
            padding: 0.1rem;
            background: #fff;
            line-height: 0.36rem;
            text-align: justify;
            font-size: 0.14rem;
            font-weight: 400;
            color: #666666;
            /deep/ img {
                width: 100%;
            }
        }
    }
</style>
