<template>
  <div class="abus-height">
      <abus-title :title="$t('Comments')" :backRouteName="[isLikePlay?'likePlay':'videoPlay']" :params="params"></abus-title>
    <div class="comment-mask">
      
      <div class="comment-list">
        <div class="list-cell" v-for="(i,aIndex) in Comments" :key="aIndex">
          <div class="list-l">
            <div class="img-box">{{getOneText(i.Creator.NickName)}}</div>
          </div>
          <div class="list-r">
            <div class="name">{{i.Creator.NickName}}</div>
            <div class="comment">{{i.Comment}}</div>
          </div>
        </div>
      </div>

      <div class="comment-init">
        <input
          v-model="Comment"
          class="input-box"
          type="text"
          :placeholder="$t('CommentsPlaceholder')"
        />
        <div class="btn-box">
          <div class="btn" @click="sendComment(videoId)">{{$t('Send')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
	{
		"zh":{
      "Send": "发送",
      "CommentsPlaceholder": "留下你精彩的评论",
      "Comments":"评论"
		},
		"en":{
      "Send":"Send",
      "CommentsPlaceholder": "Leave your wonderful comments",
      "Comments": "Comments"
		}
	}
</i18n>
<script lang="ts">
import {Component,Prop,Vue} from 'vue-property-decorator'
import VideoService from '../../../service/video'
import AbusTitle from "../../../components/AbusTitle.vue";
@Component({
    name: 'Comment',
    components:{
        AbusTitle
    }
})
export default class videoComment extends Vue{
    private videoId: any = ''
    private videoListIndex: any = ''
    private Comments: Array<any> = []
    private Comment: any = ''
    private isLikePlay: Boolean = false
    private params: Object = {}
    
    private mounted() {
      if (localStorage.getItem("lang") == "en") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
        // this.videoListIndex = this.$route.params.videoListIndex
        this.videoId = this.$route.params.videoId
        this.getVideoCommentsList(this.$route.params.videoId)
        console.log(this.$route.params.videoListIndex)
        this.params = {
            index:this.$route.params.videoListIndex
        }
        if(this.$route.params.type == 'likePlay'){
          this.isLikePlay = true
        }
    }
    public getVideoCommentsList(id:any){
        VideoService.getVideoCommentsList({
      videoId: id,
    }).then((res: any) => {
      if (res.code == 200) {
        this.Comments = res.data.Comments;
      }
    });
    }
    // 取首字母
  public getOneText(str: string) {
    return str.substring(0, 1);
  }
  // 发送评论
  public sendComment( id: any) {
    if(!this.Comment){
      if (localStorage.getItem("lang") == "en") {
        this.$toast('please input content!')
      } else {
        this.$toast('请输入评论！')
      }
      return;
    }
    
    let data = {
      VideoId: id,
      Comment: this.Comment,
    };
    VideoService.postVideoComments(data).then((res: any) => {
      if (res.code == 200) {
        this.Comment= ''
        VideoService.getVideoCommentsList({
          videoId: id,
        }).then((res: any) => {
          if (res.code == 200) {
            this.Comments = res.data.Comments;
          }
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.comment-mask {
  width: 100%;
  height: 100vh;
  padding: 0 0 1rem 0;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 0.2rem 0.2rem 0 0;
  overflow: hidden;
  z-index: 100;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
  touch-action: cross-slide-y;
 
  .comment-list {
    padding: 0.3rem 0 1rem;
    height: 100%;
    box-sizing: border-box;
    min-height: 3rem;
    overflow-y: auto;
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
    position: fixed;
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
</style>