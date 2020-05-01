<template>
	<div class="warp_box">
		<van-nav-bar title="我的下级"></van-nav-bar>
		<div class="haha">
			<Card>
				<!-- <div class="dialogmain"> -->
					<div class="item">
						<div class="item_label">账户</div>
						<div class="item_val">{{changeInfo.username}}</div>
					</div>
					<div class="item">
						<div class="item_label">昵称</div>
						<div class="item_val">{{changeInfo.nickname}}</div>
					</div>
					<div class="item">
						<div class="item_label">保证金</div>
						<div class="item_val">{{changeInfo.depositMoney}}</div>
					</div>
					<div class="item">
						<div class="item_label">余额</div>
						<div class="item_val">{{changeInfo.balanceMoney}}</div>
					</div>
					<div class="item">
						<div class="item_label">佣点</div>
						<div class="item_val">{{Math.round(changeInfo.agentPoint*100000)/1000}}%</div>
					</div>
					<div class="item">
						<div class="item_label">类型</div>
						<div class="item_val">{{changeInfo.type===1?'普通会员': '代理会员'}}</div>
					</div>
					<div class="item">
						<div class="item_label">状态</div>
						<div class="item_val">{{changeInfo.status==1?'正常':'停用'}}</div>
					</div>
					<div class="line"></div>
					<div class="item">
						<div class="item_label">注册日期</div>
						<div class="item_val">{{changeInfo.registerTime?parseTime(changeInfo.registerTime):''}}</div>
					</div>
				<!-- <van-cell title="账户" :value="changeInfo.username"></van-cell>
				<van-cell title="昵称" :value="changeInfo.nickname"></van-cell>
				<van-cell title="保证金" :value="changeInfo.depositMoney"></van-cell>
				<van-cell title="余额" :value="changeInfo.balanceMoney"></van-cell>
				<van-cell title="佣点" :value="Math.round(changeInfo.agentPoint*100000)/1000 + '%'"></van-cell>
				<van-cell title="类型" :value="changeInfo.type===1?'普通会员': '代理会员'"></van-cell>
				<van-cell title="状态" :value="changeInfo.status==1?'正常':'停用'"></van-cell>
				<van-cell title="注册日期" :value="changeInfo.registerTime?parseTime(changeInfo.registerTime):''"></van-cell> -->
				<!-- </div> -->
			</Card>
		</div>
		
	</div>
</template>
<style lang="less" scoped>
.warp_box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display:flex;
	flex-direction: column;
}
.line{
	margin-top: .3rem;
	width: 100%;
	border-bottom: 1px dashed #E4E5EB;
}
.haha{
	flex:1;
	background: #F6F6F6;
	padding: .3rem;
}
.item{
	height: .96rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: .28rem;
	color: #777B8F;
}
</style>
<script>
	import Card from '../../../components/Card.vue'
	export default{
		props:{
			changeInfo:{
				type:Object,
				default:{}
			}
		},
		components:{
			Card
		}
	}
</script>