<template>
  <div class="wrap">
    <Back title="转入余额宝"/>
    <div class="boxs">
      <div class="title">转入金额</div>
      <div class="input_box">
        <div class="fu">¥</div>
        <input type="number" placeholder="请输入转入金额" v-model="money">
      </div>
    </div>
    <Button text="确定转入" :active_submit="true" @callback="setBalanceIn"/>
   <!--  <van-nav-bar title="转入余额宝" left-arrow @click-left="back"></van-nav-bar>
    <div class="content">
      <van-panel title="转入金额">
        <van-cell-group>
          <van-field
            left-icon="gold-coin"
            placeholder="请输入转入金额"
            v-model="money"
            type="number"
          />
        </van-cell-group>
      </van-panel>
      <div class="confirmBtn">
        <van-button type="default" @click="setBalanceIn">确认转入</van-button>
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
    .fu{
      margin-right: .1rem;
      font-size: .32rem;
      color: #212744;
      font-weight: bold;
    }
    input{
      font-size: .36rem;
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
}
</style>
<script>
  import {inOrOut} from "../../api";
  import {Dialog} from 'vant'

  import Back from '../../components/Back.vue'
  import Button from '../../components/Button.vue'
  
  export default {
    data() {
      return {
        money: '',
      }
    },
    components:{
      Back,
      Button
    },
    methods: {
      setBalanceIn() {
        if(this.money == ""){
          this.$toast("请输入转入金额");
          return
        }
        let param = {
          changeType: 2,
          money: parseFloat(this.money)
        };
        inOrOut(param).then(res=>{
          if ( res.code == 200 ) {
            this.$toast("转入成功");
            this.$router.push('/yb/index')
          } else {
            this.$toast(res.msg);
          }
        }).catch(e=>{
          this.$toast('网络错误,请稍后再试');
        })
      }
    }

  }
</script>
<!-- <style scoped>
    @import "./yubao.less";
</style> -->