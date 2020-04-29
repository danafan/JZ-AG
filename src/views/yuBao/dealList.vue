<template>
  <div class="page_box">
    <Back title="交易记录"/>
    <div class="list">
      <van-list v-model="loading" :finished="finished" :offset="2"
      finished-text="没有更多了" @load="onLoad">
      <Card v-for="(item,index) in list">
       <div class="top_row">
         <div class="status">{{item.title}}</div>
         <div class="money" :class="{color_chu:!item.type}">{{item.value}}</div>
       </div>
       <div class="create_time">
         {{item.des}}
       </div>
     </Card>
   </van-list>
 </div>


 <!-- <van-pull-refresh class="padding"> -->
      <!-- <van-list v-model="loading" :finished="finished" :offset="10"
      finished-text="已经到底了" @load="onLoad">
      <Card v-for="(item,index) in list"> -->
       <!-- <div class="top_row">
         <img class="pay" src="../../assets/pay.png">
         <div class="money"><span>¥</span>{{item.money}}</div>
       </div>
       <div class="over">已完成</div>
       <div class="create_time">
         <div class="time_title">订单时间</div>
         <div class="time_content">{{parseTime(item.createTime)}}</div>
       </div> -->
    <!--  </Card>
    </van-list> -->
    <!-- </van-pull-refresh> -->


    <!-- <van-nav-bar title="交易记录" left-arrow @click-left="back"></van-nav-bar>
    <div class="condition">
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item.title" :value="item.value" :label="item.des" title-class="title" :value-class="[item.type?'orange':'black']" label-class="des"/>
		<ul class="list" v-for="item in list">
			<li><span>金额: {{item.value}}</span><span>时间: {{item.des}}</span></li>
		</ul>
	  </van-list>
  </div> -->
</div>
</template>
<style lang="less" scoped>
.page_box{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
}
.list{
  flex:1;
  padding: .2rem .3rem;
  overflow-y: scroll;
}
.top_row{
  margin-top: .2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .status{
    font-size: .28rem;
    color: #777B8F;
  }
  .money{
    font-size: .32rem;
    color: #38B763;
  }
  .color_chu{
    color: red;
  }
}
.create_time{
  margin-top: .4rem;
  font-size: .28rem;
  color: #777B8F;
}
</style>
<script>
  import {getDealList} from "../../api";
  import moment from "moment";

  import Back from '../../components/Back.vue'
  import Card from '../../components/Card.vue'

  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
      };
    },
    components:{
      Back,
      Card
    },
    methods: {
      back() {
        this.$router.push('/yb/index')
      },
      onLoad() {
        getDealList().then( res=> {
          if ( res.code == 200 ) {
           let listArr = res.data;
           listArr.map((item,index)=>{
             let tt = {};
             if(item.type == 1 && item.changeType == 1 ) {
              //转入
              tt.title='余额宝-转入';
              tt.type = true;
            }
            if(item.type == 1 && item.changeType == 2 ) {
              //转出
              tt.title='余额宝-转出',
              tt.type = false;
            }
            if(item.type == 2) {
              //转出
              tt.title='余额宝-收益',
              tt.type = true;
            }
            if(item.type == 3) {
              //购买
              if (item.packId==1) tt.title='余额宝-购买A套餐('+item.day+')天';
              if (item.packId==2) tt.title='余额宝-购买B套餐('+item.day+')天';
              if (item.packId==3) tt.title='余额宝-购买C套餐('+item.day+')天';
              tt.type = false;
            }
            if ( item.changeType == 1 ) {
              tt.value = '+'+item.amount;
            }
            if ( item.changeType == 2 ) {
              tt.value = '-'+item.amount;
            }
            tt.des = moment(item.createTime).add(8,'h').format('YYYY-MM-DD HH:mm:ss');
            this.list.push(tt);
            // 加载状态结束
            this.loading = false;
          })
           console.log(this.list);
          // 数据全部加载完成
          if (this.list.length >= listArr.length) {
            this.finished = true;
          }
        }
      })
      }
    }
  }
</script>
<!-- <style scoped>
  .title {
    color: #2d2d2d;
  }
  .orange {
    color: #e25a26;
  }
  .black {
    color: #2f2f2f;
  }
  .list{
	  width: 100%;
  }
  .list li{
	  width: 100%;
	  line-height: 40px;
	  background: #FFFFFF;
	  border-bottom: 1px solid lightgray;
	  text-align: center;
	  display: flex;
	  justify-content: space-around;
  }
  .list li span:nth-child(2){
	  display: inline-block;
	  /* margin-left: 80px; */
  }
</style> -->