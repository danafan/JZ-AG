<template>
    <div class="wrap">
        <Back title="账户信息"/>
        <van-field
        class="label_text"
        v-model="memberInfo.username"
        type="text"
        label="账号"
        disabled
        />
        <van-field
        class="label_text"
        v-model="memberInfo.nickname"
        type="text"
        label="昵称"
        :disabled="!isModify"
        />
        <van-field
        class="label_text top"
        v-model="memberInfo.phone"
        type="text"
        label="手机号码"
        :disabled="!isModify"
        />
        <van-field
        class="label_text"
        v-model="memberInfo.realName"
        type="text"
        label="姓名"
        :disabled="!isModify"
        />
        <!-- <van-field
        class="label_text bottom"
        v-model="memberInfo.idCard"
        type="text"
        label="身份证号码"
        :disabled="!isModify"
        /> -->
        <Button v-if="isModify" text="确定" :active_submit="true" @callback="submit"/>
        <!-- </van-cell-group> -->
        <!-- <div v-if="isModify" class="logout f16 flex fcc bg-fff fixed w100pc" @click="submit">
            <p class="blue">确认</p>
        </div> -->
    </div>
</template>
<style lang="less" scoped>
.label_text{
    height: 1.04rem;
    align-items: center;
    font-size: .32rem;
    color: #777B8F;
}
.top{
    margin-top: .2rem;
}
.bottom{
    margin-bottom: 1.4rem;
}
</style>
<script>
    import {mapGetters} from 'vuex'
    import {Toast} from 'vant'
    import {updateMemberBaseInfo} from '../../../api'

    import Back from '../../../components/Back.vue'
    import Button from '../../../components/Button.vue'

    export default {
        computed: {
            ...mapGetters([
                'member'
                ]),
        },
        data() {
            return {
                isModify: false,
                memberInfo: {
                    id: '',
                    username: '',
                    phone: '',
                    // idCard: '',
                    realName: '',
                    nickname: '',
                    inviteCode: '',
                    verifyCode: '',
                },
                name: '張三'
            }
        },
        components:{
            Back,
            Button
        },
        methods: {
            getMemberInfo() {
                this.$store.dispatch('GetMemberInfo').then(() => {
                    this.memberInfo = {...this.member}
                    // if (!this.memberInfo.realName || !this.memberInfo.idCard || !this.memberInfo.phone) {
                    //     this.isModify = true
                    // }
                    if (!this.memberInfo.realName || !this.memberInfo.phone) {
                        this.isModify = true
                    }
                })
            },
            submit() {
                let phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
                if (!phoneReg.test(this.memberInfo.phone)) {
                    Toast('手机号格式有误');
                    return
                }
                if (!this.memberInfo.realName) {
                    Toast('身份证姓名不能为空');
                    return
                }
                let realNameReg = /^[^~!@￥%\.&\*?\[\]\{\}\^\&\*<>\\\/'"]*$/
                if (!realNameReg.test(this.memberInfo.realName)) {
                    Toast('身份证姓名包含特殊字符');
                    return
                }
                let idCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
                // if (!idCardReg.test(this.memberInfo.idCard)) {
                //     Toast('身份证号码格式有誤');
                //     return
                // }
                updateMemberBaseInfo(this.memberInfo).then(response => {
                    if (response.code === 200) {
                        this.$toast('编辑成功')
                        this.isModify = false
                    } else {
                        this.msgInfo(response.msg);
                    }
                });
            },
        },
        mounted() {
            this.getMemberInfo()
        }
    }
</script>
<!-- 
<style lang="less" scoped>
    .wrap {
        .logout {
            bottom: 0;
            height: 50px;
            color: #fff;
            background: orange;
        }
    }
	.mt-10{
		width: 95%;
		margin: 0.625rem auto 0;
		box-shadow: 0 0 0.625rem lightgray;
		border-radius: 0.625rem;
		padding: 0.625rem;
	}
</style> -->