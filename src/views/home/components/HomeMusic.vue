<template>
  <div
    class="abus-scroller-box music-box"
    :style="{'backgroundColor': isHaveData?'#fff':'#f2f4f7'}"
  >
    <div
      v-for="(item,index) in musicList.slice(0,3)"
      class="music-list"
      :key="index"
      @click="stepToPage(item)"
    >
      <div class="music-l">
        <div class="img">
          <img :src="item.CoverImgUrl|addBaseUrl" :alt="item.Name" width="100%" />
        </div>
      </div>
      <div class="f1">
        <div class="name">{{item.Name}}</div>
        <div class="author">播放量:{{item.PlayCount}}</div>
      </div>
      <!-- <van-icon name="play-circle" color="rgb(229,232,228)" size="20" /> -->
      <svg class="icon icon-p" aria-hidden="true">
        <use xlink:href="#icon-play-disable" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MusicService from '../../../service/music';

@Component({
  name: 'HomeMusic',
  components: {},
})
export default class HomeMusic extends Vue {
  private musicList: Array<any> = [];
  private isHaveData: boolean = false;
  private created() {
    this.getMusicPlaylistHot();
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
    } else {
      this.$i18n.locale = "zh";
    }
  }
  public getMusicPlaylistHot_old() {
    MusicService.getMusicFM().then((res: any) => {
      if (res.code == 200) {
        this.musicList = res.data.Songs;
      }else{
		  
	  }
    });
  }

  private getMusicPlaylistHot() {
    MusicService.getMusicPlaylistHot({
      take: 10,
      skip: 0,
    }).then((resData: any) => {
      if (resData.code == 200) {
        this.isHaveData = true;
        this.musicList = resData.data.Playlists;
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
.music-box {
  padding: 0 0.28rem;
  margin: 0 0.28rem;
  background-color: #fff;
  border-radius: 0.1rem;
  :last-child {
    border-bottom: none;
  }
}
.music-list {
  display: flex;
  padding: 0.28rem 0;
  border-bottom: 0.02rem solid #efefef;
  align-items: center;
  .music-l {
    display: flex;
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 0.12rem;
    background-color: #2d2d2d;
    align-items: center;
    .img {
      width: 100%;
    }
  }

  .f1 {
    flex: 1;
    margin: 0 0 0 0.16rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    .name {
      flex: 1;
      font-size: 0.28rem;
      color: #666;
      line-height: 0.5rem;
      font-weight: 500;
    }
    .author {
      flex: 1;
      font-size: 0.24rem;
      color: #999;
      line-height: 0.5rem;
    }
  }
}
</style>