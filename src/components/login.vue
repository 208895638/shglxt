<template>
    <div class="main">
        <el-row>
            <el-col :span="10" :offset="2" class="logos">
                <router-link to="/index" class="logo"><img src="../assets/images/logo1.png" alt=""></router-link>
            </el-col>
            <el-col :span="10" class="register">
                <router-link to="/register"><el-button>注册</el-button></router-link>
            </el-col>
        </el-row>
        <el-row class="mainContent">
            <div  class="registerMain">
                <el-card class="box-card">
                    <div slot="header" class="" style="text-align:center;">
                        <span>{{msg}}</span>
                    </div>
                    <div class="box-card1">
                        <el-form :label-position="labelPosition"  ref="formLabelAlign" :rules="rules" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="账户" prop="name">
                                <el-input v-model="formLabelAlign.name" placeholder="请输入登录账户"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="region">
                                <el-input v-model="formLabelAlign.region" placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" style="margin-bottom: 0px;">
                            </el-form-item>
                            <div class=" demo-form-inline clearfix">
                                <el-form-item label="" class="l">
                                    <img :src="imgSrc" alt="" @click="changeImgSrc">
                                </el-form-item>
                                <el-form-item label="" class="r" prop="type">
                                    <el-input v-model="formLabelAlign.type" placeholder="请输入验证码"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item>
                                <el-button class="login"  type="primary"  @click="submitForm('formLabelAlign')">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    
                </el-card>
            </div>
        </el-row>
    </div>
  
</template>

<script>
import axios from 'axios'
import qs from "qs"
export default {
  name: "HelloWorld",
  data() {
      var checkAccount = (rule, value, callback) => {
        if (!this.trim(value)) {
          return callback(new Error('账户不能为空!'));
        }else if(!this.testAccount(value)){
            return callback(new Error('账户格式不正确,只能输入手机号!'));
        }else{
            setTimeout(() => {
                callback();
        }, 1000);
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!this.trim(value)) {
          callback(new Error('请输入密码!'));
        }else if(!this.testPassword(value)){
            return callback(new Error('密码格式不正确!'));
        }else{
            setTimeout(() => {
                callback();
        }, 1000);
        }
      };
      var checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('验证码不能为空!'));
        } else {
          callback();
        }
      };
    return {
        msg: "欢迎登录商户管理系统",
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        imgSrc:'121',
        formInline: {
          user: '',
          region: ''
        },
        rules: {
            name: [
                { validator: checkAccount, trigger: 'blur' }
            ],
            region: [
                { validator: validatePass, trigger: 'blur' }
            ],
            type: [
                { validator: checkCode, trigger: 'blur' }
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
        trim(s){
            return s.replace(/(\s*$)/g, "");
        },
        testAccount: function (val) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            return myreg.test(val);
        },
        testPassword: function (val) {
            var myreg = /^(\w){6,20}$/;
            return myreg.test(val);
        },
        testIdCard: function (val) {
            var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return myreg.test(val);
        },
        testQQ: function (val) {
            var myreg = /^[1-9][0-9]{3,10}$/;
            return myreg.test(val);
        },
        testZFBAccount:function(val){
            var myreg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
            return myreg.test(val);
        },
        testName:function(val){
            var myreg = /^[\u4E00-\u9FA5]{2,4}$/;
            return myreg.test(val);
        },
        submitForm(formName) {
            let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
                m: "login",
                loginname: this.formLabelAlign.name,
                password: this.formLabelAlign.region,
                ckcode: this.formLabelAlign.type
            }
            axios.post('/msg/api/mapi.aspx', qs.stringify(data))
            .then(function (response) {
                const res = response.data;
                console.log(res);
                if(res.Code == 1){
                    _this.$message({
                        message: '登录成功!',
                        type: 'success'
                    });
                }else{
                    _this.$message.error(res.Msg);
                }
            })
            .catch(function (response) {
                console.log(response)
            });
          } else {
            return false;
          }
        });
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
.box-card1{
    padding: 0 50px;
}
.login{
    width: 100%;
    margin-top: 12px;
    background-color: #fea904;
    background-image: -webkit-gradient(linear,left top,right top,from(#fea904),to(#ff6f1e));
    background-image: linear-gradient(90deg,#fea904,#ff6f1e)
}
.main{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 80px;
    padding-top: 20px;
}
.mainContent{
    position: absolute;
    top: 20%;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
}
.logos{
    .logo{
        img{
            vertical-align: middle;
            height: 34px;
        }
    }
}
.register{
    text-align: right;
}
.registerMain{
        width: 464px;
        text-align: left;
        background-color: #fff;
        margin: 0 auto;
        z-index: 4;
}
.demo-form-inline{
    img{
        height: 40px;
        cursor: pointer;
        width: 114px;
    }
    .el-form-item{
        margin-right: 0;
    }
}
@media (max-width: 660px){
    .registerMain{
        margin-left: auto;
        width: 90%;
    }
    .mainContent{
        margin-top: 0%;
    }
    .box-card1{
        padding: 0;
    }
}
@media (max-width: 360px){
    .registerMain{
        margin-left: auto;
        width: 100%;
    }
    .demo-form-inline{
        .el-input {
            width: 149px;
        }
    }
}
</style>
