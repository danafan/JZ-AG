<template>
    <div class="wrap">
        <van-nav-bar title="新增下级"></van-nav-bar>
        <div class="card_list">
            <Card>
                <div class="list_item">
                    <div class="list_label">用户名</div>
                    <input type="text" placeholder="请输入用户名" v-model="form.username">
                </div>
                <div class="list_item">
                    <div class="list_label">用户类型</div>
                    <div class="list_val" @click="shows=true">
                        <div>{{typeName}}</div>
                        <img src="../../../assets/down.png">
                    </div>
                </div>
                <div class="list_item null_bottom">
                    <div class="list_label">佣点</div>
                    <input type="number" placeholder="请输入佣点" v-model="form.agentPoint">
                </div>
            </Card>
            <Button text="确定" :active_submit="true" @callback="submit"/>
        </div>
        <!-- <van-cell-group class="mt">
            <van-field
                    v-model="form.username"
                    required
                    type="text"
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
            />

            <van-field
                    v-model="typeName"
                    type="text"
                    label="用户类型"
                    :readonly="true"
                    placeholder="请选择用户类型"
                    required
                    @click="shows=true"
            />
            <van-field
                    v-model="form.agentPoint"
                    type="number"
                    label="佣点"
                    clearable
                    placeholder="请输入佣点"
                    required
            />
        </van-cell-group>
        <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="submit">
            <p class="blue">确认</p>
        </div> -->
        <!-- <van-action-sheet v-model="shows" :actions="actions" @select="onSelect" cancel-text="取消" @cancel="onCancel"/> -->

        <van-action-sheet v-model="shows" title="用户类型" :round="false" @cancel="onCancel">
            <div class="sheet_item" v-for="item in actions" @click="onSelect(item)">{{item.name}}</div>
        </van-action-sheet>
    </div>
</template>
<style lang="less" scoped>
.wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    .card_list{
        background: #F6F6F6;
        padding: .3rem;
        flex: 1;
        .list_item{
            border-bottom: 1px solid #E5E6EC;
            height: .8rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: .28rem;
            .list_label{
                color: #777B8F;
            }
            .list_val{
                color:#C1C4D1;
                display: flex;
                align-items: center;
                img{
                    margin-left: .2rem;
                    width: .24rem;
                    height: .22rem;
                }
            }
            input{
                height: .28rem;
                border: none;
                outline: none;
                text-align: right;
            }
            input::-webkit-input-placeholder {
                color:#C1C4D1;
            }
            input:-moz-placeholder {
                color:#C1C4D1;
            }
            input:-ms-input-placeholder {
                color:#C1C4D1;
            }
        }
        .null_bottom{
            border:none;
        }
    }
    .sheet_item{
        border-bottom:1px solid #E3E5E8;
        width: 100%;
        text-align: center;
        height: 1.04rem;
        line-height: 1.04rem;
        font-size: .32rem;
        color: #242629;
    }
}
</style>
<script>
    import {mapGetters} from 'vuex'
    import {addSubMember} from '../../../api'
    import {Dialog} from 'vant'

    import Card from '../../../components/Card.vue'
    import Button from '../../../components/Button.vue'

    export default {
        computed: {
            ...mapGetters([
                'member'
                ]),
        },
        data() {
            return {
                shows: false,
                actions: [
                {name: '普通会员', id: 1},
                {name: '代理会员', id: 2}
                ],
                typeName: '请选择用户类型',
                form: {
                    username: '',
                    agentPoint: '',
                    type: undefined
                },
                pointReg: /^\d{1,17}(\.\d{1,5})?$/,
            }
        },
        components:{
            Card,
            Button
        },
        methods: {
            onSelect(e) {
                this.shows = false
                this.typeName = e.name
                this.form.type = e.id
            },
            onCancel() {
                this.shows = false
            },
            submit() {
                if (!this.form.username) {
                    this.$toast('用户名不能为空');
                    // Dialog.alert({
                    //     title: '用户名不能为空',
                    // }
                    // )
                    return
                }
                if (this.form.username.length < 1 || this.form.username.length > 30) {
                    this.$toast('用户名长度限制1到30');
                    // Dialog.alert({
                    //     title: '用户名长度限制1到30',
                    // }
                    // )
                    return
                }
                let reg = /^[^~!@￥%\.&\*?\[\]\{\}\^\&\*<>\\\/'"]*$/
                if (!reg.test(this.form.username)) {
                    this.$toast('用户名包含非法字符');
                    // Dialog.alert({
                    //     title: '用户名包含非法字符',
                    // }
                    // )
                    return
                }
                if (!this.form.type) {
                    this.$toast('用户类型不能为空');
                    // Dialog.alert({
                    //     title: '用户类型不能为空',
                    // }
                    // )
                    return
                }
                if (!this.form.agentPoint) {
                    this.$toast('佣点不能为空');
                    // Dialog.alert({
                    //     title: '佣点不能为空',
                    // }
                    // )
                    return
                }
                if (!this.pointReg.test(this.form.agentPoint)) {
                    this.$toast('佣点格式不正确');
                    // Dialog.alert({
                    //     title: '佣点格式不正确',
                    // }
                    // )
                    return
                }
                const submitForm = {
                    username: this.form.username,
                    type: this.form.type,
                    agentPoint: Math.round(Number(this.form.agentPoint) * 1000) / 100000,
                    zfbAgentPoint: 0,
                    wxAgentPoint: 0,
                }

                if (submitForm.agentPoint > this.member.agentPoint) {
                    this.$toast('佣点不能超过' + (this.member.agentPoint * 100) + "%");
                    // Dialog.alert({
                    //     title: '佣点不能超过' + (this.member.agentPoint * 100) + "%",
                    // }
                    // )
                    return
                }

                addSubMember(submitForm).then(response => {
                    if (response.code === 200) {
                        this.$emit('close')
                    } else {
                        this.$toast(response.msg);
                        // Dialog.alert({
                        //     title: response.msg,
                        // }
                        // )
                    }
                }).catch((e) => {
                    this.form.agentPoint = ''
                })
            }
        }
    }
</script>

<!-- <style lang="less" scoped>
    .wrap {
        .logout {
            bottom: 0;
            height: 50px;
            color: #fff;
            background: FireBrick;
        }
    }
	.mt{
		width: 95%;
		margin: 0.625rem auto 0;
		box-shadow: 0 0 5px lightgray;
	}
</style> -->