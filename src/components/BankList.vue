<template>
	<div class="check_box" @click="close()">
		<div class="null"></div>
		<div class="check_content">
			<div class="content_title">
				<div>请选择银行</div>
			</div>
			<div class="bank_list">
				<div class="bank_item" v-for="(item,index) in bankList" @click="selectItem(item,index)">
					<div class="left">
						<img class="icon" src="../assets/pay.png">
						<div class="bank_text" :class="{sel_bank_text:active_bank == index}">{{item.bankName}}<span>（{{item.cardNo.substring(item.cardNo.length-4)}}）</span></div>
					</div>
				</div>
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
	flex-direction: column;
}
.null{
	flex: 1;
}
.check_content{
	background: #fff;
	height: 4.5rem;
	width: 100%;
	display:flex;
	flex-direction: column;
	animation: myfirst 0.2s;
}
@keyframes myfirst
{
	0%   {
		position: absolute;
		left: 0;
		bottom: -4.5rem;}
		100% {
			position: absolute;
			left: 0;
			bottom: 0;}
		}
		.content_title{
			border-bottom: 1px solid #dedede;
			position: relative;
			height: .98rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: .3rem;
			font-weight: bold;
			color: #2d2d2d;
		}
		.close{
			position: absolute;
			right: .3rem;
			width:.44rem;
			height: .44rem;
		}
		.bank_list{
			flex:1;
			overflow-y: scroll;
		}
		.bank_item{
			padding-left: .65rem;
			padding-right: .36rem;
			border-bottom: 1px solid #dedede;
			height: .98rem;
			display:flex;
			align-items: center;
			justify-content: space-between;
		}
		.left{
			display:flex;
			align-items: center;
		}
		.icon{
			margin-right: .2rem;
			width: .42rem;
			height: .42rem;
		}
		.bank_text{
			display:flex;
			align-items: center;
			font-size: .28rem;
			color: #2e2e2e;
			span{
				color: #777B8F;
			}
		}
		.sel_bank_text{
			color: #5B5FD1;
			span{
				color: #5B5FD1;
			}
		}
	</style>
	<script>
		export default{
			props:{
				bankList:{
					type:Array,
					default:[]
				}
			},
			data(){
				return {
				active_bank:null,			//选中银行下标
			}
		},
		methods:{
			//调用父组件方法
			selectItem(item,index){
				this.active_bank = index;
				this.$emit("callback",item)
			},
			//关闭
			close(){
				this.$emit("close");
			}
		}
	}
</script>