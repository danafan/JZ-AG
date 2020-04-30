<template>
    <div class="page">


        <!-- parseTime(item.createTime) -->
        <!-- <van-nav-bar title="我的下级" left-arrow @click-left="back" @click-right="setprice"> -->
            <!-- <template slot="right">
                <i class="iconfont icon-jia f20" style="color: #c03131"></i>
            </template> -->
        <!-- </van-nav-bar>
		<div class="cont">
			<div class="list" v-for="item in list" @click="checkInfo(item)">
			    <div style="flex: 2">
			        <span>{{item.username}}</span>
					<span class="labels">{{item.type == 1 ? '普通会员' : '代理会员'}}</span>
			    </div>
			    <div style="text-align: right;flex: 1">
			        <span class="setbtn" @click.stop="setServantclick(item)">设置佣点</span>
			    </div>
			</div> -->
			<van-popup v-model="show" position="bottom" closeable :style="{height:'100%'}" @close="closePopup">
                <!-- 新增下级 -->
			    <newlower v-if="showLower" @close="closePopup1"></newlower>
                <!-- 设置佣点 -->
			    <setServants v-if="showServant" :itemdata="changeItem" @close="closePopup1"></setServants>
			</van-popup>
			<!-- <van-dialog
			        v-model="showlowerInfo"
			        title="下级信息"
                   >
                   <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
			    <div class="dialogmain">
			        <van-cell title="账户" :value="changeInfo.username"></van-cell>
			        <van-cell title="昵称" :value="changeInfo.nickname"></van-cell>
			        <van-cell title="保证金" :value="changeInfo.depositMoney"></van-cell>
			        <van-cell title="余额" :value="changeInfo.balanceMoney"></van-cell>
			        <van-cell title="佣点" :value="Math.round(changeInfo.agentPoint*100000)/1000 + '%'"></van-cell>
			        <van-cell title="类型" :value="changeInfo.type===1?'普通会员': '代理会员'"></van-cell>
			        <van-cell title="状态" :value="changeInfo.status==1?'正常':'停用'"></van-cell>
			        <van-cell title="注册日期" :value="changeInfo.registerTime?parseTime(changeInfo.registerTime):''"></van-cell>
			    </div>
			</van-dialog> -->
		<!-- </div> -->
		<!-- <div class="joinbtn" @click="setprice">
		    +
		</div> -->

        <Back title="我的下级"/>
        <div class="card_list">
           <Card v-for="item in list">
            <div class="first_row">
                <div class="username">{{item.username}}</div>
                <div class="ji_box">
                   <img src="../../../assets/yin.png" v-if="item.type == 1">
                   <img src="../../../assets/gold.png" v-else>
                   <div class="ji_text" :class="{yin_back:item.type == 1}">{{item.type == 1 ? '普通会员' : '代理会员'}}</div>
               </div>
           </div>
           <div class="two_row">
            <div class="role_name">姓名：{{item.realName}}</div>
            <div class="set_but" @click="setServantclick(item)">设置佣点</div>
        </div>
        <div class="line"></div>
        <div class="time_box">
            <div class="time_label">注册时间</div>
            <div class="time_val">{{parseTime(item.registerTime)}}</div>
        </div>
    </Card>
</div>
<div class="add_box">
 <Button text="新增下级" :active_submit="true" @callback="setprice"/>
</div>
</div>
</template>
<style lang="less" scoped>
.page{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
}
.card_list{
    padding: .3rem;
    flex: 1;
    overflow-y: scroll;
    .first_row{
        width: 100%;
        display: flex;
        align-items: center;
        .username{
            margin-right: .2rem;
            font-size: .28rem;
            color: #777B8F;
        }
        .ji_box{
            display: flex;
            align-items: center;
            img{
                width: .36rem;
                height: .36rem;
            }
            .ji_text{
                border-radius: 0 .06rem .06rem 0;
                background: #AB946D;
                width: 1.1rem;
                height: .36rem;
                line-height: .36rem;
                font-size: .2rem;
                color: #FFFFFF;
            }
            .yin_back{
                background: #C1C4D1;
            }
        }
    }
    .two_row{
        margin-top: .2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .role_name{
            font-size: .28rem;
            color: #777B8F;
        }
        .set_but{
            border-radius: .04rem;
            background: #5B5FD1;
            width: 1.2rem;
            text-align: center;
            height: .52rem;
            line-height: .52rem;
            font-size: .24rem;
            color: #FFFFFF;
        }
    }
    .line{
        margin-top: .3rem;
        width: 100%;
        border-bottom: 1px dashed #E4E5EB;
    }
    .time_box{
        margin-top: .2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .28rem;
        color: #777B8F;
    }
}
.add_box{
    background: #fff;
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: center;
}

</style>
<script>
    import newlower from './newlower'
    import setServants from './setServants'
    import {listSubs} from '../../../api'
    import {Dialog} from 'vant'

    import Back from '../../../components/Back.vue'
    import Card from '../../../components/Card.vue'
    import Button from '../../../components/Button.vue'

    export default {
        data() {
            return {
                show: false,
                showLower: false,
                showServant: false,
                changeItem: {},
                list: [],
                showlowerInfo: false,
                changeInfo: {}
            }
        },
        components: {
            newlower,
            setServants,
            Back,
            Card,
            Button
        },
        methods: {
            back() {
                history.back();
            },
            setprice() {
                this.show = true
                this.showLower = true
            },
            closePopup() {
                this.show = false
                this.showLower = false
                this.showServant = false
                this.requestData()
            },
            closePopup1() {
                this.show = false
                this.showLower = false
                this.showServant = false
                this.requestData()
                this.$toast('操作成功')
            },
            setServantclick(data) {
                this.changeItem = data
                this.show = true
                this.showServant = true
            },
            requestData() {
                let queryParams = {
                    pageNum: 1,
                    pageSize: 999,
                }
                listSubs(queryParams).then(data => {
                    if (data && data.code == 200) {
                        this.list = data.rows
                    }
                }).catch((e) => {
                    Dialog.alert({
                        title: '警告',
                        message: e.message
                    }
                    )
                })
            },
            checkInfo(data) {
                console.log(data)
                this.showlowerInfo = true
                this.changeInfo = data
            }
        },
        mounted() {
            this.requestData()
        }
    }
</script>
<!-- 
<style lang="less" scoped>
    .page {
        .dialogmain {
            /*width: 50%;*/
            background: #fff;
            padding: 10px;
        }
        .list {
            padding: 10px;
            padding-top: 20px;
            padding-bottom: 20px;
            background: #fff;
            border-bottom: 1px solid #eee;
            display: flex;
			width: 100%;
			margin: 0.625rem auto 0;
			box-shadow: 0 0 5px lightgray;
			position: relative;
            div {
                span {
                    padding: 2px;
                    border-radius: 5px;
                }
                .labels {
                    color: #fff;
                    font-size: 10px;
					padding: 0.0625rem;
                    background: DarkSalmon;
					position: absolute;
					left: 40%;
                }
                .setbtn {
                    color: #fff;
					padding: 0.125rem;
                    font-size: 10px;
                    background: LightSteelBlue;
                }
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
	.cont{
		width: 95%;
		margin: auto;
		background-color: #F5F2F0;
		box-shadow:0 0 5px lightgray;
	}
	.joinbtn {
	    position: fixed;
	    bottom: 20px;
	    right: 20px;
	    padding: 10px;
	    background: FireBrick;
	    border-radius: 50%;
	    width: 50px;
	    height: 50px;
	    font-size: 30px;
	    font-weight: 600;
	    color: #fff;
	    text-align: center;
	    box-shadow: 0 0 10px #ccc;
	}
</style> -->