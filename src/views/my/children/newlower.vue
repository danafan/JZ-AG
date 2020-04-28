<template>
    <div class="wrap">
        <van-nav-bar title="新增下级"></van-nav-bar>
        <van-cell-group class="mt">
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
        </div>
        <van-action-sheet v-model="shows" :actions="actions" @select="onSelect" cancel-text="取消" @cancel="onCancel"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {addSubMember} from '../../../api'
    import {Dialog} from 'vant'

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
                    {name: '普通會員', id: 1},
                    {name: '代理會員', id: 2}
                ],
                typeName: '請選擇用戶類型',
                form: {
                    username: '',
                    agentPoint: '',
                    type: undefined
                },
                pointReg: /^\d{1,17}(\.\d{1,5})?$/,
            }
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
                    Dialog.alert({
                            title: '用户名不能为空',
                        }
                    )
                    return
                }
                if (this.form.username.length < 1 || this.form.username.length > 30) {
                    Dialog.alert({
                            title: '用户名长度限制1到30',
                        }
                    )
                    return
                }
                let reg = /^[^~!@￥%\.&\*?\[\]\{\}\^\&\*<>\\\/'"]*$/
                if (!reg.test(this.form.username)) {
                    Dialog.alert({
                            title: '用户名包含非法字符',
                        }
                    )
                    return
                }
                if (!this.form.type) {
                    Dialog.alert({
                            title: '用户类型不能为空',
                        }
                    )
                    return
                }
                if (!this.form.agentPoint) {
                    Dialog.alert({
                            title: '佣点不能为空',
                        }
                    )
                    return
                }
                if (!this.pointReg.test(this.form.agentPoint)) {
                    Dialog.alert({
                            title: '佣点格式不正确',
                        }
                    )
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
                    Dialog.alert({
                            title: '佣点不能超过' + (this.member.agentPoint * 100) + "%",
                        }
                    )
                    return
                }

                addSubMember(submitForm).then(response => {
                    if (response.code === 200) {
                        this.$emit('close')
                    } else {
                        Dialog.alert({
                                title: response.msg,
                            }
                        )
                    }
                }).catch((e) => {
                    this.form.agentPoint = ''
                })
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