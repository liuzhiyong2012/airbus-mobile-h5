<template>
  <transition name="list-fade">
    <div v-show="showFlag" class="playlist-box" @click="hide">
      <div class="playlist" @click.stop>
        <!-- 头部 -->
        <div class="list-header">
			<span class="song-total">Currently playing ({{sequenceList.length}})</span>
			<i class="icon icon-toggle-down" @click="hide"></i> 
          <!-- <h1>
            <img v-if="modeText === '顺序播放'" src="./img/sequence.png" alt="顺序">
            <img v-if="modeText === '单曲循环'" src="./img/loop.png" alt="单曲">
            <img v-if="modeText === '随机播放'" src="./img/random.png" alt="随机">
            <span>{{modeText}}</span>
            <span class="del" @click="showConfirm">
              <img src="./img/del.png" alt="清空">
            </span>
          </h1> -->
        </div>
        <!-- 歌曲列表 -->
        <Scroll class="list-con-ctn" :data="sequenceList" ref="listContent">
          <!-- <transition-group ref="list" name="list-li" tag="ul"> -->
            <li ref="listItem" :class="{playing:getCurrentIcon(item)}" v-for="(item, index) in sequenceList" :key="index" @click="selectItem(item, index)">
              <div class="lihear-img-box">
                <span class="number-ctn">
                  {{index + 1}}
                </span>
                
                <abus-music-icon class="music-ctn" color="#ffffff" :playingStatus='playing'></abus-music-icon>
              </div>
              <p class="list2-con">{{ item.name }}</p>
			  
              <div class="list-end">
               <i class="icon icon-music-delete" @click.stop="deleteOne(item)"></i>
			   
                <!-- <img @click.stop="deleteOne(item)" class="cha" src="./img/smldel.png" alt=""> -->
              </div>
            </li>
          <!-- </transition-group> -->
        </Scroll>
		
		<!-- <Scroll class="list-con" :data="sequenceList" ref="listContent">
		  <transition-group ref="list" name="list-li" tag="ul">
		    <li ref="listItem" v-for="(item, index) in sequenceList" :key="index" @click="selectItem(item, index)">
		      <div class="lihear-img-box">
		        <img v-if="getCurrentIcon(item)" src="./img/playButton.png" alt="">
		      </div>
		      <p class="list2-con">{{ item.name }}</p>
		      <div class="list-end">
		        <span class="collect-box" @click.stop="toggleFavoriteList(item)">
		          <img v-if="getFavoriteListCollect(item)" src="./img/collect.png" alt="">
		          <img v-else src="./img/collect2.png" alt="">
		        </span>
		        <img @click.stop="deleteOne(item)" class="cha" src="./img/smldel.png" alt="">
		      </div>
		    </li>
		  </transition-group>
		</Scroll> -->
		
        <!-- <div class="list-operate">
          <div class="add-song">
            <img src="./img/songListAdd.png" alt="添加歌曲">
            <span class="text" @click="showAddSong">添加歌曲到队列</span>
          </div>
        </div> -->
       <!-- <div @click="hide" class="list-close">
          <span>关闭</span>
        </div> -->
      </div>
      <!-- 确认清除 -->
      <!-- <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm> -->
      <!-- 添加播放列表 -->
      <!-- <addSong ref="addSong" class="addSong"></addSong> -->
      <!-- 弹出提示信息 -->
      <!-- <TopTip ref="topTip">
        <div class="tip-title">
          <span class="text">已从播放列表中删除</span>
        </div>
      </TopTip> -->
    </div>
  </transition>
</template>
<i18n>
	{
		"zh":{
			
		},
		"en":{
			
		}
	}
</i18n>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playMode } from '../../js/config';
import Scroll from '../../base/scroll/scroll';
// import Confirm from "../../base/confirm/confirm";
// import addSong from "components/addSong/addSong";
import { playerMixin } from '../../js/mixin';

import AbusMusicIcon from '../../../../components/AbusMusicIcon.vue';

// import TopTip from "../../base/topTip/topTip";

export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 120,
      collect: false
    };
  },
  components: {
    Scroll,
	AbusMusicIcon
    // Confirm,
    // addSong,
    // TopTip
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.random ? '随机播放' : '单曲循环';
    },
    ...mapGetters(['sequenceList', 'currentSong', 'playlist', 'mode', 'playing'])
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        // dom渲染后再去计算
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    /* 列表当前播放显示图标 */
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return true;
      }
      return false;
    },
    /* 进入播放列表时跳转到当前播放歌曲的位置 */
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
    },
    // 清空列表弹出确认组件
    showConfirm() {
      this.$refs.confirm.show();
    },
    // 确认清空列表
    confirmClear() {
      this.deleteSongList();
    },
    /* 歌曲列表点击 */
    selectItem(item, index) {
      this.showFlag = false;
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    // 删除当前播放列表中的某一条
    deleteOne(item) {
      this.deleteSong(item);
      this.$refs.topTip.show();
      if (!this.playlist.length) {
        this.hide();
      }
    },
    // 添加收藏
    getFavoriteListCollect(song) {
      if (this.isFavoriteList(song)) {
        return false;
      } else {
        return true;
      }
    },
    // 点击收藏
    toggleFavoriteList(song) {
      if (this.isFavoriteList(song)) {
        this.deleteFavoriteList(song);
        // this.$refs.topTip.show();
      } else {
        this.saveFavoriteList(song);
      }
    },
    // 判断当前播放歌曲是否收藏
    isFavoriteList(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    // 给播放列表添加歌曲
    showAddSong() {
      // this.$refs.addSong.show();
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'deleteSong',
      'deleteSongList',
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(() => {
        this.scrollToCurrent(newSong);
      }, 20);
    }
  }
};
</script>

<style scoped lang="scss">
// @import "assets/css/mixin.scss";

$screen-width: 37.5;

@function rem($px) {
  	@return $px / $screen-width * 1rem;
}

.playlist-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.3);
}
.playlist {
  width: 100%;
  height:70%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.50rem 0.40rem 0;
  background: #333333;
  box-sizing: border-box;
  font-size: rem(14);
}
.list-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.29rem;
  .song-total{
	  font-size:0.16rem;
	  font-family:Helvetica-Bold,Helvetica;
	  font-weight:bold;
	  color:rgba(255,255,255,1);
	  line-height:0.20rem;
  }
  .icon{
	  color:#ffffff;
	  font-size: 0.20rem;
  }
  
}

.del {
  float: right;
}
.list-con-ctn {
  width: 100%;
  max-height: 61.8vh;
  overflow: hidden;
  overflow-y: auto;
  
   li{
	   font-size: 0;
	   &.playing{
		   .lihear-img-box{
			   .number-ctn{
			   	display: none !important;
			   }
			   .music-ctn{
			   	display: block !important;
			   }
		   }
		   .list2-con{
			   overflow: hidden;
			   text-overflow: ellipsis;
			   white-space: nowrap;
			   font-weight:bold;
		   }
		   
	   }
	   
	  position: relative;
	  width: 100%;
	  overflow: hidden;
	  position: relative;
	  margin-bottom: 0.40rem;
	  
	  
	  .lihear-img-box {
	  	position: absolute;
	  	left:0;
	  	top:0;
	    width: 0.40rem;
		height: 0.40rem;
		text-align: center;
		line-height: 0.40rem;
		
		.number-ctn{
			display: block;
			
			font-size:0.18rem;
			font-family:Helvetica-Bold,Helvetica;
			font-weight:bold;
			color:rgba(206,206,206,1);
			line-height:0.20rem;
		}
		.music-ctn{
			display: none;
		}
	  
	  }
	  
	  .list2-con {
	    padding:0 0.55rem;
		font-size:0.16rem;
		font-family:Helvetica-Bold,Helvetica;
		color:rgba(255,255,255,1);
		line-height:0.20rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight:bold;
	  }
	  
	  .list-end {
	    position: absolute;
	    top: 0;
	    right: 0;
	    width: 0.20rem;
	    height:  0.20rem;
		
		>.icon{
			color: #ffffff;
			font-size: 0.20rem;
		}
	    
	  }
	  
  }
}



.cha {
  margin-left: rem(10);
}
.list-operate {
  width: rem(140);
  height: rem(30);
  margin: rem(20) auto;
  margin-bottom: rem(70);
}
.add-song {
  width: 100%;
  height: rem(30);
  box-sizing: border-box;
  padding: rem(8) rem(16);
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: rem(100);
  color: hsla(0, 0%, 100%, 0.5);
  font-size: rem(12);
}
.add-song img {
  width: rem(12);
  height: rem(12);
  vertical-align: middle;
}
.list-close {
  width: 100%;
  text-align: center;
  line-height: rem(50);
  background: #222;
  font-size: rem(16);
  color: hsla(0, 0%, 100%, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
}
.list-fade-enter {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
.list-fade-leave-to {
  transform: translate3d(0, 100%, 0);
}
.list-fade-leave {
  opacity: 1;
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.3s;
}
// 删除列表动画
.list-li-enter-active,
.list-li-leave-active {
  transition: all 0.2s linear;
}
.list-li-enter,
.list-li-leave-to {
  height: 0;
}
.tip-title {
  text-align: center;
  padding: rem(18) 0;
  font-size: 0;
}

.tip-title .text {
  font-size: rem(14);
  color: #fff;
}
.collect-box {
  display: inline-block;
  width: rem(25);
  height: rem(40);
}
</style>
