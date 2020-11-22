<template>
  <div class="container-box" id="video-box">
    <div class="van-swipe">
      <svg @click="stepToVideo" class="icon step-icon" aria-hidden="true">
        <use xlink:href="#icon-white_1" />
      </svg>
      <van-swipe
        @change="onChange"
        :initial-swipe="videoListIndex"
        :show-indicators="false"
        :loop="false"
        vertical
      >
        <van-swipe-item
          v-for="(item, index) in videoListOne"
          class="product-swiper"
          :key="index"
        >
          <div class="video-item">
            <svg
              @click="playVideo(index)"
              :class="[isPlay ? 'icon i-icon show' : 'icon i-icon']"
              aria-hidden="true"
            >
              <use xlink:href="#icon-play-disable" />
            </svg>
            <!-- :src="item.FilePath" -->
            <video
              preload="auto"
              @click="playVideo(index)"
              :src="item.FilePath | addBaseUrl"
              :poster="item.CoverImgPath | addBaseUrl"
              class="video-box"
              x5-playsinline
              playsinline
              webkit-playsinline
              x5-video-player-type="h5"
            ></video>
            <!-- 右侧栏 -->
            <div class="right-box">
              <svg
                @click="clickLike(index, item.Id)"
                class="icon right-icon"
                aria-hidden="true"
              >
                <use v-if="item.isLike != null" xlink:href="#icon-collect" />
                <use v-else xlink:href="#icon-collect-undo" />
              </svg>
              <div class="text">{{ item.LikeCount }}</div>
              <svg
                @click="showComment(index, item.Id)"
                class="icon right-icon1"
                aria-hidden="true"
              >
                <use xlink:href="#icon-1-chat" />
              </svg>
              <div class="text">{{ item.CommentCount }}</div>
            </div>
            <!-- 评论 -->
            <!-- <div class="comment-mask active"> -->
            <div
              :class="[
                item.isCommentShow ? 'comment-mask active' : 'comment-mask',
              ]"
            >
              <svg
                @click="closePopup(index)"
                class="icon c-icon"
                aria-hidden="true"
              >
                <use xlink:href="#icon-close" />
              </svg>
              <div class="comment-list" v-if="item.CommentCount != 0">
                <div
                  class="list-cell"
                  v-for="(i, aIndex) in item.Comments.slice(0, 5)"
                  :key="aIndex"
                >
                  <div class="list-l">
                    <div class="img-box">
                      {{ getOneText(i.Creator.NickName) }}
                    </div>
                  </div>
                  <div class="list-r">
                    <div class="name">{{ i.Creator.NickName }}</div>
                    <div class="comment">{{ i.Comment }}</div>
                  </div>
                </div>
                <div
                  v-if="item.Comments.length > 5"
                  class="more"
                  @click="stepComment(index, item.Id)"
                >
                  {{ $t("more") }}...
                </div>
              </div>
              <div v-else class="comment-list text-c">
                {{ $t("NoComments") }}
              </div>
              <div class="comment-init">
                <input
                  v-model="Comment"
                  class="input-box"
                  type="text"
                  placeholder="Leave your wonderful comments"
                />
                <div class="btn-box">
                  <div class="btn" @click="sendComment(index, item.Id)">
                    {{ $t("Send") }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 下侧栏 -->
            <div class="bottom-box">
              <div :class="[isShowAd ? 'ad active' : 'ad']">
                <div class="img-box1" @click="stepToDetail(adData)">
                  <img
                    class="img"
                    :src="adData.BannerImgPath | addBaseUrl"
                    alt
                  />
                </div>
                <div class="r-box" @click="stepToDetail(adData)">
                  <div class="r-name">{{ adData.Name }}</div>
                  <div class="r-price">${{ adData.Price }}</div>
                </div>
                <svg
                  @click="closeAd"
                  class="icon close-icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-close" />
                </svg>
              </div>
              <div class="name">{{ item.title }}</div>
              <!-- <div class="tap">
                <div>#daasda</div>
                <div>#daasda</div>
                <div>#daasda</div>
              </div>-->
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"机上购物",
      "NoComments":"暂无评论",
      "more":"显示更多",
      "fail": "获取列表失败！",
      "Send": "发送"
		},
		"en":{
			"title":"Shopping",
      "NoComments":"No comments",
      "more":"more",
      "fail": "Failed to get list!",
      "Send":"Send"
		}
	}
</i18n>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VideoService from '../../service/video';

@Component({
  name: 'VideoPlay',
  components: {},
})
export default class VideoPlay extends Vue {
  private videoListOne: Array<any> = [];
  private videoListTwo: Array<any> = [];
  private adDataList: Array<any> = [];
  private adData: any = '';
  private adDataTime: number = 0;
  private isGetVideo: boolean = true;
  private isPlay: boolean = false;
  private isShowAd: boolean = false;
  // private isCommentShow: boolean = false;
  private adShowTime: any = '';
  private current: any = 0;
  private videoListIndex: any = 0;
  private pageNumber: any = 1;
  private pageSize: any = 10;
  private getDataNum: any = 2; // 列表最后三个视频都可，且只触发一次
  private finished: boolean = false;
  private Comment: string = '';

  private mounted() {
    this.$store.dispatch('deleteSongList');
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
    this.videoListIndex = this.$route.params.index;
    this.pageNumber = this.$route.params.number;
    // console.log(this.videoListIndex);
    // this.postVideoList();
    this.postAdvertList();
    this.videoListOne = this.$store.state.video.videoList;
    this.videoListOne.forEach((item: any, index: any) => {
      item.isCommentShow = false;
      // item.isHaveComment = false;
      item.Comments = [];
    });
  }
  // public postVideoList() {
  //   VideoService.postVideoList().then((res: any) => {
  //     if (res.code == 200) {
  //       this.videoListOne = res.data.Videos;
  //       this.videoListOne.forEach((item: any, index: any) => {
  //         item.isCommentShow = false;
  //         item.isHaveComment = false
  //         item.Comments = [];
  //         // 测试使用
  //         // item.isLike = false;
  //       });
  //     }
  //   });
  // }
  // 点击播放操作
  public playVideo(id: any) {
	  // debugger;
    this.isPlay = !this.isPlay;
    this.current = id;
	console.log('歌名是:' + this.videoListOne[id].title );
	 
	// videoListOne;
    if (this.isPlay) {
      this.closePopup(id);
    } else {
      this.isPlayVideoFalse(id);
    }
  }
  public playVideoSwipe(id: any) {
    this.current = id;
    // this.isPlayVideoTrue(id)
    this.closePopup(id);
  }
  // 切换操作
  public onChange(index: any) {
    let video = document.querySelectorAll('video')[this.current];
    video.currentTime = 0;
    video.pause();
    this.playVideoSwipe(index);

    if (!this.finished && this.videoListOne.length - index <= this.getDataNum) {
      setTimeout(() => {
        this.videoListIndex = index;
        this.pageNumber = this.pageNumber + 1;
        // console.log(this.pageNumber)
        this.getPlayList();
      }, 200);
    }
    // 这段逻辑要改
    // if (index == Math.round(this.videoListOne.length / 2) && this.isGetVideo) {
    //   this.isGetVideo = false;
    //   this.getPlayList()

    // } else if (index == 0 && !this.isGetVideo) {
    //   this.isGetVideo = true;
    //   this.videoListOne = this.videoListTwo;
    //   this.$store.commit("setVideoList", this.videoListTwo);
    //   this.isPlay = false;
    // }
  }
  // 获取播放列表
  public getPlayList() {
    VideoService.postVideoList({
      skip: (this.pageNumber - 1) * this.pageSize,
      take: this.pageSize,
    }).then((res: any) => {
      if (res.code == 200) {
        if (res.data.EOF) {
          this.finished = true;
        }
        this.videoListTwo = res.data.Videos;

        this.videoListTwo.forEach((item: any, index: any) => {
          item.isCommentShow = false;
          // item.isHaveComment = false;
          item.Comments = [];
          // 测试使用
          // item.isLike = false;
        });
        console.log(this.videoListOne);
        this.videoListOne = this.videoListOne.concat(this.videoListTwo);
        console.log(this.videoListOne);
      } else {
        this.$toast(this.$i18n.t('fail'));
      }
    });
  }
  // 取首字母
  public getOneText(str: string) {
    return str.substring(0, 1);
  }
  // 获取广告
  public postAdvertList() {
    VideoService.postAdvertList().then((res: any) => {
      if (res.code == 200 && res.data.length != 0) {
        this.adDataList = res.data;
        this.adData = res.data[0];
        if (this.adDataList.length > 0) {
          clearTimeout(this.adShowTime);
          this.adShowTime = setTimeout(() => {
            this.isShowAd = true;
          }, 30000);
        }
      }
    });
  }
  // 点击跳转详情页
  private stepToDetail(item: any) {
    this.$router.push({
      name: 'shoppingDetails',
      query: {
        shoppingInfo: item,
        id: item.Id,
      },
    });
  }
  // 关闭广告
  public closeAd() {
    this.adDataTime = this.adDataTime + 1;
    this.adData = this.adDataList[this.adDataTime];
    this.isShowAd = false;
    clearTimeout(this.adShowTime);
    this.adShowTime = setTimeout(() => {
      this.isShowAd = true;
    }, 30000);
  }
  // 喜欢
  public clickLike(index: any, id: any) {
    // this.videoListOne[index].isLike = !this.videoListOne[index].isLike;
    // Vue.set(this.videoListOne, index, this.videoListOne[index]);
    if (this.videoListOne[index].isLike != null) {
      this.videoListOne[index].isLike = null;
    } else {
      this.videoListOne[index].isLike = '1';
    }
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    if (this.videoListOne[index].isLike != null) {
      this.videoListOne[index].LikeCount =
        this.videoListOne[index].LikeCount + 1;
      Vue.set(this.videoListOne, index, this.videoListOne[index]);
      // 接口交互
      VideoService.postVideoLike({ id: id }).then((res: any) => {});
    } else {
      this.videoListOne[index].LikeCount =
        this.videoListOne[index].LikeCount - 1;
      Vue.set(this.videoListOne, index, this.videoListOne[index]);
      VideoService.postVideoUnLike({ id: id }).then((res: any) => {});
    }
  }
  // 发送评论
  public sendComment(index: any, id: any) {
    if (!this.Comment) {
      if (localStorage.getItem('lang') == 'en') {
        this.$toast('please input content!');
      } else {
        this.$toast('请输入评论！');
      }
      return;
    }

    let data = {
      VideoId: id,
      Comment: this.Comment,
    };
    VideoService.postVideoComments(data).then((res: any) => {
      if (res.code == 200) {
        this.Comment = '';
        VideoService.getVideoCommentsList({
          videoId: id,
        }).then((res: any) => {
          if (res.code == 200) {
            this.videoListOne[index].Comments = res.data.Comments;
            // if (res.data.Comments.length != 0) {
            //   this.videoListOne[index].isHaveComment = true;
            // }
            Vue.set(this.videoListOne, index, this.videoListOne[index]);
            this.videoListOne[index].CommentCount =
              this.videoListOne[index].CommentCount + 1;
            Vue.set(this.videoListOne, index, this.videoListOne[index]);
          }
        });
      }
    });
  }
  //弹出评论操作
  public showComment(index: any, id: any) {
    this.videoListOne[index].isCommentShow = true;
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    this.isPlayVideoFalse(index);
    VideoService.getVideoCommentsList({
      videoId: id,
    }).then((res: any) => {
      if (res.code == 200) {
        this.videoListOne[index].Comments = res.data.Comments;
        // if (res.data.Comments.length != 0) {
        //   this.videoListOne[index].isHaveComment = true;
        // }
        Vue.set(this.videoListOne, index, this.videoListOne[index]);
      }
    });
  }
  //关闭评论操作
  public closePopup(index: any) {
    this.videoListOne[index].isCommentShow = false;
    Vue.set(this.videoListOne, index, this.videoListOne[index]);
    this.isPlayVideoTrue(index);
  }
  // 播放视频
  public isPlayVideoTrue(index: any) {
    let video = document.querySelectorAll('video')[index];
    video.play();
    this.isPlay = true;
    video.addEventListener(
      'ended',
      () => {
        this.isPlay = false;
        video.currentTime = 0;
      },
      false
    );
  }
  // 暂停播放
  public isPlayVideoFalse(index: any) {
    let video = document.querySelectorAll('video')[index];
    video.pause();
    this.isPlay = false;
  }
  public stepToVideo() {
    // this.$router.go(-1);
    this.$router.push({
      name: 'video',
    });
  }
  public stepComment(index: any, id: any) {
    this.$router.push({
      name: 'Comment',
      params: {
        videoListIndex: index,
        videoId: id,
        type: 'videoPlay',
      },
    });
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/style/index.scss';

  @media  (orientation:portrait) {
    /*
    2020.08
     */
    .container-box {
      width: 100vw;
      height: 100vh;
      background: #000;
    }
    .van-swipe {
      width: 100vw;
      height: 100vh;
      // max-width: 550px;
      margin: 0 auto;
      position: relative;
    }
    .step-icon {
		// visibility: hidden;
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
      width: 0.5rem;
      height: 0.5rem;
      z-index: 99;
    }
    .product-swiper {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    .van-swipe {
      height: 100vh;
      max-width: 100vw;
    }
    .video-item {
      position: relative;
      display: grid;
      // vertical-align: middle;
      align-items: center;
      // justify-content: center;
      width: 100vw;
      height: 100vh;
      .i-icon {
		  // visibility: hidden;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1rem;
        height: 1rem;
        z-index: 88;
        opacity: 0.7;
        &.show {
          display: none;
        }
      }
    }
    .comment-mask {
      display: none;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: auto;
      background-color: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
      overflow: hidden;
      z-index: 100;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
      touch-action: cross-slide-y;
      &.active {
        display: block;
        max-height: 70vh;
        .c-icon {
          position: absolute;
          right: 0;
          top: 0;
          width: 0.6rem;
          height: 0.6rem;
          color: #666;
        }
      }
      .c-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        color: #666;
      }
      .comment-list {
        padding: 0.3rem 0 1rem;
        height: 100%;
        box-sizing: border-box;
        min-height: 3rem;
        &.text-c {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
        }
        .more {
          padding: 0.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .list-cell {
          display: flex;
          margin: 0.2rem 0 0;
          .list-l {
            display: flex;
            justify-content: center;
            // width: 1.2rem;
            .img-box {
              margin: 0.1rem 0.2rem;
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background-color: #00205b;
              color: #fff;
              text-align: center;
              line-height: 1rem;
              font-size: 0.5rem;
            }
          }
          .list-r {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .name {
              width: 100%;
              line-height: 0.48rem;
              height: 0.48rem;
              font-size: 0.32rem;
              color: #333;
              font-weight: bold;
            }
            .comment {
              width: 100%;
              height: auto;
              line-height: 0.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              color: #999;
            }
          }
        }
      }
      .comment-init {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        background-color: #fff;
        border-top: 0.01rem solid #888;
        width: 100%;
        height: 1rem;
        .btn-box {
          display: flex;
          width: 1.5rem;
          height: 100%;
          align-items: center;
          justify-content: center;
          .btn {
            width: 80%;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            color: #fff;
            background-color: #00205b;
            border-radius: 0.3rem;
          }
        }
        .input-box {
          border-top: 0.01rem solid #888;
          flex: 1;
          padding: 0 0 0 0.3rem;
        }
      }
    }
    .right-box {
		// visibility: hidden;
      display: flex;
      position: absolute;
      right: 0;
      bottom: 3rem;
      width: 1rem;
      height: 2rem;
      // background-color: rgba(161, 55, 55, 0.5);
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      z-index: 99;
      .right-icon {
        width: 0.6rem;
        height: 0.6rem;
        padding: 0.2rem 0.2rem 0;
      }
      .right-icon1 {
        width: 0.5rem;
        height: 0.5rem;
        padding: 0.2rem 0.2rem 0;
      }
      .text {
        color: #fff;
      }
    }
    .bottom-box {
		// visibility: hidden;
      position: absolute;
      left: 0.52rem;
      bottom: 4.5rem;
      width: 65%;
      height: 0.01rem;
      z-index: 99;
      .name {
        position: absolute;
        top: 1.5rem;
        font-size: 0.32rem;
        font-weight: bold;
        line-height: 0.4rem;
        color: #fff;
      }
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.1rem;
        width: 0.35rem;
        height: 0.35rem;
      }
      .ad {
        position: absolute;
        display: none;
        // justify-content: center;
        align-items: center;
        width: 3.7rem;
        height: 1.2rem;
        border: 1px dashed rgba(53, 53, 53, 0.6);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 0.1rem;
        &.active {
          display: flex;
        }
        .img-box1 {
          display: flex;
          margin: 0 0.1rem;
          width: 1rem;
          height: 1rem;
          // background-color: rgba(0, 0, 0, 1);
          border-radius: 0.1rem;
          justify-content: center;
          align-items: center;
          .img {
            width: 100%;
          }
        }
        .r-box {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          align-content: space-around;
          .r-name {
            width: 100%;
            font-size: 0.3rem;
            color: #333;
            line-height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .r-price {
            width: 100%;
            font-size: 0.25rem;
            color: #666;
            line-height: 0.25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    /*
    2020.08
     */
    .clear {
      clear: both;
    }
    .back-i {
      position: fixed;
      top: 20px;
      left: 10px;
      width: 28px;
      z-index: 10;
    }
    .video-player {
      height: 100vh;
      width: 100vw;
    }
    .product-swiper {
      width: 100vw;
      height: 100vh;
    }
    .video-main {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: block;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
    }
    .video-box {
      // position: absolute;
      // left: 0;
      // top: 50%;
      // transform: translate(0%,-50%);
      /*object-fit: fill !important;*/
      /*z-index: 999;*/
      // left: 0;
      // top: 0;
      // position: fixed;
      // bottom: 0;
      // right: 0;
      // margin: auto;
      width: 100%;
      // height: 100vh;
    }
    video {
      object-position: 0 0;
    }
    .icon-play {
      position: absolute;
      top: 44%;
      right: 0;
      left: 0;
      bottom: auto;
      margin: auto;
      z-index: 999;
      height: 60px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
    .play,
    .platStart {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
    }
  }

  @media  (orientation:landscape) {
    .container-box {
      width: 100vw;
      height: 100vh;
      background: #000;
    }
    .van-swipe {
      width: 100vw;
      height: 100vh;
      // max-width: 550px;
      margin: 0 auto;
      position: relative;
    }
    .step-icon {
      position: absolute;
      left: 0.2rem;
      top: 0.2rem;
      width: 0.2rem;
      height: 0.2rem;
      z-index: 99;
    }
    .product-swiper {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    .van-swipe {
      height: 100vh;
      max-width: 100vw;
    }
    .video-item {
      position: relative;
      display: grid;
      // vertical-align: middle;
      align-items: center;
      // justify-content: center;
      width: 100vw;
      height: 100vh;
      .i-icon {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0.5rem;
        height: 0.5rem;
        z-index: 88;
        opacity: 0.7;
        &.show {
          display: none;
        }
      }
    }
    .comment-mask {
      display: none;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: auto;
      background-color: #fff;
      border-radius: 0.2rem 0.2rem 0 0;
      overflow: hidden;
      z-index: 100;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
      touch-action: cross-slide-y;
      &.active {
        display: block;
        max-height: 70vh;
        .c-icon {
          position: absolute;
          right: 0.05rem;
          top: 0.05rem;
          width: 0.3rem;
          height: 0.3rem;
          color: #666;
        }
      }
      .c-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        color: #666;
      }
      .comment-list {
        padding: 0.3rem 0 1rem;
        height: 100%;
        box-sizing: border-box;
        min-height: 3rem;
        &.text-c {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 0.2rem;
        }
        .more {
          font-size: 0.15rem;
          padding: 0 0.3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .list-cell {
          display: flex;
          margin: 0.03rem 0 0;
          .list-l {
            display: flex;
            justify-content: center;
            .img-box {
              margin: 0.1rem 0.1rem 0.1rem 0.2rem;
              width: 0.4rem;
              height: 0.4rem;
              border-radius: 50%;
              background-color: #00205b;
              color: #fff;
              text-align: center;
              line-height: 0.4rem;
              font-size: 0.2rem;
            }
          }
          .list-r {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .name {
              width: 100%;
              line-height: 0.4rem;
              height: 0.2rem;
              font-size: 0.18rem;
              color: #333;
              font-weight: bold;
            }
            .comment {
              font-size: 0.16rem;
              width: 100%;
              height: auto;
              line-height: 0.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              color: #999;
            }
          }
        }
      }
      .comment-init {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        background-color: #fff;
        border-top: 0.01rem solid #888;
        width: 100%;
        height: 0.45rem;
        .btn-box {
          display: flex;
          width: 1rem;
          height: 100%;
          align-items: center;
          justify-content: center;
          .btn {
            width: 70%;
            height: 0.35rem;
            text-align: center;
            line-height: 0.35rem;
            font-size: 0.15rem;
            color: #fff;
            background-color: #00205b;
            border-radius: 0.3rem;
          }
        }
        .input-box {
          flex: 1;
          font-size: 0.15rem;
          padding: 0 0 0 0.3rem;
        }
      }
    }
    .right-box {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 2.2rem;
      width: 0.6rem;
      height: 1.8rem;
      // background-color: rgba(161, 55, 55, 0.5);
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      z-index: 99;
      .right-icon {
        height: 0.3rem;
        padding: 0 0.1rem;
        margin-top: 0.5rem;
      }
      .right-icon1 {
        height: 0.25rem;
        padding: 0 0.1rem;
      }
      .text {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 0.2rem;
      }
    }
    .bottom-box {
      position: absolute;
      left: 0.52rem;
      bottom: 4.5rem;
      width: 65%;
      height: 0.01rem;
      z-index: 99;
      .name {
        position: absolute;
        top: 3.5rem;
        font-size: 0.2rem;
        font-weight: bold;
        line-height: 0.4rem;
        color: #fff;
      }
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.05rem;
        width: 0.2rem;
        height: 0.2rem;
      }
      .ad {
        position: absolute;
        top: 2.9rem;
        display: none;
        // justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 0.6rem;
        border: 1px dashed rgba(53, 53, 53, 0.6);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 0.1rem;
        &.active {
          display: flex;
        }
        .img-box1 {
          display: flex;
          margin: 0 0.1rem;
          width: 0.5rem;
          height: 100%;
          // background-color: rgba(0, 0, 0, 1);
          border-radius: 0.1rem;
          justify-content: center;
          align-items: center;
          .img {
            width: 100%;
          }
        }
        .r-box {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          align-content: space-around;
          .r-name {
            display:flex;
            align-items:flex-start;
            justify-content:center;
            width: 90%;
            height: 50%;
            font-size: 0.15rem;
            color: #333;
            line-height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .r-price {
            display:flex;
            align-items:flex-start;
            justify-content:center;
            width: 100%;
            height: 50%;
            font-size: 0.15rem;
            color: #666;
            //line-height: 0.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    /*
    2020.08
     */
    .clear {
      clear: both;
    }
    .back-i {
      position: fixed;
      top: 20px;
      left: 10px;
      width: 28px;
      z-index: 10;
    }
    .video-player {
      height: 100vh;
      width: 100vw;
    }
    .product-swiper {
      width: 100vw;
      height: 100vh;
    }
    .video-main {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: block;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
    }
    .video-box {
      // position: absolute;
      // left: 0;
      // top: 50%;
      // transform: translate(0%,-50%);
      /*object-fit: fill !important;*/
      /*z-index: 999;*/
      // left: 0;
      // top: 0;
      // position: fixed;
      // bottom: 0;
      // right: 0;
      // margin: auto;
      // width: 100%;
      // height: 100vh;
	  object-fit: cover !important;
	  z-index: 999;
	  /* width: 100%; */
	  max-height: 100%;
	  object-position: center;
	  display: block;
	  margin: 0 auto;
    }
    video {
      object-position: 0 0;
    }
    .icon-play {
      position: absolute;
      top: 44%;
      right: 0;
      left: 0;
      bottom: auto;
      margin: auto;
      z-index: 999;
      height: 60px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
    .play,
    .platStart {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
    }
  }
</style>