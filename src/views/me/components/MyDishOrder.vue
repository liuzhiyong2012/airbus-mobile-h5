<template>
    <div class="abus-height" v-if="isShow">
        <div class="cell-group" v-for="(item,index) in orderList" :key="index">
            <div class="header">
                <div class="top">
                    <div class="title">{{item.FlightNumber}}</div>
                    <div class="status" v-if="item.Status == 0">{{$t('Undetermined')}}</div>
                    <div class="status" v-else-if="item.Status == 1 ">{{$t('Making')}}</div>
                    <div class="status" v-else-if="item.Status == 2">{{$t('Delivery')}}</div>
                    <div class="status" v-else-if="item.Status == 3">{{$t('Complete')}}</div>
                    <div class="status" v-else-if="item.Status == 4">{{$t('Cancel')}}</div>
                </div>
                <div class="con">
                    <div class="text">{{item.Departure}}</div>
                    <div class="flight">
                        <i class="dot light"></i>
                        <i class="dot grey"></i>
                        <i class="dot dark"></i>
                        <i class="icon icon-plane"></i>
                        <i class="dot dark"></i>
                        <i class="dot grey"></i>
                        <i class="dot light"></i>
                    </div>
                    <div class="text">{{item.Arrival}}</div>
                </div>
            </div>
            <div class="main">
                <div class="item" v-for="(aItem,aIndex) in item.Items" :key="aIndex">
                    <div class="img">
                        <img :src="aItem.Dish.BannerImgPath|addBaseUrl" alt />
                    </div>
                    <div class="f1">
                        <div class="title">{{aItem.Dish.Name}}</div>
                        <div class="money" >
                            ${{aItem.Price}}
                            <i>X{{aItem.Quantity}}</i>
                        </div>

                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="time">{{getTime(item.CreatedAt)}}</div>
                <div class="money" >{{$t('TotalAmount')}} ${{item.FinalPrice}}</div>
            </div>
        </div>
    </div>
    <div v-else  class="abus-height">
        <div class="no-data">{{$t('noData')}}</div>
    </div>
</template>
<i18n>
    {
    "zh":{
    "TotalAmount":"总金额",
    "Undetermined":"待定",
    "Making":"制作中",
    "Delivery":"派送",
    "Complete":"完成",
    "noData":"暂无数据",
    "Cancel":"取消"
    },
    "en":{
    "TotalAmount":"Total amount",
    "Undetermined":"Undetermined",
    "Making":"Making",
    "Delivery":"Delivery",
    "noData":"No data available",
    "Complete":"Complete",
    "Cancel":"Cancel"
    }
    }
</i18n>
<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import MeServer from "../../../service/me";
    import DateUtils from '../../../utils/date-utils';
    @Component({
        name: "MyDishOrder",
        components: {},
    })
    export default class MyDishOrder extends Vue {
        private orderList: Array<any>=[]
        private isShow: boolean = false
        private created() {
            if (localStorage.getItem("lang") == "en") {
                this.$i18n.locale = "en";
            } else {
                this.$i18n.locale = "zh";
            }
            this.getDishOrder()
        }
        public getDishOrder(){
            MeServer.getDishOrder().then((res: any) => {
                if(res.code == 200) {
                    this.orderList = res.data.Orders
                    console.log(this.orderList)
                    if(this.orderList.length > 0){
                        this.isShow = true
                    } else {
                        this.isShow = false
                    }
                }
            })
        }
        public getTime(time:number){
            return DateUtils.formate(time)
        }
    }
</script>

<style lang="scss" scoped>
    .no-data{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: .28rem;
        color: #666;
        text-align: center;
    }
    .cell-group {
        margin: 0.2rem 0 0;
        background: #fff;
        box-shadow: 0 0 0.1rem #efefef;
        .header {
            padding: 0.1rem 0.2rem 0.1rem 0.2rem;
            height: 0.7rem;
            border-bottom: 0.01rem solid #efefef;
            .top {
                display: flex;
                .title {
                    flex: 1;
                    font-size: 0.16rem;
                    font-weight: bold;
                    color: rgba(46, 46, 46, 1);
                    line-height: 0.3rem;
                    width: 0.54rem;
                    height: 0.2rem;
                }
                .status {
                    padding: 0.07rem 0.16rem;
                    border-radius: 0.05rem;
                    background-color: #00205b;
                    color: #fff;
                    font-size: 0.12rem;
                }
            }
            .con {
                margin: 0.1rem 0 0;
                padding: 0.06rem 0;
                display: flex;
                background-color: #f2f4f7;
                align-items: center;
                justify-content: center;
                border-radius: 0.06rem;
                .text {
                    font-size: 0.14rem;
                    color: rgba(46, 46, 46, 1);
                }
                .flight {
                    margin: 0 0.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    i {
                        margin-right: 0.06rem;
                        :last-child {
                            margin: 0;
                        }
                    }
                    .dot {
                        display: inline-block;
                        width: 0.02rem;
                        height: 0.02rem;
                        border-radius: 50%;

                        &.dark {
                            background: rgba(0, 0, 0, 1);
                        }
                        &.grey {
                            background: rgba(0, 0, 0, 0.3);
                        }
                        &.light {
                            background: rgba(0, 0, 0, 0.1);
                        }
                    }
                    .icon {
                        color: #000000;
                        line-height: 0.13rem;
                        width: 0.14rem;
                        height: 0.13rem;
                    }
                }
            }
        }
        .main {
            .item {
                display: flex;
                padding: 0.1rem 0.2rem 0.1rem 0.2rem;
                border-bottom: 0.01rem solid #efefef;
                .img {
                    display: flex;
                    margin: 0 0.1rem 0 0;
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 0.06rem;
                    background-color: #efefef;
                    overflow: hidden;
                    align-items: center;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .f1 {
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                    font-size: 0.16rem;
                    align-content: space-between;
                    .title {
                        width: 100%;
                        height: 0.3rem;
                        color: rgba(51, 51, 51, 1);
                    }
                    .money {
                        width: 100%;
                        font-weight: bold;
                        color: rgba(46, 46, 46, 1);
                        i {
                            margin: 0 0 0 0.1rem;
                            color: #999;
                            font-weight: 400;
                            font-size: 0.16rem;
                        }
                    }
                }
            }
        }
        .footer {
            display: flex;
            padding: 0 0.2rem;
            line-height: 0.4rem;
            height: 0.4rem;
            .time {
                font-size: 0.14rem;
                color: #999;
            }
            .money {
                flex: 1;
                text-align: right;
                font-size: 0.16rem;
                font-weight: bold;
                color: #383639;
            }
        }
    }
</style>