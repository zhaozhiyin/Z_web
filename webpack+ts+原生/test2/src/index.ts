import './assets/css/common/Common.css?t=20200903'
require('@/router/index')
import axios from './utils/axios'
window.axios = axios


// 最根本的原理很简单，无非是基于发布订阅的消息通知模式，消息发出方来自mvvm中modal层的变法，而订阅方来自view层。
// modal层的变化，是通过对data设置setter来实现响应式，只要数据发生变化，通知所有订阅者。
// view层的订阅，则是在compile阶段，compile会对所有数据依赖进行收集，然后在getter中注册监听。


// class Vue {
//     methods
//     target
//     constructor(options) {
//         const {el, data, methods} = options
//         this.methods = methods
//         this.target = null
//         this.observe(this, data)
//         this.compile(document.getElementById(el))
//     }

//     // 实现一个数据劫持 - Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
//     observe(root, data) {
//         for(const key in data) {
//             this.defineReactive(root, key, data[key])
//         }
//     }

//     defineReactive(root, key, value) {
//         if(typeof value == 'object') {
//             return this.observe(value, value)
//         }
//         const dep = new Dispather()
//         Object.defineProperty(root, key, {
//             set(newValue) {
//                 if(value == newValue) return;
//                 value = newValue
//                 //发布
//                 dep.notify(newValue)
//             },
//             get() {
//                 //订阅
//                 dep.add(this.target)
//                 return value
//             }
//         })
//     }

//     // 实现一个模板编译 - Compiler，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
//     compile(dom) {
//         const nodes = dom.childNodes
//         for(const node of nodes) {
//             // 元素节点
//             if (node.nodeType == 1) {
//                 const attrs = node.attributs
//                 for(const attr of attrs) {
//                     if(attr.name == 'v-model') {
//                         const name = attr.value
//                         node.addEventListener('input', e=>{
//                             this[name] = e.target.value
//                         })
//                         this.target = new Watcher(node, 'input')
//                         this[name]
//                     }
//                     if(attr.name == '@click') {
//                         const name = attr.value
//                         node.addEventListener('click', this.methods[name].bind(this))
//                     }
//                 }
//             }
//             //text
//             if(node.nodeType == 3) {
//                 const reg = /\{\{(.*)\}\}/
//                 const match = node.nodeValue.match(reg)
//                 if(match) {
//                     const name = match[1].trim()
//                     this.target = new Watcher(node, 'text')
//                     this[name]
//                 }
//             }
//         }
//     }
// }

// class Dispather {
//     watchers
//     constructor () {
//         this.watchers = []
//     }
//     add(watcher) {
//         this.watchers.push(watcher)
//     }
//     notify(value) {
//         this.watchers.forEach(watcher => {
//             watcher.update(value)
//         });
//     }
// }

// // 实现一个 - Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
// class Watcher {
//     node
//     type
//     constructor(node, type) {
//         this.node= node
//         this.type = type
//     }
//     update(value) {
//         if(this.type == 'input') {
//             this.node.value = value
//         }
//         if(this.type == 'text') {
//             this.node.nodeValue = value
//         }
//     }
// }

if (module.hot) {
    module.hot.accept();
}