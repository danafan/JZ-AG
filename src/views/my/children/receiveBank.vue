<template>
    <div class="page">
        <van-nav-bar title="收款银行卡列表" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <div class="list" v-for="(item,key) in list" :key="key" :class="item.defaultFlag != 1?'bgColor':''">
                <div class="rightbtn">
                    <span v-if="item.defaultFlag == 1" @click="setDefault(item.id)">设为默认</span>
                    <span v-if="item.defaultFlag != 1" style="background: lightgray">已设默认</span>
                    <span @click="handlerDelete(item.id)">刪除</span>
                </div>
				<div class="brankinfo">
					<p>收款姓名：{{item.name}}</p>
                    <p>收款银行：{{item.bankname}}</p>
                    <p>收款支行：{{item.branchNo}}</p>
                    <p>收款账号：{{item.account}}</p>
                </div>
                
            </div>
        </div>
        <div class="joinbtn" @click="joinbrank">
            +
        </div>
    </div>
</template>

<script>
    import {Tag, Dialog} from 'vant';
    import {delMemberCode, listMemberCode, setDefaultMemberCode} from '../../../api'
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            back() {
                this.$router.push('/my/center')
            },
            joinbrank() {
                this.$router.push({path: '../newbrank'})
            },


            requestData() {
                let queryParams = {
                    pageNum: 1,
                    pageSize: 9999,
                    type: 4,
                }
                listMemberCode(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = data.rows
                    }
                }).catch((e) => {
                    Dialog.alert({
                        title: '警告',
                        message: e.message
                    })
                })
            },
            handlerDelete(id) {
                Dialog.confirm({
                    title: '溫馨提示',
                    message: '是否确认刪除该条银行卡数据?'
                }).then(() => {
                    delMemberCode(id).then(() => {
                        this.requestData()
                    })
                }).catch(() => {
                });
            },
            setDefault(id) {
                Dialog.confirm({
                    title: '溫馨提示',
                    message: '是否确认将该银行卡设置为默认?'
                }).then(() => {
                    setDefaultMemberCode(id, 4).then(() => {
                        this.list = []
                        this.requestData()
                    })
                }).catch(() => {
                });
            },
        },
        mounted() {
            this.requestData()
        }
    }
</script>

<style lang="less" scoped>
    .page {
		.bgColor{
			background-color: #FFFFFF !important;
		}
        .wrap {
            width: 95%;
            margin: 10px auto;
            .list {
                background: #fff;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
				box-shadow: 0 0 10px lightgray;
                // display: flex;
                .brankinfo {
                    // flex: 1.6;
					position: relative;
					text-align: left;
                    p{
                        margin: 10px 0;
                        font-size: 12px;
                    }
                }
                .rightbtn {
                    flex: 1;
					text-align: right;
					border-bottom: 1px solid lightgray;
					padding-bottom: 0.3125rem;
                    span {
                        color: #fff;
                        font-size: 12px;
                        display: inline-block;
                        padding: 10px;
                        width: 50px;
                        text-align: center;
                        border-radius: 5px;
                        height: 30px;
                        background: DarkSalmon;
                        &:first-child {
                            background: LightSteelBlue;
                            width: 70px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .joinbtn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px;
            background: DarkSalmon;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 30px;
            font-weight: 600;
            color: #fff;
            text-align: center;
            box-shadow: 0 0 10px #ccc;
        }
    }
</style>