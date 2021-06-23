
<template>
    <div>
        <el-input v-model="count" placeholder="请输入内容" @input="valChange" size="medium"></el-input>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs,onMounted  } from 'vue'
export interface State {
	count:string | number
}
export default defineComponent({
    name: 'ChildComp',
    props: {
         // 父组件 v-model 没有指定参数名，则默认是 modelValue
        childData: {
            type: String,
            default: 0
        }
    },
    setup (props,{emit}) {
        const state = reactive<State>({
            count: '',
        })
        onMounted(() => {
            if (props.childData) {
                state.count = props.childData
            }
        })
         // 数据双向绑定
        const valChange =(e:string)=> {
            emit('update:childData', e)
        }    
        return {
            ...toRefs(state),
            valChange
        }
    }
})
</script>

<style lang="scss" scoped>

</style>