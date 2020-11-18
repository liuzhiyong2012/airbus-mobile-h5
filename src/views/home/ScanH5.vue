<template>
  <div>
    <div class="section" style="width: 7.5rem; margin: auto;">
      <qrcode-scanner v-bind:qrbox="250" v-bind:fps="10" style="width: 7.5rem;"></qrcode-scanner>
    </div>
    <div class="footer" style="margin-bottom: 20px;">{{ result }}</div>
    
    <div id="reader" width="600px"></div>
  </div>
</template>

<script>
import QrcodeScanner from "./QrcodeScanner";

export default {
  components: {
    QrcodeScanner,
  },
  data() {
      return {
          result:''
      }
  },
  created() {
    this.$root.$on(
      "decodedQrCode",
      function (qrCodeMessage) {
        this.decodedMessage = qrCodeMessage;
        this.result = qrCodeMessage;
      }.bind(this)
    );
  },
};
</script>

<style lang="scss" scoped>
</style>