import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { Dialog, Toast } from 'vant'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 创建axios实例
    const request = axios.create({
        // axios中请求配置有baseURL选项，表示请求URL公共部分
        baseURL: "/",
        // 超时
        timeout: 30000
    })
    // request拦截器
    let toast = null
const list = ['/api/rp/common/getMemberAssets', '/api/rp/order/listQiangdanOrder', '/api/rp/common/getConfirmSkKnowStatus', '/api/rp/common/setConfirmSkKnowStatus'] //不显示加载
let showToast = true
request.interceptors.request.use(
    config => {
        // if (list.indexOf(config.url) > -1) {
        //     showToast = false
        // } else {
        //     showToast = true
        // }
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // if (showToast) {
        //     toast = Toast.loading({
        //         message: '加载中...',
        //         forbidClick: true
        //     });
        // }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
    )

// 响应拦截器
request.interceptors.response.use(res => {
    // if (showToast) {
    //     toast.clear()
    // }
    const code = res.data.code
    if (code === 401) {
        Toast("挂机时间过长，请重新登录！")
        store.dispatch('LogOut').then(() => {
            router.replace('/login');
        })
    } else if (code !== 200) {
       Toast(res.data.msg || res.msg)
       return Promise.reject(res.data)
   }else {
    return Promise.resolve(res.data)
}
},
error => {
    // if (showToast) {
    //     toast.clear()
    // }
    Toast("系统内部错误")
    return Promise.reject(error)
}
)

export default request
