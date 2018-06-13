<template>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/recharge' }">资金管理</el-breadcrumb-item>
            <el-breadcrumb-item>账户充值</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="20" :md="6" :lg="4" :xl="4" class="recharge">
                <div class="per">
                    <el-radio v-model="recharge" label="2" border><slot style="padding:40px;"><img src="@/assets/images/weichat.png"  alt=""></slot>微信</el-radio>
                </div>
                <div class="per">
                    <el-radio v-model="recharge" label="1" border><slot><img src="@/assets/images/zhifubao.png" alt=""></slot>支付宝</el-radio>
                </div>
                <div class="per">
                    <el-input v-model.trim="totalMoney"  placeholder="请输入需要充值的金额"></el-input>
                    <div class="srmoney" >
                        充值手续费<span>{{rax+"%"}}</span>(最低<em>{{minRax}}</em>元),实际需要支付金额<i>{{mon}}</i>元
                    </div>
                </div>
                <div class="per">
                    <el-button type="primary" @click="sendMsg" :disabled="aa">立即充值</el-button>
                    <el-dialog :title="dialogTitle+'支付'" :visible.sync="dialogFormVisible" class="payment" :width="boxwidth">
                        <dl>
                            <dt>
                               ￥{{zfje }}元
                            </dt>
                            <dd >
                                <p class="iframe iframe1" v-if="refresh">
                                    二维码已过期
                                </p>
                                <iframe class="iframe" :src="imgSrc" frameborder="0" ></iframe>
                            </dd>
                            <dd v-if="!refresh" class="aa">
                                请打开{{dialogTitle}}扫一扫支付
                            </dd>
                            <dd class="cu aa" v-if="refresh" @click="freshCode">
                                <i class="el-icon-refresh" style="color:#0078FF"></i>刷新二维码
                            </dd>
                        </dl>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import reg from "@/js/reg.js"
import commonUrl from "@/js/common.js"
let timer =''
export default {
    data () {
        return {
            recharge:"2",
            wx1:true,
            wx2:false,
            money:"",
            rax:"",
            minRax:"",
            totalMoney:"",
            aa:true,
            dialogFormVisible:false,
            dialogTitle:"",
            zfje:"",
            imgSrc:"",
            boxwidth:"",
            refresh:false,
            order:""
        }
    },
    computed: {
        mon(){
            let mon;
            if(this.totalMoney!= ""){
                if(reg.testNumber(this.totalMoney)){
                    this.$message.error('输入的数字格式不正确,必须大于等于1!');
                    this.aa = true;
                }else{
                    this.aa = false;
                    if(this.totalMoney < this.minRax){
                        mon = this.minRax+ parseFloat(this.totalMoney);
                    }else{
                        mon = this.totalMoney*this.rax*0.01+parseFloat(this.totalMoney);
                    }
                }
                
            }else{
                this.aa = true;
            }
            
            return mon;
        }
    },
    watch:{
        dialogFormVisible(){
            if(this.dialogFormVisible){
            }else{
                clearInterval(timer);
            }
        }
    },
    methods: {
        sendMsg(){
            let _this = this ;
            const data= {
                m:"getpayqrcode",
                money:this.totalMoney,
                paytype:this.recharge
            };
            // console.log(data)
            axios.post(commonUrl.apiUrl(),qs.stringify(data))
            .then(function(res){
                const msg = res.data;
                console.log(msg);
                
                if(data.paytype == 1){
                    _this.dialogTitle="支付宝";
                }else{
                    _this.dialogTitle="微信";
                }
                
                if(msg.code == 1){
                    _this.zfje = msg.money;
                    _this.imgSrc = msg.qrurl;
                    _this.dialogFormVisible = true;
                    _this.order = msg.orderno;
                    setTimeout(function(){
                        _this.refresh = true;
                         clearInterval(timer);
                    },10000);
                    timer = setInterval(function () {
                        _this.getPayResult();
                    },3000);
                }
            })
            .catch(function(res){
                console.log(res);
            })
        },
        bb(){
            this.aa = false;
        },
        freshCode(){
            let _this = this ;
            _this.sendMsg();
            setTimeout(() => {
                
                _this.refresh =false;
            }, 1000);
            timer = setInterval(function () {
                _this.getPayResult();
            },3000);
        },
        getPayResult(){
            const data = {
                m:"getpayorderstatus",
                orderno:this.order
            };
            console.log(data);
            axios.post(commonUrl.apiUrl() , qs.stringify(data))
            .then(function(res){
                const msg = res.data;
                console.log(res);
                if(msg.OrderStatus == 1){
                    console.log(msg)
                    _this.$message({
                        message: '支付成功!',
                        type: 'success'
                    });
                    clearInterval(timer);
                }else{
                    
                    console.log(msg)
                }
            })
        }
    },
    created () {
        let _this = this;
        axios.post(commonUrl.apiUrl(),qs.stringify({m:"getrax"}))
        .then(function(res){
            const msg = res.data;
            if(msg.Code == 1){
                _this.rax = parseFloat(msg.Rax);
                _this.minRax = parseFloat(msg.RaxMin);
                
            }
        })
        .catch(function(res){
            console.log(res);
        });
        var screenW = document.body.clientWidth;
            console.log(screenW)
        if (screenW > 1024) {
            this.boxwidth = "30%";
        } else {
            this.boxwidth = "100%";
        };
    }
  }
</script>

<style scoped lang="scss">
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
        .recharge{
            padding-top: 128px;
            .per{
                margin: 20px 0;
                .srmoney{
                    font-size: 12px;
                    line-height: 30px;
                    color: #666;
                    span,em,i{
                        color: red;
                        padding: 0 6px;
                    }
                }
                button{
                    width: 100%;
                }
            }
            label{
                display: block;
                img{
                    display: inline-block;
                    vertical-align: top;
                    margin: -9px 16px 0 16px;
                }
            }
        }
        .payment{
           
            dt{
                font: 24px/46px "微软雅黑";
                color: #ff3030;
                text-align: center;
            }
            dd{
                text-align: center;
                position: relative;
                font-size: 16px;
                color: #333;
                margin-bottom: 20px;
                .iframe{
                    width: 282px;
                    height: 277px;
                    
                }
                .iframe1{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin-left: 59px;
                    margin-top: -3px;
                    width: 282px;
                    height: 277px;
                    z-index: 2;
                    text-align: center;
                    margin:auto;
                    line-height: 277px;
                    background: rgba(000,000,000,0.9);
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
    }
     .el-dialog{
                width: 320px;
            }
</style>
