<template>
    <div>
        <div>搜索</div>
        <div class='input_con'>
            <i class="icon-sousuo iconfont"></i>
            <input type="text" :placeholder='placeholder' v-model.trim='value' confirm-type='搜索' @input="inputmsg" @keyup="code">
            <i class="icon-sousuo iconfont" @click="close"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {
        placeholder: {
            type: String,
            default: '请输入问题'
        },
        curValue: {
            type: String
        }
    },
    data(){
        return {
            cotent: '',
            value: this.curValue
        }
    },
    methods:{
        close() {
            this.$emit('inputClear','')
        },
        inputmsg (e) {
            this.$emit('getMsg',this.value)
        },
        code (e) {
            if(e.keyCode==13) {
                this.value = ''
                this.$emit('search')
            }
        }
    },
    watch: {
        curValue:function(newd,old){
            this.value = this.curValue
        }
    }
}
</script>
<style scoped>
    @import '//at.alicdn.com/t/font_1825653_cifqp7hgwot.css';
    * {
        padding: 0; margin: 0;
    }
    .input_con {
        position: relative;
        width: 90%; height: 40px;
        border: 1px solid #efefef;
        border-radius: 4px;
    }
    .input_con i:nth-of-type(1) {
        position: absolute;
        top: 0; bottom: 0; left: 10px;
        margin: auto;
        width: 20px; height: 20px;
    }
    .input_con i:nth-of-type(2) {
        position: absolute;
        top: 0; bottom: 0; right: 0;
        padding: 10px; margin: auto;
        width: 20px; height: 20px;
    }
    .input_con input { 
        margin-left: 40px;
        height: 100%; width: calc(100% - 80px);
        background:none; outline:none; border:none;
        font-size: 16px;
    }
    input:focus {
        border: none;
    }
    input::-webkit-input-placeholder{
        color:#999;
    }
</style>