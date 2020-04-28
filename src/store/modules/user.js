import { getMemberAssets, logout, reqPwdLogin, reqSmsLogin } from '@/api'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        member: {},
    },

    mutations: {
        SET_USER: (state, user) => {
            state.member = user
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                reqPwdLogin({ username, password, code, uuid }).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 短信验证码登录
        SmsLogin({ commit }, data) {
            return new Promise((resolve, reject) => {
                reqSmsLogin(data).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetMemberInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getMemberAssets(state.token).then(res => {
                    const user = res.data
                    commit('SET_USER', user)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                //测试
                // commit('SET_TOKEN', '')
                // removeToken()
                // resolve()
                //正式
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user