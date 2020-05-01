<template>
    <div class="wrap">
        <Back :title="title"/>
        <van-notice-bar color="#ffffff" background="#849ED3" :left-icon="left_icon">
            温馨提示:每笔提现需扣除5%的手续费,可将您的余额放至余额宝获取利息收益!
        </van-notice-bar>
        <van-field
        class="label_text"
        readonly
        label="提现银行卡"
        :value="value"
        placeholder="请选择银行卡"
        @click="show_bounced = true"
        />
        <van-field
        class="label_text"
        v-model="withdrawData.assetsPassword"
        type="password"
        label="资金密码："
        placeholder="请输入资金密码"
        />

        <!-- <van-field
        class="label_text"
        v-model="withdrawData.idCard"
        type="number"
        label="身份证号码："
        placeholder="请输入身份证号码"
        /> -->
        <van-field
        class="label_text bottom"
        v-model="withdrawData.applyMoney"
        type="text"
        label="提现金额："
        placeholder="请输入提现金额"
        />
        <Button text="确定" :active_submit="true" @callback="submitWithdraw"/>
       <!--  <van-popup v-model="showPicker" position="bottom">
            <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            />
        </van-popup> -->

    <!-- <div class="wrap" v-else-if="type == 3 || type == 4">
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
        <!--  <CheckBank @callback="changeBounced" @close="show_bounced = false" :bankList="memberBankcardList" title="请选择银行" v-show="show_bounced"/> -->

        <van-action-sheet v-model="show_bounced" title="请选择银行" :round="false" @cancel="show_bounced = false">
           <div class="bank_list">
            <div class="bank_item" v-for="(item,index) in memberBankcardList" @click="changeBounced(item)">
                <div class="left">
                    <img class="icon" src="../../assets/pay.png">
                    <div class="bank_text">{{item.bankName}}<span>（{{item.cardNo.substring(item.cardNo.length-4)}}）</span></div>
                </div>
            </div>
        </div>
    </van-action-sheet>
</div>
</template>
<style lang="less" scoped>
.van-popup{
    // border:1px solid red;
}
.van-notice-bar {
    height: .66rem;
    font-size: .24rem;
}
.label_text{
    height: 1.04rem;
    font-size: .32rem;
    color: #777B8F;
    align-items: center;
}
.top{
    margin-top: .2rem;
}
.bottom{
    margin-bottom: 1.4rem;
}
.bank_list{
    flex:1;
    overflow-y: scroll;
}
.bank_item{
    padding-left: .65rem;
    padding-right: .36rem;
    border-bottom: 1px solid #dedede;
    height: .98rem;
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.left{
    display:flex;
    align-items: center;
}
.icon{
    margin-right: .2rem;
    width: .42rem;
    height: .42rem;
}
.bank_text{
    display:flex;
    align-items: center;
    font-size: .28rem;
    color: #2e2e2e;
    span{
        color: #777B8F;
    }
}
.sel_bank_text{
    color: #5B5FD1;
    span{
        color: #5B5FD1;
    }
}
</style>
<script>
    import {listMemberBankcard, applyMemberWithdraw} from '../../api'

    import Back from '../../components/Back.vue'
    import CheckBank from '../../components/BankList.vue'
    import Button from '../../components/Button.vue'

    export default {
        data() {
            return {
                left_icon:require('../../assets/warning.png'),  //左侧图标
                pointReg: /^\d{1,17}(\.\d{1,5})?$/,
                withdrawData: {
                    applyMoney: '',
                    type: '',
                    bankcardId: '',
                    bankName: '',
                    cardName: '',
                    cardNo: '',
                    assetsPassword: '',
                    // idCard: '',
                },
                type: 1,
                title: '',
                value: '',
                showPicker: false,
                columns: [],
                memberBankcardList: [],
                show_bounced:false
            }
        },
        components:{
            Back,
            CheckBank,
            Button
        },
        mounted() {
            this.type = Number(this.$route.query.type)
            switch (this.type) {
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
                this.title = '保证金提现'
            }
        },
        methods: {
            // onConfirm(value) {
            //     this.value = value;
            //     let bankcard = this.memberBankcardList.find(e=>e.cardNo == value)
            //     this.withdrawData.bankcardId = bankcard.id
            //     this.withdrawData.bankName = bankcard.bankName
            //     this.withdrawData.cardName = bankcard.cardName
            //     this.withdrawData.cardNo = bankcard.cardNo
            //     this.showPicker = false;
            // },
            getMemberBank() {
                listMemberBankcard().then(
                    response => {
                        if (response.total <= 0) {
                            this.$toast("您尚未绑定银行卡，请前往绑定")
                            this.$router.push('/set')
                        } else {
                            this.memberBankcardList = response.rows
                            // this.memberBankcardList.forEach((e) => {
                            //     this.columns.push(e.cardNo)
                            // })
                        }
                    }
                    )
            },
            //子组件方法
            changeBounced(v,){
                this.show_bounced = false;
                // this.bank_info = v;
                this.value = v.cardNo;
                // let bankcard = this.memberBankcardList.find(e=>e.cardNo == value)
                this.withdrawData.bankcardId = v.id
                this.withdrawData.bankName = v.bankName
                this.withdrawData.cardName = v.cardName
                this.withdrawData.cardNo = v.cardNo
                // this.showPicker = false;
            },
            submitWithdraw() {
                if (!this.withdrawData.type) {
                    this.$toast("请选择提现类型")
                    return
                }
                if (!this.withdrawData.bankcardId) {
                    this.$toast("请选择提现银行卡")
                    return
                }
                if (!this.withdrawData.assetsPassword) {
                    this.$toast("请输入资金密码")
                    return
                }
                // if (!this.withdrawData.idCard) {
                //     this.$toast("请输入身份证号码")
                //     return
                // }
                if (!this.withdrawData.applyMoney) {
                    this.$toast("提现金额不能为空")
                    return
                }
                if (!this.pointReg.test(this.withdrawData.applyMoney)) {
                    this.$toast("提现金额格式不正确")
                    return
                }
                applyMemberWithdraw(this.withdrawData).then(response => {
                    if (response.code === 200) {
                        this.$toast("申请提现成功，请等待平台管理员确认")
                        this.$router.push('/my')
                    } else {
                        this.$toast(response.msg);
                    }
                });
            }
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
