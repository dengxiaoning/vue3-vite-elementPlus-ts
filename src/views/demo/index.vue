<template>
  <div>
    <div>demo</div>
    <el-button @click="handleSignIn">登录</el-button>
  </div>
</template>

<script>
import {signIn} from '@/api/login/index'

export default {
  setup(){
    const handleSignIn = ()=>{
      signIn().then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
    return {
      handleSignIn
    }
  }
}

</script>

<style>

</style>