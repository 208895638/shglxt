<template>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/recharge' }">资金管理</el-breadcrumb-item>
            <el-breadcrumb-item>账户充值</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row type="flex" justify="center">
            <el-col :xs="20" :sm="20" :md="6" :lg="4" :xl="4" class="recharge">
                <div class="per">
                    <el-radio v-model="recharge" label="1" border><slot style="padding:40px;"><img src="@/assets/images/weichat.png"  alt=""></slot>微信</el-radio>
                </div>
                <div class="per">
                    <el-radio v-model="recharge" label="2" border><slot><img src="@/assets/images/zhifubao.png" alt=""></slot>支付宝</el-radio>
                </div>
                <div class="per">
                    <el-input v-model.trim="money"  placeholder="请输入需要充值的金额"></el-input>
                    <div class="srmoney" >
                        充值手续费<span>{{rax}}</span>(最低<em>{{minRax}}</em>元),实际需要支付金额<i>{{totalMoney}}</i>元
                    </div>
                </div>
                <div class="per">
                    <el-button type="primary" @click="sendMsg" :disabled="aa">立即充值</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios"
import qs from "qs"
export default {
    data () {
        return {
            recharge:"1",
            wx1:true,
            wx2:false,
            money:"",
            rax:"2%",
            minRax:"0.02",
            totalMoney:"0.02",
            aa:true
        }
    },
    watch: {
        money(){
            if(this.money!= ""){
                this.aa = false;
            }else{
                this.aa = true;
            }
        }
    },
    methods: {
        sendMsg(){
            
        },
        bb(){
            this.aa = false;
        }
    },
    created () {
        axios.post("/msg/api/mapi.aspx",qs.stringify({m:"getrax"}))
        .then(function(res){
            console.log(res);
        })
        .catch(function(){

        })
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
    }
</style>
