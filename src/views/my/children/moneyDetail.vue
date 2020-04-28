<template>
    <div class="page">
        <van-nav-bar title="资金明细" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list style="width: 95%;border-radius: 5px;margin: 5px auto;" v-model="loading" :finished="finished" :offset="10"
                          finished-text="沒有更多了" @load="onLoad">
                    <!--<van-cell
                            v-for="(item,index) in list"
                            :key="index"
                            :title="item.name"
                            :value="item.saleDate"
                    />-->

                    <div class="list" v-for="(item,key) in list" :key="key">
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
            </van-pull-refresh>



        </div>
    </div>
</template>

<script>
    import {listMemberMoneyDetail} from '../../../api'
    import {Tag, Dialog} from 'vant';

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
                    Dialog.alert({
                            title: '警告',
                            message: e.message
                        }
                    )
                })
            },
        }
    }
</script>

<style lang="less" scoped>
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
</style>