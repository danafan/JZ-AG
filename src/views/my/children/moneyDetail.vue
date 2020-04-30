<template>
    <div class="page">
        <!-- <van-nav-bar title="资金明细" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list style="width: 95%;border-radius: 5px;margin: 5px auto;" v-model="loading" :finished="finished" :offset="10"
                finished-text="沒有更多了" @load="onLoad"> -->
                    <!--<van-cell
                            v-for="(item,index) in list"
                            :key="index"
                            :title="item.name"
                            :value="item.saleDate"
                            />-->

                   <!--  <div class="list" v-for="(item,key) in list" :key="key">
                        <div class="brankinfo">
                            <p>变动金额：{{'¥'+item.money}}</p>
                            <p>变动时间：{{parseTime(item.createTime)}}</p>
                            <p>备注：{{item.remark}}</p>
                        </div>
                        <div class="rightbtn">
                            <span>{{parseMoneyDetailType(item.type)}}</span>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh> -->



            <!-- </div> -->


            <Back title="资金明细"/>
            <div class="card_list">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" :offset="10"
                    finished-text="沒有更多了" @load="onLoad">
                    <Card v-for="item in list">
                        <div class="card_content">
                            <img class="zhang" :src="item.type | imgType">
                            <div class="money_box">
                                <img src="../../../assets/rmb.png">
                                <div class="money_txt">{{item.money}}</div>
                            </div>
                            <div class="toast">{{item.remark}}</div>
                            <div class="line"></div>
                            <div class="time_box">
                                <div class="time_label">变动时间</div>
                                <div class="time_val">{{parseTime(item.createTime)}}</div>
                            </div>
                        </div>
                    </Card>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>
<style lang="less" scoped>
.page{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
}
.card_list{
    padding: .3rem;
    flex: 1;
    overflow-y: scroll;
    .card_content{
        position: relative;
        width: 100%;
        height: 100%;
        .zhang{
            position: absolute;
            top: -.4rem;
            right: -.3rem;
            width: 1.2rem;
            height: 1.16rem;
        }
        .money_box{
            margin-top: .2rem;
            width: 100%;
            height: .6rem;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            img{
                margin-bottom: .08rem;
                margin-right: .08rem;
                width: .36rem;
                height: .34rem;
            }
            .money_txt{
                font-size: .6rem;
                color: #212744;
                font-weight:bold;
            }
        }
        .toast{
            margin-top: .4rem;
            width: 100%;
            text-align: center;
            font-size: .28rem;
            color: #777B8F;
        }
        .line{
            margin-top: .3rem;
            width: 100%;
            border-bottom: 1px dashed #E4E5EB;
        }
        .time_box{
            margin-top: .38rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .28rem;
            color: #777B8F;
        }
    }
}
</style>
<script>
    import {listMemberMoneyDetail} from '../../../api'
    import {Tag, Dialog} from 'vant';

    import Back from '../../../components/Back.vue'
    import Card from '../../../components/Card.vue'

    export default {
        data() {
            return {
                active: 0,
                list: [],
                loading: false,
                finished: false,
                isLoading: false,
                pageIndex: 1,
            }
        },
        mounted() {
        },
        components:{
            Back,
            Card,
        },
        methods: {
            back() {
                this.$router.push('/my/center')
            },
            onRefresh() {
                this.list = []
                this.pageIndex = 1
                let queryParams = {
                    pageNum: this.pageIndex,
                    pageSize: 8,
                }
                listMemberMoneyDetail(queryParams).then(data => {
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
                    this.$toast(e.message);
                    // Dialog.alert({
                    //         title: '警告',
                    //         message: e.message
                    //     }
                    // )
                })
            },
            onLoad() {
                let queryParams = {
                    pageNum: this.pageIndex,
                    pageSize: 8,
                }
                listMemberMoneyDetail(queryParams).then(data => {
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
                    this.$toast(e.message);
                    // Dialog.alert({
                    //         title: '警告',
                    //         message: e.message
                    //     }
                    // )
                })
            },
        },
        filters:{
            imgType:function(v){
                if(v == 1){
                    return require('../../../assets/m_status_1.png')
                }else if(v == 2){
                    return require('../../../assets/m_status_2.png')
                }else if (v == 3){
                    return require('../../../assets/m_status_3.png')
                }else if (v == 4){
                    return require('../../../assets/m_status_4.png')
                }else if (v == 5){
                    return require('../../../assets/m_status_5.png')
                }else if (v == 6){
                    return require('../../../assets/m_status_6.png')
                }else if (v == 7){
                    return require('../../../assets/m_status_7.png')
                }
                
            }
        }
    }
</script>

<!-- <style lang="less" scoped>
    .page {
        .wrap {
            width: 95%;
            margin: 10px auto;
            .list {
                background: #fff;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
                // display: flex;
				text-align: center;
				position: relative;
				box-shadow: 0 0 10px lightgray;
                .brankinfo {
                    flex: 2;
                    p {
                        margin: 10px 0;
                        font-size: 12px;
                    }
                }
                .rightbtn {
                    flex: 1;
                    text-align: right;
					position: absolute;
					top: 18%;
					right: 5%;
                    span {
                        color: red;
                        font-size: 10px;
                        display: inline-block;
                        padding: 5px;
                        text-align: center;
                        border-radius: 5px;
                        // background: red;
						// width: 80px;
						line-height: 20px;
						// border-radius: 6.25rem !important;
						text-align: center;
						border-radius: 5px;
						// opacity: 0.5;
						border: 2px solid red;
						transform:rotate(30deg);
                    }
                }
            }
        }
    }
</style> -->