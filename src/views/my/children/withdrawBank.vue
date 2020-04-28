<template>
    <div class="page">
        <Back title="提现银行卡"/>
        <div class="card_list">
           <Card  v-for="item in list">
            <div class="card_row">
                <img class="pay" src="../../../assets/pay.png">
                <img class="delete" src="../../../assets/delete.png" @click="handlerDelete(item.id)">
            </div>
            <div class="card_row">
                <div class="text">所属银行</div>
                <div class="text">{{item.bankName}}</div>
            </div>
            <div class="card_row">
                <div class="text">持卡人</div>
                <div class="text">{{item.cardName}}</div>
            </div>
            <div class="card_row wu">
                <div class="text">银行卡号</div>
                <div class="text">{{item.cardNo}}</div>
            </div>
        </Card>
        <Button text="添加银行卡" :active_submit="true" @callback="$router.push('/addWithdrawBank')"/>
    </div>
    <DialogModel @callback="confirm" @close="showDialog = false" :content="content" v-if="showDialog"/>
        <!-- <van-nav-bar title="提现银行卡" left-arrow @click-left="back"></van-nav-bar>
        <div class="wrap">
            <div class="list" v-for="(item,key) in list" :key="key">
                
				<div class="brankinfo">
					<p>持卡人：{{item.cardName}}</p>
                    <p>所属银行：{{item.bankName}}</p>
                    <p>卡号：{{item.cardNo}}</p>
                </div>
                <div class="rightbtn">
                    <span @click="handlerDelete(item.id)">刪除</span>
                </div>
            </div>
        </div>
        <div class="joinbtn" @click="addWithdrawBank">
            +
        </div> -->
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
}
.card_row{
    margin-bottom: .36rem;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .pay{
        width: .52rem;
        height: .52rem;
    }
    .delete{
        width: .4rem;
        height: .4rem;
    }
    .text{
        font-size: .28rem;
        color: #777B8F;
    }
}
.wu{
    margin:0;
}
</style>
<script>
    import {Tag, Dialog} from 'vant';
    import {delMemberBankcard, listMemberBankcard} from '../../../api'

    import Back from '../../../components/Back.vue'
    import Card from '../../../components/Card.vue'
    import Button from '../../../components/Button.vue'
    import DialogModel from '../../../components/DialogModel.vue'

    export default {
        data() {
            return {
                list: [],
                content:"是否确认删除该条银行卡数据",
                showDialog:false,
                id:""
            }
        },
        components:{
            Back,
            Card,
            Button,
            DialogModel
        },
        methods: {
            requestData() {
                let queryParams = {
                    pageNum: 1,
                    pageSize: 9999,
                    type: 4,
                }
                listMemberBankcard(queryParams).then(data => {
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
                this.showDialog = true;
                this.id = id;
                // Dialog.confirm({
                //     title: '溫馨提示',
                //     message: '是否确认刪除该条银行卡数据?'
                // }).then(() => {
                //     delMemberBankcard(id).then(() => {
                //         this.requestData()
                //     })
                // }).catch(() => {
                // });
            },
            confirm(){
                delMemberBankcard(this.id).then(() => {
                    this.requestData()
                })
            }
        },
        mounted() {
            this.requestData()
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
                // border-radius: 10px;
                margin-bottom: 10px;
				box-shadow: 0 0 5px lightgray;
				border-radius: 4px;
                // display: flex;
                .brankinfo {
                    flex: 9;
                    p {
                        margin: 10px 0;
                        font-size: 12px;
                    }
                }
                .rightbtn {
                    flex: 1;
					text-align: right;
					padding-top: 0.3125rem;
					border-top: 1px solid lightgray;
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
</style> -->