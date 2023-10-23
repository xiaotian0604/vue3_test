<template>
    <div class="box">
        <text class="name">{{ name }}</text>
    </div>

</template>

<script>
import {h} from "vue";

export default {
    name: "setuo_test",
    setup() {
        let name = '刘小天'
        let age = 18
        const sayHellow = () => {
            alert(`你好我是${name}我${age}岁了`)
        }

        return {
            name,
            age,
            sayHellow
        }
        // 如果返回的是调用 h 形式的渲染函数 则template中的模版内容不奏效 直接展示渲染函数中的内容
        // return ()=> h('h1','这是一个渲染函数')
        // setupAPI可以读取v2中 data()形式定义的数据 但是v2访问不到setup中的数据 v3优先
        // setup 不能写async修饰符 在DOM模版中没法写await承接promise对象

    }
}
</script>

<style scoped>

</style>