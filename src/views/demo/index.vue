
<template>
  <div>
    <div>demo</div>
    <el-button @click="handleSignIn">登录</el-button>
    x: {{x}}
  y: {{y}}
  </div>
</template>

<script>
import {signIn} from '@/api/login/index'
import { defineComponent } from "vue"
import useMousePosition from "hooks/useMousePosition"

export default {
  setup(){
    const {x,y} = useMousePosition()
    console.log('loadsh')
    const handleSignIn = ()=>{
      signIn().then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
    return {
      handleSignIn,
      x,y
    }
  }
}

</script>

<style>

</style>