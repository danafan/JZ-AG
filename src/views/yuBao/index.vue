<template>
  <div class="wrap">
    <div class="back_box">
      <img class="back_img" src="../../assets/yuebao_back.png">
      <div class="back_content">
        <div class="top_back">
          <img class="back" src="../../assets/fanhui.png" @click="$router.go(-1)">
          <div class="back_text">余额宝</div>
        </div>
        <div class="total_money">{{totalBalance}}</div>
        <div class="total_text">总余额</div>
        <div class="yue_row">
          <div class="yue_item">
            <div class="yue_title">可用余额</div>
            <div class="yue_val">{{canUse}}</div>
          </div>
          <div class="yue_item">
            <div class="yue_title">不可用余额</div>
            <div class="yue_val">{{noUse}}</div>
          </div>
        </div>
        <div class="yue_row">
          <div class="yue_item">
            <div class="yue_title">累计收益</div>
            <div class="yue_val">{{totalIncome}}</div>
          </div>
          <div class="yue_item">
            <div class="yue_title">最近收益（3天）</div>
            <div class="yue_val">{{lastDays}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_box">
      <Card>
        <div class="buts">
          <div class="but chu" @click="$router.push('/rollOut')">转出</div>
          <div class="but ru" @click="$router.push('/rollIn')">转入</div>
        </div>
      </Card>
      <Card>
        <div class="package_item">
          <div class="left">
            <img src="../../assets/task_icon.png">
            <div class="pack_text">A套餐</div>
          </div>
          <div class="mai" @click="$router.push('/buy?type=a')">去购买</div>
        </div>
        <div class="package_item">
          <div class="left">
            <img src="../../assets/task_icon.png">
            <div class="pack_text">B套餐</div>
          </div>
          <div class="mai" @click="$router.push('/buy?type=b')">去购买</div>
        </div>
        <div class="package_item null_bottom">
          <div class="left">
            <img src="../../assets/task_icon.png">
            <div class="pack_text">C套餐</div>
          </div>
          <div class="mai" @click="$router.push('/buy?type=c')">去购买</div>
        </div>
      </Card>
      <Card>
        <div class="jiao" @click="$router.push('/tradingRecord')">
          <div class="jiao_text">交易记录</div>
          <img src="../../assets/jian.png">
        </div>
      </Card>
    </div>

    <!-- <van-nav-bar title="余额宝" left-arrow @click-left="back"></van-nav-bar>
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
	</div> -->
	

</div>
</template>
<style lang="less" scoped>
.back_box{
  position: relative;
  width: 100%;
  height: 5.6rem;
  .back_img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back_content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .top_back{
      height: 1rem;
      padding: 0 .3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .back{
        position: absolute;
        left: .3rem;
        width: .36rem;
        height: .35rem;
      }
      .back_text{
        font-size: .32rem;
        color: #FFFFFF;
      }
    }
    .total_money{
      margin-top: .6rem;
      width: 100%;
      text-align: center;
      font-size: .6rem;
      color: #FFFFFF;
      font-weight: bold;
    }
    .total_text{
      margin-top: .18rem;
      text-align: center;
      font-size: .28rem;
      color: #7888DA;
    }
    .yue_row{
      margin-top: .5rem;
      width: 100%;
      display:flex;
      align-items: center;
      justify-content: space-around;
      .yue_item{
        width: 1.84rem;
        .yue_title{
          margin-bottom: .12rem;
          font-size: .24rem;
          color: #A7AAFF;
        }
        .yue_val{
          font-size: .28rem;
          color: #E1E5F7;
          font-weight:bold;
        }
      }
    }
  } 
}
.bottom_box{
  position: relative;
  top: -.3rem;
  width: 100%;
  padding-left: .3rem;
  padding-right: .3rem;
  .buts{
    padding-top: .26rem;
    padding-bottom: .26rem;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    .but{
      border-radius: .3rem;
      width: 2rem;
      text-align: center;
      height: .6rem;
      line-height: .6rem;
      font-size: .28rem;
    }
    .chu{
      background:linear-gradient(90deg,rgba(254,186,67,1) 0%,rgba(243,144,63,1) 100%);
      color: #B37A33;
      opacity:0.59;
    }
    .ru{
      background:linear-gradient(90deg,rgba(254,186,67,1) 0%,rgba(243,144,63,1) 100%);
      color: #fff;
    }
  }
  .package_item{
    border-bottom: 1px solid #D6D6E7;
    height: 1.3rem;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display:flex;
      align-items: center;
      img{
        margin-right: .2rem;
        width: .6rem;
        height: .6rem;
      }
      .pack_text{
        font-size: .28rem;
        color: #212744;
        font-weight:400;
      }
    }
    .mai{
      width: 1.4rem;
      text-align: center;
      height: .6rem;
      line-height: .6rem;
      border-radius: .3rem;
      background: #5B5FD1;
      font-size: .28rem;
      color: #FFFFFF;
    }
  }
  .null_bottom{
    border:none;
  }
  .jiao{
    padding-top: .1rem;
    padding-bottom: .1rem;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    .jiao_text{
      font-size: .32rem;
      color: #777B8F;
    }
    img{
      width: .16rem;
      height: .28rem;
    }
  }
}
</style>
<script>
  import {getBalance,getIncomeInfo} from '../../api'

  import Card from '../../components/Card.vue'

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
      Card
    },
    methods: {
      loadData(){
        getBalance().then( res => {
          if (res.code == 200) {
            this.canUse= res.data.balanceAv;
            this.noUse = res.data.balanceUn;
            this.totalBalance =  res.data.balanceAv +  res.data.balanceUn;
          }
        }).catch( (e) => {
          console.log(e);
        });
        getIncomeInfo().then(res=> {
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

<!-- <style lang="less" scoped>
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
</style> -->