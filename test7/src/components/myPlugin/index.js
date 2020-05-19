import search from './search/index.js'
import scrollLoading from './scroll/index.js'

const components = [
    search
]

const install = function(Vue, opts = {}) {
    components.forEach(components=>{
        Vue.component(components.name, components)
    })
}
if(typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install, 
    search,
    scrollLoading
}