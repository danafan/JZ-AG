/*
ajax 请求函数模块
*/
import axios from 'axios'
import {Toast} from 'vant'
let toast = null
export const ajax = (url, body, type = 'GET', isJson = false, disableLoading = false) => {
    if (!disableLoading) {
        toast = Toast.loading({
            message: '加载中...',
            forbidClick: true
        });
    }
    const query = {
        url: url,
        method: type,
        withCredentials: true,
        timeout: 30000
    }
    if (type === 'GET') {
        query.params = body
    } else {
        query.data = isJson ? body : JSON.stringify(body)
    }
    return axios.request(query)
        .then(res => {
            return new Promise((resolve, reject) => {
                if (!res.data) {
                    reject(new Error('服务器响应超时'))
                    return
                }
                if (res.data.code === 200) {
                    resolve(res.data)
                } else {
                    // res.data.message = res.data.msg
                    reject(res.data)
                }
            })
        }, e => {
            if (!e.response) {
                return Promise.reject(new Error('服务器响应超时'))
            }
            switch (e.response.status) {
                case 401: // 未登录跳转至登录页
                    return Promise.reject(new Error('登录超时，请重新登录'))
                case 403: // 无权限操作
                    return Promise.reject(new Error('无权访问'))
                default:
                    break
            }
            return Promise.reject(e.response)
        })
        .catch(e => {
            return Promise.reject(e)
        }).finally(() => {
            if (!disableLoading) {
                toast.clear()
            }
        })
}