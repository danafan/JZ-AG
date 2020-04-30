<template>
    <div class="wrap">
        <van-nav-bar title="设置佣点"></van-nav-bar>
        <div class="card_list">
            <Card>
                <div class="list_item">
                    <div class="list_label">用户名</div>
                    <div class="list_val">{{pointForm.username}}</div>
                </div>
                <div class="list_item null_bottom">
                    <div class="list_label">佣点</div>
                    <input type="number" placeholder="请输入佣点" v-model="pointForm.agentPoint">
                </div>
            </Card>
            <Button text="确定" :active_submit="true" @callback="submit"/>
        </div>
        <!-- <van-cell-group class="mt">
            <van-field
                    v-model="pointForm.username"
                    type="text"
                    label="用户名"
                    clearable
                    disabled
            />
            <van-field
                    v-model="pointForm.agentPoint"
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
                color: #212744;
            }
            input{
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
}
</style>
<script>
    import {mapGetters} from 'vuex'
    import {Dialog} from 'vant'
    import {operateMemberPoint} from '../../../api'

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
                pointReg: /^\d{1,17}(\.\d{1,5})?$/,
                shows: false,
                actions: [
                {name: '保证金', id: 1},
                {name: '余额', id: 2}
                ],
                pointForm: {
                    id: '',
                    username: '',
                    agentPoint: '',
                    oldAgentPoint: '',
                    zfbAgentPoint: '',
                    oldZfbAgentPoint: '',
                    wxAgentPoint: '',
                    oldWxAgentPoint: '',
                },
            }
        },
        props: {
            itemdata: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components:{
            Card,
            Button
        },
        mounted() {
            this.pointForm.id = this.itemdata.id
            this.pointForm.username = this.itemdata.username
            this.pointForm.agentPoint = this.itemdata.agentPoint * 100
            this.pointForm.oldAgentPoint = this.itemdata.agentPoint * 100
            this.pointForm.zfbAgentPoint = this.itemdata.zfbAgentPoint * 100
            this.pointForm.oldZfbAgentPoint = this.itemdata.zfbAgentPoint * 100
            this.pointForm.wxAgentPoint = this.itemdata.wxAgentPoint * 100
            this.pointForm.oldWxAgentPoint = this.itemdata.wxAgentPoint * 100
        },
        methods: {
            onCancel() {
                this.shows = false
            },
            submit() {
                if (!this.pointReg.test(this.pointForm.agentPoint) || !this.pointReg.test(this.pointForm.wxAgentPoint) ||
                    !this.pointReg.test(this.pointForm.zfbAgentPoint)) {
                    this.$toast('佣点格式不正确');
                    // Dialog.alert({
                    //     message: '佣点格式不正确'
                    // }
                    // )
                return
            }

            if (this.pointForm.agentPoint == this.pointForm.oldAgentPoint && this.pointForm.zfbAgentPoint == this.pointForm.oldZfbAgentPoint &&
                this.pointForm.wxAgentPoint == this.pointForm.oldWxAgentPoint) {
                 this.$toast('佣点未变动');
                // Dialog.alert({
                //     message: '佣点未变动'
                // }
                // )
            return
        }

        const submitForm = {
            id: this.pointForm.id,
            username: this.pointForm.username,
            type: this.pointForm.type,
            agentPoint: Math.round(Number(this.pointForm.agentPoint) * 1000) / 100000,
            zfbAgentPoint: Math.round(Number(this.pointForm.zfbAgentPoint) * 1000) / 100000,
            wxAgentPoint: Math.round(Number(this.pointForm.wxAgentPoint) * 1000) / 100000,
        }

        if (submitForm.agentPoint > this.member.agentPoint) {
            this.$toast('佣点不能超过' + (this.member.agentPoint * 100) + "%");
            // Dialog.alert({
            //     message: '佣点不能超过' + (this.member.agentPoint * 100) + "%"
            // }
            // )
            return
        }

        operateMemberPoint(submitForm.id, submitForm.agentPoint, submitForm.zfbAgentPoint, submitForm.wxAgentPoint).then(response => {
            if (response.code === 200) {
                this.$emit('close')
            } else {
                this.$toast(response.msg);
                // Dialog.alert({
                //     message: response.msg
                // }
                // )
            }
        });
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