<template>
  <div class="scanPage">
    <abus-title title="Scan" backRootName="home">
      <div slot style="width:0.3rem"></div>
    </abus-title>
    <!-- <iframe
      ref="iframe"
      name="child"
      id="child"
      :src="qrCodeUrl"
      width="100%"
      frameborder="0"
      
    ></iframe> -->
    <!-- scrolling="no" -->
  </div>
</template>

<script>
import AbusTitle from '../../components/AbusTitle.vue';
export default {
  components: {
    AbusTitle,
  },
  data() {
    return {
      qrCodeUrl:'',
    };
  },
  created() {
    // this.qrCodeUrl = ` https://qrcodescan.in/`
    // window.location.href = `https://qrcodescan.in/`;
    // this.qrCodeUrl = `https://kf.vpclub.cn/scan/`
    window.location.href = 'https://kf.vpclub.cn/scan/';
  },
  mounted() {
    const oIframe = document.getElementById('child');
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) - 48 + 'px'; //数字是页面布局高度差
  },

  destroyed() {},
  methods: {},
};
</script>

<style scoped></style>
