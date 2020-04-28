<template>
	<div class="box">
		<img class="back" src="../assets/jian.png" @click="$router.go(-1)">
		<div class="title">{{title}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		name: 'back'
	}
</script>

<style lang="less" scoped>
.box{
	height: 1rem;
	padding: 0 15px;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.back{
	transform: rotate(180deg);
	position: absolute;
	left: .3rem;
	width: .23rem;
	height: .35rem;
}

.title{
	font-size: .32rem;
	color: #212744;
}
</style>
