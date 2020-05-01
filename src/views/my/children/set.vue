<template>
    <div class="page">
        <Back title="设置"/>
        <div class="set_item" @click="$router.push('/accountInfo')">
            <div class="label">账户信息</div>
            <img src="../../../assets/jian.png">
        </div>
        <div class="set_item" @click="$router.push('/modifiedPassword')">
            <div class="label">修改登录密码</div>
            <img src="../../../assets/jian.png">
        </div>
        <div class="set_item null" @click="$router.push('/capitalModified')">
            <div class="label">修改资金密码</div>
            <img src="../../../assets/jian.png">
        </div>
        <div class="set_item top" @click="$router.push('/withdrawBank')">
            <div class="label">提现银行卡管理</div>
            <img src="../../../assets/jian.png">
        </div>
        <Button text="退出登录" :active_submit="true" @callback="showDialog = true"/>
        <DialogModel @callback="confirm" @close="showDialog = false" :content="content" v-if="showDialog"/>
    </div>
</template>
<style lang="less" scoped>
.set_item{
    border-bottom: 1px solid #E2E3E9;
    width: 100%;
    height: 1.04rem;
    background: #fff;
    padding-left: .3rem;
    padding-right: .3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label{
        font-size: .32rem;
        color: #777B8F;
    }
    img{
        width: .16rem;
        height: .28rem;
    }
}
.top{
    margin-top: .2rem;
    margin-bottom: 5rem;
    border:none;
}
.null{
    border:none;
}
</style>
<script>
    import Back from '../../../components/Back.vue'
    import Button from '../../../components/Button.vue'
    import DialogModel from '../../../components/DialogModel.vue'

    export default {
        data() {
            return {
                showDialog:false,       //默认不显示弹框
                content:"确认退出？"
            }
        },
        components: {
            Back,
            Button,
            DialogModel
        },
        methods: {
            //确认退出
            confirm(){
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.replace('/login')
                })
            }
        }
    };
</script>

