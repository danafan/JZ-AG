<template>
    <div class="wrap">
        <!-- <van-nav-bar title="新增收款卡" left-arrow @click-left="back"></van-nav-bar>
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
        </div> -->
        <Back title="新增银行卡"/>
        <van-field
        class="label_text"
        v-model="form.bankname"
        type="text"
        label="收款银行"
        placeholder="请输入收款银行"
        />
        <van-field
        class="label_text"
        v-model="form.branchNo"
        type="text"
        label="收款支行"
        placeholder="请输入收款支行"
        />
        <van-field
        class="label_text"
        v-model="form.name"
        type="text"
        label="持卡人"
        placeholder="请输入持卡人姓名"
        />
        <van-field
        class="label_text bottom"
        v-model="form.account"
        type="number"
        label="银行卡号"
        placeholder="请输入银行卡号"
        />
        <Button text="确定" :active_submit="true" @callback="submit"/>
    </div>
</template>
<style lang="less" scoped>
.label_text{
    height: 1.04rem;
    align-items: center;
    font-size: .32rem;
    color: #777B8F;
}
.bottom{
    margin-bottom: 1.4rem;
}
</style>
<script>
    import {addMemberCode} from '../../api'
    import {Tag, Dialog} from 'vant';
    import {bkList} from '../../utils/bankList';

    import Back from '../../components/Back.vue'
    import Button from '../../components/Button.vue'

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
        components:{
            Back,
            Button
        },
        methods: {
            // back() {
            //     history.back();
            // },
            submit() {
                if (!this.form.bankname) {
                    this.$toast('请输入收款银行')
                    return
                }
                if (!this.form.branchNo) {
                    this.$toast('请输入收款支行')
                    // Dialog.alert({
                    //     message: '請輸入收款支行'
                    // })
                    return
                }
                if (!this.form.name) {
                    this.$toast('请输入持卡人姓名')
                    // Dialog.alert({
                    //     message: '請輸入持卡人姓名'
                    // })
                    return
                }
                if (!this.form.account) {
                     this.$toast('请输入银行卡号')
                    // Dialog.alert({
                    //     message: '請輸入銀行卡號'
                    // })
                    return
                }
                addMemberCode(this.form).then(response => {
                    if (response.code === 200) {
                        this.$toast('新增成功')
                        this.$router.go(-1);
                    } else {
                        this.$toast(response.msg)
                        // Dialog.alert({
                        //     message: response.msg
                        // })
                    }
                })
            },
            // fileter(val) {
            //     if (val.indexOf(this.form.bankname) > -1) {
            //         return val;
            //     }
            // },
            // search() {
            //     if (this.form.bankname == '') {
            //         this.bks = [];
            //     }
            //     var bankList = bkList();
            //     this.bks = bankList.filter(this.fileter);
            // },
            // fillBankName(item) {
            //     this.form.bankname = item;
            //     this.bks = [];
            // }
        },
        // watch: {
        //     'form.bankname': function(newVal) {
        //         this.search();
        //     }
        // }
    }
</script>

                            <!-- <style lang="less" scoped>
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
                        </style> -->