<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/style/variables.scss";
svg.icon {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.28rem;
  color: $font-color-theme;
  background-color: $background-color-theme;
  font-family: Helvetica-Bold, Helvetica;
}
.abus-height {
  min-height: 100vh;
}
.abus-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.abus-block-title {
  margin: 0;
  padding: 0.4rem 0 0.2rem;
  color: rgb(51, 51, 51);
  font-weight: normal;
  font-size: 0.32rem;
  line-height: 0.32rem;
}
.block-title-background {
  color: rgb(51, 51, 51);
  font-size: 0.36rem;
  font-weight: bold;
}
.van-tab {
  font-size: 0.28rem !important;
}
.van-tabs--line .van-tabs__wrap {
  height: 0.88rem !important;
}
.van-stepper__input {
  width: 0.58rem !important;
  height: 0.56rem !important;
  font-size: 0.24rem !important;
}
.van-stepper__minus {
  width: 0.56rem !important;
  height: 0.56rem !important;
}
.van-stepper__plus {
  width: 0.56rem !important;
  height: 0.56rem !important;
}
.van-card__thumb {
  width: 1.88rem !important;
  height: 1.88rem !important;
  margin-right: 0.2rem !important;
}
.van-notice-bar {
  height: 0.7rem !important;
  font-size: 0.26rem !important;
}
.van-notice-bar__left-icon {
  font-size: 0.32rem !important;
}
.van-notice-bar__right-icon{
  font-size: 0.32rem !important;
}
.van-card__title{
  max-height: .48rem !important;
}
.van-cell{
  font-size: .36rem !important;
  line-height: .36rem !important;
}
.van-field{
  font-size: .28rem !important;
}
.nut-hor-scroll{
  touch-action: auto  !important;
}
.van-uploader__upload{
  width: 1.8rem !important;
  height: 1.8rem !important;
}
.van-picker-column{
  font-size: .32rem !important;
}
.van-picker__toolbar{
  font-size: .32rem !important;
}
.van-picker-column__item{
  height: 44PX  !important;
}
.van-uploader__upload-icon{
  font-size: .4rem !important;
}
.van-picker__title{
  font-size: .32rem !important;
}
.van-image{
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.van-picker-column__item{
  padding: 0 !important;
}
.van-image__img{
  height: auto !important;
}
.van-ellipsis{
  overflow: inherit !important;
}
.van-field__clear{
  font-size: .32rem !important;
}
.van-picker__cancel, .van-picker__confirm{
  font-size: .32rem !important;
}
.van-field__left-icon .van-icon{
  width: .4rem !important;
  height: .4rem !important;
  font-size: .3rem !important;
}
.van-search__content{
  background-color: #fff !important;
}
.van-search{
  height: 1rem !important;
  box-sizing: border-box !important;
}
.van-search .van-cell{

}
.van-tabs__line{
  width: .5rem !important;
  height: .15rem !important;
  border-radius: .08rem .08rem 0 0 !important;
  bottom: .06rem !important ;
}
.van-tab__text--ellipsis{
  font-size: .32rem !important;
}
.van-toast--text{
  padding: 0.2rem 0.22rem !important;
  font-size:.24rem  !important;
}
.abus-scroller-box {
  margin: 0 0.28rem;
  padding: 0.28rem 0 0.2rem;
  background-color: #fff;
  min-height: 2.4rem;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.1rem #efefef;
}
.abus-button-box {
  margin: 0.4rem 0.3rem 0.5rem;
  .abus-button {
    width: 100%;
    height: 0.8rem;
    background: rgba(0, 32, 91, 1);
    border-radius: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    font-weight: bold;
  }
}
.discount {
  text-decoration: line-through;
}
</style>
