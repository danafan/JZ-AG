<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getMemberAssets} from './api'
  import {getToken} from '@/utils/auth'
  export default {
    name: "app",
    created(){
      const token = getToken();
      if (token) {
        this.$router.push('/index');
      } else {
        this.$router.replace('/login');
      }
    }
  };
</script>
<style>
.van-pull-refresh{
  overflow: visible!important;
}
.van-toast{
  font-size: .32rem!important;
}
.van-swipe__indicators{
  bottom: 1rem!important;
}
.van-list__finished-text{
  font-size: .26rem!important;
}
</style>



