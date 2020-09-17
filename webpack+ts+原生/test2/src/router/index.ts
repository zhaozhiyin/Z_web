import routers from './staticRoute'

class Router {
    routes: any[]= []
    /**
        添加路由
        @param {Object}param 配置
        @return
    */
   constructor(routers: any[]) {
        routers.map((param: { children: string | any[]; type: any; route: string; url: any; })=>{
            if (typeof(param.children) === 'object' && param.children.length > 0) {
                for (var i=0; i<param.children.length; i++) {
                    this.routes.push({
                        type: param.type,
                        route: param.route+'/'+param.children[i].route,
                        path: param.children[i].url
                    });
                }
            } else {
                this.routes.push({
                    type: param.type,
                    route: param.route,
                    path: param.url
                });
            }
        })
    }
    /**
        路由初始化
        @param
        @return
    */
    init() {
        window.addEventListener('load', this.load.bind(this));
        window.addEventListener('hashchange', this.hashchange.bind(this));
    }
    /**
        页面加载
        @param
        @return
    */
    load() {
        var obj = this.getRoute(this.getCurrRoute());
        if (obj.path == '') {
            this.jump('error/404');
            return;
        } else {
            if (obj.type === 'chain') {
                $('#app').children('iframe').remove();
                this.createIframe(this.getPath(obj)+'?t=20200904', '', this.getCurrRoute());
            } else {
                $('#app').load(this.getPath(obj)+'?t=20200904')
            }
        }
    }
    /**
        创建iframe
        @param {String}src 路径
        @param {String}from 原路由
        @param {String}to 新路由
        @return
    */
    createIframe(src: string, from: string, to: string) {
        var $iframe = $('<iframe></iframe>').attr({
            src: src,
            from: from,
            to: to
        });
        $('#app').append($iframe);
    }
    /**
        获取链接
        @param {Object}obj 路由
        @return {String} 链接
    */
    getPath(obj: { path: string; }) {
        return '/app/' + obj.path;
    }
    /**
        跳转连接
        @param {String}route 路由
        @param {String}param 参数
        @return
    */
    jump(route: string, param?:string) {
        var obj = this.getRoute(route);
        if (obj.path == '') {
            this.jump('error/404')
            return;
        } else {
            this.createIframe(this.getPath(obj)+'?t=20200904', this.getCurrRoute(), route);
            var url = window.location.origin + '/#/' + route;
            if (!CommonUtils.isEmpty(param)) {
                url += param;
            }
            window.location.href = url;
        }
    }
    /**
        hash路由变化
        @param
        @return
    */
    hashchange() {
        var obj = this.getRoute(this.getCurrRoute());
        if (obj.type === 'chain') {
            var $lastIframe = $('#app').children('iframe:last-child');
            if (this.getCurrRoute() === $lastIframe.attr('to')) { //jump跳转
                //1.隐藏所有iframe 2.显示lastIframe
                $('#app').children('iframe').hide();
                $lastIframe.show();
            } else if (this.getCurrRoute() === $lastIframe.attr('from')) { //浏览器回退
                //1.隐藏所有iframe 2.删除lastIframe 3.显示倒数第二个iframe
                $('#app').children('iframe').hide();
                $lastIframe.remove();
                $('#app').children('iframe:last-child').show();
            } else { //浏览器前进
                //1.隐藏所有iframe 2.新建iframe
                $('#app').children('iframe').hide();
                this.createIframe(this.getPath(obj)+'?t=20200904', $lastIframe.attr('to'), this.getCurrRoute());
            }
        } else {
            $('#app').load(this.getPath(obj)+'?t=20200904');
        }
    }
    /**
        获取当前路由
        @param
        @return {String} 当前路由
    */
    getCurrRoute() {
        var h = window.location.hash.substr(1);
        var i = h.indexOf('?')<0 ? h.length : h.indexOf('?');
        return h.substring(1, i);
    }
    /**
        获取路由对象
        @param {String}route 路由
        @return {Object} 路由对象
    */
    getRoute(route: string) {
        for (var i=0; i<this.routes.length; i++) {
            if (route == this.routes[i].route) {
                return this.routes[i];
            }
        }
        return {
            route: '',
            path: ''
        };
    }
    /**
        获取参数链接
        @param
        @return {String} 参数集
    */
    getSearch() {
        var h = window.location.hash.substr(1);
        var i = h.indexOf('?')<0 ? h.length : h.indexOf('?');
        return h.substr(i+1);
    }
    /**
        获取链接参数
        @param {String}param 参数名
        @return {String} 参数值
    */
    getParameter(param: string) {
        var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)', 'i');
        var r = this.getSearch().match(reg);
        if (r != null) {
            return r[2];
        } else {
            return '';
        }
    }
}

//全局挂载Router
window.Router = new Router(routers);
window.Router.init();