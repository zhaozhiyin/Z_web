const routers = [
    {
        //系统路由(404)
        route: 'error',
        children: [{
            route: '404', url: 'error/404.html'
        }]
    }, {
        //main
        route: 'main',
        children: [{
            route: 'index', url: 'main/index.html'
        }]
    }
]

export default routers