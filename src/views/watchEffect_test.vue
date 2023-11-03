<template>
    <h2>示例来解释 watchEffect() </h2>
    <h2>以及 watchEffect()、watchSyncEffect() 和 watchPostEffect() 的区别</h2>
    <button type="button" @click="modify">商品数量增加</button>
    <div class="">{{result}}</div>
    <div>
        <button @click="increment">Increment</button>
        <p>Count: {{ count }}</p>
    </div>
</template>

<script>
import {ref, watchEffect, watchSyncEffect, watchPostEffect, reactive, watch} from 'vue';
export default {
    name: "watchEffect_test",
    setup() {
        // ================================================================
        //        除了watch() vue3还提供了一个挺牛逼的函数 watchEffect()
        // ================================================================

        // ================================================================
        //             ⬇️ 语法和watch()差不多,但还是有区别 如下: ⬇️
        // ================================================================

        let name = ref('刘小天')
        watchEffect(()=>{
          // 发没发现一个问题 watchEffect()函数 第一个参数 没传值❓❓❓
          // 因为 watchEffect() 函数不用传值,也就是说不用告诉它你要监视谁,它会自动捕获再函数内用到的变量值
          // 也就是在你传给他的那个函数里用了那些变量,他就会自动监听
          // 比如:
            console.log(`大家好,我叫${name.value}`)// <---- 此时用到了变量值 name watchEffect()函数回自动对name监听
          // 此时如果在其他地方把 name 的值修改了 则会执行当前callback回调函数
        },{})
        //  ⬆️⬆️注意第二个参数我写了个 空对象 后面会说对象里可以写什么⬆️⬆️
        name.value = '刘大天'

        // ================================================================
        //  ⬆️此时name的值被修改了,则会被watchEffect()函数监听到,从而执行内部逻辑⬆️
        // ================================================================

        //  扩展一下思维 watchEffect() 函数的使用场景有哪些❓
        //  当我们处理价格计算需求的时候(包括但不限于),是不是可以用到 watchEffect()

        // ================================================================
        //          举个例子: 实现一个简单的价格计算 要自己敲一遍
        // ================================================================
            let commodity = reactive([{
                productName:'苹果15ProMax',
                price:9999,
                commodityId:1,
                num:0,
            }])
            let totalPrice = ref(0)
            let totalNum = ref(0)
            let result = ref('')
            const resultCallBack = () => {
                let commodityNum = 0
                let commodityPrice = 0
                commodity.forEach((item,index)=>{
                    commodityNum += item.num
                    commodityPrice += item.num * item.price
                    totalNum.value = commodityNum
                    totalPrice.value = commodityPrice
                })
                result.value = `您一共购买了${totalNum.value}间商品,总价格为${totalPrice.value}`
            }
            // 当我调用 modify() 更改commodity里的值时,watchEffect就会监听到
            const modify = () => commodity[0].num++
            watchEffect(resultCallBack)
        // ================================================================
        // 从这个例子可以看出来 watchEffect() 其实和 competed() 有点像
        // competed() 注重执行结果 也就是他必须有 return 值  <---- 面试细节
        // watchEffect() 注重执行过程 也就是最好把它用作为操作性函数 <---- 面试细节
        // ================================================================

        // ================================================================
        //              💡下面是关于 watchEffect() 函数的扩展 💡
        // ================================================================
        const callBack = () => console.log('这是一个回调函数')
        // 扩展一：watchEffect() 不单单可以传 callBack 参数,还有第二个参数: options(配置项) 以对象的形式传入

        // 第二个参数{}可以传值如下:
        // 1. **flush**：这个选项用于控制何时执行 `watchEffect` 的函数。它可以取以下值：
        //     - `"pre"`（默认值）：在组件更新之前执行。
        //     - `"post"`：在组件更新之后执行。
        watchEffect(callBack,{flush:"pre"}) // <---页面刷新DOM之前执行
        watchEffect(callBack,{flush:"post"}) // <---页面刷新DOM之后执行

        // 2. **lazy**：默认为false。如果将其设置为true,watchEffect()的函数不会立即执行，而只有在依赖项首次访问时才会执行。
        // 这里更像是 watch() 函数中 options 对象里的 immediate,但是lazy的值与immediate的值是反的
        watchEffect(callBack,{lazy:true}) // <---页面加载完成之后不会执行
        watchEffect(callBack,{flush:false}) // <---页面加载完成之后会立即执行一次

        // ⚠️⚠️重点⚠️⚠️
        // 3. **onTrack** 和 **onTrigger**：这两个选项分别接受一个函数，用于在依赖被追踪或触发时执行自定义逻辑。这可用于调试或记录依赖的行为。
        // 当对象中的某一个值被修改时,不只会触发你所传入的callback事件,还会执行onTrack()||onTrigger()的某一个(如果写了这两个方法的情况下)
        // 把上面扩展思维所调用的 watchEffect(resultCallBack) 拿过来 <--- 67行
        watchEffect(resultCallBack,{
             onTrack(event) {
                //  Track 追踪
                //  onTrack()被触发,证明 callBack 事件中所用到的响应式数据被访问了,个人认为类似 get() <---- 面试细节
                //  可以自行打印 event 查看里面包含了什么
                console.log('Dependency tracked:', event);
             },
             onTrigger(event) {
                 //  onTrigger 会在 callBack 事件中所用到的响应式数据 "被设置" 时触发 <---- 面试细节
                 //  比如 callBack 里面用到name属性了,按理来说name属性已经被watchEffect()函数监听了 <---- 面试细节
                 //  但是注意: console.log(name.value) 并不会触发 onTrigger() 而是会触发 onTrack() ⬆️ <---- 面试细节
                 //  只有在 name.value = '刘小天' 或者删除 name 的时候 才会触发 onTrigger() <---- 面试细节

                 console.log('Dependency triggered:', event);
                 // ================================================================
                 //                     log(event) 结果为 ⬇️⬇️⬇️
                 // ================================================================
                 // effect: ReactiveEffect {fn: function, scheduler: function, active: true, deps: Array, parent: undefined, …}
                 // key: "num"
                 // newValue: 2
                 // oldTarget: undefined
                 // oldValue: 1
                 // target: {productName: "苹果15ProMax", price: 9999, commodityId: 1, num: 2}
                 // type: "set"
                 // ============================================================================================================
                 // 个人认为有用的值: key:'谁变化了' type:'怎么变的' oldValue:'原来的值是什么' newValue:'新的值是什么' target:'变化的值属于谁' <---- 面试细节
                 // ============================================================================================================
             },
        })

        // 扩展二: watchPostEffect()` 和 `watchSyncEffect()`
        // ========================================================================
        //                这三种函数的区别主要在于它们的执行时机和同步性质：
        // ========================================================================
        // - `watchEffect`是异步执行的，捕获依赖并在下一个微任务中执行。
        // - `watchSyncEffect`是立即同步执行的，不等待微任务队列。
        // - `watchPostEffect`是在 Vue 生命周期的 "post" 阶段执行,确保在 DOM 更新后执行。
        // ========================================================================
        //                      看上面解释看定有点懵 写个方法试试
        // ========================================================================
        const count = ref(0);
        const increment = () => count.value++;
        // 使用 watchEffect
        watchEffect(() => {
            // 当你点击 "Increment" 按钮时，watchEffect 立即执行，但是它会在下一个微任务队列中执行。
            console.log('watchEffect:', count.value);
            // 在控制台里面，你会看到 "watchEffect" 的输出会稍微滞后于 DOM 更新。
        });
        // 使用 watchSyncEffect
        watchSyncEffect(() => {
            console.log('watchSyncEffect:', count.value);
        });
        // 使用 watchPostEffect
        watchPostEffect(() => {
            console.log('watchPostEffect:', count.value);
        });
        // ========================================================================
        //                                了解即可
        // ========================================================================

        return {
            count,
            increment,
            modify,
            result
        };

        // ==============================================================================================================================
        // 💡个人总结:
        //  1.watchEffect() 一定要会,他比watch()功能更强大,而且通过扩展options对象中的onTrack()&&onTrigger() 解决了 watch() 在监听响应式对象时的不足
        //  2.watchEffect() 配置项 options 也就是第二个参数(那个对象),各种传值要整明白分别是干嘛的,面试吹牛逼的时候可以扯一扯
        //  3.watchPostEffect()` 和 `watchSyncEffect()` 作为了解,问的时候知道干嘛的就行了,估计用得很少。todo 懒得看了,后面有时间补上原理
        // ==============================================================================================================================

    },

}
</script>

<style scoped>

</style>