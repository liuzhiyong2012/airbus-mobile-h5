<template>
  <div class="game-ctn">
    <van-sticky>
      <abus-title :title="$t('title')" backRouteName="home">
        <div slot style="width:0.3rem"></div>
      </abus-title>
    </van-sticky>

    <div class="game-box">
      <div class="game-item" v-for="(item, index) in gameList" :key="index">
        <div class="game" @click="goToDetail(item)">
          <div class="game-img">
            <img class="game-img-up" :src="item.CoverImgPath |addBaseUrl" alt="" />
            <!-- <div class="game-img-down">
              <img class="img" :src="item.CoverImgPath |addBaseUrl" alt="" />
              <img class="img" :src="item.CoverImgPath |addBaseUrl" alt="" />
            </div> -->
          </div>
          <div>
            <div class="game-name game-word">{{ item.Name }}</div>
            <div class="game-tips game-word">{{ item.Description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
			"title":"游戏"
		},
		"en":{
			"title":"Game"
		}
	}
</i18n>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AbusTitle from '../../components/AbusTitle.vue'; 
import GameService from '../../service/game';
import { component } from 'vue/types/umd';
@Component({
  name: 'GameIndex',
  components: {
    AbusTitle,
  },
})
export default class GameIndex extends Vue {
  private gameList: Array<any> = [
    // {
    //   CoverImgId: "8FFBC49A-7123-E911-BD22-C4209D3E3B89",
    //   CoverImgPath:
    //     "http://172.16.125.11:8010/0324a7ed-bc83-4b09-bac1-27f74c948bc4",
    //   Description:
    //     "童年回忆 ↵一款由俄罗斯人阿列克谢·帕基特诺夫于1984年6月发明的休闲游戏。",
    //   GameUrl: "http://game.service.osp.connectivity.aero/?lan=zh",
    //   Id: "d7fbc49a-7123-e911-bd22-c4209d3e3b89",
    //   Name: "俄罗斯方块",
    //   Tags: "",
    //   TypeId: "482ac820-7123-e911-bd22-c4209d3e3b89",
    //   TypeName: "经典游戏",
    // },
  ];
  private created() {
    window.scrollTo(0, 0);
    this.getGameList();
  }
  private mounted() {}

  public goBack() {
    this.$router.go(-1);
  }

  // 获取游戏列表
  public getGameList() {
    GameService.getGameList().then((res) => {
      if (res.code == 200) {
        console.log('游戏列表', res.data);
        this.gameList = res.data.Games;
      }
    });
  }

  public goToDetail(item: any) {
    //进入游戏详情
	   this.$router.push({
		  name: 'gameDetail',
		  query: {
			gameUrl: item.GameUrl,
		  }
		});
		
  }
}
</script>

<style lang="scss" scoped>
	@import '../../assets/style/index.scss';
	
	@media  (orientation:portrait) {
		
		.game-ctn{
			.scroller-box {
			  margin: 0;
			  padding: 0;
			  width: 100%;
			  height: 2.14rem;
			  background: #fff;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  .scroller-item {
			    width: 33.33%;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    flex-direction: column;
			    font-size: 0.24rem;
			    color: #2e2e2e;
			    .scoller-name {
			      margin-top: 0.17rem;
			    }
			  }
			}
			
			.block-title-background {
			  background-color: #fafafa00;
			  font-size: 0.36rem;
			}
			
			.game-box {
			  display: flex;
			  flex-wrap: wrap;
			  padding-top: 0.3rem;
			  background: rgba(247, 247, 247, 1);
			
			  .game-item {
			    box-sizing: border-box;
			    width: 44%;
			    margin: 0 0.13rem 0.3rem 0.3rem;
			
			    .game {
			      width: 100%;
			      background: #fff;
			      border-radius: 0.14rem;
			      box-shadow: 0 0 0.1rem #efefef;
			      box-sizing: border-box;
			      padding-bottom: 0.2rem;
			      .game-img {
			        width: 100%;
			        display: flex;
			        flex-direction: column;
			        justify-content: center;
			        align-items: center;
			
			        .game-img-up {
			          width: 100%;
			          border-radius: 0.14rem 0.14rem 0 0;
			          margin-bottom: 0.02rem;
			        }
			
			        .game-img-down {
			          margin: 0;
			          width: 100%;
			          display: flex;
			          align-items: center;
			          justify-content: space-between;
			          .img {
			            width: 49.5%;
			          }
			          :nth-child(even) {
			            margin: 0;
			          }
			        }
			      }
			      .game-name {
			        font-weight: bold;
			        font-size: 0.26rem;
			        color: #2e2e2e;
			        font-family: Helvetica-Bold, Helvetica;
			        padding: 0.15rem 0 0 0.05rem;
			        line-height: 0.3rem;
			        margin: 0;
			      }
			      .game-tips {
			        font-size: 0.22rem;
			        font-family: Helvetica;
			        color: rgba(51, 51, 51, 0.6);
			        padding: 0.15rem 0 0 0.05rem;
			        line-height: 0.3rem;
			        margin: 0 -0.25rem 0 0;
			      }
			      .game-word {
			        text-overflow: -o-ellipsis-lastline;
			        overflow: hidden;
			        text-overflow: ellipsis;
			        display: -webkit-box;
			        -webkit-line-clamp: 3;
			        -webkit-box-orient: vertical;
			      }
			    }
			  }
			  :nth-child(even) {
			    margin: 0 0.3rem 0.3rem 0.13rem;
			  }
			}
		}
	}
	
	@media  (orientation:landscape) {
		
		.game-ctn{
			.scroller-box {
			  margin: 0;
			  padding: 0;
			  width: 100%;
			  height: 2.14rem;
			  background: #fff;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  .scroller-item {
			    width: 33.33%;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    flex-direction: column;
			    font-size: 0.24rem;
			    color: #2e2e2e;
			    .scoller-name {
			      margin-top: 0.17rem;
			    }
			  }
			}
			
			.block-title-background {
			  background-color: #fafafa00;
			  font-size: 0.36rem;
			}
			
			.game-box {
			  // display: flex;
			  flex-wrap: wrap;
			  padding-top: rpx(14);
			  background: rgba(247, 247, 247, 1);
			  text-align: center;
			
			  .game-item {
				  display: inline-block;
			    width: rpx(200);
			    padding: rpx(8);
			
			    .game {
					text-align: left;
			      width: 100%;
			      background: #fff;
			      border-radius: rpx(4);
			      box-shadow: 0 0 0.1rem #efefef;
			      box-sizing: border-box;
			      // padding-bottom: 0.2rem;
			      .game-img {
			        width: 100%;
			        display: flex;
					height: rpx(430);
			        flex-direction: column;
			        justify-content: center;
			        align-items: center;
			
			        .game-img-up {
			          width: 100%;
			          border-radius: rpx(4) rpx(4) 0 0;
			          margin-bottom: 0.02rem;
			        }
			
			        .game-img-down {
			          margin: 0;
			          width: 100%;
			          display: flex;
			          align-items: center;
			          justify-content: space-between;
			          .img {
			            width: 49.5%;
			          }
			          :nth-child(even) {
			            margin: 0;
			          }
			        }
			      }
			      .game-name {
					  white-space: nowrap;
					  overflow: hidden;
					  text-overflow: ellipsis;
			        font-weight: bold;
			        font-size: rpx(16);
			        color: #2e2e2e;
			        font-family: Helvetica-Bold, Helvetica;
			        padding: rpx(14) rpx(10) 0;
			        line-height: rpx(16);
			        margin: 0;
			      }
			      .game-tips {
			        font-size: rpx(12);
			        line-height: rpx(16);
			        font-family: Helvetica;
			        color: rgba(51, 51, 51, 0.6);
                    padding: rpx(6)  rpx(10) rpx(14);
			      }
			      .game-word {
			        text-overflow: -o-ellipsis-lastline;
			        overflow: hidden;
			        text-overflow: ellipsis;
			        display: -webkit-box;
			        -webkit-line-clamp: 3;
			        -webkit-box-orient: vertical;
			      }
			    }
			  }
			  /* :nth-child(even) {
			    margin: 0 0.3rem 0.3rem 0.13rem;
			  } */
			}
		}
	}



</style>
