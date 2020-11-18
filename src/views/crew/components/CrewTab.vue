<template>
  <div class="crew-tab">
    <div
      class="tab-item"
      v-for="(item, index) in tabList"
      :class="{ active: item.routeName == $route.name }"
      @click="switchPage(item)"
      :key="index"
    >
      {{ $t(item.name) }}
	  <!-- {{item.value}} -->
	   <span class="message-count" v-if="(item.value == 'cabinLayout')&&(messageCount > 0)">
	   {{
		  messageCount
	    }}
		
	   </span>
    </div>
  </div>
</template>

<i18n>
	{
		"zh":{
			"Catering":"餐饮",
			"Data package":"流量套餐",
			"Goods":"商品",
			"Income statistics":"收入统计",
			"Cabin layout":"客舱消息"
		},
		"en":{
			"Catering":"Catering",
			"Data package":"Data package",
			"Goods":"Goods",
			"Income statistics":"Income statistics",
			"Cabin layout":"Cabin message"
		}
	}
</i18n>

<script lang = "ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CabinLayoutService from '../../../service/crew/cabin-layout';

@Component({
  name: 'CrewTab',
  components: {},
})
export default class CrewTab extends Vue {
	
  @Prop({
    default: () => {
      return [];
    },
  })
  tabList: Array<any>;

  @Prop({
    default: () => {
      return false;
    },
  })
  active: boolean;
  
  private msgListener: any = null;
  private updateMessageCountListener: any = null;
  
  
  
  private messageCount:number = 0;
  
  private created(){
	  this.getSeatMessageInfo();
	  this.startWebScoket();
  }
  private activated(){
  }
  
  private beforeDestroy() {
    (this as any).$globalEvent.$off('new_msg', this.msgListener);
    (this as any).$globalEvent.$off('updateMessageCount', this.updateMessageCountListener);
  }
  
  public switchPage(item) {
    this.$router.push({
      name: item.routeName,
    });
    // this.$emit('switchPage',item.value);
  }
  
  private startWebScoket() {
    this.msgListener = (msg) => {
		  if (msg.type != 'crew') {
			  this.messageCount = 0;
			  this.getSeatMessageInfo();
		  }
    };
	
	this.updateMessageCountListener = (msg) => {
		 this.getSeatMessageInfo();
	};
	
    (this as any).$globalEvent.$on('new_msg', this.msgListener);
    (this as any).$globalEvent.$on('updateMessageCount', this.updateMessageCountListener);
  }
  
  //获取未读消息与座位的映射关系
  public getSeatMessageInfo(): void {
    CabinLayoutService.getSeatMessageInfo().then((resData: any) => {
      if (resData.code == '200') {
		 let total = 0;
        resData.data.forEach((item, index) => {
         total = total + item.total;
        });
		this.messageCount = total;
      }
    });
  }
  
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/index.scss";
@function rem($px) {
  //$px为需要转换的字号
  @return $px / 100px * 1rem; //100px为根字体大小
}

.crew-tab {
  display: flex;
  padding: rem(60px) rem(90px);

  .tab-item {
    position: relative;

    font-size: rem(40px);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: rem(40px);
    padding-bottom: rem(22px);
    margin-right: rem(90px);

    &.active {
      &:after {
        position: absolute;
        content: "";
        height: rem(6px);
        background: rgba(132, 189, 0, 1);
        left: 0;
        bottom: 0;
        width: 100%;
      }
    }
	
	.message-count {
	          display: inline-block;
	              position: absolute;
	              top: -0.2rem;
	              right: -0.3rem;
	              /* width: 0.4rem; */
	              height: 0.4rem;
	              text-align: center;
	              line-height: 0.4rem;
	              font-size: 0.26rem;
	              font-weight: 400;
	              color: white;
	              background: #fe5000;
	              border-radius: 0.20rem;
	              padding: 0 0.12rem;
	        }
  }
}
</style>

