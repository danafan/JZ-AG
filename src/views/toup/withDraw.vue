<template>
    <div class="wrap">
        <Back :title="title"/>
        <!-- <van-nav-bar :title="title" left-arrow @click-left="back"/> -->
		<!-- <div class="cont">
			<van-cell title="收款姓名：" :value="rechargeData.toCardName"></van-cell>
			<van-cell title="收款银行：" :value="rechargeData.toBankName"></van-cell>
			<van-cell title="收款卡号：" :value="rechargeData.toCardNo"></van-cell>
			<van-cell-group>
				<van-field
				        v-model="rechargeData.cardName"
				        type="text"
				        label="充值姓名："
				        clearable
				        placeholder="请输入充值姓名"
				/>
			    <van-field
			            v-model="rechargeData.bankName"
			            type="text"
			            clearable
			            label="充值银行："
			            placeholder="请输入银行"
			    />

			    <van-field
			            v-model="rechargeData.cardNo"
			            type="number"
			            label="充值卡号："
			            clearable
			            placeholder="请输入充值卡号"
			    />

			    <van-field
			            v-model="rechargeData.money"
			            type="number"
			            label="充值金额："
			            clearable
			            placeholder="请输入充值金额"
			    />
			    <van-field
			            v-model="rechargeData.remark"
			            type="text"
			            label="备注："
			            clearable
			            placeholder="请输入备注"
			    />
			</van-cell-group>
		</div>
        <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submitRecharge">
            <p class="blue">确认</p>
        </div>
    </div>

    <div class="wrap" v-else-if="type == 3 || type == 4">
        <van-nav-bar :title="title" left-arrow @click-left="back"/>
		<div class="cont">
			<van-popup v-model="showPicker" position="bottom">
			    <van-picker
			            show-toolbar
			            :columns="columns"
			            @cancel="showPicker = false"
			            @confirm="onConfirm"
			    />
			</van-popup>
			<van-cell-group>
			    <van-field
			            readonly
			            clickable
			            label="提现银行卡"
			            :value="value"
			            placeholder="选择"
			            @click="showPicker = true"
			    />
			    <van-field
			            v-model="withdrawData.assetsPassword"
			            type="password"
			            clearable
			            label="资金密码："
			            placeholder="请输入资金密码"
			    />

			    <van-field
			            v-model="withdrawData.idCard"
			            type="number"
			            label="身份证号码："
			            clearable
			            placeholder="请输入身份证号码"
			    />
			    <van-field
			            v-model="withdrawData.applyMoney"
			            type="text"
			            label="提现金额："
			            clearable
			            placeholder="请输入提现金额"
			    />
			</van-cell-group>
			<p class="mark"><span class="fl">温馨提示:</span><span class="fr">每笔提现需扣除5%的手续费,可将您的余额放至余额宝获取利息收益!</span></p>
		</div>


        <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submitWithdraw">
            <p class="blue">确认</p>
        </div> -->
    </div>
</template>

<script>
    import {applyMemberRecharge, getConfig, listMemberBankcard, applyMemberWithdraw} from '../../api'
    import {Dialog} from 'vant'

    import Back from '../../components/Back.vue'

    export default {
        data() {
            return {
                pointReg: /^\d{1,17}(\.\d{1,5})?$/,
                rechargeData: {
                    toBankName: '',
                    toCardName: '',
                    toCardNo: '',
                    bankName: '',
                    cardNo: '',
                    cardName: '',
                    money: '',
                    remark: '',
                    type: 1
                },
                withdrawData: {
                    applyMoney: '',
                    type: '',
                    bankcardId: '',
                    bankName: '',
                    cardName: '',
                    cardNo: '',
                    assetsPassword: '',
                    idCard: '',
                },
                type: 1,
                title: '',
                value: '',
                showPicker: false,
                columns: [],
                memberBankcardList: []
            }
        },
        components:{
            Back
        },
        mounted() {
            this.type = Number(this.$route.query.type)
            switch (this.type) {
                case 1:
                    this.title = '保证金充值'
                    this.getConfig()
                    this.rechargeData.type = 1
                    break
                case 2:
                    this.title = '余额充值'
                    this.getConfig()
                    this.rechargeData.type = 2
                    break
                case 3:
                    this.title = '保证金提现'
                    this.getMemberBank()
                    this.withdrawData.type = 1
                    break
                case 4:
                    this.title = '余额提现'
                    this.getMemberBank()
                    this.withdrawData.type = 2
                    break
                default:
                    this.title = '保证金充值'
            }
        },
        methods: {
            onConfirm(value) {
                this.value = value;
                let bankcard = this.memberBankcardList.find(e=>e.cardNo == value)
                this.withdrawData.bankcardId = bankcard.id
                this.withdrawData.bankName = bankcard.bankName
                this.withdrawData.cardName = bankcard.cardName
                this.withdrawData.cardNo = bankcard.cardNo
                this.showPicker = false;
            },
            getConfig() {
                getConfig().then(response => {
                    if (response.code === 200) {
                        this.rechargeData.toBankName = response.data.bankname
                        this.rechargeData.toCardNo = response.data.cardno
                        this.rechargeData.toCardName = response.data.cardname
                    }
                })
            },
            getMemberBank() {
                listMemberBankcard().then(
                    response => {
                        if (response.total <= 0) {
                            Dialog.alert({
                                title: '您尚未綁定提現銀行卡，請前往綁定',
                                message: '溫馨提示'
                            }).then(() => {
                                this.$router.push({path: '/my/set'})
                            }).catch(() => {
                            });
                        } else {
                            this.memberBankcardList = response.rows
                            this.memberBankcardList.forEach((e) => {
                                this.columns.push(e.cardNo)
                            })
                        }
                    }
                )
            },
            submitRecharge() {
                if (!this.rechargeData.bankName) {
                    Dialog.alert({
                        message: '充值銀行不能為空'
                    })
                    return
                }
                if (!this.rechargeData.cardNo) {
                    Dialog.alert({
                        message: '充值卡號不能為空'
                    })
                    return
                }
                if (!this.rechargeData.cardName) {
                    Dialog.alert({
                        message: '充值姓名不能為空'
                    })
                    return
                }
                if (!this.rechargeData.money) {
                    Dialog.alert({
                        message: '充值金額不能為空'
                    })
                    return
                }
                if (!this.rechargeData.type) {
                    Dialog.alert({
                        message: '請選擇充值類型'
                    })
                    return
                }

                if (this.rechargeData.bankName.length < 1 || this.rechargeData.bankName.length > 50) {
                    Dialog.alert({
                        message: '充值銀行在1到50個字符'
                    })
                    return
                }
                if (this.rechargeData.cardNo.length < 1 || this.rechargeData.cardNo.length > 50) {
                    Dialog.alert({
                        message: '充值賬號在1到50個字符'
                    })
                    return
                }
                if (this.rechargeData.cardName.length < 1 || this.rechargeData.cardName.length > 50) {
                    Dialog.alert({
                        message: '充值姓名在1到50個字符'
                    })
                    return
                }
                if (!this.pointReg.test(this.rechargeData.money)) {
                    Dialog.alert({
                        message: '充值金額格式不正確'
                    })
                    return
                }

                applyMemberRecharge(this.rechargeData).then(response => {
                    if (response.code === 200) {
                        Dialog.alert({
                            message: '充值已提交，請等待平台管理員確認'
                        })
                        this.$router.push('/my/center')
                    } else {
                        Dialog.alert({
                            message: response.msg
                        })
                    }
                });
            },
            submitWithdraw() {
                if (!this.withdrawData.type) {
                    Dialog.alert({
                        message: '請選擇提現類型'
                    })
                    return
                }
                if (!this.withdrawData.bankcardId) {
                    Dialog.alert({
                        message: '請選擇提現銀行卡'
                    })
                    return
                }
                if (!this.withdrawData.assetsPassword) {
                    Dialog.alert({
                        message: '請輸入資金密碼'
                    })
                    return
                }
                if (!this.withdrawData.idCard) {
                    Dialog.alert({
                        message: '請輸入身份證號碼'
                    })
                    return
                }
                if (!this.withdrawData.applyMoney) {
                    Dialog.alert({
                        message: '提現金額不能為空'
                    })
                    return
                }
                if (!this.pointReg.test(this.withdrawData.applyMoney)) {
                    Dialog.alert({
                        message: '提現金額格式不正確'
                    })
                    return
                }
                applyMemberWithdraw(this.withdrawData).then(response => {
                    if (response.code === 200) {
                        Dialog.alert({
                            message: '申請提現成功，請等待平台管理員確認'
                        })
                        this.$router.push('/my/center')
                    } else {
                        Dialog.alert({
                            message: response.msg
                        })
                    }
                });
            },
            back() {
                this.$router.push({path: '/my/center'})
            },
        }
    }
</script>

<!-- <style lang="less" scoped>
    .logout {
        bottom: 0;
        height: 50px;
        color: #fff;
        background: FireBrick;
    }
    .mark {
        width: 100%;
        height: 44px;
        margin-top: 10px;
        font-size: 12px;
        padding: 5px;
        // border-bottom: 1px solid #ddd;
    }
    .mark span {
        display: block;
    }
    .mark .fl {
        float: left;
        color: #c7254e;
        width: 20%;
        line-height: 20px;
    }
    .mark .fr {
        float: right;
        color: #969799;
        width: 80%;
        line-height: 20px;

    }
	.cont{
		width: 95%;
		margin: 0.625rem auto 0;
		box-shadow: 0 0 5px lightgray;
		border-radius: 5px;
		padding: 5px;
	}
</style> -->
