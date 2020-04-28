<template>
  <div class="wrap">
    <van-nav-bar title="转出余额宝" left-arrow @click-left="back"></van-nav-bar>
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
    </div>
  </div>
</template>
<script>
   import {inOrOut,getBalance} from "../../api";
  import {Dialog} from 'vant'
  
  export default {
    data() {
      return {
        placeholderTxt: '',
        money: '',
        canUse: 0.00,
      }
    },
    methods: {
      back() {
        this.$router.push('/yb/index')
      },
      loadData(){
         getBalance().then( res => {
          console.log(res.code);
          if (res.code == 200) {
            this.canUse = res.data.balanceAv;
            this.placeholderTxt = '可转出到卡'+res.data.balanceAv+'元'
          }
        }).catch( (e) => {
          console.log(e);
        });
      },
      setBalanceOut() {
        let param = {
          changeType: 1,
          money: parseFloat(this.money)
        };
        console.log(param);
        inOrOut(param).then(res=>{
          if ( res.code == 200 ) {
             Dialog.alert({
              message: '转出成功'
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
      setOutMoney() {
        this.money = this.canUse;
        console.log(this.money);
        console.log(this.canUse);
      }
    },
    created() {
      this.loadData();
    }

  }
</script>
<style>
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
</style>