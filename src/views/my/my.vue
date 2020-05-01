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

        <!-- <header>
            <div class="beijin">
                <div class="">
					<div style="margin-top: 15px;text-align: center;position: absolute;top:0.3125rem;left: 0.625rem;">
						<img width="60px" height="60px" style="border-radius: 50%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586621320295&di=5952662b5b99edef2cfb0e54089c7797&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F55%2F77%2F59fb249cd539f_610.jpg" class="imege"/></br>
						<span class="labels">{{userInfo.type==1?'普通会员':'代理会员'}}</span>
					</div>
                    <div class="" style="position: absolute;top:1.25rem;left: 3.125rem;color: #FFFBE8;">
                        <p style="margin-top: 0px;">用户昵称：{{userInfo.username}} </p>
						<p style="margin: 10px 0 5px 0;">用户佣点：{{Math.round(userInfo.agentPoint*100000)/1000 + '%'}}</p>
                    </div>

					<van-cell style="position: absolute;top: 10px;width: 42px;text-align: center;right: 10px;background-color: red;" to="/set">
					    <template slot="title">
					        <i style="font-size:25px;vertical-align:middle;color:#FFFFFF;margin-right: 5px" class="iconfont icon-NMStubiao-"></i>
					    </template>
					</van-cell>
                </div>
            </div>
        </header> -->

        <!-- 主体 -->
       <!--  <main class="mt-10">
            <div class="bg-fff listTwo">
                <van-cell class="only"  to="/my/receiveBank">
                    <template slot="title">
                        <i style="font-size:25px;vertical-align:middle;margin-right: 5px;color: orange" class="iconfont icon-yinhangqia"></i>
                        </br><span>收款银行卡</span>
                    </template>
                </van-cell>
                <van-cell class="only"  to="/my/rechargeList">
                    <template slot="title">
                        <i style="font-size:25px;vertical-align:middle;color:blue;margin-right: 5px" class="iconfont icon-chongzhijilu"></i>
                        </br><span>充值记录</span>
                    </template>
                </van-cell>
                <van-cell class="only"  to="/my/withdrawList">
                    <template slot="title">
                        <i style="font-size:25px;vertical-align:middle;color:yellowgreen;margin-right: 5px" class="iconfont icon-zhanghutixianliebiao_icox"></i>
                        </br><span>提现列表</span>
                    </template>
                </van-cell>
                <van-cell class="only"  to="/my/moneyDetail">
                    <template slot="title">
                        <i style="font-size:25px;vertical-align:middle;color:orange;margin-right: 5px" class="iconfont icon-zijinmingxi"></i>
                        </br><span>资金明细</span>
                    </template>
                </van-cell>
                <van-cell class="only" to="/my/subList" v-if="userType == 2">
                    <template slot="title">
                        <i style="font-size:25px;vertical-align:middle;color:blueviolet;margin-right: 5px" class="iconfont icon-chakanxiaji"></i>
                        </br><span>我的下级</span>
                    </template>
                </van-cell>
				<van-cell class="only" to="/my/withdrawBank">
				    <template slot="title">
				        <i style="font-size:25px;vertical-align:middle;color:lightsalmon;margin-right: 5px" class="iconfont icon-tixian"></i>
				        </br><span>提现银行卡</span>
				    </template>
				</van-cell>
            </div>
        </main>
		<div class="list">

			<div class="" v-if="userType == 2" style="border-radius: 10px;padding: 10px;">
				<van-cell-group >
				  <van-cell title="保证金" v-model="userInfo.depositMoney"/>
				  <van-cell title="余额" v-model="userInfo.balanceMoney"/>
				  <van-cell title="会员佣金" v-model="userInfo.agentMoney"/>
				  <van-cell title="代理佣金" v-model="userInfo.dlAgentMoney"/>
				  <van-cell title="当日会员佣金" v-model="userInfo.todayIncome || 0"/>
				  <van-cell title="当日代理佣金" v-model="userInfo.todayAgentIncome || 0"/>
				</van-cell-group>
			</div>
			<div class="" v-if="userType == 1" style="border-radius: 10px;padding: 10px;">
				<van-cell-group >
				  <van-cell title="保证金" v-model="userInfo.depositMoney"/>
				  <van-cell title="余额" v-model="userInfo.balanceMoney"/>
				  <van-cell title="会员佣金" v-model="userInfo.agentMoney"/>
				  <van-cell title="当日会员佣金" v-model="userInfo.todayIncome || 0"/>
				</van-cell-group>
			</div>
		</div> -->
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
    import {Dialog} from 'vant'

    export default {
        data() {
            return {
                username: '122121',
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
                    if (!this.member.realName || !this.member.idCard || !this.member.phone) {
                        Dialog.alert({
                            title: '溫馨提示',
                            message: '您的个人信息不完善，请前往完善'
                        }).then(() => {
                            this.$router.push('/set');
                        })
                    } else if (this.member.bankcardBinding == 1) {
                        Dialog.alert({
                            title: '温馨提示',
                            message: '您尚未绑定提现银行卡，请前往绑定'
                        }).then(() => {
                            this.$router.push('/set');
                        })
                    } else {
                        this.userInfo = this.member
                    }
                })
            },
            logout() {
                Dialog.confirm({
                    title: '确定退出吗？',
                    message: '提示'
                }).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                        this.$router.replace('/login')
                    })
                }).catch(() => {
                });
            },

            goWithdraw() {
                // 获取会员银行卡列表
                if (!this.member.assetsPassword) {
                    Dialog.confirm({
                        title: '您的资金密码尚未设置，请前往设置',
                        message: '提示'
                    }).then(() => {
                        this.$router.push('/set')
                    }).catch(() => {
                    });
                } else {
                    this.$router.push('/withdraw')
                }
            },
            goRecharge() {
                this.$router.push('/recharge')
            }
        },
        created() {
            this.getMemberInfo()
        }
    };
</script>

<!-- <style lang="less" scoped>
    @import "./my.less";
	@import '../../assets/style/font/iconfont.css';
    .labels {
        display: inline-block;
        color: #fff;
		width: 1.875rem;
		text-align: center;
		line-height: 0.625rem;
        font-size: 10px;
        padding: 2px;
        border-radius: 100px;
        background: linear-gradient(to bottom right,#CD8500,#CDAA7D);
		position: relative;
		top: -10px;
    }
	.beijin{
		position: relative;
		width: 100%;
		margin: 0 auto 20px;
		height: 25vh;
		background-color: red;
		padding: 10px;
		// border-radius: 10px;
		box-shadow: 0px 0px 10px lightgray;
	}
	.list{
		position: relative;
		top: -55px;
		width: 95%;
		background: #FFFFFF;
		border-radius: 10px;
		margin: auto;
		box-shadow: 0 0 10px lightgray;
	}
    .moneys{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
		&:first-child{
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			border-bottom: 1px solid lightgray;
		}
		&:last-child{
			border-bottom-left-radius:10px;
			border-bottom-right-radius:10px;
		}
        p{
            flex: 1;
            text-align: center;
            span{
                display: block;
                line-height: 20px;
                &:first-child{
                    color: red;
                }
            }

            // border-right: 1px solid #ccc;
            &:last-child{
                border-right: none;
            }
        }
    }
	.goyb {
        display: inline-block;
        background: #00a8f3;
		border-radius: 5px;
        right: 0;
        color: #fff;
        padding: 4px 6px;
        margin: 4px;
    }
	.mt-10{
		width: 100vw;
		margin:10px auto 10px;
	}
	.listTwo{
		width: 95%;
		position: relative;
		top: -60px;
		display: flex;
		height: 100%;
		// justify-content:  space-between;
		flex-wrap: wrap;
		flex-direction: row;
		margin:0 auto 0px !important;
		box-shadow: 0 0 5px lightgrey;
		// border-top-left-radius: 10px;
		// border-top-right-radius: 10px;
		border-radius: 10px;
		padding: 10px;
	}
	.listTwo .only{
		// flex: 1;
		width: 33%;
		text-align: center;
		// background-color: red;
		border: none;
	}
	.only i{
		// font-size: 40px !important;
	}
</style> -->
