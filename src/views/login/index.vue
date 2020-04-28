<template>
    <div class="login_box">
        <img class="logo" src="../../assets/logo.png">
        <div class="title">AG官方唯一合作伙伴</div>
        <input class="input_box" type="text" placeholder="请输入用户名" v-model="username">
        <input class="input_box" type="password" placeholder="请输入密码" v-model="password">
        <div class="code_box">
            <input class="code_input" type="text" placeholder="请输入验证码" v-model="code">
            <img class="code_icon" :src="codeUrl" @click="getCaptcha">
        </div>
        <Button text="登录" :active_submit="active_submit" @callback="login"/>
        <div class="bottom_buts">
            <div class="but">
                <img src="../../assets/service_icon.png">
                <div class="but_txt">在线客服</div>
            </div>
            <div class="but">
                <img src="../../assets/change_icon.png">
                <div class="but_txt">切换线路</div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.login_box{
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1.84rem .76rem 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    .logo{
        width: 1.86rem;
        height: 1.1rem;
    }
    .title{
        margin-top: .42rem;
        margin-bottom:.6rem;
        font-size: .32rem;
        color: #242629;
    }
    .input_box{
        border:none;
        outline: none;
        width: 6rem;
        height: .96rem;
        border-bottom: 1px solid #E3E5E8;
        font-size: .32rem;
    }
    .code_box{
        margin-bottom:.72rem;
        width: 6rem;
        height: .96rem;
        border-bottom: 1px solid #E3E5E8;
        display:flex;
        align-items: center;
        justify-content: space-between;
        .code_input{
            flex:1;
            font-size: .32rem;
        }
        .code_icon{
            width: 1.52rem;
            height: .72rem;
        }
    }
    input::-webkit-input-placeholder {
        color:#C1C1C7;
    }
    input:-moz-placeholder {
        color:#C1C1C7;
    }
    input:-ms-input-placeholder {
        color:#C1C1C7;
    }
    .bottom_buts{
        margin-top: 2.74rem;
        width: 100%;
        display:flex;
        align-items: center;
        justify-content: space-between;
        .but{
            border:1px solid #5B5FD1;
            border-radius: .24rem;
            width: 1.7rem;
            height: .48rem;
            display:flex;
            align-items: center;
            justify-content: center;
            img{
                width: .28rem;
                height: .28rem;
            }
            .but_txt{
                margin-left: .05rem;
                font-size: .24rem;
                color: #5B5FD1;
            }
        }
    }
}
</style>
<script>
    import {Toast} from 'vant'
    import {getCodeImg} from '../../api'
    import Button from '../../components/Button.vue'
    export default {
        data() {
            return {
                uuid: '',
                username: "",
                password: "",
                code: "",
                captcha: '', // 图形验证码
                codeUrl: '',
                active_submit:false,        //默认按钮不高亮
            };
        },
        mounted() {
            this.getCaptcha();
        },
        watch:{
            username:function(n,o){
                if(n != o){
                    this.checkInput();
                }
            },
            password:function(n,o){
                if(n != o){
                    this.checkInput();
                }
            },
            code:function(n,o){
                if(n != o){
                    this.checkInput();
                }
            },
        },
        methods: {
            //检验表单是否填写完整
            checkInput(){
                if (!!this.username && !!this.password && !!this.code){
                    this.active_submit = true;
                }else {
                    this.active_submit = false;
                }
            },
            // 异步登录
            async login() {
                // 密码登陆
                if (!this.username) {
                    // 用户名必须指定
                    Toast('用户名不能为空！');
                    return
                } else if (!this.password) {
                    // 密码必须指定
                    Toast('密码不能为空！');
                    return
                } else if (!this.code) {
                    // 验证码必须指定
                    Toast('验证码不能为空！');
                    return
                }
                let userData = {
                    uuid:this.uuid,
                    username:'MEMBER&' + this.username,
                    password:this.password,
                    code:this.code
                }
                this.$store.dispatch("Login", userData).then(() => {
                    this.$router.replace('/index');
                }).catch(() => {
                    this.getCaptcha()
                });
            },
            // 获取一个新的图片验证码
            getCaptcha() {
                getCodeImg().then(res => {
                    this.codeUrl = "data:image/gif;base64," + res.img;
                    this.uuid = res.uuid;
                });
            }
        },
        components:{
            Button
        }
        
    }
</script>

