<template>
    <div class="box">
        <text class="name">{{ name }}</text>
    </div>

</template>

<script>
import {h, reactive} from "vue";
import {ref} from "vue";
//
// v2中声明变量的方式为:
// data(){
//     return{
//         a,
//         b,
//         c
//     }
// },
// v3中声明变量的方式为:
// setup()
// {
//     let name = ref('刘小天')
//     let age = ref(18)
// }
// 使用setup语法糖在setup(){}方法中,任何变量,方法都可以定义,而且不受作用域限制。
// 也就是说没有this这回事了,原来有this是为了找到扩展在在该vue,模版对象中的data
//
// 但是想要让数据变成响应式数据 还要进一步加工
//
// 普通数据类型 使用ref()进行包裹 如 let name = ref('刘文博') 想要获取name中的值 则必须name.value
// ref() 将数据用refimepl(引用实例对象)包裹 通过set get来实现数据拦截 具体可看 https://juejin.cn/post/7290728630161260580?searchId=20231030001455CC8525970E6748853A4A

// 引用数据类型 使用reactive()进行包裹 如 let obj = reactive({ a:'刘小天' })
// reactive() 将数据用Proxy()<-(代理) 包裹来进行数据劫持 手写例子在 src/views/Proxy_text.vue中

export default {

    name: "setuo_test",

    setup() {
        let name = '刘小天'
        let age = 18
        // let a = ref('a')
        const obj = {
            a:'a',
            b:'b'
        }
        const sayHellow = () => {
            alert(`你好我是${name}我${age}岁了`)
            console.log(obj,"<====obj")
        }

        return {
            name,
            age,
            sayHellow
        }


    }
}
</script>

<style scoped>

</style>