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
        this.$router.push('/my');
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
</style>



