<template>

</template>

<script>
// v2的响应式基本原理
let obj = {
    name:'刘小天'
}
Object.defineProperty(obj,name,{
    get() {
        console.log('有地方用到了name属性')
    },
    set(v) {
        console.log(`有地方要将name属性修改为${v}，要去刷新页面了`)
    },
    configurable:true
})
// v3的响应式基本原理
let proxy_data = {
    name:'刘大天'
}
console.log(proxy_data)
new Proxy(proxy_data,{
// Reflect 可以返回一个布尔值 如Reflect.set(target, p, newValue) 成功：true 失败：false
// 更好的检测代码的报错 可不用 try catch 来捕获报错
    set(target, p, newValue, receiver) {
        console.log('有地方修改了对象中的属性，要去刷新页面了')
        console.log('Proxy-set:',target, p, newValue, receiver)
        return Reflect.set(target, p, newValue)
    },
    get(target, p, receiver) {
        console.log('Proxy-get:',target, p, receiver)
        return Reflect.get(target, p)
    },
    deleteProperty(target, p) {
        console.log('Proxy-delete:',target, p)
        return Reflect.deleteProperty(target, p)
    },
    construct(target, argArray, newTarget) {
    },
    defineProperty(target, property, attributes) {
    },
    isExtensible(target) {
    },
})
export default {
    name: "proxy_test",
    data(){
        return{

        }
    },


}
</script>s

<style scoped>

</style>