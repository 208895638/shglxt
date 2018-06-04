<template>
    <div class="main">
        <el-row class="header">
            <el-col :span="10" :offset="2" class="logos">
                <router-link to="/" class="logo"><img src="../assets/images/logo1.png" alt=""></router-link>
            </el-col>
            <el-col :span="10" class="register">
                <router-link to="/login"><el-button>登录</el-button></router-link>
            </el-col>
        </el-row>
        <el-row class="mainContent">
            <el-row type="flex" justify="center" >
                <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16" class="mainContents">
                    <el-row type="flex" justify="center">
                        <el-col class="fieldse" :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                            <span>
                                火捷云服务用户注册
                            </span>
                            <em></em>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col class="tip" :xs="20" :sm="20" :md="14" :lg="10" :xl="10" >
                            <p>温馨提示:下方带*都是必填项,您必须同意协议才能注册</p>
                        </el-col>
                    </el-row>
                    <el-row  type="flex" justify="center">
                        <el-col  :xs="20" :sm="20" :md="14" :lg="10" :xl="10" >
                            <el-form ref="register" :model="register" status-icon :rules="rules" label-width="90px" class="postForm">
                                <el-form-item label="登录账号" prop="userName">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.userName" placeholder="使用手机号作为登录名"></el-input>
                                </el-form-item>
                                <el-form-item label="登录密码" prop="loginPass">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.loginPass" placeholder="设置6位以上字母加数字组合密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="confirmPass">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.confirmPass" placeholder="确认密码"></el-input>
                                </el-form-item>
                                <el-form-item label="真实姓名" prop="realName">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.realName" placeholder="请输入真实姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号码" prop="idCard">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.idCard" placeholder="请输入身份证号码"></el-input>
                                </el-form-item>
                                <el-form-item label="联系QQ" prop="QQ">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.QQ" placeholder="请输入联系QQ"></el-input>
                                </el-form-item>
                                <el-form-item label="联系地址" prop="address">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.address" placeholder="请输入联系地址"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝姓名" prop="ZFBName">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.ZFBName" placeholder="请输入支付宝姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝账号" prop="ZFBAccount">
                                    <span >
                                        *
                                    </span>
                                    <el-input v-model.trim="register.ZFBAccount" placeholder="请输入支付宝账号"></el-input>
                                </el-form-item>
                                <div class=" demo-form-inline clearfix">
                                    <el-form-item label="验证码" class="l">
                                        <span class="l">
                                            *
                                        </span>
                                        
                                    </el-form-item>
                                    <el-form-item label=""  prop="yzmcode">
                                        <img :src="imgSrc" alt="" @click="changeImgSrc" class="l cu">
                                        <el-input v-model.trim="register.yzmcode" placeholder="请输入验证码" class="r yzm"></el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item label="上级ID">
                                    <el-input v-model.trim="register.SuperiorID" placeholder="请输入上级ID"></el-input>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-checkbox  v-model="checked"><a href="https://www.baidu.com/" style="color:blue;">同意并遵守火捷云服务商户服务协议</a></el-checkbox>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-button type="primary" @click="submitForm('register')" id="postData" :disabled="!checked">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            
        </el-row>
    </div>
  
</template>

<script>
import axios from 'axios'
import qs from "qs"
import reg from "@/js/reg.js"
var password = ''
export default {
  name: "HelloWorld",
  data() {
    var checkAccount = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('账户不能为空!'));
        }else if(!reg.testAccount(value)){
            return callback(new Error('账户格式不正确,只能输入手机号!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var validatePass = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('密码不能为空!'));
        }else if(!reg.testPassword(value)){
            return callback(new Error('密码格式不正确!'));
        }else{
            password = value;
            setTimeout(() => {
                callback();
        }, 1000);
        }
    };
    var confirmPass = (rule, value, callback) => {
        console.log(this.register.loginPass)
        if (value.length == 0) {
            return callback(new Error('密码不能为空!'));
        }else if(!reg.testPassword(value)){
            return callback(new Error('密码格式不正确!'));
        }else if(value != this.register.loginPass){
            return callback(new Error('输入密码跟确认密码不一致!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var realName = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('姓名不能为空!'));
        }else if(!reg.testName(value)){
            return callback(new Error('姓名格式不正确,姓名为2-4位汉字!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var idCard = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('身份证号码不能为空!'));
        }else if(!reg.testIdCard(value)){
            return callback(new Error('身份证号码格式不正确,长度为18位!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var QQ = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('QQ号码格不能为空!'));
        }else if(!reg.testQQ(value)){
            return callback(new Error('QQ号码格式不正确,长度为4-11位!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var address = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('联系地址不能为空!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var ZFBName = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('支付宝姓名不能为空!'));
        }else if(!reg.testName(value)){
            return callback(new Error('支付宝姓名格式不正确,长度为2-4位汉字!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var ZFBAccount = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('支付宝账号不能为空!'));
        }else if(!reg.testZFBAccount(value)){
            return callback(new Error('支付宝账号格式不正确,格式为手机号或邮箱!'));
        }else{
            setTimeout(() => {
                callback();
            }, 1000);
        }
    };
    var yzmcode = (rule, value, callback) => {
        if (value.length == 0) {
            return callback(new Error('验证码不能为空!'));
        } else {
          callback();
        }
    };
    return {
        register:{
            userName:"",
            loginPass:"",
            confirmPass:"",
            realName:"",
            idCard:"",
            QQ:"",
            address:"",
            ZFBName:"",
            ZFBAccount:"",
            yzmcode:"",
            SuperiorID:"",
        },
        checked:false,
        imgSrc:'121',
        rules: {
            userName: [
                { validator: checkAccount, trigger: 'blur' }
            ],
            loginPass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            confirmPass:[
                { validator: confirmPass, trigger: 'blur' }
            ],
            realName:[
                { validator: realName, trigger: 'blur' }
            ],
            idCard:[
                { validator: idCard, trigger: 'blur' }
            ],
            QQ:[
                { validator: QQ, trigger: 'blur' }
            ],
            address:[
                { validator: address, trigger: 'blur' }
            ],
            ZFBName: [
                { validator: ZFBName, trigger: 'blur' }
            ],
            ZFBAccount:[
                { validator: ZFBAccount, trigger: 'blur' }
            ],
            yzmcode:[
                { validator: yzmcode, trigger: 'blur' }
            ]
        }
    };
  },
  methods: {
        changeImgSrc(){
            let _this = this;
            axios.post('/msg/CKCode.ashx?'+Math.random, {})
            .then(function (response) {
                _this.imgSrc = response.data;
            })
            .catch(function (response) {
            });
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let data = {
                    m: "reg",
                    loginname: this.register.userName,
                    password: this.register.loginPass,
                    mName: this.register.realName,
                    sfz: this.register.idCard,
                    addr: this.register.address,
                    qq: this.register.QQ,
                    paid: this.register.SuperiorID,
                    aliaccount: this.register.ZFBAccount,
                    aliname:this.register.ZFBName,
                    ckcode: this.register.yzmcode
                };
                axios.post('/msg/api/mapi.aspx', qs.stringify(data))
                .then(function (response) {
                    const res = response.data;
                    console.log(res);
                    if(res.Code == 1){
                        _this.$message({
                            message: '注册成功!',
                            type: 'success'
                        });
                    }else{
                        _this.$message.error(res.Msg);
                        _this.changeImgSrc()
                    }
                })
                .catch(function (response) {
                    console.log(response);
                    
                });
            } else {
                return false;
            }
        });
    },
    agreement(val){
        console.log(val)
        if(!val){

        }
    }
  },
  beforeMount(){
      let _this = this;
      axios.post('/msg/CKCode.ashx', {})
        .then(function (response) {
            _this.imgSrc = response.data;
        })
        .catch(function (response) {
        });
    }
};
</script>
<style scoped lang="scss">
.main{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 80px;
    .header{
        background: #fff;
        padding: 20px 0 10px 0;
        img{
            vertical-align: middle;
            height: 34px;
        }
    }
    .register{
        text-align: right;
    }
    .mainContents{
        margin-top: 10px;
        background: #fff;
        padding-top: 40px;
        .fieldse{
            position: relative;
            padding: 20px 0;
            text-align: center;
            span{
                position: relative;
                z-index: 2;
                padding:0 10px ;
                background:#fff;
                font-weight: bold;
                font-size: 20px;
            }
            em{
                display: block;
                position: absolute;
                width: 100%;
                height: 1px;
                background: #ccc;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                z-index: 1;
            }
        }
        .postForm{
            span{
                margin-left: -10px;
                color: red;
            }
            .el-input{
                width: 98%;
                margin-left: 2%;
                vertical-align: top;
            }
            .yzm{
                position: absolute;
                right: 0;
                top: -1px;
                width: 42%;
                .el-input__inner{
                    width: auto;
                    float: right;
                }
            }
            .demo-form-inline{
                margin-bottom: 20px;
                .el-form-item{
                    margin-bottom: 0;
                }
            }
            img{
                width: 114px;
                height: 40px;
                margin-left: 2%;
            }
            #postData{
                width: 100%;
            }
        }
    }
}
.tip{
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    p{
        padding: 15px 0;
        color: red;
    }
}

</style>
