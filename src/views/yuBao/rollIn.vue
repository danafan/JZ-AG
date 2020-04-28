<template>
  <div class="wrap">
    <van-nav-bar title="转入余额宝" left-arrow @click-left="back"></van-nav-bar>
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
    </div>
  </div>
</template>
<script>
  import {inOrOut} from "../../api";
  import {Dialog} from 'vant'
  
  export default {
    data() {
      return {
        money: '',
      }
    },
    methods: {
      back() {
        this.$router.push('/yb/index')
      },
      setBalanceIn() {
        let param = {
          changeType: 2,
          money: parseFloat(this.money)
        };
        console.log(param);
        inOrOut(param).then(res=>{
          if ( res.code == 200 ) {
             Dialog.alert({
              message: '转入成功'
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
      }
    }

  }
</script>
<style scoped>
    @import "./yubao.less";
</style>