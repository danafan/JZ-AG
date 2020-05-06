<template>
	<div class="hui" v-if="time == ''">获取中...</div>
	<div class="over" :class="{is_color:is_show}" v-else>{{time}}</div>
</template>
<style lang="less" scoped>
.hui{
	border-bottom: 1px dashed #E4E5EB;
	padding-top: .4rem;
	padding-bottom: .4rem;
	width: 100%;
	text-align: center;
	font-size: .32rem;
	color: #777B8F;
}
.over{
	border-bottom: 1px dashed #E4E5EB;
	padding-top: .4rem;
	padding-bottom: .4rem;
	width: 100%;
	text-align: center;
	font-size: .32rem;
	font-weight:500;
	color: #F3903F;
}
.is_color{
	color: #212744!important;
}
</style>
<script>
	export default{
		props:{
			endTime:{
				type:String,
				default:""
			}
		},
		data () {
			return {
				time: "",
				flag: false,
				intime:null,
				is_show:false
			}
		},
		mounted() {
			let countTime = (new Date(this.endTime).getTime() + 1800000) - new Date().getTime();
			this.intime = setInterval( () => {
				if (this.flag) {
					clearInterval(this.intime);
				}
				countTime = countTime - 1000;
				this.timeDown(countTime);
			}, 1000)
		},
		methods: {
			timeDown(endTime) {
				if (endTime <= 1000) {
					this.time = "已完成";
					this.flag = true;
					this.is_show = true;
					return;
				}
				let hour = parseInt(endTime / 1000 / 3600) < 10 ? "0" + parseInt(endTime / 1000 / 3600):parseInt(endTime / 1000 / 3600) < 10;
				let min = parseInt((endTime / 1000 - hour * 3600) / 60) < 10 ? '0'+ parseInt((endTime / 1000 - hour * 3600) / 60):parseInt((endTime / 1000 - hour * 3600) / 60);
				let sec = parseInt(endTime / 1000 - hour * 3600 - min * 60) < 10 ? '0' + parseInt(endTime / 1000 - hour * 3600 - min * 60):parseInt(endTime / 1000 - hour * 3600 - min * 60);
				this.time = "剩余时间：" + hour + ":" + min + ":" + sec;
			},
		},
		destroyed () {
			clearInterval(this.intime);
		},
	}
</script>