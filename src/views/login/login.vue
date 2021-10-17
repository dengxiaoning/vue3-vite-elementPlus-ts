<template>
  <div class="login">
    <div class="login_logo">
      <img src="../../assets/image/visual/logo.png"
           alt="">
    </div>
    <h1>水利工程数字孪生协同管理平台</h1>
    <div class="login_box">
      <el-input placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="username"
                clearable></el-input>
      <el-input placeholder="请输入密码"
                prefix-icon="el-icon-goods"
                v-model="userPwd"
                show-password></el-input>
      <el-button type="primary"
                 @click="userlogin"
                 style="width:80%;display:block; margin:0 auto">登录</el-button>
    </div>
  </div>
</template>

<script>
// 定义一个组件
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'login',
  props: {

  },
  components: {

  },
  setup(props, ctx) {
    // 定义响应式对象
    const username = ref('admiin');
    const userPwd = ref('123456');
    //router是全局路由对象，route= userRoute()是当前路由对象
    let router = useRouter();
    let userlogin = () => {
      sessionStorage.setItem('userInfo', 'islogin');
      router.push({
        //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定 
        path: '/home',
        query: {
          num: 1
        }
      });
    }
    return {
      username,
      userPwd,
      userlogin
    }
  }
})
</script>

<style  lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(../../assets/image/visual/loginBg.png);
  background-size: 100% 100%;
  .login_logo {
    width: 363px;
    height: 87px;
    padding-top: 30px;
    margin-left: 78px;
  }
  h1 {
    font-size: 50px;
    color: #fff;
    text-align: right;
    padding-top: 85px;
    padding-right: 5%;
  }
  .login_box {
    width: 418px;
    height: 318px;
    border: 2px solid #345387;
    margin-top: 70px;
    margin-left: 66%;
    padding-top: 60px;
  }
}

.el-input {
  width: 80%;
  display: block;
  margin: 0 auto;
  margin-bottom: 40px;
}
</style>
