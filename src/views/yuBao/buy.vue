<template>
  <div class="wrap">
    <Back title="购买"/>
    <div class="content">
      <Card>
        <div class="pack_title">{{typeName}}</div>
        <div class="pack_item">
          <div class="item_label">销售金额</div>
          <div class="item_val">{{from}}-{{capped}}</div>
        </div>
        <div class="pack_item">
          <div class="item_label">结算周期</div>
          <div class="item_val">{{cycle}}小时</div>
        </div>
        <div class="pack_item">
          <div class="item_label">利率</div>
          <div class="item_val">{{rate}}</div>
        </div>
        <div class="pack_item null_border">
          <div class="item_label">剩余数量</div>
          <div class="item_val">{{lave}}</div>
        </div>
      </Card>
      <Card>
        <div class="pack_item">
          <div class="item_label">买入金额</div>
          <input type="number" placeholder="请输入买入金额" v-model="money">
        </div>
        <div class="pack_item null_border">
          <div class="item_label">购买天数</div>
          <input type="number" placeholder="请输入购买的天数" v-model="day">
        </div>
      </Card>
    </div>

    <Button text="确定购买" :active_submit="true" @callback="buy"/>
    
   <!--  <van-nav-bar title="购买" left-arrow @click-left="back"></van-nav-bar>
    <div class="content">
      <van-panel style="text-align: center;box-shadow: 0 0 5px lightgray;border-radius: 5px;" :title="typeName">
        <div class="detail">
          <van-row class="row" style="text-align: left;">
            <van-col span="12" class="fcol">销售金额</van-col>
            <van-col span="12" class="lcol">{{from}}~{{capped}}</van-col>
          </van-row>
          <van-row class="row" style="text-align: left;">
            <van-col span="12" class="fcol">结算周期</van-col>
            <van-col span="12" class="lcol">{{cycle}}小时</van-col>
          </van-row>
          <van-row class="row" style="text-align: left;">
            <van-col span="12" class="fcol">利率</van-col>
            <van-col span="12" class="lcol">{{rate}}</van-col>
          </van-row>
          <van-row class="row" style="text-align: left;">
            <van-col span="12" class="fcol">剩余数量</van-col>
            <van-col span="12" class="lcol">{{lave}}</van-col>
          </van-row>
        </div>
        <van-cell-group>
          <van-field
            label="买入金额"
            placeholder="请输入购买金额"
            v-model="money"
            type="number"
          />
          <van-field label="购买天数 "placeholder="请输入购买的天数" v-model="day" type="tel"/>
        </van-cell-group>
      </van-panel>
      <div class="confirmBtn">
        <div class="error">{{this.errMsg}}</div>
        <van-button type="default" @click="buy">确认购买</van-button>
      </div>
    </div> -->
  </div>
</template>
<style lang="less" scoped>
.content{
  width: 100%;
  padding: .3rem;
  .pack_title{
    margin-bottom: .16rem;
    width: 100%;
    text-align: center;
    font-size: .4rem;
    color: #212744;
    font-weight:500;
  }
  .pack_item{
    border-bottom: 1px solid #E5E6EC;
    width: 100%;
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item_label{
      font-size: .28rem;
      color: #777B8F;
    }
    .item_val{
      font-size: .28rem;
      color: #212744;
    }
    input{
      outline: none;
      border:none;
      font-size: .28rem;
      text-align: right;
    }
    input::-webkit-input-placeholder {
      color:#C1C4D1;
    }
    input:-moz-placeholder {
      color:#C1C4D1;
    }
    input:-ms-input-placeholder {
      color:#C1C4D1;
    }
  }
  .null_border{
    border:none;
  }
}
</style>
<script>
 import {getPackInfo,buyPack} from "../../api"
 import {Dialog} from 'vant'

 import Back from '../../components/Back.vue'
 import Card from '../../components/Card.vue'
 import Button from '../../components/Button.vue'

 export default {
   data() {
     return {
       pid: 1,
       typeName: 'A套餐',
       from: 0.00,
       capped: 0.00,
       cycle: 24,
       rate: '7%',
       lave: 9999,
       day: '',
       money: '',
       errMsg: '',
     }
   },
   components:{
    Back,
    Card,
    Button
  },
  methods: {
    back() {
      this.$router.push('/yb/index')
    },
    buy() {
      if ( this.money<this.from ) {
        this.$toast('买入金额不能小于起售金额'+this.from);
        // this.errMsg = '买入金额不能小于起售金额'+this.from;
        return;
      }
      if ( this.money > this.capped ) {
        this.$toast('买入金额不能大于封顶金额'+this.capped);
        // this.errMsg = '买入金额不能大于封顶金额'+this.capped;
        return;
      }
      if ( (this.pid == 1 || this.pid == 2) && this.day < 1 ) {
        this.$toast('购买天数至少1天');
        // this.errMsg = '购买天数至少1天';
        return;
      }
      if ( this.pid == 30 && this.day < 30 ) {
        this.$toast('购买天数至少30天');
        // this.errMsg = '购买天数至少30天';
        return;
      }
      let param = {
        id: this.pid,
        day: this.day,
        money: this.money
      };
      buyPack(param).then(res=> {
        if ( res.code == 200 ) {
           this.$toast('购买成功');
           this.$router.go(-1);
          // Dialog.alert({
          //   message: '购买成功'
          // }).then(()=>{
          //   this.$router.push('/yb/index')
          // });
        } else {
          this.$toast(res.msg);
          // Dialog.alert({
          //   message: res.msg
          // });
        }
      }).catch(e=>{
        this.$toast('网络错误,请稍后再试');
        // Dialog.alert({
        //   message: '网络错误,请稍后再试'
        // });
      })
    },
    loadData() {
      const type = this.$route.query.type;
      if (type=='a') {
        this.typeName = 'A套餐';
      }
      if (type=='b') {
        this.typeName = 'B套餐';
      }
      if (type=='c') {
        this.typeName = 'C套餐';
      }
      getPackInfo().then(res=>{
        console.log(res);
        if ( res.code == 200 ) {
          let packArr = res.data;
          packArr.map((item,index)=>{
            if(item.name==this.typeName) {
              this.from = item.from;
              this.capped = item.capped;
              this.cycle = item.cycle;
              this.rate = item.rate;
              this.lave = item.lave;
              this.pid = item.id;
            }
          });
        }
      })
    }
  },
  created() {
   this.loadData();
 }
}
</script>
<!-- <style scoped>
    @import "./yubao.less";
	.content{
		width: 95%;
		margin: 0.625rem auto 0;
	}
</style> -->