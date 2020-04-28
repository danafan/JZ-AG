<template>
	<div class="check_box">
		<div class="check_content">
			<div class="title">提示</div>
			<div class="dialog_con">{{content}}</div>
			<div class="buts">
				<div class="but qu" @click="cancel">取消</div>
				<div class="but ok" @click="confirm">确定</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.check_box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	display:flex;
	align-items: center;
	justify-content: center;
}
.check_content{
	border-radius: 8px;
	background: #fff;
	height: 3.72rem;
	width: 6.8rem;
	.title{
		width: 100%;
		text-align: center;
		height: 1.6rem;
		line-height: 1.6rem;
		font-size: .4rem;
		color: #212744;
		font-weight: 500;
	}
	.dialog_con{
		width: 100%;
		font-size: .32rem;
		color: #212744;
		padding: 0 .5rem;
		display:flex;
		justify-content: center;
	}
	.buts{
		margin-top: .9rem;
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-around;
		.but{
			width: 2rem;
			text-align: center;
			height: .64rem;
			line-height: .64rem;
			font-size: .26rem;
			border-radius: .08rem;
		}
		.qu{
			background: #F6F7F9;
			color: #242629;
		}
		.ok{
			background: #5B5FD1;
			color: #fff;
		}
	}
}

</style>
<script>
	export default{
		name:'Wallet',
		props:{
			content:{
				type:String,
				default:""
			}
		},
		methods:{
			//确定
			confirm(){
				this.$emit("callback");
			},
			//取消
			cancel(){
				this.$emit("close");
			}
		}
	}
</script>