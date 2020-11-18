<template>
  <section class="servive-detail">
    <van-sticky>
      <abus-title :title="ServiceDetail.EnglishTitle" v-if="lang == 'en'">
        <div slot style="width:0.3rem"></div>
      </abus-title>
      <abus-title :title="ServiceDetail.Title" v-if="lang == 'zh'">
        <div slot style="width:0.3rem"></div>
      </abus-title>
    </van-sticky>
    <div class="service-info" v-html="ServiceDetail.FullDescription"></div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { localStore } from "../../utils/data-management";
import AbusTitle from "@/components/AbusTitle.vue";
import MeService from "../../service/me";

@Component({
  name: "ServiceDetailPage",
  components: {
    AbusTitle,
  },
})
export default class ServiceDetailPage extends Vue {
  private ServiceDetail: any = {};
  private lang: String  = '';
  private created() {
    this.getServiceItem();
  }

  private mounted() {
    if (localStorage.getItem("lang") == "en") {
      this.$i18n.locale = "en";
      this.lang = 'en'
    } else {
      this.$i18n.locale = "zh";
      this.lang = 'zh'
    }
    window.scrollTo(0, 0);
  }

  public goBack(): void {
    this.$router.go(-1);
  }
  public getServiceItem() {
    MeService.ServiceItem({
      Item: "AboutMeItem",
    }).then((res) => {
      this.ServiceDetail = res.data;
	    this.ServiceDetail.FullDescription = this.ServiceDetail.FullDescription.replace(new RegExp("http://kf.vpclub.cn/airbusifeimg","g"),process.env.VUE_APP_STATIC_URL);
	  
    });
  }
}
</script>
<style lang="scss" scoped>
.service-info {
  // width: 96%;
  padding: 0.25rem;
  background: #fff;
  line-height: 0.36rem;
  text-align: justify;
  font-size: 0.3rem;
  // color: #333333;
  font-weight: 400;
  color: #666666;
  /deep/ img {
    width: 100%;
  }
}
</style>
