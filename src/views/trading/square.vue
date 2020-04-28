<template>
    <div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="padding">
            <van-list v-model="loading" :finished="finished" :offset="10"
            finished-text="已经到底了" @load="onLoad">
            <Card v-for="(item,index) in list">
               <div class="top_row">
                   <img class="pay" src="../../assets/pay.png">
                   <div class="money"><span>¥</span>{{item.money}}</div>
               </div>
               <div class="over">已完成</div>
               <div class="create_time">
                   <div class="time_title">订单时间</div>
                   <div class="time_content">{{parseTime(item.createTime)}}</div>
               </div>
           </Card>
       </van-list>
   </van-pull-refresh>
</div>
</template>
<style lang="less" scoped>
.padding{
    padding: .2rem .3rem;
}
.top_row{
    margin-top: .2rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .pay{
        position: absolute;
        left: 0;
        width: .52rem;
        height: .52rem;
    }
    .money{
        display:flex;
        align-items: center;
        font-size: .6rem;
        color: #212744;
        font-weight: bold;
        span{
            font-size: .46rem;
            font-weight:400;
        }
    }
}
.over{
    border-bottom: 1px dashed #E4E5EB;
    padding-top: .4rem;
    padding-bottom: .4rem;
    width: 100%;
    text-align: center;
    font-size: .32rem;
    color: #212744;
    font-weight:500;
}
.create_time{
    margin-top: .4rem;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: .28rem;
    color: #777B8F;
}
</style>
<script>
    import {listShoudanOrder,setReadStatus} from '../../api'
    import {Dialog} from 'vant';
    import Card from '../../components/Card.vue';

    export default {
        data() {
            return {
                active: 0,
                list: [],
                loading: false,
                finished: false,
                isLoading: false,
                pageIndex: 1,
            };
        },
        methods: {
            onRefresh() {
                this.list = []
                this.pageIndex = 1
                let queryParams = {
                    pageNum: this.pageIndex,
                    pageSize: 15,
                    status: 4, // 订单状态（1匹配中 2待付款 3已付款 4已完成）
                }
                listShoudanOrder(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = this.list.concat(data.rows)
                        this.pageIndex = this.pageIndex + 1
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (this.list.length >= data.total) {
                            this.finished = true;
                        }
                        this.$toast('刷新成功');
                        this.isLoading = false;
                    }
                }).catch((e) => {
                    Dialog.alert({
                        title: '警告',
                        message: e.message
                    }
                    )
                })
            },
            onLoad() {
                let queryParams = {
                    pageNum: this.pageIndex,
                    pageSize: 15,
                    status: 4, // 订单状态（1匹配中 2待付款 3已付款 4已完成）
                }
                listShoudanOrder(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = this.list.concat(data.rows)
                        this.pageIndex = this.pageIndex + 1
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (this.list.length >= data.total) {
                            this.finished = true;
                        }
                    }
                }).catch((e) => {
                    Dialog.alert({
                        title: '警告',
                        message: e.message
                    }
                    )
                })
            },
            setRstatus() {
                setReadStatus().then(res => {
                    console.log(res);
                })
            }
        },
        created() {
            this.setRstatus();
        },
        components:{
            Card
        }
    };
</script>


