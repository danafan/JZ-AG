<template>
    <div class="page">
        <van-nav-bar title="充值记录" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <div class="list" v-for="(item,key) in list" :key="key">
                <div class="brankinfo">
                    <p>充值金额：{{'¥'+item.money}}</p>
                    <p>充值类型：{{parseMoneyType(item.type) + '充值'}}</p>
                    <p>{{parseTime(item.createTime)}}</p>
                </div>
                <div class="rightbtn">
                    <span :class="{'background': fillColor(item.type)}">{{parseRechargeStatus(item.status)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {listMemberRecharge} from '../../../api'
    import {Tag, Dialog} from 'vant';

    export default {
        data() {
            return {
                list: [],
            }
        },
        mounted() {
            this.requestData()
        },
        methods: {
            back() {
                this.$router.push('/my/center')
            },
            fillColor(type) {
                switch (type) {
                    case 1:
                        return 'green';
                    case 2:
                        return 'blue';
                    case 3:
                        return 'red';
                    case 4:
                        return 'black';
                }
                return 'black'
            },

            requestData() {
                let queryParams = {
                    pageNum: 1,
                    pageSize: 999,
                }
                listMemberRecharge(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = data.rows
						console.log(data.rows);
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
				text-align: center;
                // display: flex;
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
                    text-align: center;
					position: absolute;
					top: 18%;
					right: 5%;
                    span {
                        color: red;
                        font-size: 10px;
                        display: inline-block;
                        // padding: 5px;
						width: 50px;
						line-height: 20px;
						border-radius: 6.25rem !important;
                        text-align: center;
                        border-radius: 5px;
						border: 2px solid red;
                        // background: red;
						// opacity: 0.5;
						transform:rotate(30deg);
                    }
                }
            }
        }
    }
</style>