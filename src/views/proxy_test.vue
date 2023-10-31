<template>
  <div class="wrapper">
      <!--   数据劫持:对数据变化的拦截 从而实现响应式 -> mvvm 下面有v2和v3响应式的基本原理 熟记 -->
      <h2>ref 用来对普通数据类型进行数据劫持 如果传入的是对象类型 则会转为Proxy代理对象</h2>
      <h2>reactive 用来对引用数据类型进行数据劫持 如果传入的是普通类型 则还是会转为ref()->refimpl:引用对象</h2>
      <h2>数字 字符串 布尔值....-->用ref()</h2>
      <h2>对象 数组....-->用reactive()</h2>
      <!--   Reflect 可以返回一个布尔值 如Reflect.set(target, p, newValue) 成功：true 失败：false 更好的检测代码的报错 可不用 try catch 来捕获报错-->
      <!--   Reflect mdn:-->
      <!--   Proxy   mdn:-->
  </div>
</template>

<script>

import {reactive} from "vue";

export default {
    name: "proxy_test",
    setup() {
        const data = reactive({
            a:'a',
            b:'b',
            c:'c',
            d:'d',
        })
        // v2的响应式基本原理
        // 缺点：增删改查，没有增和删，只有改和查 -> get()&set()
        //      会导致在vue2编写过程中对Object&Array类型的数据进行添加和删除时页面不刷新
        //      其中要注意的细节是 vue中的Array的一些方法 push(),shift()...是经过vue二次封装的 不会导致页面不刷新  <-----面试细节
        //      但是换个方式: let arr = [a,b,c]  arr[0] = d 这种直接修改数组中某一项数据时 vue2检测不到 <-----面试细节
        let obj = {
            name: '不会vue3的刘小天'
        }
        Object.defineProperty(obj, name, {
            get() {
                console.log('有地方用到了name属性')
            },
            set(v) {
                console.log(`有地方要将name属性修改为${v}，要去刷新页面了`)
            },
            configurable: true // 使数据变为可删除
        })
        // v3的响应式基本原理
        // 优点：Proxy() & reflect()实现数据劫持，更好的捕获报错信息
        //      同时具备增删改查的检测方法
        //      具备Object的所有原生方法
        let proxy_data = {
            name: '会vue3的刘大天'
        }
        new Proxy(proxy_data, {
            set(target, p, newValue, receiver) {
                console.log('有地方修改了对象中的属性，要去刷新页面了')
                console.log('Proxy-set:', target, p, newValue, receiver)
                return Reflect.set(target, p, newValue)
            },
            get(target, p, receiver) {
                console.log('有地方读取了对象中的属性')
                console.log('Proxy-get:', target, p, receiver)
                return Reflect.get(target, p)
            },
            deleteProperty(target, p) {
                console.log('有地方删除了对象中的属性，我也要去刷新页面了')
                console.log('Proxy-delete:', target, p)
                return Reflect.deleteProperty(target, p)
            },
            // construct(target, argArray, newTarget) {
            // },
            // defineProperty(target, property, attributes) {
            // },
            // isExtensible(target) {
            // },
        })
        return data
    }
}
</script>s

<style scoped>

</style>