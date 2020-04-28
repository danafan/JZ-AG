<template>
  <div class="pages">
    <van-nav-bar title="交易记录" left-arrow @click-left="back"></van-nav-bar>
    <div class="condition">
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item.title" :value="item.value" :label="item.des" title-class="title" :value-class="[item.type?'orange':'black']" label-class="des"/> -->
		<ul class="list" v-for="item in list">
			<li><span>金额: {{item.value}}</span><span>时间: {{item.des}}</span></li>
		</ul>
	  </van-list>
    </div>
  </div>
</template>
<script>
import {getDealList} from "../../api";
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
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
           if(item.type == 1 && item.type.changeType == 1 ) {
              //转入
               tt.title='余额宝-转入';
               tt.type = true;
           }
           if(item.type == 1 && item.type.changeType == 2 ) {
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
<style scoped>
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
</style>