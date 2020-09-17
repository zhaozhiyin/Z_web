const axios = require('axios')
import '../../static/utils/md5.js'


//设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    config=> {
        console.log(config)
        if(config.method === 'post') {
            if(config.data instanceof Object) {
                config.data = JSON.stringify(attestation(config.data))
            } else {
                config.data = JSON.stringify(attestation(JSON.parse(config.data)))
            }
        }
        config.headers['REQUESTAPP'] = 1
        config.headers['REQUESTCLIENT'] = CommonUtils.getRequestClient()
        return config
    },
    error=> {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if(response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if(error.response) {
            switch (error.response.status) {
                case 404: 
                    console.log('网络请求不存在')
                    break
                case 400:
                    console.log('服务器繁忙')
                    break
                default:
                    console.log('其他')
            }
        }
    }
    
)
/**
 验签方法
 @param {Object}postData  验签
 @return
 */
function attestation(postData) {
    var timestamp = getTimestamp();
    var nonce = getNonce();
    postData.timestamp = timestamp;
    postData.nonce = nonce;
    var sort_ascii = sort_ASCII(postData);
    var objGet = objArgs(sort_ascii);
    var strMd5 = md5(objGet);
    var sign = strMd5.toUpperCase();
    postData.sign = sign;
    return postData;
}




/**
 链接后拼时间戳
 @param {String} url 请求的链接
 @return {String} 拼完时间戳的链接
 */
function urlAddTimestamp(url) {
    if(url.indexOf('?') === -1){
        return url + '?tStamp=' + new Date().getTime()
    }else{
        return url + '&tStamp=' + new Date().getTime()
    }
}


/**
 获取当前毫秒时间戳
 @param
 @return
 */
function getTimestamp() {
    var timestamp = new Date().getTime();
    return timestamp;
}

/**
 获取32位随机字符串
 @param
 @return
 */
function getNonce () {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var nums = "";
    for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61+'');
        nums += chars[id];
    }
    return nums;
}

/**
 Js对象按ASCII码排序
 @param {Object}obj Js对象参数
 @return
 */
function sort_ASCII(obj) {
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++;
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
}

/**
 post请求转换成get请求
 @param {Object}obj 参数
 @return
 */
function objArgs(obj) {
    var url = '';
    for (var name in obj) {
        url += name + '=' + obj[name] + '&'; // 转码并进行赋值
    }
    url += "secret=BCy94HkqITdAJDCPhw9Sjd6TwLoV8igR";
    return url; // 返回
}

export default axios