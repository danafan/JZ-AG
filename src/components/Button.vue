<template>
	<div class="submit" :class="{active_submit:active_submit}" @click="emit()">
		{{text}}
	</div>
</template>
<style scoped>
.submit{
	margin: 0 auto;
	background:#F6F7F9;
	width: 6rem;
	height: .96rem;
	display:flex;
	align-items: center;
	justify-content: center;
	font-size: .28rem;
	color: #242629;
	border-radius: .08rem;
}
.active_submit{
	background: #5B5FD1;
	color: #fff;
}
</style>
<script>
	export default{
		props:{
			text:{
				type:String,
				default:""
			},
			active_submit:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			//点击
			emit(){
				this.$emit("callback");
			}
		}
	}
</script>