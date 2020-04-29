<template>
	<div class="trading_box">
		<div class="top_tab">
			<div class="tab_item" @click="changeTab(0)">
				<div class="tab_text" :class="{active_tab_text:active_tab == 0}">抢单大厅</div>
				<div class="line" v-show="active_tab == 0"></div>
			</div>
			<div class="tab_item" @click="changeTab(1)">
				<div class="tab_text" :class="{active_tab_text:active_tab == 1}">收单广场</div>
				<div class="line" v-show="active_tab == 1"></div>
			</div>
		</div>
		<div class="content">
			<RobOrder v-if="active_tab == 0"/>
			<Square v-if="active_tab == 1"/>
		</div>
	</div>
</template>
<style lang="less" scoped>
.trading_box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display:flex;
	flex-direction: column;
}
.top_tab{
	background: #fff;
	height: 1.4rem;
	display: flex;
	align-items: center;
	.tab_item{
		height: 1rem;
		position: relative;
		padding-left: .3rem; 
		padding-right: .3rem; 
		display:flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.tab_text{
			font-size: .32rem;
			color: #C1C4D1;
		}
		.active_tab_text{
			font-size: .4rem;
			color: #212744;
			font-weight: 500;
			animation: text_an 0.2s;
		}
		@keyframes text_an
		{
			0%   {font-size: .32rem;}
			100% {font-size: .4rem;}
		}
		.line{
			position: absolute;
			bottom: 0;
			border-radius: .04rem;
			background: #5B5FD1;
			width: .6rem;
			height: .08rem;
			animation: line_an 0.3s;
		}
		@keyframes line_an
		{
			0%   {width: .1rem}
			50%   {width: .8rem}
			100% {width: .6rem}
		}
	}
}
.content{
	flex: 1;
	overflow-y: scroll;
}
</style>
<script>
	import {Dialog} from 'vant';
	import RobOrder from './robOrder.vue';
	import Square from './square.vue';
	export default {
		name:'trading',
		data(){
			return{
				active_tab:0,			//默认抢单大厅
			}
		},
		created(){
			let tab = this.$route.query;
			if(tab.type == '1'){
				this.active_tab = 1;
			}
		},
		methods:{
			//点击切换顶部导航
			changeTab(index){
				this.active_tab = index;
			}
		},
		components:{
			RobOrder,
			Square,
		}
	}
</script>

