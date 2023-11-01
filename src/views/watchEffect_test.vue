<template>
    <h2>示例来解释 watchEffect()、watchSyncEffect() 和 watchPostEffect() 的区别</h2>
    <div>
        <button @click="increment">Increment</button>
        <p>Count: {{ count }}</p>
    </div>
</template>

<script>
import { ref, watchEffect, watchSyncEffect, watchPostEffect } from 'vue';
export default {
    name: "watchEffect_test",
    setup() {
    // 除了watch() vue3还提供了一个挺牛逼的函数 watchEffect()
    // 语法和watch()差不多,但还是有区别 如下:
        watchEffect(()=>{
          // 发没发现一个问题 watchEffect()函数 第一个参数 没传值！！？
          // watchEffect()函数不用传值,也就是说不用告诉它你要监视谁 那咋整

        },{})//注意第二个参数我写了个空对象 后面会说对象里可以写什么
    // 在 Vue 3 中，`watchPostEffect()`, `watchEffect()`, 和 `watchSyncEffect()` 是用于监视响应式数据变化并执行副作用的函数，它们的主要区别在于执行时机和响应方式。
    // 这三种函数的区别主要在于它们的执行时机和同步性质：
    // - `watchEffect` 是异步执行的，捕获依赖并在下一个微任务中执行。
    // - `watchSyncEffect` 是立即同步执行的，不等待微任务队列。
    // - `watchPostEffect` 是在 Vue 生命周期的 "post" 阶段执行，确保在 DOM 更新后执行。
    // 看上面解释看定有点懵 写个方法试试

        const count = ref(0);

        // 使用 watchEffect
        watchEffect(() => {
            console.log('watchEffect:', count.value);
            // 当你点击 "Increment" 按钮时，watchEffect 立即执行，但是它会在下一个微任务队列中执行。
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

        const increment = () => {
            count.value++;
        };

        return {
            count,
            increment,
        };
//         watchEffect():
//         当你点击 "Increment" 按钮时，watchEffect 立即执行，但是它会在下一个微任务队列中执行。
// 在控制台中，你会看到 "watchEffect" 的输出会稍微滞后于 DOM 更新。
// watchSyncEffect():
//         与 watchEffect 不同，watchSyncEffect 会立即执行，而不等待微任务队列。
// 因此，当你点击 "Increment" 按钮时，"watchSyncEffect" 的输出会立即显示在控制台，同时也会影响 DOM 更新。
// watchPostEffect():
//         watchPostEffect 会在 Vue 生命周期的 "post" 阶段执行。
// 因此，当你点击 "Increment" 按钮时，它不会立即执行，而会在下一个 Vue 生命周期更新周期的 "post" 阶段执行。这确保了它在 DOM 更新后执行。
//         在 Vue 3 的 `watchEffect` 中，第二个参数是一个选项对象，用于自定义监视行为。你可以传递一个包含选项的对象，以控制 `watchEffect` 的行为。以下是一些常见的选项：
//
//     1. **flush**：这个选项用于控制何时执行 `watchEffect` 的函数。它可以取以下值：
//
//    - `"pre"`（默认值）：在组件更新之前执行。
//    - `"post"`：在组件更新之后执行。
//
//    例如，你可以这样使用：
//
//    ```javascript
//    watchEffect(() => {
//      // ...
//    }, { flush: 'post' });
//    ```
//
//     2. **onTrack** 和 **onTrigger**：这两个选项分别接受一个函数，用于在依赖被追踪或触发时执行自定义逻辑。这可用于调试或记录依赖的行为。
//
//    ```javascript
//    watchEffect(() => {
//      // ...
//    }, {
//      onTrack(event) {
//        console.log('Dependency tracked:', event);
//      },
//      onTrigger(event) {
//        console.log('Dependency triggered:', event);
//      },
//    });
//    ```
//
//     3. **lazy**：这个选项是一个布尔值，默认为 `false`。如果将其设置为 `true`，`watchEffect` 的函数不会立即执行，而只有在依赖项首次访问时才会执行。
//
//    ```javascript
//    watchEffect(() => {
//      // 这里的代码不会立即执行
//    }, { lazy: true });
//    ```
//
//         这些选项使你能够更精细地控制 `watchEffect` 的行为，以满足特定需求。根据你的具体用例，你可以选择使用这些选项中的一个或多个来自定义 `watchEffect` 的行为。
    },

}
</script>

<style scoped>

</style>