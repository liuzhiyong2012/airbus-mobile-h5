<template>
  <section class="music-main-ctn">
    <!-- <abus-title title="Music"></abus-title> -->
    <section class="cover-ctn">
      <div class="cover-title" @click="goBack()">
        <i class="icon icon-back"></i>
      </div>

      <div class="cover-content">
        <div class="cover-image" :style="{ backgroundImage: `url(${playListObj.CoverImgUrl})` }"></div>
        <div class="cover-info">
          <div class="cover-name">{{ playListObj.Name }}</div>
          <div class="collect-ctn disable" v-if="!isCollected" @click="subscribePlaylist()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-collect" />
            </svg>
            <span class="collect-txt">{{$t('Collect')}}</span>
          </div>

          <div class="collect-ctn" v-if="isCollected" @click="unSubscribePlaylist()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-collect-cancle" />
            </svg>
            <span class="collect-txt">{{$t('Cancel')}}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="content-ctn">
      <div class="title-top">
        <div class="title-left">
          <span>{{$t('TotalSong')}}:</span>
          <span>{{ total }}</span>
        </div>

        <!-- <div class="title-right" @click="playAll()"> -->
        <div class="title-right" @click="playSong(0)">
          <i class="icon icon-play"></i>
          <span class="play-btn">{{$t('PlayAll')}}</span>
        </div>
      </div>

      <div class="collect-list-ctn">
        <div
          v-for="(item, index) in playListObj.Tracks"
          :key="index"
          class="mysong-item"
          @click="playSong(index)"
        >
          <div class="number-ctn">{{ index + 1 }}</div>

          <div class="song-info">
            <div>{{ item.Name }}</div>
            <div>{{ computeAuthorName(item) }}</div>
          </div>
          <abus-music-icon v-if="currentSong.id == item.Id" :playingStatus='playing' class="music-status-icon-ctn"></abus-music-icon>
        </div>
      </div>
    </section>
  </section>
</template>
<i18n>
	{
		"zh":{
			"title":"最喜欢的",
			"TotalSong":"全部",
			"PlayAll":"播放全部",
			"CancelledSuccessfully":"取消收藏歌单成功",
			"fail":"获取列表失败!",
			"success":"收藏成功",
			"Collect":"收藏",
			"Cancel":"取消"
		},
		"en":{
			"title":"Favourites",
			"TotalSong":"Total song",
			"PlayAll":"Play all",
			"CancelledSuccessfully":"Collection of song list cancelled successfully",
			"fail":"Failed to get list!",
			"success":"Collection successful",
			"Collect":"Collect",
			"Cancel":"Cancel"
		}
	}
</i18n>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import MusicService from '../../service/music';
import AbusMusicIcon from '../../components/AbusMusicIcon.vue';
import UrlUtils from '../../utils/url-utils';

@Component({
  name: 'MusicPlaylistDetail',
  components: {
    AbusTitle,
    AbusMusicIcon,
  },
})
export default class MusicPlaylistDetail extends Vue {
  private recomendList: Array<any> = [];
  private playListId: any | string = '';

  private total: number = 0;

  private allSong: Array<any> = [];

  private playListObj: any = {
    Tracks: [],
  };
  private playing: any;

  private get currentSong() {
    this.playing = this.$store.getters.playing;
    return this.$store.getters.currentSong;
  }

  private isCollected: boolean = false;

  private mounted() {
    this.playListId = this.$route.query.id;
    this.getPlaylistDetail();
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }

  public getPlaylistDetail() {
    MusicService.getPlaylistDetail({ id: this.playListId }).then((res) => {
      if (res.code == '200') {
        this.total = res.data.TrackCount;
        this.playListObj = res.data;
		    this.playListObj.CoverImgUrl = UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(this.playListObj.CoverImgUrl));

        let songs = [];

        this.playListObj.Tracks.forEach((item, index) => {
          songs.push({
            album: 'album',
            duration: item.Duration / 1000,
            id: item.Id,
            image: UrlUtils.addBaseUrl(
              UrlUtils.delBaseUrl(this.playListObj.CoverImgUrl)
            ),
            mid: '',
			      isLike:item.isLike,
            name: item.Name,
            singer: this.computeAuthorName(item),
			      lyricUrl:UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.LyricUrl)),
            url: UrlUtils.addBaseUrl(UrlUtils.delBaseUrl(item.Url))
          });
        });
        /* axios.get(url, {
            params: data
          }).then((res) => {
            return Promise.resolve(res.data)
          }) */
        this.allSong = songs;

        this.isCollected = Boolean(this.playListObj.isLike);
      }
    });
  }

  public computeAuthorName(item): string {
    let anthorList = [];

    item.Artists.forEach((artistItem, index) => {
      anthorList.push(artistItem.Name);
    });

    return anthorList.join(',');
  }

  private subscribePlaylist(): void {
    MusicService.subscribePlaylist({ id: this.playListId }).then((res) => {
      if (res.code == '200') {
        this.$toast(this.$i18n.t('success'));
        this.isCollected = true;
      }
    });
  }

  private unSubscribePlaylist(): void {
    MusicService.unSubscribePlaylist({ id: this.playListId }).then((res) => {
      if (res.code == '200') {
        this.isCollected = false;
        this.$toast(this.$i18n.t('CancelledSuccessfully'));
      }
    });
  }

  private goBack() {
    this.$router.go(-1);
  }

  private playSong(index) {
    this.$store.dispatch('selectPlay', {
      list: this.allSong,
      index: index,
    });
  }

  // private playAll() {}
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.music-main-ctn {
		  position: relative;
		  background: grey;
		  .cover-ctn {
		    height: 4.8rem;
		    padding: 0 0.4rem;
		    .cover-title {
		      padding-top: 0.4rem;
		
		      margin-bottom: 0.44rem;
		      .icon {
		        color: #fcfaff;
		        font-size: 0.4rem;
		      }
		    }
		    .cover-content {
		      display: flex;
		      .cover-image {
		        width: 2.4rem;
		        height: 2.4rem;
		        background: rgba(216, 216, 216, 1);
		        border-radius: 0.14rem;
		        background-position: center;
		        background-repeat: no-repeat;
		        background-size: contain;
		        margin-right: 0.26rem;
		      }
		      .cover-info {
		        flex: 1;
		        display: flex;
		        flex-direction: column;
		        justify-content: space-between;
		
		        .cover-name {
		          font-size: 0.36rem;
		          font-family: Helvetica-Bold, Helvetica;
		          font-weight: bold;
		          color: rgba(255, 255, 255, 1);
		          line-height: 0.48rem;
		        }
		        .collect-ctn {
		          display: flex;
		          align-items: center;
		          justify-content: center;
		          width: 1.7rem;
		          height: 0.5rem;
		          background: #e4002b;
		          border-radius: 0.35rem;
		          border: 0.02rem solid #e4002b;
		
		          &.disable {
		            background-color: transparent;
		            border: 0.02rem solid #ffffff;
		          }
		
		          .icon {
		            width: 0.32rem;
		            height: 0.32rem;
		            margin-right: 0.1rem;
		          }
		
		          .collect-txt {
		            font-size: 0.26rem;
		            font-family: Helvetica-Bold, Helvetica;
		            font-weight: bold;
		            color: rgba(255, 255, 255, 1);
		            line-height: 0.3rem;
		          }
		        }
		      }
		    }
		  }
		
		  .content-ctn {
		    position: fixed;
		    top: 4.8rem;
		    width: 100%;
		    bottom: 0;
		    background: rgba(255, 255, 255, 1);
		    border-radius: 0.3rem 0.3rem 0 0;
		
		    .title-top {
		      border-radius: 0.3rem 0.3rem 0 0;
		      overflow: hidden;
		      display: flex;
		      justify-content: space-between;
		      align-items: center;
		      padding: 0 0.3rem 0 0.4rem;
		      height: 0.9rem;
		      border-bottom: 1px solid rgba(239, 242, 247, 1);
		      box-shadow: 0px 1px 0px 0px rgba(239, 242, 247, 1);
		
		      .title-left {
		        font-size: 0.22rem;
		        font-family: Helvetica;
		        color: rgba(153, 153, 153, 1);
		
		        span:nth-child(1) {
		          font-size: 0.22rem;
		          font-family: Helvetica;
		          color: rgba(153, 153, 153, 1);
		          margin-right: 0.08rem;
		        }
		        span:nth-child(2) {
		        }
		      }
		      .title-right {
		        display: flex;
		        align-items: center;
		        .icon {
		          margin-right: 0.12rem;
		          font-size: 0.36rem;
		        }
		
		        > span {
		          font-size: 0.26rem;
		          font-family: PingFangSC-Semibold, PingFang SC;
		          font-weight: 600;
		          color: rgba(0, 32, 91, 1);
		        }
		      }
		    }
		
		    .collect-list-ctn {
		      position: absolute;
		      top: 0.9rem;
		      bottom: 0;
		      width: 100%;
		      overflow-y: auto;
		      padding-top: 0.32rem;
		      padding-bottom: 1rem;
		      .mysong-item {
		        position: relative;
		        margin-bottom: 0.44rem;
		        padding: 0 0.72rem 0 0.94rem;
		
		        .number-ctn {
		          position: absolute;
		          width: 0.94rem;
		          height: 100%;
		          text-align: center;
		          left: 0;
		          line-height: 0.68rem;
		
		          font-size: 0.34rem;
		          font-family: Helvetica-Bold, Helvetica;
		          font-weight: bold;
		          color: rgba(206, 206, 206, 1);
		        }
		
		        .song-info {
		          div:nth-child(1) {
		            font-size: 0.3rem;
		            margin-bottom: 0.14rem;
		            font-family: Helvetica;
		            color: rgba(46, 46, 46, 1);
		          }
		          div:nth-child(2) {
		            font-size: 0.2rem;
		            font-family: Helvetica;
		            color: rgba(102, 102, 102, 1);
		            line-height: 0.24rem;
		          }
		        }
		        .music-status-icon-ctn {
		          position: absolute;
		          width: 0.4rem;
		          height: 0.4rem;
		          top: 0.2rem;
		          right: 0.4rem;
		        }
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.music-main-ctn {
		  position: relative;
		  background: grey;
		  .cover-ctn {
		    
		    padding: 0 rpx(20);
			padding-bottom: rpx(20);
			
		    .cover-title {
		      padding-top: rpx(18);
		      margin-bottom: rpx(40);
		      .icon {
		        color: #fcfaff;
		        font-size: rpx(20);
		      }
		    }
		    .cover-content {
		      display: flex;
		      .cover-image {
		        width: rpx(100);
		        height: rpx(100);
		        background: rgba(216, 216, 216, 1);
		        border-radius:rpx(4);
		        background-position: center;
		        background-repeat: no-repeat;
		        background-size: contain;
		        margin-right: rpx(16);
		      }
		      .cover-info {
		        flex: 1;
		        display: flex;
		        flex-direction: column;
		        justify-content: space-between;
		
		        .cover-name {
		          font-size: rpx(22);
		          font-family: Helvetica-Bold, Helvetica;
		          font-weight: bold;
		          color: rgba(255, 255, 255, 1);
		          line-height: rpx(24);
		        }
		        .collect-ctn {
		          display: flex;
		          align-items: center;
		          justify-content: center;
		          width: rpx(90);
		          height: rpx(26);
		          background: #e4002b;
		          border-radius: 0.35rem;
		          border: 0.02rem solid #e4002b;
		
		          &.disable {
		            background-color: transparent;
		            border: 0.02rem solid #ffffff;
		          }
		
		          .icon {
		            width: rpx(16);
		            height: rpx(16);
		            margin-right: 0.1rem;
		          }
		
		          .collect-txt {
		            font-size: rpx(14);
		            font-family: Helvetica-Bold, Helvetica;
		            font-weight: bold;
		            color: rgba(255, 255, 255, 1);
		            line-height: rpx(22);
		          }
		        }
		      }
		    }
		  }
		
		  .content-ctn {
		    position: fixed;
		    top: rpx(206);
		    width: 100%;
		    bottom: 0;
		    background: rgba(255, 255, 255, 1);
		    border-radius: 0.3rem 0.3rem 0 0;
		
		    .title-top111 {
		      border-radius: 0.3rem 0.3rem 0 0;
		      overflow: hidden;
		      display: flex;
		      justify-content: space-between;
		      align-items: center;
		      padding: 0 0.3rem 0 0.4rem;
		      height: 0.9rem;
		      border-bottom: 1px solid rgba(239, 242, 247, 1);
		      box-shadow: 0px 1px 0px 0px rgba(239, 242, 247, 1);
		
		      .title-left {
		        font-size: 0.22rem;
		        font-family: Helvetica;
		        color: rgba(153, 153, 153, 1);
		
		        span:nth-child(1) {
		          font-size: 0.22rem;
		          font-family: Helvetica;
		          color: rgba(153, 153, 153, 1);
		          margin-right: 0.08rem;
		        }
		        span:nth-child(2) {
		        }
		      }
		      .title-right {
		        display: flex;
		        align-items: center;
		        .icon {
		          margin-right: 0.12rem;
		          font-size: 0.36rem;
		        }
		
		        > span {
		          font-size: 0.26rem;
		          font-family: PingFangSC-Semibold, PingFang SC;
		          font-weight: 600;
		          color: rgba(0, 32, 91, 1);
		        }
		      }
		    }
			
			.title-top {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: rpx(18) rpx(20);
				background: #ffffff;
				z-index: 12;
				box-sizing: border-box;
				line-height: rpx(18);
					
				.title-left {
					font-size: rpx(14);
					font-family: Helvetica;
					color: rgba(153, 153, 153, 1);
					
					span:nth-child(1) {
						font-size: rpx(14);
						font-family: Helvetica;
						color: rgba(153, 153, 153, 1);
						margin-right: rpx(6);
					}
					span:nth-child(2) {
					}
				}
				.title-right {
					display: flex;
					align-items: center;
					.icon {
						margin-right: rpx(8);
						font-size: rpx(18);
					}
					
					> span {
						font-size: rpx(16);
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: rgba(0, 32, 91, 1);
					}
				}
			}
					
		
		    .collect-list-ctn {
		      position: absolute;
		      top: rpx(56);
		      bottom: 0;
		      width: 100%;
		      overflow-y: auto;
		      padding-top: rpx(18);
		      padding-bottom: rpx(56);
		      .mysong-item {
		        position: relative;
		        margin-bottom: rpx(20);
		        padding: 0 rpx(50) ;
		
		        .number-ctn {
				      position: absolute;
				      width: rpx(50);
				      height: 100%;
				      text-align: center;
				      left: 0;
				      line-height: rpx(40);
				      font-size: rpx(20);
				      font-family: Helvetica-Bold, Helvetica;
				      font-weight: bold;
				      color: #cecece;
		        }
		
		        .song-info {
		          div:nth-child(1) {
		            font-size: rpx(16);
		            margin-bottom: rpx(12);
		            font-family: Helvetica;
		            color: rgba(46, 46, 46, 1);
		          }
		          div:nth-child(2) {
		            font-size: rpx(12);
		            font-family: Helvetica;
		            color: rgba(102, 102, 102, 1);
		            line-height: rpx(12);
		          }
		        }
		        .music-status-icon-ctn {
		          position: absolute;
		          width: 0.4rem;
		          height: 0.4rem;
		          top: 0.2rem;
		          right: 0.4rem;
		        }
		      }
		    }
		  }
		}
	}
	

</style>
