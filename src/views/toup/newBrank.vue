<template>
    <div class="wrap">
        <van-nav-bar title="新增收款卡" left-arrow @click-left="back"></van-nav-bar>
        <van-cell-group style="width: 95%;margin: 10px auto 0;border-radius: 5px;padding: 10px;box-shadow: 0 0 10px lightgray;">
            <van-field 
					style="width: 100%;margin: 10px auto 10px;"
                    v-model="form.bankname"
                    required
                    type="text"
                    clearable
                    label="收款银行"
                    placeholder="请输入收款银行"
            />
            <div class="searchBox">
                <van-cell v-for="item in bks" :key="item" :title="item" @click="fillBankName(item)"/>
            </div>
            <van-field
					style="width: 100%;margin: 10px auto 10px;"
                    v-model="form.branchNo"
                    required
                    type="text"
                    clearable
                    label="收款支行"
                    placeholder="请输入收款支行"
            />

            <van-field
					style="width: 100%;margin: 10px auto 10px;"
                    v-model="form.name"
                    type="text"
                    label="持卡人"
                    clearable
                    placeholder="请输入持卡人姓名"
                    required
            />
            <van-field
					style="width: 100%;margin: 10px auto 10px;"
                    v-model="form.account"
                    type="number"
                    label="银行卡号"
                    clearable
                    placeholder="请输入银行卡号"
                    required
            />
        </van-cell-group>
        <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submit">
            <p class="blue">确认</p>
        </div>
    </div>
</template>

<script>
    import {addMemberCode} from '../../api'
    import {Tag, Dialog} from 'vant';
    import {bkList} from '../../utils/bankList';

    export default {
        data() {
            return {
                form: {
                    bankname: '',
                    branchNo: '',
                    name: '',
                    account: '',
                    type: 4,
                },
                bks: [],
            }
        },
        methods: {
            back() {
                history.back();
            },
            submit() {
                if (!this.form.bankname) {
                    Dialog.alert({
                        message: '請輸入收款銀行'
                    })
                    return
                }
                if (!this.form.branchNo) {
                    Dialog.alert({
                        message: '請輸入收款支行'
                    })
                    return
                }
                if (!this.form.name) {
                    Dialog.alert({
                        message: '請輸入持卡人姓名'
                    })
                    return
                }
                if (!this.form.account) {
                    Dialog.alert({
                        message: '請輸入銀行卡號'
                    })
                    return
                }
                addMemberCode(this.form).then(response => {
                    if (response.code === 200) {
                        this.$toast('新增成功')
                        this.$router.push('/my/receiveBank')
                    } else {
                        Dialog.alert({
                            message: response.msg
                        })
                    }
                })
            },
            fileter(val) {
                if (val.indexOf(this.form.bankname) > -1) {
                    return val;
                }
            },
            search() {
                if (this.form.bankname == '') {
                    this.bks = [];
                }
                var bankList = bkList();
                this.bks = bankList.filter(this.fileter);
            },
            fillBankName(item) {
                this.form.bankname = item;
                this.bks = [];
            }
        },
        watch: {
            'form.bankname': function(newVal) {
                this.search();
            }
        }
    }
</script>

<style lang="less" scoped>
    .logout {
        bottom: 0;
        height: 50px;
        color: #fff;
        background: #c03131;
    }
    .searchBox {
        position: absolute;
        z-index: 999;
        left: 2.8rem;
        width: 60%;
        overflow: hidden
    }
</style>