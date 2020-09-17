console.log(window.axios)
console.log(111)
window.axios.post('https://api-rih.ltjk.info/v1/goods/banner',{

}).then((Response)=>{
    console.log(Response)
}).catch((err)=>{
    console.log(err)
})