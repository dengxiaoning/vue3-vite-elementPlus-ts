<template>
  <div>
    <HelloWorld msg="build 时候，组件必传参数, 父组件传子组件" />
    <el-button @click="addCount">count is: {{ count }}</el-button>
    <process-com />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'store/index'
import { useRoute } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ProcessCom from './process.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    ProcessCom
  },
  setup() {
    const store = useStore()

    const count: any = computed({
      get() {
        return store.state.app.count
      },
      set(value) {
        // store.commit('increment', value)
        store.dispatch('changeCount', value)
      }
    })

    function addCount() {
      count.value += 1
    }

    //router是全局路由对象，route= userRoute()是当前路由对象
    let route = useRoute()
    let num = route.query.num
    //let num = route.params.num;
    console.log('it receive params is :', num)
    return {
      count,
      addCount
    }
  }
})
</script>

