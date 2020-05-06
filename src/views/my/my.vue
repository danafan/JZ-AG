<template>
    <div class="center">
        <div class="user_info">
            <div class="info_left">
                <img class="user_img" src="../../assets/user_img.png">
                <div class="user_text">
                    <div class="user_name">{{userInfo.username}}</div>
                    <div class="bot">
                        <div class="yong">用户佣点：{{Math.round(userInfo.agentPoint*100000)/1000 + '%'}}</div>
                        <div class="gold">
                            <img src="../../assets/gold.png">
                            <div class="gold_text">{{userInfo.type==1?'普通会员':'代理会员'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <img class="setting" src="../../assets/setting.png" @click="$router.push('/set')">
        </div>
        <div class="account_info">
            <div class="info_card">
                <div class="my_yu">我的余额</div>
                <div class="yue">{{userInfo.balanceMoney}}</div>
                <div class="money_box">
                    <div class="money_item">
                        <div class="money_text">保证金</div>
                        <div class="money_val">{{userInfo.depositMoney}}</div>
                    </div>
                    <div class="money_item">
                        <div class="money_text">会员佣金</div>
                        <div class="money_val">{{userInfo.agentMoney}}</div>
                    </div>
                    <div class="money_item"  v-if="userType == 2">
                        <div class="money_text">代理佣金</div>
                        <div class="money_val">{{userInfo.dlAgentMoney}}</div>
                    </div>
                    <div class="money_item">
                        <div class="money_text">当日会员佣金</div>
                        <div class="money_val">{{userInfo.todayIncome || 0}}</div>
                    </div>
                    <div class="money_item" v-if="userType == 2">
                        <div class="money_text">当日代理佣金</div>
                        <div class="money_val">{{userInfo.todayAgentIncome || 0}}</div>
                    </div>
                    <div class="money_item" style="opacity: 0">
                        <div class="money_text">当日会员佣金</div>
                        <div class="money_val">{{userInfo.todayIncome || 0}}</div>
                    </div>
                </div>
            </div>
            <div class="account_fun">
                <div class="fun_item" @click="showSheet(0)">
                    <img src="../../assets/top_up.png">
                    <div class="fun_text">充值</div>
                </div>
                <div class="fun_item" @click="showSheet(1)">
                    <img src="../../assets/withdrawal.png">
                    <div class="fun_text">提现</div>
                </div>
                <div class="fun_item" @click="$router.push('/yuebao')">
                    <img src="../../assets/balance.png">
                    <div class="fun_text">余额宝</div>
                </div>
            </div>
        </div>
        <div class="my_cate">
            <div class="my_item" @click="$router.push('/receiveBank')">
                <img src="../../assets/collection.png">
                <div class="cate_text">收款银行卡</div>
            </div>
            <div class="my_item" @click="$router.push('/withdrawBank')">
                <img src="../../assets/withdrawal_bank.png">
                <div class="cate_text">提现银行卡</div>
            </div>
            <div class="my_item" @click="$router.push('/rechargeList')">
                <img src="../../assets/record.png">
                <div class="cate_text">充值记录</div>
            </div>
            <div class="my_item" @click="$router.push('/moneyDetail')">
                <img src="../../assets/detail.png">
                <div class="cate_text">资金明细</div>
            </div>
            <div class="my_item" @click="$router.push('/withdrawList')">
                <img src="../../assets/withdrawal_list.png">
                <div class="cate_text">提现记录</div>
            </div>
            <div class="my_item" v-if="userType == 2" @click="$router.push('/subList')">
                <img src="../../assets/level.png">
                <div class="cate_text">我的下级</div>
            </div>
        </div>
        <van-action-sheet v-model="show_sheet" :title="sheet_type == 0 ? '充值' : '提现'" :round="false" @cancel="show_sheet = false">
            <div class="sheet_item" v-show="sheet_type == 0" @click="$router.push('/toup?type=' + 1)">保证金充值</div>
            <div class="sheet_item" v-show="sheet_type == 0" @click="$router.push('/toup?type=' + 2)">余额充值</div>
            <div class="sheet_item" v-show="sheet_type == 1" @click="$router.push('/withDraw?type=' + 3)">保证金提现</div>
            <div class="sheet_item" v-show="sheet_type == 1" @click="$router.push('/withDraw?type=' + 4)">余额提现</div>
        </van-action-sheet>
    </div>
</template>
<style lang="less" scoped>
.user_info{
    width: 100%;
    height: 1.69rem;
    background: #fff;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding-left: .3rem;
    padding-right: .3rem;
    .info_left{
        display:flex;
        align-items: center;
        .user_img{
            margin-right: .2rem;
            width: 1.08rem;
            height: 1.08rem;
        }
        .user_text{
            .user_name{
                font-size: .4rem;
                color: #212744;
                font-weight: 500;
                margin-bottom: .16rem;
            }
            .bot{
                display:flex;
                align-items: center;
                .yong{
                    font-size: .24rem;
                    color: #777B8F;
                }
                .gold{
                    margin-left: .2rem;
                    border-radius: .06rem;
                    background: #AB946D;
                    width: 1.4rem;
                    height: .4rem;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        width: .32rem;
                        height: .32rem;
                    }
                    .gold_text{
                        font-size: .2rem;
                        color: #FFFFFF
                    }
                }
            }
        }
    }
    .setting{
        width: .4rem;
        height: .46rem;
    }
}
.account_info{
    background: #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:.14rem .3rem 0;
    .info_card{
        width:6.9rem;
        height:3.48rem;
        background:linear-gradient(47deg,rgba(87,91,207,1) 0%,rgba(132,136,234,1) 100%);
        border-radius:.16rem .16rem 0px 0px;
        padding-left: .3rem;
        padding-right: .3rem;
        .my_yu{
            margin-top: .28rem;
            font-size: .24rem;
            color: #D4D5FF
        }
        .yue{
            margin-top: .2rem;
            font-size: .52rem;
            color: #FFFFFF;
            font-weight:bold;
        }
        .money_box{
            margin-top: .24rem;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .money_item{
                margin-bottom:.28rem;
                width: 1.6rem;
                display:flex;
                flex-direction: column;
                .money_text{
                    margin-bottom:.18rem;
                    font-size: .24rem;
                    color: #A7AAFF;
                }
                .money_val{
                    font-size: .28rem;
                    color: #E1E5F7;
                    font-weight:bold;
                }
            }
        }
    }
    .account_fun{
        width: 100%;
        padding-top: .3rem;
        padding-bottom: .3rem;
        display:flex;
        align-items: center;
        justify-content: space-around;
        .fun_item{
            display:flex;
            flex-direction: column;
            align-items: center;
            img{
                margin-bottom:.18rem;
                width: .44rem;
                height: .44rem;
            }
            .fun_text{
                font-size: .28rem;
                color: #212744;
            }
        }
    }
}
.my_cate{
    margin-top: .2rem;
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .my_item{
        background: #fff;
        width: 2.5rem;
        height: 1.6rem;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            margin-bottom:.18rem;
            width: .48rem;
            height: .48rem;
        }
        .cate_text{
            font-size: .28rem;
            color: #212744;
        }
    }
}
.sheet_item{
    border-bottom:1px solid #E3E5E8;
    width: 100%;
    text-align: center;
    height: 1.04rem;
    line-height: 1.04rem;
    font-size: .32rem;
    color: #242629;
}
</style>
<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                username: '',
                userInfo: {},
                userType: 1,
                show_sheet: false,
                sheet_type:0,
            }
        },
        computed: {
            ...mapGetters([
                'member'
                ]),
        },

        methods: {
            showSheet(type){
                this.sheet_type = type;
                this.show_sheet = true;
            },
            getMemberInfo() {
                this.$store.dispatch('GetMemberInfo').then(() => {
                    this.userType = this.member.type
                    if (!this.member.realName || !this.member.phone) {
                        this.$toast("请完善个人信息！");
                        this.$router.push('/set');
                    } else if (this.member.bankcardBinding == 1) {
                        this.$toast("请先绑定银行卡！");
                        this.$router.push('/set');
                    } else {
                        this.userInfo = this.member
                    }
                })
            },
        },
        created() {
            this.getMemberInfo()
        }
    };
</script>
