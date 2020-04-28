/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import request from './request'
// const BASE_URL = 'http://local:4000'
const BASE_URL = '/api'
const COMMON_URL = '/commonApi'


/**
 * 获取图形验证码
 */
export const getCodeImg = phone => request(BASE_URL + '/captchaImage')

/**
 * 账号密码登录
 */
export const reqPwdLogin = (data) => {
        return request({
            url: BASE_URL + '/login',
            method: 'post',
            params: data
        })
    }
    /**
     * 短信验证码密码登录
     */
export const reqSmsLogin = (data) => {
    return request({
        url: BASE_URL + '/smsLogin',
        method: 'post',
        params: data
    })
}

export const getMemberAssets = () => {
    return request({
        url: BASE_URL + '/rp/common/getMemberAssets',
        method: 'get',
    })
}
export const getUnreadNoticeList = (query) => {
    return request({
        url: '/api/rp/common/getUnreadNoticeList',
        method: 'get',
        params: query
    })
}
export const getNotice = (id) => {
    return request({
        url: '/api/rp/common/getNotice/' + id,
        method: 'get',
    })
}

export const logout = () => {
    return request({
        url: COMMON_URL + '/logout',
        method: 'post'
    })
}

export const uploadPic = (data) => {
    return request({
        url: '/api/rp/common/uploadPicSecurity',
        method: 'post',
        data: data
    })
}

export const listMemberMoneyDetail = (query) => {
    return request({
        url: '/api/rp/memberMoneyDetail/listMemberMoneyDetail',
        method: 'get',
        params: query
    })
}

export const listMemberBankcard = (query) => {
    return request({
        url: '/api/rp/common/listMemberBankcard',
        method: 'get',
        params: query
    })
}
export const listMemberCode = (query) => {
    return request({
        url: '/api/rp/memberCode/listMemberCode',
        method: 'get',
        params: query
    })
}

export const delMemberCode = (id) => {
    return request({
        url: '/api/rp/memberCode/delMemberCode/' + id,
        method: 'post',
    })
}

export const delMemberBankcard = (id) => {
    return request({
        url: '/api/rp/common/delMemberBankcard/' + id,
        method: 'post',
    })
}
export const setDefaultMemberCode = (id, type) => {
    return request({
        url: '/api/rp/common/setDefaultSkBankcard/' + id + '/' + type,
        method: 'post',
    })
}


export const listMemberRecharge = (query) => {
    return request({
        url: '/api/rp/memberRecharge/listMemberRecharge',
        method: 'get',
        params: query
    })
}

export const listMemberWithdraw = (query) => {
    return request({
        url: '/api/rp/memberWithdraw/listMemberWithdraw',
        method: 'get',
        params: query
    })
}
export const listSubs = (query) => {
    return request({
        url: '/api/rp/common/listSubMember',
        method: 'get',
        params: query
    })
}

export const addSubMember = (data) => {
    return request({
        url: '/api/rp/common/addSubMember',
        method: 'post',
        data: data
    })
}

export const operateMemberPoint = (id, agentPoint, zfbAgentPoint, wxAgentPoint) => {
    const data = {
        id,
        agentPoint,
        zfbAgentPoint,
        wxAgentPoint
    }
    return request({
        url: '/api/rp/common/operateMemberPoint',
        method: 'post',
        params: data
    })
}

export const updateMemberBaseInfo = (data) => {
    return request({
        url: '/api/rp/common/updateMemberBaseInfo',
        method: 'post',
        data: data
    })
}
export const updateMemberInfo = (data) => {
    return request({
        url: '/api/rp/common/updateMemberInfo',
        method: 'post',
        data: data
    })
}
export const addMemberBankcard = (data) => {
    return request({
        url: '/api/rp/common/addMemberBankcard',
        method: 'post',
        data: data
    })
}

export const addMemberCode = (data) => {
    return request({
        url: '/api/rp/memberCode/addMemberCode',
        method: 'post',
        data: data
    })
}


export const updateMemberPwd = (oldPassword, newPassword, type) => {
    const data = {
        oldPassword,
        newPassword,
        type
    }
    return request({
        url: '/api/rp/common/updateMemberPwd',
        method: 'post',
        params: data
    })
}


export const listQiangdanOrder = (query) => {
    return request({
        url: '/api/rp/order/listQiangdanOrder',
        method: 'get',
        params: query
    })
}

export const listShoudanOrder = (query) => {
    return request({
        url: '/api/rp/order/listShoudanOrder',
        method: 'get',
        params: query
    })
}

export const qiangdan = (id) => {
    return request({
        url: '/api/rp/order/qiangdan/' + id,
        method: 'post',
    })
}

export const confirmSk = (id) => {
    return request({
        url: '/api/rp/order/confirmSk/' + id,
        method: 'post',
    })
}

export const getConfig = () => {
    return request({
        url: '/api/rp/common/getConfig',
        method: 'get',
    })
}

export const applyMemberRecharge = (data) => {
    return request({
        url: '/api/rp/memberRecharge/applyMemberRecharge',
        method: 'post',
        data: data
    })
}
export const applyMemberWithdraw = (data) => {
    return request({
        url: '/api/rp/memberWithdraw/applyMemberWithdraw',
        method: 'post',
        data: data
    })
}
export const setAutoOrder = () => {
    return request({
        url: '/api/rp/common/setAutoOrder',
        method: 'post'
    })
}
export const cancelAutoOrder = () => {
    return request({
        url: '/api/rp/common/cancelAutoOrder',
        method: 'post'
    })
}

/**
 * 获取短信验证码
 */
export const reqSendCode = (data) => {
    return request({
        url: '/api/rp/common/sendLoginVerifyCode',
        method: 'post',
        params: data
    })
}

/**
 * 获取短信验证码
 */
export const sendSmsCode = (data) => {
    return request({
        url: '/api/rp/common/sendVerifyCode',
        method: 'post',
        params: data
    })
}


/**
 * 判断是否要闪烁
 */
export const isFade = () => {
    return request({
        url: '/api/rp/common/getConfirmSkKnowStatus',
        method: 'get',
    })
}

/**
 * 修改订单是否阅读的状态
 */
export const setReadStatus = () => {
    return request({
        url: '/api/rp/common/setConfirmSkKnowStatus',
        method: 'post',
    })
}

/**
 * 余额宝转入转出
 * @param changeType 1-转出 2-转入 
 * @param money(金额)
 */
export const inOrOut = (data) => {
    return request({
        url: '/api/rp/common/YEB/operateMoney',
        method: 'post',
        params: data
    })
}

/**
 * 获取余额宝余额信息
 */
export const getBalance = () => {
    return request({
        url: '/api/rp/common/YEB/getBalance',
        method: 'get',
    })
}

/**
 * 获取购买套餐信息
 */
export const getPackInfo = () => {
    return request({
        url: '/api/rp/common/YEB/getPackInfo',
        method: 'get'
    })
}

/**
 * 获取余额宝收益信息
 */
export const getIncomeInfo = () => {
    return request({
        url: '/api/rp/common/YEB/getIncomeInfo',
        method: 'get'
    })
}

/**
 * 购买套餐
 */
export const buyPack = (data) => {
    return request({
        url: '/api/rp/common/YEB/buyPack',
        method: 'post',
        params: data
    })
}

/**
 * 交易列表
 */
export const getDealList = () => {
    return request({
        url: '/api/rp/common/YEB/getBillInfo',
        method: 'get'
    })
}