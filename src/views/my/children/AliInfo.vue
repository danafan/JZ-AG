<template>
    <div class="wrap">
        <van-nav-bar title="账户信息"></van-nav-bar>
        <van-cell-group class="mt-10">
            <van-cell title="支付宝二维码" center>
                <template slot="default">
                    <van-image
                        width="50"
                        height="50"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                </template>
            </van-cell>
            <van-cell title="支付宝名称" :value="name"></van-cell>
            <van-cell title="支付宝账号" value=""></van-cell>

        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "accountInfo",
        data () {
            return {
                name: '張三'
            }
        },
        mounted() {}
    }
</script>

<style lang="less" scoped>
    .wap{

    }
</style>