<template>
  <div>
    <van-row type="flex" justify="space-around" v-if="aLength % 2 === 0">
      <van-col span="11" v-for="{val, index} in aLength" :key="index">
        <div class="box"></div>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-around" v-else>
      <van-col span="11" v-for="(val, index) in aLength" :key="index">
        <div class="box"></div>
      </van-col>
      <van-col span="11"></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aLength: 10
    };
  }
};
</script>

<style lang="scss" scoped>
	
.van-row {
  flex-wrap: wrap;
  justify-content: space-around;
}

.van-col {
  margin-bottom: 10px;
  color: #fff;
  font-size: 13px;

  text-align: center;
  background-clip: content-box;

  .box {
    width: 100%;
    height: 20px;
    line-height: 30px;
    background: cornflowerblue;
  }
}
</style>