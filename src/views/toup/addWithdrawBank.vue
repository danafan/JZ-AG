<template>
    <div class="wrap">
        <Back title="新增提现卡"/>
        <van-field
        class="label_text"
        v-model="form.bankName"
        type="text"
        label="所属银行"
        placeholder="请输入所属银行"
        />
        <van-field
        class="label_text"
        v-model="form.cardName"
        type="text"
        label="持卡人"
        placeholder="请输入持卡人姓名"
        />
        <van-field
        class="label_text bottom"
        v-model="form.cardNo"
        type="number"
        label="银行卡号"
        placeholder="请输入银行卡号"
        />
         <Button text="确定" :active_submit="true" @callback="submit"/>
        <!-- <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submit">
            <p class="blue">确认</p>
        </div>  -->
    </div>
</template>
<style lang="less" scoped>
    .label_text{
    font-size: .32rem;
    color: #777B8F;
}
.bottom{
    margin-bottom: 1.4rem;
}
</style>
<script>
    import {addMemberBankcard} from '../../api'
    import {Dialog} from 'vant';

    import Back from '../../components/Back.vue'
    import Button from '../../components/Button.vue'

    export default {
        data() {
            return {
                form: {
                    bankName: '',
                    cardName: '',
                    cardNo: ''
                },
            }
        },
        components:{
            Back,
            Button
        },
        methods: {
            submit() {
                if (!this.form.bankName) {
                    this.$toast('请输入所属银行');
                    return
                }
                if (!this.form.cardName) {
                    this.$toast('请输入持卡人');
                    return
                }
                if (!this.form.cardNo) {
                    this.$toast('请输入银行卡号');
                    return
                }
                addMemberBankcard(this.form).then(response => {
                    if (response.code === 200) {
                        this.$toast('新增成功');
                        this.$router.push('/withdrawBank')
                    } else {
                        this.$toast(response.msg);
                    }
                })
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
	.mt{
		width: 95%;
		margin: 0.625rem auto 0;
		box-shadow: 0 0 5px lightgray;
		border-radius: 5px;
		padding: 5px;
	}
</style> -->