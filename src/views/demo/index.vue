
<template>
  <div>
    <div>demo</div>
    <el-button @click="handleSignIn">登录</el-button>
     x: {{x}}
     y: {{y}}
     <!-- v-model 没有指定参数名时，子组件默认参数名是modelValue -->
     <ChildComponent v-model:childData="childData" />
     组件之间数据双向绑定 ：{{childData}}
  </div>
</template>

<script>
import {signIn} from '@/api/login/index'
import { defineComponent,toRefs,ref } from "vue"
import useMousePosition from "hooks/useMousePosition"
import ChildComponent from "./ChildComponent.vue"
export default {
  components:{
      ChildComponent
  },
  setup(){
    const {x,y} = useMousePosition()
    const childData=ref('')
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
      childData,
      x,y
    }
  }
}

</script>

<style>

</style>