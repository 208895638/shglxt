<template>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的账户</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            商户编号
                        </span>
                        <em class="r">
                            {{shbh}}
                        </em>
                    </el-col>
                </el-col>
               
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            登录名
                        </span>
                        <em class="r">
                            {{dlm}}
                        </em>
                    </el-col>
                    <el-col :span="10" class="clearfix">
                        <el-button type="text" @click="dialogFormVisible = true" class="r">
                            修改密码
                        </el-button>
                        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                        <el-form :model="updatePassword" status-icon ref="updatePassword" :rules="rules2">
                            <el-form-item label="原密码" label-width="110" prop="oldPass">
                                <el-input type="password" placeholder="请输入原密码" v-model.trim="updatePassword.oldPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" label-width="110" prop = "newPass">
                                <el-input  type="password" placeholder="请输入新密码" v-model="updatePassword.newPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" label-width="110" prop ="confirmPass">
                                <el-input  type="password" placeholder="请确认新密码" v-model="updatePassword.confirmPass" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitForm('updatePassword')">确 定</el-button>
                        </div>
                        </el-dialog>
                        <!-- <span class="cu r text_blue">修改密码</span> -->
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            可用余额
                        </span>
                        <div class="r">
                            {{kyye}} 元(保证金: <b style="font-weight:bold;">{{ BZJBalance }}</b> 元)
                        </div>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            商户名称
                        </span>
                        <em class="r">
                            {{shmc}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            身份证号码
                        </span>
                        <em class="r">
                            {{sfzhm}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            联系地址
                        </span>
                        <em class="r">
                            {{lxdz}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            QQ号
                        </span>
                        <em class="r">
                            {{QQ}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            支付宝姓名
                        </span>
                        <em class="r">
                            {{zfbxm}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            支付宝账户
                        </span>
                        <em class="r">
                            {{zfbzh}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            状态
                        </span>
                        <em class="r" :class="zt?'success':'danger'">
                            {{zt?'开通':'禁止'}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            接口key
                        </span>
                        <em class="r">
                            {{jk}}
                        </em>
                    </el-col>
                    <el-col :span="10" class="clearfix">
                        <a class="cu r text_blue" href="/msg/doc/payapi.doc">开发文档下载</a>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            接口回调地址
                        </span>
                        <em class="r">
                            {{jkht}}
                        </em>
                    </el-col>
                    <el-col :span="10" class="clearfix">
                        <span class="cu r text_blue" @click="open3">修改</span>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            基础支付费率
                        </span>
                        <em class="r">
                            {{jczffl}}(最低手续费{{RaxMin}}元)
                        </em>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            散户支付费率
                        </span>
                        <em class="r">
                            {{shzffl}}(最低手续费{{SHRaxMin}}元)
                        </em>
                    </el-col>
                    <el-col :span="10" class="clearfix">
                        <!-- <span class="cu r text_blue" @click="updateSHFL">修改</span> -->
                        <el-button type="text" @click="updateSHFL = true" class="r">
                            修改
                        </el-button>
                        <el-dialog title="修改散户费率" :visible.sync="updateSHFL">
                        <el-form :model="shfl" status-icon ref="shfl" :rules="shflRules">
                            <el-form-item label="基础费率  (%)" label-width="110" prop="rax">
                                <el-input  v-model.trim="shfl.rax" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="每笔最低费用  (元)" label-width="110" prop="minRax">
                                <el-input  v-model.trim="shfl.minRax" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="updateSHFL = false">取 消</el-button>
                            <el-button type="primary" @click="updateFL('shfl')">确 定</el-button>
                        </div>
                        </el-dialog>
                    </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                 <el-col :span="20" class="borderBottom">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            散户支付地址
                        </span>
                        <em class="r">
                            {{shzfdz}}
                        </em>
                    </el-col>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from "qs"
import reg from "@/js/reg.js"
export default {
    data(){
        var oldPass = (rule, value, callback) => {
           if (value.length == 0) {
            return callback(new Error('密码不能为空!'));
            }else if(!reg.testPassword(value)){
                return callback(new Error('密码格式不正确,只能是字母加数字组合!'));
            }else{
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        };
        var newPass = (rule, value, callback) => {
           if (value.length == 0) {
            return callback(new Error('密码不能为空!'));
            }else if(!reg.testPassword(value)){
                return callback(new Error('密码格式不正确,只能是字母加数字组合!'));
            }else{
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        };
        var confirmPass = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('密码不能为空!'));
            }else if(!reg.testPassword(value)){
                return callback(new Error('密码格式不正确!'));
            }else if(value != this.updatePassword.newPass){
                return callback(new Error('输入密码跟确认密码不一致!'));
            }else{
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        };
        var rax = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('输入的数字不能为空!'));
            }else{
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        };
        var minRax = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('输入的数字不能为空!'));
            }else{
                setTimeout(() => {
                    callback();
                }, 1000);
            }
        };
        return {
            shbh:"",
            dlm:"",
            kyye:"",
            BZJBalance:"",
            shmc:"",
            sfzhm:"",
            lxdz:"",
            QQ:"",
            zfbxm:"",
            zfbzh:"",
            zt:0,
            jk:"",
            jkht:"",
            jczffl:"",
            shzffl:"",
            shzfdz:"",
            RaxMin:"",
            SHRaxMin:"",
            dialogFormVisible : false,
            updateSHFL:false,
            updatePassword:{
                oldPass:"",
                newPass:"",
                confirmPass:""
            },
            rules2: {
                oldPass: [
                    { validator: oldPass, trigger: 'blur' }
                ],
                newPass: [
                    { validator: newPass, trigger: 'blur' }
                ],
                confirmPass: [
                    { validator: confirmPass, trigger: 'blur' }
                ]
            },
            shfl:{
                rax:"",
                minRax:""
            },
            shflRules: {
                rax: [
                    { validator: rax, trigger: 'blur' }
                ],
                minRax: [
                    { validator: minRax, trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        m: "updatepassword",
                        oldp:_this.updatePassword.oldPass,
                        p:_this.updatePassword.newPass
                    };
                    axios.post('/msg/api/mapi.aspx', qs.stringify(data))
                    .then(function (response) {
                        const res = response.data;
                        console.log(res);
                        if(res.Code == 1){
                            _this.$message({
                                message: '修改成功!',
                                type: 'success'
                            });
                            _this.dialogFormVisible = false;
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
        open3() {
            let _this = this;
            console.log(111)
            this.$prompt('请输入URL格式的地址', '接口回调地址', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
                inputErrorMessage: 'url格式不正确!'
            })
            .then(({ value }) => {
                let data = {
                    m: "udreturnurl",
                    url: value
                }
                axios.post('/msg/api/mapi.aspx', qs.stringify(data))
                .then(function (response) {
                    const res = response.data;
                    console.log(res);
                    if(res.Code == 1){
                        _this.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        location.reload();
                    }else{
                        _this.$message.error(res.Msg);
                    }
                })
                .catch(function (response) {
                    _this.$message.error(res.Msg);
                });
            })
            .catch(() => {
                      
            });
        },
        updateFL(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        m:"updateshrax",
                        raxsh:_this.shfl.rax,
                        raxminsh:_this.shfl.minRax
                    }
                    axios.post('/msg/api/mapi.aspx', qs.stringify(data))
                    .then(function (response) {
                        const res = response.data;
                        console.log(res);
                        if(res.Code == 1){
                            _this.$message({
                                message: '修改成功!',
                                type: 'success'
                            });
                            _this.updateSHFL = false;
                            location.reload();
                        }else{
                            _this.$message.error(res.Msg);
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
    },
    created () {
        var loading;
            axios.interceptors.request.use(config => {
                 loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                
                return config;
            });

            axios.interceptors.response.use(config => {
                loading.close();
                return config
            });
        let _this = this;
        const data = {
            m: "getmerchantinfo"
        };
        axios.post('/msg/api/mapi.aspx', qs.stringify(data))
        .then(function (res) {
            let msg = res.data.data;
            if(res.data.Code == 1){
                _this.shbh = msg.MID;
                _this.dlm = msg.LoginName;
                _this.kyye = msg.KYBalance;
                _this.shmc = msg.MerchantName;
                _this.sfzhm = msg.SFZNO;
                _this.lxdz = msg.Address;
                _this.QQ = msg.QQ;
                _this.zfbxm = msg.AliName;
                _this.zfbzh = msg.AliAccount;
                _this.zt = msg.Status;
                _this.jk = msg.APIKey;
                _this.jkht = msg.NotifyURL;
                _this.jczffl = msg.Rax;
                _this.shzffl = msg.SHRax;
                _this.shzfdz = msg.SHURL;
                _this.BZJBalance = msg.BZJBalance;
                _this.RaxMin =  msg.RaxMin;
                _this.SHRaxMin =  msg.SHRaxMin
            }else{
                _this.$message.error(msg.Msg);
            }
        })
        .catch(function (res) {
            // console.log(this.$store.state);
        });
    }
}
</script>

<style lang = "scss" scoped>
    .box{
        position: absolute;
        left: 200px;
        top: 60px;
        bottom: 60px;
        right: 0;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .nav{
            padding: 24px;
        }
        .borderBottom{
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
            font-size: 14px;
            line-height: 42px;
            padding: 0 10px;
            margin-bottom: 15px;
        }
    }
</style>
