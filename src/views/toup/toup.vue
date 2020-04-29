<template>
    <div class="wrap">
        <Back :title="title"/>
        <van-cell class="label_text" title="收款姓名：" :value="rechargeData.toCardName"></van-cell>
        <van-cell class="label_text" title="收款银行：" :value="rechargeData.toBankName"></van-cell>
        <div class="ti">
            <div class="ti_label">收款卡号：</div>
            <div class="ti_val">{{rechargeData.toCardNo}}</div>
        </div>
        <!-- <van-cell class="label_text" title="收款卡号：" :value="rechargeData.toCardNo"></van-cell> -->
        <van-field
        class="label_text top"
        v-model="rechargeData.cardName"
        type="text"
        label="充值姓名"
        placeholder="请输入充值姓名"
        />
        <van-field
        class="label_text"
        v-model="rechargeData.bankName"
        type="text"
        label="充值银行"
        placeholder="请输入充值银行"
        />
        <van-field
        class="label_text"
        v-model="rechargeData.cardNo"
        type="number"
        label="银行卡号"
        placeholder="请输入银行卡号"
        />
        <van-field
        class="label_text"
        v-model="rechargeData.money"
        type="number"
        label="充值金额"
        placeholder="请输入充值金额"
        />
        <van-field
        class="label_text bottom top"
        v-model="rechargeData.remark"
        type="text"
        label="备注"
        placeholder="请输入备注信息"
        />
        <Button text="确定" :active_submit="true" @callback="submitRecharge"/>
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
        <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submitWithdraw">
            <p class="blue">确认</p>
        </div> -->
    </div>
</template>
<style lang="less" scoped>
.label_text{
    height: 1.04rem;
    font-size: .32rem;
    color: #777B8F;
    align-items: center;
}
.ti{
    color: #777B8F;
    background: #fff;
    padding-left: .42rem;
    padding-right: .42rem;
    height: 1.04rem;
    font-size: .32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ti_val{
        color: #969799;
    }
    
}
.top{
    margin-top: .2rem;
}
.bottom{
    margin-bottom: 1.4rem;
}
</style>
<script>
    import {applyMemberRecharge, getConfig} from '../../api'
    import {Dialog} from 'vant'

    import Back from '../../components/Back.vue'
    import Button from '../../components/Button.vue'

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
                type: 1,
                title: '',
                value: '',
            }
        },
        components:{
            Back,
            Button
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
                default:
                this.title = '保证金充值'
            }
        },
        methods: {
            getConfig() {
                getConfig().then(response => {
                    if (response.code === 200) {
                        this.rechargeData.toBankName = response.data.bankname
                        this.rechargeData.toCardNo = response.data.cardno
                        this.rechargeData.toCardName = response.data.cardname
                    }
                })
            },
            submitRecharge() {
                if (!this.rechargeData.cardName) {
                    this.$toast("充值姓名不能为空")
                    return
                }
                if (!this.rechargeData.bankName) {
                 this.$toast("充值银行不能为空")
                 return
             }
             if (!this.rechargeData.cardNo) {
                this.$toast("充值卡号不能为空")
                return
            }
            
            if (!this.rechargeData.money) {
                this.$toast("充值金额不能为空")
                return
            }
            if (!this.rechargeData.type) {
             this.$toast("请选择充值类型")
             return
         }

         if (this.rechargeData.bankName.length < 1 || this.rechargeData.bankName.length > 50) {
            this.$toast("充值银行在1到50个字符")
            return
        }
        if (this.rechargeData.cardNo.length < 1 || this.rechargeData.cardNo.length > 50) {
            this.$toast("充值账号在1到50个字符")
            return
        }
        if (this.rechargeData.cardName.length < 1 || this.rechargeData.cardName.length > 50) {
            this.$toast("充值姓名在1到50个字符")
            return
        }
        if (!this.pointReg.test(this.rechargeData.money)) {
            this.$toast("充值金额格式不正确")
            return
        }
        applyMemberRecharge(this.rechargeData).then(response => {
            if (response.code === 200) {
                this.$toast("充值已提交，请等待平台管理员确认")
                this.$router.push('/my')
            } else {
             this.$toast(response.msg)
         }
     });
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
