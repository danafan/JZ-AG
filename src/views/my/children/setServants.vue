<template>
    <div class="wrap">
        <van-nav-bar title="设置佣点"></van-nav-bar>
        <van-cell-group class="mt">
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
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Dialog} from 'vant'
    import {operateMemberPoint} from '../../../api'

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
                    Dialog.alert({
                            message: '佣点格式不正确'
                        }
                    )
                    return
                }

                if (this.pointForm.agentPoint == this.pointForm.oldAgentPoint && this.pointForm.zfbAgentPoint == this.pointForm.oldZfbAgentPoint &&
                    this.pointForm.wxAgentPoint == this.pointForm.oldWxAgentPoint) {
                    Dialog.alert({
                            message: '佣点未变动'
                        }
                    )
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
                    Dialog.alert({
                            message: '佣点不能超过' + (this.member.agentPoint * 100) + "%"
                        }
                    )
                    return
                }

                operateMemberPoint(submitForm.id, submitForm.agentPoint, submitForm.zfbAgentPoint, submitForm.wxAgentPoint).then(response => {
                    if (response.code === 200) {
                        this.$emit('close')
                    } else {
                        Dialog.alert({
                                message: response.msg
                            }
                        )
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
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
</style>