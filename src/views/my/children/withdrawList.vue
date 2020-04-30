<template>
    <div class="page">
        <!-- <van-nav-bar title="提现列表" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <div class="list" v-for="(item,key) in list" :key="key">
                <div class="brankinfo">
                    <p>提现金额：{{'¥'+item.applyMoney}}</p>
                    <p>到账金额：{{'¥'+item.money}}</p>
                    <p>提现类型：{{parseMoneyType(item.type) + '提现'}}</p>
                    <p>{{parseTime(item.createTime)}}</p>
                </div>
                <div class="rightbtn">
                    <span :class="{'background': fillColor(item.type)}">{{parseWithdrawStatus(item.status)}}</span>
                </div>
            </div>
        </div> -->
        <Back title="提现记录"/>
        <div class="wu" v-if="list.length == 0">没有更多了</div>
        <div class="card_list" v-else>
         <Card v-for="item in list">
            <div class="card_content">
                <img class="zhang" :src="item.status | imgType">
                <div class="money_box">
                    <img src="../../../assets/rmb.png">
                    <div class="money_txt">{{item.applyMoney}}<span>（到账：100）</span></div>
                </div>
                <div class="toast">{{parseMoneyType(item.type)}}提现</div>
                <div class="line"></div>
                <div class="time_box">
                    <div class="time_label">提现时间</div>
                    <div class="time_val">{{parseTime(item.createTime)}}</div>
                </div>
            </div>
        </Card>
    </div>
</div>
</template>
<style lang="less" scoped>
.page{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
}
.card_list{
    padding: .3rem;
    flex: 1;
    overflow-y: scroll;
    .card_content{
        position: relative;
        width: 100%;
        height: 100%;
        .zhang{
            position: absolute;
            top: -.4rem;
            right: -.3rem;
            width: 1.2rem;
            height: 1.16rem;
        }
        .money_box{
            margin-top: .2rem;
            width: 100%;
            height: .6rem;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            img{
                margin-bottom: .08rem;
                margin-right: .08rem;
                width: .36rem;
                height: .34rem;
            }
            .money_txt{
                font-size: .6rem;
                color: #212744;
                font-weight:bold;
                span{
                    font-size:.3rem;
                    color: #777B8F;
                }
            }

        }
        .toast{
            margin-top: .4rem;
            width: 100%;
            text-align: center;
            font-size: .28rem;
            color: #777B8F;
        }
        .line{
            margin-top: .3rem;
            width: 100%;
            border-bottom: 1px dashed #E4E5EB;
        }
        .time_box{
            margin-top: .38rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .28rem;
            color: #777B8F;
        }
    }
}
.wu{
    margin-top: 1rem;
    width: 100%;
    text-align: center;
    font-size: .26rem;
    color: #969799;
}
</style>
<script>
    import {listMemberWithdraw} from '../../../api'
    import {Tag, Dialog} from 'vant';

    import Back from '../../../components/Back.vue'
    import Card from '../../../components/Card.vue'

    export default {
        data() {
            return {
                list: [],
            }
        },
        mounted() {
            this.requestData()
        },
        components:{
            Back,
            Card,
        },
        methods: {
            back() {
                this.$router.push('/my/center')
            },
            fillColor(type) {
                switch (type) {
                    case 1:
                    return 'green';
                    case 2:
                    return 'blue';
                    case 3:
                    return 'red';
                    case 4:
                    return 'black';
                }
                return 'black'
            },

            requestData() {
                let queryParams = {
                    pageNum: 1,
                    pageSize: 999,
                }
                listMemberWithdraw(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = data.rows
                    }
                }).catch((e) => {
                    this.$toast(e.message);
                    // Dialog.alert({
                    //     title: '警告',
                    //     message: e.message
                    // }
                    // )
                })
            },
        },
        filters:{
            imgType:function(v){
                if(v == 1){
                    return require('../../../assets/w_status_1.png')
                }else if(v == 2){
                    return require('../../../assets/w_status_2.png')
                }else if (v == 3){
                    return require('../../../assets/w_status_3.png')
                }else if (v == 4){
                    return require('../../../assets/w_status_4.png')
                }
                
            }
        }
    }
</script>

<!-- <style lang="less" scoped>
    .page {
        .wrap {
            width: 95%;
            margin: 10px auto;
            .list {
                background: #fff;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
				text-align: center;
				position: relative;
				box-shadow: 0 0 10px lightgray;
                .brankinfo {
                    flex: 2;
                    p {
                        margin: 10px 0;
                        font-size: 12px;
                    }
                }
                .rightbtn {
                    flex: 1;
                    text-align: center;
					position: absolute;
					top: 18%;
					right: 5%;
                    span {
                        color: red;
                        font-size: 10px;
                        display: inline-block;
                        padding: 5px;
                        text-align: center;
                        border-radius: 5px;
                        // background: red;
						width: 50px !important;
						line-height: 20px;
						// border-radius: 100px !important;
						text-align: center;
						border-radius: 5px;
						border: 2px solid red;
						// opacity: 0.5;
						transform:rotate(-30deg);
                    }
                }
            }
        }
    }
</style> -->