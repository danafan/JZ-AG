<template>
	<div class="box">
		<div class="tabContent">
			<router-view></router-view>
		</div>
		<div class="tab">
			<div class="tabItem" @click="checkTab('index')">
				<img src="../../assets/index_active.png" v-if="activeIndex == '/index'">
				<img src="../../assets/index.png" v-else>
				<div class="tabTxt" :class="{'tabTxtSel':activeIndex == '/index'}">首页</div>
			</div>
			<div class="tabItem" @click="checkTab('trading')">
				<img src="../../assets/trading_active.png" v-if="activeIndex == '/trading'">
				<img src="../../assets/trading.png" v-else>
				<div class="tabTxt" :class="{'tabTxtSel':activeIndex == '/trading'}">交易</div>
			</div>
			<div class="tabItem" @click="checkTab('my')">
				<img src="../../assets/mine_active.png" v-if="activeIndex == '/my'">
				<img src="../../assets/mine.png" v-else>
				<div class="tabTxt" :class="{'tabTxtSel':activeIndex == '/my'}">我的</div>
			</div>
		</div>		
		<DialogModel @callback="look" @close="showDialog = false" :content="content" v-if="showDialog"/>
	</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display:flex;
	flex-direction: column;
	.tabContent{
		position: relative;
		flex:1;
		overflow-y: scroll;
	}
	.tab{
		background: #fff;
		width: 7.5rem;
		height: .98rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.tabItem{
			position: relative;
			display:flex;
			flex-direction: column;
			align-items: center;
			img{
				display:block;
				width: .44rem;
				height: .44rem;
			}
			.tabTxt{
				margin-top: .09rem;
				font-size: .2rem;
				color: #C1C4D1;
			}
			.tabTxtSel{
				font-size: .22rem;
				color: #474980;
			}
		}

	}
}
</style>
<script>
	import {isFade} from '../../api'
	import DialogModel from '../../components/DialogModel.vue'

	export default{
		data(){
			return{
				activeIndex:"/index",
				showDialog:true,
				content:"您有一个订单已完成，现在去看看？",
				timer:null
			}
		},
		created(){
			this.activeIndex = this.$route.path;
			this.timer = setInterval(this.getStatus,3600);
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
		components:{
			DialogModel
		},
		watch:{
			$route:function(n){
				this.activeIndex = n.path;
				// this.$router.push(n.path);
			}
		},
		methods:{
			//获取接单状态
			getStatus() {
				isFade().then(res => {
					if ( res.code == 200 ) {
						if ( res.data == 1 ) {
                        	// 取消闪
                        	console.log("取消闪");
                        	// this.isBlink = false;
                        }else if ( res.data == 0 ) {
                        	// 闪
                        	// this.isBlink = true;
                        	console.log("闪");
                        }
                    }
                })
			},
			look(){
				this.showDialog = false;
				this.$router.push('/trading?type=1');
				// this.$router.push({path: '/trading',query:{ 'type':'1'}});
			},
			//切换导航
			checkTab(tab){
				this.activeIndex = `/${tab}`;
				this.$router.push(`/${tab}`);
			}
		}
	}
</script>










