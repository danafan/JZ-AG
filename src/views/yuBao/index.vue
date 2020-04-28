<template>
  <div class="wrap">
    <van-nav-bar title="余额宝" left-arrow @click-left="back"></van-nav-bar>
    <div class="top">
      <div class="content">
        <div class="total">
          <p>总金额</p>
          <p class="total-momey">{{totalBalance}}</p>
          <p><span class="p3">可用余额<span class="yesy">{{canUse}}</span></span><span>&nbsp;&nbsp;</span><span class="p3">不可用余额<span class="yesy">{{noUse}}</span></span></p>
        </div>
        <div class="profit">
          <van-row>
            <van-col span="12">
              <div class="fl">
                <p class="t">累计收益</p>
                <p class="m">{{totalIncome}}</p>
              </div>
            </van-col>
            <van-col span="12">
              <div class="fr">
                <p class="t">最近收益(3天)</p>
                <p class="m">{{lastDays}}</p>
              </div>
            </van-col>
          </van-row>
        </div>
		<div class="btns">
			<router-link to="/yb/out" class="al">转出</router-link>
			<router-link to="/yb/in" class="af">转入</router-link>
		</div>
      </div>
    </div>
	
	<div class="cont">
		<div class="package">
		  <div class="content">
		    <p>购买套餐</p>
		    <div class="pak">
		      <van-row>
		        <van-col span="8">
		          <router-link to="/yb/buy?type=a">
		            <img src="../../assets/img/yubao/packa.jpg" width="96%">
		            <p>A套餐</p>
		          </router-link>
		        </van-col>
		        <van-col span="8">
		          <router-link to="/yb/buy?type=b">
		          <img src="../../assets/img/yubao/packb.jpg" width="96%">
		          <p>B套餐</p>
		          </router-link>
		        </van-col>
		        <van-col span="8">
		          <router-link to="/yb/buy?type=c">
		            <img src="../../assets/img/yubao/packc.jpg" width="96%">
		            <p>C套餐</p>
		          </router-link>
		        </van-col>
		      </van-row>
		    </div>
		  </div>
		</div>
		<div class="middle"><van-cell title="交易记录" is-link to="/yb/list" /></div>
	</div>
	
    
  </div>
</template>
<script>
  import {getBalance,getIncomeInfo} from '../../api'
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

<style lang="less" scoped>
  .top {
    // background-color: #ff6501;
    padding: 10px 5% 15px 5%;
  }
  .cont{
	  width: 95%;
	  margin: 20px auto 0;
	  box-shadow: 0 0 5px lightgray;
  }
  .content {
    background-color: #fff;
    border-radius: 4px;  
	box-shadow: 0 0 5px lightgray;
  }
  .total {
     text-align: center;
     padding-top: 40px;
  }
  .total p {
    font-size: 16px;
    height: 30px;
    line-height:30px;
    color: #9d9d9d;
  }
  .total p.total-momey {
    font-size: 30px;
    color: #060606;
    font-weight: 700;
  }
  .yesy {
    color: #ff6808;
  }
  .p3  {
    font-size: 12px;
    display: inline-block;
    background-color: #ebedf0;
    padding: 2px 10px 2px 10px;
    border-radius: 10px; 
    margin-top: 8px; 
  }
  .profit {
     margin-top: 20px;
  }
  .profit .t {
    color: #bbbbbb;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
  }
  .profit .m {
    color: #060606;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
  }
  .profit .fl p {
    text-align: center;
  }
  .profit .fr p {
    text-align: center;
  }
  .middle {
    // margin-top: 20px;
	border-top: 1px solid lightgray;
	width: 100%;
	margin: auto;
  }
  .btns {
    // position: fixed;
    width: 100%;
    // bottom: 0;
	margin: 0 auto 10px;
	text-align: center;
	padding-bottom: 20px;
	// display: flex;
	// justify-content: space-around;
  }
  .btns a {
    display: inline-block;
    // float: right;
    width: 30%;
    height:40px;
    line-height: 40px;
    text-align: center;
	&:first-child{
		margin-right: 20px;
	}
  }
  .al {
    background: #fff6ef;
    color: #d27d47;
  }
  .af {
    background: #ff6501;
    color:#fff;
  }
  .package {
    margin-top: 20px;
    // padding: 10px 5% 10px 5%;
	// width: 95%;
	// margin: 20px auto 0;
    background: #fff;
    text-align: center;
  }
  .package p {
    height:30px;
    line-height:30px;
  }
  .pak p {
    text-align: center;
    font-size: 14px;
  }
  .pak .van-image__img {
    margin-left: 2%;
  }
</style>