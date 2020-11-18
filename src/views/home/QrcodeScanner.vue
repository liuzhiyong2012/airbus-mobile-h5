<template>
  <div>
    <div id="qr-code-full-region"></div>
  </div>
</template>

<script>
export default {
  props: {
    qrbox: Number,
    fps: Number,
  },
  mounted: function () {
    var $this = this;
    var config = { fps: this.fps ? this.fps : 10 };
    if (this.qrbox) {
      config["qrbox"] = this.qrbox;
    }

    function onScanSuccess(qrCodeMessage) {
      $this.$root.$emit("decodedQrCode", qrCodeMessage);
      console.log(qrCodeMessage);
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-code-full-region",
      config
    );
    html5QrcodeScanner.render(onScanSuccess);
  },
};
</script>

<style lang="scss" scoped>
</style>