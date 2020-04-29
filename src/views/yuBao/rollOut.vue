<template>
  <div class="wrap">
    <Back title="转出余额宝"/>
    <div class="boxs">
      <div class="title">转出金额</div>
      <div class="input_box">
        <div class="fu">¥</div>
        <input type="number" :placeholder="placeholderTxt" v-model="money">
        <div class="all" @click="setOutMoney">全部转出</div>
      </div>
    </div>
    <Button text="确定转出" :active_submit="true" @callback="setBalanceOut"/>
    <!-- <van-nav-bar title="转出余额宝" left-arrow @click-left="back"></van-nav-bar>
    <div class="content">
      <div class="con">
            <van-cell-group>
               <van-field
                center
                clearable
                label="转出金额"
                :placeholder="placeholderTxt"
                v-model="money"
              >
                <template #button>
                  <van-button size="small" type="primary" @click="setOutMoney">全部</van-button>
                </template>
              </van-field>
            </van-cell-group>
          </div>
      <div class="confirmBtn">
      <van-button type="default" @click="setBalanceOut">确认转出</van-button>
      </div>
    </div> -->
  </div>
</template>
<style lang="less" scoped>
.boxs{
  margin-bottom: 1.2rem;
  width: 100%;
  background: #fff;
  padding: .3rem;
  .title{
    font-size: .28rem;
    color: #777B8F;
  }
  .input_box{
    margin-bottom: .2rem;
    margin-top: .5rem;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .fu{
      margin-right: .1rem;
      font-size: .32rem;
      color: #212744;
      font-weight: bold;
    }
    input{
      font-size: .36rem;
      outline: none;
      border: none;
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
    .all{
      position: absolute;
      right: 0;
      border-radius: .04rem;
      background: #DEDFE7;
      width: 1.4rem;
      text-align: center;
      height: .56rem;
      line-height: .56rem;
      font-size: .26rem;
      color: #212744;
    }
  }
}
</style>
<script>
 import {inOrOut,getBalance} from "../../api";
 import {Dialog} from 'vant'

 import Back from '../../components/Back.vue'
 import Button from '../../components/Button.vue'

 export default {
  data() {
    return {
      placeholderTxt: '',
      money: '',
      canUse: 0.00,
    }
  },
  components:{
    Back,
    Button
  },
  methods: {
    loadData(){
     getBalance().then( res => {
      if (res.code == 200) {
        this.canUse = res.data.balanceAv;
        this.placeholderTxt = '可转出到卡'+res.data.balanceAv+'元'
      }
    }).catch( (e) => {
      console.log(e);
    });
  },
  setBalanceOut() {
    if(this.money == ""){
      this.$toast("请输入转出金额");
      return
    }
    let param = {
      changeType: 1,
      money: parseFloat(this.money)
    };
    inOrOut(param).then(res=>{
      if ( res.code == 200 ) {
        this.$toast('转出成功')
        this.$router.push('/my');
      } else {
        this.$toast(res.msg)
      }
    }).catch(e=>{
      this.$toast('网络错误,请稍后再试');
    })
  },
  setOutMoney() {
    this.money = this.canUse;
  }
},
created() {
  this.loadData();
}

}
</script>
<!-- <style>
  .confirmBtn {
    margin-top: 40px;
  }
  .allbtn {
    
  }
  .confirmBtn button {
    width: 90%;
    height: 50px;
    margin-left: 5%;
    border-radius: 4px;
    background-color: #0b8ce8;
    color: #fff;
    font-size: 16px;
  }
</style> -->