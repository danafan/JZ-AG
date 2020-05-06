<template>
	<div>
		<van-swipe :autoplay="2000">
			<van-swipe-item v-for="(image, index) in images" :key="index" >
				<img class="swiper_img" :src="image"/>
			</van-swipe-item>
		</van-swipe>
		<div class="top_content">
			<van-notice-bar :text="notice_text" :left-icon="left_icon" :speed="50" :scrollable="true" />
			<div class="category_box">
				<div class="category_item" @click="local()">
					<img src="../../assets/service.png">
					<div class="item_text">在线客服</div>
				</div>
				<div class="category_item" @click="guan">
					<img src="../../assets/website.png">
					<div class="item_text">平台官网</div>
				</div>
				<div class="category_item" @click="$router.push('/process')">
					<img src="../../assets/process.png">
					<div class="item_text">赚钱流程</div>
				</div>
				<div class="category_item" @click="$toast('功能开发中，敬请期待...')">
					<img src="../../assets/activity.png">
					<div class="item_text">优惠活动</div>
				</div>
			</div>
		</div>
		<div class="bottom_content">
			<Card>
				<img class="left_top_icon" src="../../assets/money_icon.png">
				<div class="slot_content" v-for="(notice,key) in noticeList" v-html="notice.content"></div>
			</Card>
			<Card>
				<img class="left_top_icon" src="../../assets/announcement_icon.png">
				<div class="announcement_content">
					<p>
						平台单多量大，全部由上游AG总公司实时派发…放心抢！ 平均每单会在20-30分钟内回款、请耐心等候！
					</p>
					<p>
						平台将不定期更换卡号,请注意卡号的变动！如若转错，系统将待12小时后自动退还至平台余额！
					</p>
				</div>
			</Card>
		</div>
	</div>
</template>
<style lang="less" scoped>
.swiper_img{
	width: 100%;
	height: 4.22rem;
}
.top_content{
	position: relative;
	top:-.64rem;
	width:100%;
	height:2.86rem;
	background:#FFFFFF;
	border-radius:.4rem .4rem 0 0;
	padding: 0 .48rem;
	.van-notice-bar{
		background: #fff;
		font-size: .28rem;
		color: #2B335B;
	}
	.category_box{
		display:flex;
		align-items: center;
		justify-content: space-between;
		.category_item{
			display:flex;
			flex-direction: column;
			align-items: center;
			img{
				width: .96rem;
				height: .96rem;
			}
			.item_text{
				margin-top: .16rem;
				font-size: .28rem;
				color: #2B335B;
			}
		}
	}
}
.bottom_content{
	position: relative;
	top:-.44rem;
	width: 100%;
	padding-left: .3rem;
	padding-right: .3rem;
	.left_top_icon{
		display: block;
		position: relative;
		top: -.2rem;
		left: -.3rem;
		width: 1.6rem;
		height: .62rem;
	}
	.slot_content{
		line-height: .6rem;
		font-size: .28rem;
	}
	.announcement_content{
		line-height: .6rem;
		font-size: .28rem;
		color: #F3903F;
	}
}
</style>
<script>
	import Card from "../../components/Card.vue";
	import {getUnreadNoticeList} from '../../api'
	export default {
		data() {
			return {
				notice_text:"平台每日运营时间为11:00至2:00！纯菠菜资金！安全放心！暂时停止二维码收款！具体恢复时间等待通知！",
				left_icon:require('../../assets/notice_icon.png'),
				noticeList: [],
				images: [
				require("@/assets/img/index/banner1.png"),
				require("@/assets/img/index/banner2.png"),
				require("@/assets/img/index/banner3.png")
				],
				// dataList:[
				// {"tel":"152****7045","money":"784"},
				// {"tel":"182****3348","money":"150"},
				// {"tel":"175****7034","money":"775"},
				// {"tel":"158****9944","money":"493"},
				// {"tel":"135****0236","money":"621"},
				// {"tel":"138****3384","money":"952"}
				// ],
				// time:0
			};
		},
		mounted() {
			let queryParams = {
				pageNum: 1,
				pageSize: 999,
			}
			getUnreadNoticeList(queryParams).then(response => {
				this.noticeList = response.rows
			})
		},
		components: {
			Card
		},
		created(){
			// var that = this;
			// // 根据字典生成zd随机序列
			// var randomCode = function (len,dict) {

			// 	for (var i = 0,rs = ''; i < len; i++)
			// 		rs += dict.charAt(Math.floor(Math.random() * 100000000) % dict.length);

			// 	return rs;

			// };
			// // 生成随机手机号码
			// var randomPhoneNumber = function(){
			//     // 第1位是1 第2,3位是3458 第4-7位是* 最后容四位随机
			//     return [1,randomCode(2,'3458'),'****',randomCode(4,'0123456789')].join('');
			// };

			// this.time = setInterval(function(){
			// 	if(that.dataList.length > 110){
			// 		clearInterval(that.time);
			// 		return;
			// 	}
			// 	var obj = {};
			// 	var rand = "";
			// 	for(var i = 0; i < 3; i++){
			// 		var r = Math.floor(Math.random() * 10);
			// 		rand += r;
			// 	}
			// 	obj = {"tel":randomPhoneNumber(),"money":rand};
			// 	that.dataList.push(obj);
			// },1)
		},
		methods: {
			local(){
                window.location.href = "https://tb.53kf.com/code/client/9afd0197934d34ad72809a2e538c54b65/1";
            },
			guan(){
				window.location.href = "http://gf.agpay8.com";
			}
			// Num(){
			// 	var rand = "";
			// 	for(var i = 0; i < 3; i++){
			// 	    var r = Math.floor(Math.random() * 10);
			// 	    rand += r;
			// 	}
			// 	console.log(rand);
			// 	return rand;
			// }

		}

	};
</script>
