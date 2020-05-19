import search from './src/search.vue'

search.install = function(Vue) {
    Vue.component(search.name, search)
}

export default search