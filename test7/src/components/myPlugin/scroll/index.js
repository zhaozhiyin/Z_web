import scroll from './src/scroll.vue'

scroll.install = function(Vue) {
    Vue.component(scroll.name,scroll)
}

export default scroll