<template>
	<div class="wrap">
		<Back title="赚钱流程"/>
		<div class="liu_item">
			<div class="xu">1</div>
			<div class="val">完善信息</div>
			<img src="../../assets/sel.png">
		</div>
		<div class="liu_item">
			<div class="xu">2</div>
			<div class="val">绑定提现银行卡
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">3</div>
			<div class="val">绑定收款银行卡
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">4</div>
			<div class="val">充保证金
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">5</div>
			<div class="val">充余额
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">6</div>
			<div class="val">自动接单
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">7</div>
			<div class="val">佣金返利
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">8</div>
			<div class="val">存入余额宝
			</div>
			<div class="img"></div>
		</div>
		<div class="liu_item">
			<div class="xu">9</div>
			<div class="val">赚取高额利息
			</div>
			<div class="img"></div>
		</div>
	  <!-- <van-nav-bar title="攒钱流程" left-arrow @click-left="back"></van-nav-bar>
	  <div class="steps">
		  <van-steps direction="vertical" :active="0">
			<van-step>
			  <h3>完善信息</h3>
			  <p>2016-07-12 12:40</p> -->
			<!-- </van-step>
			<van-step>
			  <h3>绑定提现银行卡</h3>
			</van-step>
			<van-step>
			  <h3>綁定收款銀行卡</h3>
			</van-step>
			<van-step>
			  <h3>充保證金</h3>
			</van-step>
			<van-step>
			  <h3>充餘額</h3>
			</van-step>
			<van-step>
			  <h3>自动接单</h3>
			</van-step>
			<van-step>
			  <h3>佣金返利</h3>
			</van-step>
			<van-step>
			  <h3>存入余额宝</h3>
			</van-step>
			<van-step>
			  <h3>赚取高额利息</h3>
			</van-step>
		</van-steps> -->
	  	<!-- <van-divider dashed>攒钱流程</van-divider>
	      <ul>
	          <li class="step1"><span class="num num1">01</span><span>完 善 個 人 信 息</span></li>
	          <li class="step2"><span class="num num2">02</span><span>綁 定 提 現 銀 行 卡</span></li>
	          <li class="step3"><span class="num num3">03</span><span>綁定收款銀行卡</span></li>
	          <li class="step4"><span class="num num4">04</span><span>充 保 證 金</span></li>
	          <li class="step5"><span class="num num5">05</span><span>充 餘 額</span></li>
	          <li class="step6"><span class="num num6">06</span><span>自 动 接 单</span></li>
	          <li class="step7"><span class="num num7">07</span><span>佣 金 返 利</span></li>
	          <li class="step8"><span class="num num8">08</span><span>存 入 余 额 宝</span></li>
	          <li class="step9"><span class="num num9">09</span><span>赚 取 高 额 利 息</span></li>
	      </ul> -->
	  </div>
	</div>
</template>
<style lang="less" scoped>
.liu_item{
	margin:.12rem auto 0; 
	background: #fff;
	width:6.9rem;
	height:1.18rem;
	border-radius:.16rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: .3rem;
	padding-right: .3rem;
	.xu{
		font-size: .56rem;
		color:rgba(43,51,91,.2);
		font-weight: 500;
	}
	.val{
		font-size: .28rem;
		color: #2B335B;
	}
	img{
		width: .56rem;
		height: .56rem;
	}
	.img{
		width: .56rem;
		height: .56rem;
	}
}
</style>
<script>
	import {getBalance,getIncomeInfo} from '../../api'

	import Back from '../../components/Back.vue';

	export default {
		data() {
			return {
				totalBalance: 0.00,
				lastDays: 0.00,
				totalIncome: 0.00,
				canUse: 0.00,
				noUse: 0.00
			}
		},
		components:{
			Back
		},
		methods: {
			back() {
				this.$router.push('/index')
			},
			loadData(){
				getBalance().then( res => {
					console.log(res.code);

					if (res.code == 200) {
						this.canUse= res.data.balanceAv;
						this.noUse = res.data.balanceUn;
						this.totalBalance =  res.data.balanceAv +  res.data.balanceUn;
					}
				}).catch( (e) => {
					console.log(e);
				});
				getIncomeInfo().then(res=> {
					console.log(res);
					if ( res.code == 200 ) {
						this.totalIncome = res.data.totalIncome;
						this.lastDays = res.data.recentIncome;
					}
				}).catch( e => {
					console.log(e);
				})
			},
		},
		created() {
			this.loadData();
		}
	}
</script>

<!-- <style>
	.steps {
	    background-color: #fff;
	    padding-top: 10px;
	}
	.steps ul{
		   display: flex;
		   justify-content: space-around;
		   height: 200px;
	}
	.steps li {
	    display: inline-block;
	    width: 30%;
	    height: 200px;
	    line-height:20px;
	    color: #fff;
	    margin-bottom: 5px;
		   position: relative;
	}
	.clear {
	    clear: both;
	}
	.steps span {
	    display: block;
	}
	.steps .num {
	    position: absolute;
	    left: 9px;
		   /* top: ; */
		   z-index: 1;
	    width: 20px;
	    /* float:left; */
	    text-align: center;
	    font-size: 0.2rem;
	    font-weight: 700;
	    background: #f1f1f1;
	    transform: rotate(45deg);
	    -ms-transform: rotate(45deg);
	    -webkit-transform: rotate(45deg);
	    -o-transform: rotate(45deg);
	    -moz-transform: rotate(45deg);
	}
	
	.steps span:last-child {
	    width: 80%;
	    /* float: right; */
	    font-size: 0.2rem;
	    font-weight: 600;
	    text-indent: 20px;
	    border-left-radius: 50%;
	}
		
	.step1 .num1 {
	    color: #8661a6;
	}
	 .step1 span:last-child {
	     background: #8661a6;
	 }
	 .step2 .num2 {
	    color: #f14946;
	}
	 .step2 span:last-child {
	     background: #f14946;
	 }
	 .step3 .num3 {
	    color: #f58d34;
	}
	.step3 span:last-child {
	    background: #f58d34;
	}
	 .step4 .num4 {
	    color: #54bc9b;
	}
	.step4 span:last-child {
	    background: #54bc9b;
	}
	.step5 .num5 {
	    color: #358faa;
	}
	.step5 span:last-child {
	    background: #358faa;
	}
	.step6 .num6 {
	    color: #40c365;
	}
	.step6 span:last-child {
	    background: #40c365;
	}
	 .step7 .num7 {
	     color: #ffaec8;
	}
	.step7 span:last-child {
	    background: #ffaec8;
	}
	 .step8 .num8 {
	     color: #00a8f3;
	}
	.step8 span:last-child {
	    background: #00a8f3;
	}
	 .step9 .num9 {
	     color: #e660e8;
	}
	.step9 span:last-child {
	    background: #e660e8;
	}
	.steps span:last-child{
		   width: 70%;
		   text-align: center;
		   text-indent: 0px;
		   padding-top: 15px;
		   position: relative;
		   left: 5px;
		   top: 10px;
		   
	}
</style> -->
