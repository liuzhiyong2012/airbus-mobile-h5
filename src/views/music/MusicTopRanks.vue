<template>
  <section class="music-main-ctn">
    <van-sticky>
      <abus-title :title="$t('title')">
        <div slot style="width: 0.3rem"></div>
      </abus-title>
    </van-sticky>
    <section class="content-ctn">
      <section class="type-item" v-for="(type,index) in typeList" :key="index">
        <div class="type-name">{{type.Name}}</div>

        <div class="playlist-ctn">
          <div
            class="playlist-item"
            v-for="(playItem,playIndex) in type.Playlists"
            :key="playIndex"
            @click="stepToPage(playItem)"
          >
            <div class="play-img-ctn" :style="{backgroundImage:`url(${playItem.CoverImgUrl})`}"></div>
            <div class="track-list-ctn">
              <div
                class="track-item"
                v-for="(tracksItem,tracksIndex) in playItem.Tracks.slice(0,3)"
                :key="tracksIndex"
              >
                <div
                  class="rank-ctn"
                  :style="{backgroundImage:`url(${rankImg[tracksIndex]})`}"
                >{{tracksIndex + 1}}</div>

                <div class="track-name">{{tracksItem.Name}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>
 <i18n>
	{
		"zh":{
			"title":"音乐",
			"favourites":"我的收藏",
			"airFm":"机上FM",
			"topRanks":"排名置顶",
			"popAlbum":"流行专辑"
		},
		"en":{
			"title":"Music",
			"favourites":"Favourites",
			"airFm":"Air Fm",
			"topRanks":"Top ranks",
			"popAlbum":"Pop Album"
		}
	}
</i18n>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue';
import MusicService from '../../service/music';
import UrlUtils from '../../utils/url-utils';
@Component({
  name: 'MusicTopRanks',
  components: {
    AbusTitle,
  },
})
export default class MusicTopRanks extends Vue {
  private typeList: Array<any> = [];
  private rankImg: any = {
    '0': require('./images/rank1.png'),
    '1': require('./images/rank2.png'),
    '2': require('./images/rank3.png'),
  };

  private mounted() {
    this.getMusicTop();
    if (localStorage.getItem('lang') == 'en') {
      this.$i18n.locale = 'en';
    } else {
      this.$i18n.locale = 'zh';
    }
  }

  public getMusicTop() {
    MusicService.getMusicTop().then((res: any) => {
      if (res.code == '200') {
        this.typeList = res.data.Types;
        this.typeList.forEach((item,index)=>{
          item.Playlists.forEach((item1,index1)=>{
            item1.CoverImgUrl = UrlUtils.addBaseUrl( UrlUtils.delBaseUrl(item1.CoverImgUrl));
          });
        });
      }
    });
  }

  private stepToPage(item: any): void {
    this.$router.push({
      name: 'musicPlaylistDetail',
      query: {
        id: item.Id,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		.music-main-ctn {
		  .content-ctn {
		    margin-bottom: 1.0rem;
		    .type-item {
		      .type-name {
		        padding: 0 0.3rem;
		        line-height: 1rem;
		        font-size: 0.36rem;
		        font-family: Helvetica-Bold, Helvetica;
		        font-weight: bold;
		        color: rgba(51, 51, 51, 1);
		      }
		
		      .playlist-ctn {
		        padding: 0.5rem 0.3rem;
		        background: #ffffff;
		        .playlist-item {
		          display: flex;
		          &:not(:last-child) {
		            margin-bottom: 0.5rem;
		          }
		
		          .play-img-ctn {
		            width: 2.1rem;
		            height: 1.76rem;
		            background: blue;
		            background-position: center;
		            background-repeat: no-repeat;
		            background-size: cover;
		            overflow: hidden;
		            border-radius: 0 0.42rem 0 0;
		            margin-right: 0.3rem;
		          }
		          .track-list-ctn {
		            display: flex;
		            flex-direction: column;
		            justify-content: space-between;
		            flex: 1;
		            .track-item {
		              position: relative;
		              .rank-ctn {
		                position: absolute;
		                top: 0;
		                left: 0;
		                width: 0.42rem;
		                height: 0.42rem;
		                font-size: 0.24rem;
		                font-family: Helvetica-Bold, Helvetica;
		                font-weight: bold;
		                color: rgba(255, 255, 255, 1);
		                line-height: 0.42rem;
		                text-align: center;
		                background-position: center;
		                background-repeat: no-repeat;
		                background-size: contain;
		              }
		              .track-name {
		                width: 4.34rem;
		                padding-left: 0.7rem;
		                overflow: hidden;
		                text-overflow: ellipsis;
		                white-space: nowrap;
		                font-size: 0.3rem;
		                font-family: PingFangSC-Medium, PingFang SC;
		                font-weight: 500;
		                color: rgba(46, 46, 46, 1);
		                line-height: 0.42rem;
		              }
		            }
		          }
		        }
		      }
		    }
		  }
		}
	}
	
	@media  (orientation:landscape) {
		.music-main-ctn {
		  .content-ctn {
		    margin-bottom: 1.0rem;
		    .type-item {
		      .type-name {
		        padding: 0 rpx(20);
		        line-height: rpx(70);
		        font-size:  rpx(18);
		        font-family: Helvetica-Bold, Helvetica;
		        font-weight: bold;
		        color: rgba(51, 51, 51, 1);
		      }
		
		      .playlist-ctn {
		        padding:rpx(20);
		        background: #ffffff;
		        .playlist-item {
		          display: flex;
		          &:not(:last-child) {
		            margin-bottom: rpx(20);
		          }
		
		          .play-img-ctn {
		            width: rpx(106);
		            height: rpx(88);
		            background: blue;
		            background-position: center;
		            background-repeat: no-repeat;
		            background-size: cover;
		            overflow: hidden;
		            border-radius: 0 rpx(20) 0 0;
		            margin-right: rpx(20);
		          }
		          .track-list-ctn {
		            display: flex;
		            flex-direction: column;
		            justify-content: space-between;
		            flex: 1;
		            .track-item {
		              position: relative;
		              .rank-ctn {
		                position: absolute;
		                top: 0;
		                left: 0;
		                width: rpx(22);
		                height: rpx(22);
		                font-size: rpx(12);
		                font-family: Helvetica-Bold, Helvetica;
		                font-weight: bold;
		                color: rgba(255, 255, 255, 1);
		                line-height:rpx(22);
		                text-align: center;
		                background-position: center;
		                background-repeat: no-repeat;
		                background-size: contain;
		              }
		              .track-name {
		                width: 4.34rem;
		                padding-left: rpx(32);
		                overflow: hidden;
		                text-overflow: ellipsis;
		                white-space: nowrap;
		                font-size: rpx(16);
		                font-family: PingFangSC-Medium, PingFang SC;
		                font-weight: 500;
		                color: rgba(46, 46, 46, 1);
		                line-height: rpx(22);
		              }
		            }
		          }
		        }
		      }
		    }
		  }
		}
	}

</style>
