<template>
  <h2>computed函数没有太大变化，只是需要单独引入，更灵活了。</h2>
    <input type="text" value="{{queryData.computed_demo1}}" v-model="queryData.computed_demo1">
</template>
<script>
//需求: 写两个利用计算属性读写的input
//效果: input1 输入:'名字'
//     input2 输出:'我叫' + '名字'
import {computed, reactive} from "vue";
export default {
    name: "computed_test",
    setup(){
        // 结合reactive
        const queryData = reactive({
            name:'刘文博',
            age:20,
        })
        // 简写 只读
        // 这里直接可以对 queryData.xxx 进行新增属性
        queryData.computed_demo1 = computed(()=>{
            return `我是${queryData.name}，今年${queryData.age}了`
        })
        // 完整 需要操作数据
        queryData.computed_demo2 = computed({
            get(){
                return `我是${queryData.name}，今年${queryData.age}了`
            },
            set(val){
                // 这里写对val的处理
                return val
            }
        })
        return {
            queryData
        }
    }
}
</script>

<style scoped>

</style>