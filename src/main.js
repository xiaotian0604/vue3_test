import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import watchEffect_test from './views/watchEffect_test.vue'

console.log(App,"<=======")
const app = createApp(watchEffect_test)
app.mount('#app')
// setTimeout(()=>{
//     app.unmount('#app')
// },3000)

//import App from './App.vue' < - 引入入口文件
//createApp(App) < - 创建App实例
//.mount('xxx') < - 挂载到DOM