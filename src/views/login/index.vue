<template>
    <div class="login_box">
        <img class="logo" src="../../assets/logo.png">
        <div class="title">AG官方唯一合作伙伴</div>
        <div class="input_box">
            <div class="label">账号：</div>
            <input type="text" placeholder="请输入账号" v-model="username">
        </div>
        <div class="input_box">
            <div class="label">密码：</div>
            <input class="input_box" type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="code_box">
            <div class="label">验证码：</div>
            <div class="right">
                <input class="code_input" type="text" placeholder="请输入验证码" v-model="code">
                <img class="code_icon" :src="codeUrl" @click="getCaptcha">
            </div>
            
        </div>
        <Button text="登录" :active_submit="active_submit" @callback="login"/>
        <div class="bottom_buts">
            <div class="but">
                <img src="../../assets/service_icon.png">
                <div class="but_txt">在线客服</div>
            </div>
            <div class="but" @click="show_sheet = true">
                <img src="../../assets/change_icon.png">
                <div class="but_txt">切换线路</div>
            </div>
        </div>
        <van-action-sheet v-model="show_sheet" title="选择线路" :round="false" @cancel="show_sheet = false">
            <div class="sheet_item" :class="{sel_item:active_item == index}" v-for="(item,index) in actions" @click="onSelect(index)">
                <div class="name">{{item.name}}</div>
                <div class="toast">{{randomNum(300,500)}}ms</div>
            </div>
        </van-action-sheet>
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
        width: 6rem;
        height: .96rem;
        border-bottom: 1px solid #E3E5E8;
        font-size: .32rem;
        display: flex;
        align-items: center;
        .label{
         width: 1.52rem;
         color: #333;
     }
     input{
        flex:1;
        height: .8rem;
        border:none;
        outline: none;
    }
}
.code_box{
    margin-bottom:.72rem;
    width: 6rem;
    height: .96rem;
    border-bottom: 1px solid #E3E5E8;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .label{
        width: 1.4rem;
        color: #333;
        font-size: .32rem;
    }
    .right{
     flex:1;
     display: flex;
     align-items: center;
     .code_input{
        width: 1rem;
        border:none;
        outline: none;
        flex:1;
        font-size: .32rem;
    }
    .code_icon{
        width: 1.52rem;
        height: .72rem;
    }
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
    margin-top: .3rem;
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
.sheet_item{
    border-bottom:1px solid #E3E5E8;
    width: 100%;
    height: 1.04rem;
    font-size: .32rem;
    color: #242629;
    display: flex;
    align-items: center;
    justify-content: center;
    .toast{
        margin-left: .2rem;
        font-size: .26rem;
        color: #F15E21;
    }
}
.sel_item{
    color: #5B5FD1;
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
                show_sheet:false,
                actions:[{
                    name:"线路一"
                },{
                    name:"线路二"
                },{
                    name:"线路三"
                },],
                active_item:0
            };
        },
        mounted() {
            this.getCaptcha();
        },
        created(){
            let item_index = localStorage.getItem("itemIndex");
            if(!!item_index){
                this.active_item = item_index;
            }
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
            randomNum(minNum,maxNum){ 
                switch(arguments.length){ 
                    case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                    break; 
                    case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                    break; 
                    default: 
                    return 0; 
                    break; 
                } 
            },
            onSelect(index){
                this.active_item = index;
                localStorage.setItem("itemIndex",index);
                this.show_sheet = false;
                this.$toast("切换中，请稍后...")
                setTimeout(() => {
                    this.$toast("切换成功，正在跳转...");
                    setTimeout(() => {
                        this.$router.go(0);
                    },1500);
                },1500);
            },
            //检验表单是否填写完整
            checkInput(){
                if (!!this.username && !!this.password && !!this.code){
                    this.active_submit = true;
                }else {
                    this.active_submit = false;
                }
            },
            // 异步登录
            login() {
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
                this.$store.dispatch("Login", userData).then((res) => {
                    this.$router.replace('/index');
                }).catch((err) => {
                    this.getCaptcha();
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

