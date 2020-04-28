<template>
    <div class="wrap">
       <Back title="修改资金密码"/>
       <!-- <van-cell-group class="mt"> -->
        <van-field
        class="label_text"
        v-model="oldpassword"
        type="password"
        label="旧密码"
        placeholder="请输入旧密码"
        />

        <van-field
        class="label_text"
        v-model="password"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
        />
        <van-field
        class="label_text bottom"
        v-model="passwords"
        type="password"
        label="确认密码"
        placeholder="请输入确认密码"
        />
        <Button text="确定" :active_submit="true" @callback="submit"/>
        <!-- </van-cell-group> -->
        <!-- <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submit">
            <p class="blue" style="background-color: FireBrick;">确认</p>
        </div> -->
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
    import {updateMemberPwd} from '../../../api'

    import Back from '../../../components/Back.vue'
    import Button from '../../../components/Button.vue'

    export default {
        data() {
            return {
                oldpassword: '',
                password: '',
                passwords: '',
            }
        },
        components:{
            Back,
            Button
        },
        methods: {
            submit() {
                if (!this.oldpassword) {
                    this.$toast("请输入旧密码")
                    return
                }
                if (!this.password) {
                    this.$toast("请输入新密码")
                    return
                }
                if (!this.passwords) {
            
                    this.$toast("请输入确认密码")
                    return
                }

                if (this.password.length > 20 || this.password.length < 6) {
                    this.$toast("密码长度限制6到20")
                    return
                }
                if (this.password !== this.passwords) {
                    this.$toast("两次输入的密码不一致")
                    return
                }

                updateMemberPwd(this.oldpassword, this.password, 2).then(
                    response => {
                        if (response.code === 200) {
                            this.$toast("登录密码修改成功")
                            this.oldpassword = ''
                            this.password = ''
                            this.passwords = ''
                        } else {
                            this.$toast(response.msg)
                            this.oldpassword = ''
                            this.password = ''
                            this.passwords = ''
                        }
                    }
                    )
            },
        }
    }
</script>
<!-- 
<style lang="less" scoped>
.logout {
    bottom: 0;
    height: 50px;
    color: #fff;
    background: FireBrick;
}
.mt{
  width: 95%;
  margin: 0.625rem auto 0;
  border-radius: 0.3125rem;
  box-shadow: 0 0 0.625rem lightgray;
  padding: 0.3125rem;
}
</style> -->