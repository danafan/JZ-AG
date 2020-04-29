<template>
    <div class="page">
        <!-- <van-nav-bar title="收款银行卡列表" left-arrow @click-left="back"></van-nav-bar>
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
        </div> -->
        <Back title="收款银行卡"/>
        <div class="card_list">
         <Card  v-for="item in list">
            <div class="card_row">
                <img class="pay" src="../../../assets/pay.png">
                <div class="you">
                    <div class="mo" :class="{sel_mo:item.defaultFlag != 1}" @click="setDefault(item)">{{item.defaultFlag != 1 ? '已设默认':'设为默认'}}</div>
                    <img class="delete" src="../../../assets/delete.png" @click="handlerDelete(item.id)">
                </div>
                
            </div>
            <div class="card_row">
                <div class="text">收款银行</div>
                <div class="text">{{item.bankname}}</div>
            </div>
            <div class="card_row">
                <div class="text">收款支行</div>
                <div class="text">{{item.branchNo}}</div>
            </div>
            <div class="card_row">
                <div class="text">持卡人</div>
                <div class="text">{{item.name}}</div>
            </div>
            <div class="card_row wu">
                <div class="text">银行卡号</div>
                <div class="text">{{item.account}}</div>
            </div>
        </Card>
        <Button text="添加银行卡" :active_submit="true" @callback="$router.push('/newbrank')"/>
    </div>
    <DialogModel @callback="confirm" @close="showDialog = false" :content="content" v-if="showDialog"/>
    <DialogModel @callback="confirm1" @close="showDialog1 = false" :content="content1" v-if="showDialog1"/>
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
    .you{
        display:flex;
        align-items: center;
        .mo{
            border-radius: .04rem;
            margin-right: .4rem;
            width: 1.4rem;
            text-align: center;
            height: .48rem;
            line-height: .48rem;
            font-size: .24rem;
            color: #C1C4D1;
            border:1px solid #EAEBF3;
        }
        .sel_mo{
            background: #EAEBF2;
            color: #212744;
        }
        .delete{
            width: .4rem;
            height: .4rem;
        }
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
    import {delMemberCode, listMemberCode, setDefaultMemberCode} from '../../../api'

    import Back from '../../../components/Back.vue'
    import Card from '../../../components/Card.vue'
    import Button from '../../../components/Button.vue'
    import DialogModel from '../../../components/DialogModel.vue'

    export default {
        data() {
            return {
                list: [],
                content:"是否确认删除该条银行卡数据？",
                content1:"是否确认将该银行卡设置为默认?",
                showDialog:false,
                showDialog1:false,
                id:"",
                mo_text:"设为默认"
            }
        },
        components:{
            Back,
            Card,
            Button,
            DialogModel
        },
        methods: {
            // back() {
            //     this.$router.push('/my/center')
            // },
            // joinbrank() {
            //     this.$router.push({path: '../newbrank'})
            // },


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
                    this.$toast(e.message)
                    // Dialog.alert({
                    //     title: '警告',
                    //     message: e.message
                    // })
                })
            },
            handlerDelete(id) {
                this.showDialog = true;
                this.id = id;
                // Dialog.confirm({
                //     title: '溫馨提示',
                //     message: '是否确认刪除该条银行卡数据?'
                // }).then(() => {
                //     delMemberCode(id).then(() => {
                //         this.requestData()
                //     })
                // }).catch(() => {
                // });
            },
            confirm(){
                delMemberCode(this.id).then(() => {
                    this.showDialog = false;
                    this.requestData()
                })
            },
            confirm1(){
                setDefaultMemberCode(this.id, 4).then(() => {
                    this.showDialog1 = false;
                    this.list = []
                    this.requestData()
                })
            },
            setDefault(item) {
                if(item.defaultFlag == 1){
                    this.showDialog1 = true;
                    this.id = item.id;
                }
                // Dialog.confirm({
                //     title: '溫馨提示',
                //     message: '是否确认将该银行卡设置为默认?'
                // }).then(() => {
                //     setDefaultMemberCode(id, 4).then(() => {
                //         this.list = []
                //         this.requestData()
                //     })
                // }).catch(() => {
                // });
            },
        },
        mounted() {
            this.requestData()
        }
    }
</script>

<!-- <style lang="less" scoped>
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
</style> -->