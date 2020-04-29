import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
    routes: [
    {
        path: "/login",
        component: () =>
        import ("@/views/login/index"),
        meta: {
            title: "登錄"
        }
    },
    {
        path: "/home",
        component: () =>
        import ("@/views/home/home"),
        meta: {
            title: "导航页"
        },
        children: [{
            path: "/index",
            component: () =>
            import ("@/views/index/index"),
            meta: {
                title: "首頁"
            }
        },{
            path: "/trading",
            component: () =>
            import ("@/views/trading/trading"),
            meta: {
                title: "交易"
            }
        },{
            path: "/my",
            component: () =>
            import ("@/views/my/my"),
            meta: {
                title: "我的"
            }
        }]
    },
    {
        path: "/set",
        meta: {
            title: "设置"
        },
        component: () =>
        import ("@/views/my/children/set")
    },
    {
        path: '/accountInfo',
        meta: {
            title: '账户信息'
        },
        component: () =>
        import ("@/views/my/children/accountInfo")
    },
    {
        path: '/modifiedPassword',
        meta: {
            title: '修改登录密码'
        },
        component: () =>
        import ("@/views/my/children/modifiedPassword")
    },
    {
        path: '/capitalModified',
        meta: {
            title: '修改资金密码'
        },
        component: () =>
        import ("@/views/my/children/capitalModified")
    },
    {
        path: '/withdrawBank',
        meta: {
            title: '提现银行卡'
        },
        component: () =>
        import ("@/views/my/children/withdrawBank")
    },
    {
        path: '/addWithdrawBank',
        meta: {
            title: '新增提现卡'
        },
        component: () =>
        import ("@/views/toup/addWithdrawBank")
    },
    {
        path: "/toup",
        meta: {
            title: "充值"
        },
        component: () =>
        import ("@/views/toup/toup")
    },
    {
        path: "/withDraw",
        meta: {
            title: "提现"
        },
        component: () =>
        import ("@/views/toup/withDraw")
    },
    {
        path: "/yuebao",
        meta: {
            title: '余额宝',
        },
        component: () =>
        import ("@/views/yuBao/index")
    },
    {
        path: "/rollIn",
        meta: {
            title: '余额宝-转入',
        },
        component: () =>
        import ("@/views/yuBao/rollIn")
    },
    {
        path: "/rollOut",
        meta: {
            title: '余额宝-转出',
        },
        component: () =>
        import ("@/views/yuBao/rollOut")
    },
    {
        path: "/buy",
        meta: {
            title: '余额宝-购买',
        },
        component: () =>
        import ("@/views/yuBao/buy")
    },
    {
        path: "/tradingRecord",
        meta: {
            title: '余额宝-交易记录',
        },
        component: () =>
        import ("@/views/yuBao/dealList")
    },
    {
        path: '/receiveBank',
        meta: {
            title: '收款银行卡'
        },
        component: () =>
        import ("@/views/my/children/receiveBank")
    },
    {
        path: '/newbrank',
        meta: {
            title: '新增收款卡'
        },
        component: () =>
        import ("@/views/toup/newBrank")
    },
    {
        path: '/rechargeList',
        meta: {
            title: '充值记录'
        },
        component: () =>
        import ("@/views/my/children/rechargeList")
    },
    {
        path: '/moneyDetail',
        meta: {
            title: '资金明细'
        },
        component: () =>
        import ("@/views/my/children/moneyDetail")
    },
    {
        path: '/subList',
        meta: {
            title: '我的下级'
        },
        component: () =>
        import ("@/views/my/children/subList")
    },
    {
        path: '/withdrawList',
        meta: {
            title: '提现列表'
        },
        component: () =>
        import ("@/views/my/children/withdrawList")
    },







    
    
    
    
    
    
    {
      path: "/yb/process",
      meta: {
          title: '攒钱流程',
      },
      component: () =>
      import ("@/views/yuBao/process")
  },

  {
    path: "*",
    component: () =>
    import ("@/components/NotFound")
},
]
});

router.beforeEach((to, from, next) => {
    let { title, needLogin } = to.meta;
    let { isLogin } = store.state;
    document.title = title;

    if (needLogin && !isLogin) {
        next({
            path: "/login"
        });
    } else {
        next();
    }
});

export default router;