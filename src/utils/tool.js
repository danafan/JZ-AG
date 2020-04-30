/**
 * 通用js方法封装处理
 */

export function parseMoneyType(type) {
  switch (type) {
    case 1:
      return '保证金';
    case 2:
      return '余额';
  }
}
//（1充值中 2已完成 3已取消 4已关闭）
export function parseRechargeStatus(type) {
  switch (type) {
    case 1:
      return '充值中';
    case 2:
      return '已完成';
    case 3:
      return '已取消';
    case 4:
      return '已關閉';
  }
}
//（1提现中 2已完成 3已取消 4已关闭）
export function parseWithdrawStatus(type) {
  switch (type) {
    case 1:
      return '提現中';
    case 2:
      return '已完成';
    case 3:
      return '已取消';
    case 4:
      return '已關閉';
  }
}

export function parseOrderType(type) {
  switch (type) {
    case 1:
      return '支付寶';
    case 2:
      return '微信';
    case 3:
      return '支付寶口令';
    case 4:
      return '銀行卡';
  }
}

export function parseOrderStatus(type) {
  switch (type) {
    case 1:
      return '匹配中';
    case 2:
      return '代付款';
    case 3:
      return '待确认';
    case 4:
      return '已完成';
  }
}

// 1-充值 2-提现 3-订单收款 4-订单佣金 5-代理佣金 6-提现取消 7-订单取消）
export function parseMoneyDetailType(type) {
  switch (type) {
    case 1:
      return '充值';
    case 2:
      return '提现';
    case 3:
      return '订单收款';
    case 4:
      return '订单佣金';
    case 5:
      return '代理佣金';
    case 6:
      return '提现取消';
    case 7:
      return '订单取消';
  }
}

import moment from 'moment'
// 日期格式化
export function parseTime(time, pattern) {
  if (!time) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
