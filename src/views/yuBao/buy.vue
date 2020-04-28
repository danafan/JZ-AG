<template>
  <div class="wrap">
    <van-nav-bar title="购买" left-arrow @click-left="back"></van-nav-bar>
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
    </div>
  </div>
</template>
<script>
 import {getPackInfo,buyPack} from "../../api"
 import {Dialog} from 'vant'
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
   methods: {
      back() {
        this.$router.push('/yb/index')
      },
      buy() {
        if ( this.money<this.from ) {
          this.errMsg = '买入金额不能小于起售金额'+this.from;
          return;
        }
        if ( this.money > this.capped ) {
          this.errMsg = '买入金额不能大于封顶金额'+this.capped;
          return;
        }
        if ( (this.pid == 1 || this.pid == 2) && this.day < 1 ) {
          this.errMsg = '购买天数至少1天';
          return;
        }
        if ( this.pid == 30 && this.day < 30 ) {
          this.errMsg = '购买天数至少30天';
          return;
        }
        let param = {
          id: this.pid,
          day: this.day,
          money: this.money
        };
        buyPack(param).then(res=> {
          if ( res.code == 200 ) {
            Dialog.alert({
              message: '购买成功'
            }).then(()=>{
              this.$router.push('/yb/index')
            });
          } else {
            Dialog.alert({
              message: res.msg
            });
          }
          }).catch(e=>{
            Dialog.alert({
                message: '网络错误,请稍后再试'
              });
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
<style scoped>
    @import "./yubao.less";
	.content{
		width: 95%;
		margin: 0.625rem auto 0;
	}
</style>