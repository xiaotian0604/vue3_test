<template>
<h2>watch()总共有五种情况,每种情况对应不同语法处理,需悉知</h2>
<!--<h2>vue3还提供了一个函数 叫watchEffect()</h2>-->
</template>

<script>
import {reactive, ref, watch, watchEffect, watchPostEffect, watchSyncEffect} from "vue";

export default {
    name: "watch_test",
    setup(){
        // watch() 和计算属性一样,在vue2中不再是属性,而是被定义为函数。
        // 分几种情况，列举如下：
        // 情况一： 监听普通类型的数据,也就是ref()定义的数据
        let name = ref('刘小天')
            name = '刘大天'
        // 注意: 之前提到过用setup定义过的数据需要用 xxx.value 来获取数据 watch监听函数不需要,直接写就行
        // todo 暂未研究为什么不用 .value来监听,后面会补上
        watch(name,(newValue,oldValue)=>{
          console.log(`刘小天改名了,原来叫${oldValue},现在叫${newValue}`)
        // immediate 如果为true则页面加载完成之后就会执行一次watch 默认不写为false
        },{immediate:true})

        // 情况二： 监听多个普通类型的数据
        let age = ref(18)
        let school = ref('北工商')
        watch([age,school],(newValue,oldValue)=>{
            console.log('age或者school变了')
        })

        // 情况三：监听引用类型的数据 也就是用reactive定义的数据
        // ⚠️注意了有坑⚠️
        // ⚠️注意了有坑⚠️
        // ⚠️注意了有坑⚠️
        // 坑1: 在watch监听一个响应式对象(也就是用reactive定义的对象或者数组)时,他娘的 newValue 和 oldValue 的值是一样的，都是新值(newValue) <---- 面试细节
        //      换句话说vue3的watch获取不到oldValue，有人说故意那么设计，我认为是bug,目前为止,无法解决。
        // 坑2: deep属性,在监听一个响应式对象时,默认开启，关不掉 <----面试细节
        //      换句话说watch()函数的第一个参数如果写一个对象的话,对象里的值变化,就会执行。也不告诉你是那个值变了,反正是变了。⬇️下面有解决办法⬇️
        let work = reactive({
            company:'阿里巴巴',
            salary:'30k'
        })
        watch(work,(newValue,oldValue)=>{
            console.log('work变了,具体是company变了还是salary变了,不知道')
        })

        // 情况四: 监听reactive定义的数据中的某一个属性 解决情况三的坑2
        //        如果上面三种情况都明白了,脑子里会蹦出一个写法 watch(obj.xxx,(newValue,oldValue)=>{})不就行了 ❌️❌️❌️
        //        ✅正确写法: watch(()=>obj.xxx,(newValue,oldValue)=>{})
        //        如果想监听 响应式对象中的某个属性,要写成一个函数返回值的形式去进行监听 可以用箭头函数 ()=> obj.xxx 来简写 <---- 面试细节
        //        原理是: 把对象里需要监听的属性封装成函数的返回值,可以当做一个变量的存储了返回值,所以真正监听的其实是一个新的存储了返回值的变量(浅拷贝) <---- 面试细节
        //        ⬆️虽然我知道原理是什么,但是我不知道祖师爷为什么这么设计,后续感兴趣可以深入研究 ⬆️
        let work2 = reactive({
            company:'腾讯',
            salary:'40k'
        })
        watch(()=>work2.company,(newValue,oldValue)=>{
            console.log('work2里的company变了')
        })
        // 多个的话,结合情况二,可以这么写
        watch([()=>work2.company,()=>work2.salary],(newValue,oldValue)=>{
            console.log('work2里的company或salary变了')
        })

        //特殊情况: 想监听对象里的对象 怎么办
        //        如果结合情况四  watch(()=>obj.obj,(newValue,oldValue)=>{}) ❌️❌️❌️
        //        ✅正确写法: watch(()=>obj.obj,(newValue,oldValue)=>{},{deep:true})
        //        为什么呢❓❓❓
        //        我理解的是：当用reactive()定义了一个相应对象时,其实就是用proxy去做了一个监听。
        //                  但是对象里的属性,没有被proxy监听,所以要开启deep深度监听。(应该是对的,如果发现理解的不对,帮我改正)
        let work3 = reactive({
            company:'恒大歌舞团',
            salary:'100k',
            jop:{
                jop1:'圈钱',
                jop2:'跑路'
            }
        })
        watch(()=>work2.company,(newValue,oldValue)=>{
            console.log('work3里的jop属性变了')
        },{deep:true})
    },


}
</script>

<style scoped>

</style>