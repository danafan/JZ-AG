<template>
    <div>
        <van-notice-bar color="#ffffff" background="#849ED3" :left-icon="left_icon">
            {{status}}
        </van-notice-bar>
        <div class="title">手动抢单</div>
        <div class="order_list">
            <div class="order_title">
                <div class="title_text">金额</div>
                <div class="title_text">类型</div>
                <div class="title_text">操作</div>
            </div>
            <div class="null" v-if="orderList.length == 0">暂无订单</div>
            <div class="order_content" v-else>
                <div class="order_item" v-for="(item,key) in orderList">
                    <div class="order_money">{{item.money}}</div>
                    <div class="pay_icon">
                        <img class="pay" src="../../assets/pay.png">
                    </div>
                    <div class="pay_icon">
                        <div class="rob_button" @click="handleOrder(item.id)">快速抢单</div>
                    </div>
                </div>
            </div>
        </div>
        <Button text="自动挂单" :active_submit="true" @callback="startAccept" v-if="hoStatus == 1"/>
        <div class="primary" @click="cancelAccept" v-if="hoStatus == 2">解除任务</div>
        <div class="warning" v-if="hoStatus == 3">后台锁定中...</div>
    </div>
</template>
<style lang="less" scoped>
.van-notice-bar {
    height: .66rem;
    font-size: .24rem;
}
.title{
    padding: .3rem;
    font-size: .4rem;
    color: #242629;
    font-weight:500;
}
.order_list{
    margin-bottom: .58rem;
    width: 100%;
    background: #fff;
    .order_title{
        height: 1.2rem;
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: space-around;
        .title_text{
            width: 1.5rem;
            text-align: center;
            font-size: .28rem;
            color: #777B8F;
        }
    }
    .order_content{
        .order_item{
            padding-bottom: .5rem;
            display:flex;
            align-items: center;
            justify-content: space-around;
            .order_money{
                width: 1.5rem;
                text-align: center;
                font-size: .36rem;
                color: #212744;
            }
            .pay_icon{
                width: 1.5rem;
                display:flex;
                align-items: center;
                justify-content: center;
                .pay{
                    width: .52rem;
                    height: .52rem;
                }
                .rob_button{
                    width:1.2rem;
                    text-align: center;
                    height:.52rem;
                    line-height: .52rem;
                    background:#5B5FD1;
                    border-radius:.04rem;
                    font-size: .24rem;
                    color: #fff;
                }
            }

        }
    }
    .null{
        width: 100%;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        font-size: .28rem;
        color: #777B8F;
    }
}
.primary{
    margin: 0 auto;
    background:#D23431;
    width: 6rem;
    height: .96rem;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: .28rem;
    color: #ffffff;
    border-radius: .08rem;
}
.warning{
    margin: 0 auto;
    background:#C1C4D1;
    width: 6rem;
    height: .96rem;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: .28rem;
    color: #ffffff;
    border-radius: .08rem;
}
</style>
<script>
    import {mapGetters} from "vuex";
    import {Dialog,Toast} from 'vant'
    import {setAutoOrder, cancelAutoOrder, listQiangdanOrder, qiangdan} from '../../api'
    import Button from '../../components/Button.vue'

    export default {
        data() {
            return {
                left_icon:require('../../assets/warning.png'),  //左侧图标
                status: '空闲中...',
                hoStatus: 1,
                showSpecia: false,
                timerId: 1,
                timerObj: {}, // 计时器存储器
                flag: true,
                orderList: [],
                queryParams: {
                    pageNum: 1,
                    type: 4, // 收款类型（1-支付宝、2-微信、3-支付宝口令红包、4-银行卡）
                },
            };
        },
        computed: {
            ...mapGetters([
                'member'
                ]),
        },
        mounted() {
            this.startTraining()
        },
        components:{
            Button
        },
        methods: {
            /** 查询列表 */
            getList() {
                listQiangdanOrder(this.queryParams).then(response => {
                    this.orderList = response.rows
                });
            },
            /** 抢单操作 */
            handleOrder(id) {
                if (this.hoStatus != 1) {
                    Toast("您正处于自动接单，不能进行抢单。若要抢单，请先停止自动接单任务");
                    return
                }
                qiangdan(id).then(response => {
                    if (response.code === 200) {
                        Toast("抢单成功");
                        this.getList()
                    } else {
                        Toast(response.msg);
                    }
                });
            },
            getHoStatus() {
                this.$store.dispatch('GetMemberInfo').then(() => {
                    this.hoStatus = this.member.hoStatus
                    let hoNotice = this.member.hoNotice
                    if (hoNotice == 2) {
                        this.status = '现在订单金额较大，请会员补充余额 或 继续等待!'
                    } else if (this.hoStatus == 1) {
                        this.status = '空闲...'
                        this.showSpecia = false
                    } else if (this.hoStatus == 2) {
                        this.status = '接单中...'
                        this.showSpecia = true
                    } else if (this.hoStatus == 3) {
                        this.status = '后台锁定，正在进行打款...'
                        this.showSpecia = true
                    }
                })

                this.getList()
            },
            startAccept() {
                let that = this
                setAutoOrder().then(response => {
                    if (response.code == 200) {
                        Toast("您当前已开启自动抢单模式");
                        this.getHoStatus()
                    } else {
                        Toast(response.msg);
                    }
                }).catch((e) => {
                    Toast(e.message);
                })
            },
            cancelAccept() {
                cancelAutoOrder().then(response => {
                    if (response.code === 200) {
                        Toast('自动挂单停止')
                    } else {
                        Toast(response.msg);
                    }
                    this.getHoStatus()
                }).catch((e) => {
                    Toast(e.message);
                })
            },
            startTraining() {
                let this_ = this;
                const id = this.timerId++
                this.timerObj[id] = true

                async function timerFn() {
                    if (!this_.timerObj[id]) return
                        await this_.getHoStatus();
                    if (this_.flag) {
                        setTimeout(timerFn, 1 * 8000)
                    }
                }

                timerFn();
            },
        },
        destroyed() {
            this.flag = false
        },
    }
</script>


