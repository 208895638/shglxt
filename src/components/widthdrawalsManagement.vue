<template>
    <div class="box">
       <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/detailOfCapital' }">资金管理</el-breadcrumb-item>
            <el-breadcrumb-item>提现列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-row type="flex" justify="center">
                <el-col :span="20"  >
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="查询时间">
                            <div class="block">
                                <el-date-picker
                                v-model="value6"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                @focus="getTime"
                                range-separator="至"
                                :start-placeholder="startDate"
                                :end-placeholder="startDate">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="查询类型">
                            <el-select v-model="value1" placeholder="请选择" @blur = "selVal">
                                <el-option
                                v-for="item in options"
                                :key="item.PID"
                                :label="item.BName"
                                :value="item.PID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                        </el-form-item>
                        <el-form-item class="r">
                            <el-button @click="dialogFormVisible = true"><i class="iconfont icon-money" style="margin:0 4px;"></i>提现</el-button>
                            <!--  -->
                            
                            <!--  -->
                        </el-form-item>
                    </el-form>
                    <el-dialog title="修改密码"  :visible.sync="dialogFormVisible">
                            <el-form :model="tixian" :rules="rule" ref="tixian" >
                                <el-form-item  class="clearfix">
                                    <span class="l">支付宝姓名</span>
                                    <em class="r">{{AliName}}</em>
                                </el-form-item>
                                <el-form-item  class="clearfix">
                                    <span class="l">支付宝账户</span>
                                    <em class="r">{{AliAccount}}</em>
                                </el-form-item>
                                <el-form-item  class="clearfix">
                                    <span class="l">账户总金额</span>
                                    <em class="r" style="color:red;">{{Balance}}</em>
                                </el-form-item>
                                <el-form-item   class="clearfix" prop="tx">
                                    <span class="l">
                                        提现金额
                                    </span>
                                    <em class="r">
                                        <el-input  type="text" v-model.trim="tixian.tx" placeholder="请输入提现金额"  auto-complete="off"></el-input>
                                    </em>
                                </el-form-item>
                                <el-form-item  class="clearfix">
                                    <span class="l">提现手续费</span>
                                    <em class="r" style="color:red;">{{Rax}}</em>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getMoney('tixian')">确 定</el-button>
                            </div>
                            </el-dialog>
                    <div class="tableBox">
                        <div class="table">
                            <el-table
                                :data="tableData"
                                style="width: 100%"
                                fit:true
                                border
                                header-row-class-name="borderTop"
                                :stripe="stripe"
                                :default-sort = "{prop: 'date', order: 'descending'}"
                                >
                                    <el-table-column
                                        prop="SubmitDatetime"
                                        label="提交时间"
                                        sortable
                                       >
                                    </el-table-column>
                                    <el-table-column
                                        prop="AliAccount"
                                        label="入款账号"
                                        sortable
                                        >
                                    </el-table-column>
                                        <el-table-column
                                        prop="Money"
                                        label="提现金额"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="Rax"
                                        label="手续费"
                                        sortable
                                        width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="Stauts"
                                        label="提现状态"
                                        sortable
                                        width="120">
                                        <template slot-scope="scope">
                                            <el-popover trigger="hover" placement="top">
                                            <p>{{ scope.row.HandInfo }}</p>
                                            <div slot="reference" class="name-wrapper" :class="clsssStatus">
                                                <el-tag size="medium">{{ scope.row.Stauts |statess }}</el-tag>
                                            </div>
                                            </el-popover>
                                        </template>
                                    </el-table-column>
                                        <el-table-column
                                        prop="HandDatetime"
                                        label="处理时间"
                                        width="120"
                                        >
                                    </el-table-column>
                            </el-table>
                        </div>
                        <div class="page">
                            <div class="block">
                                <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage1"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="RecordCount">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import qs from "qs"
import axios from 'axios'
import reg from "@/js/reg.js"
import commonUrl from "@/js/common.js"
var searchData;
export default {
    data () {
        var checkNum = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('提现金额不能为空!'));
            }else if(!reg.testMoney(value)){
                return callback(new Error('输入提现金额格式不正确!'));
            }else if((parseFloat(value) +parseFloat(this.Rax)) >  this.Balance){
                
                return callback(new Error('账户金额不足,不能提现,提现金额和手续费不能大于余额!'));
            }else{
                setTimeout(() => {
                    callback();
            }, 1000);
            }
        };
        return {
            value6: '',
            formInline: {
                user: '',
                region: ''
            },
            inputTimt:false,
            selectVal:false,
            value1:"",
            startDate:"",
            endDate:"",
            options:[
                {
                    BName:"全部",
                    PID:"5"
                },
                {
                    BName:"提现成功",
                    PID:"1"
                },
                {
                    BName:"提现中",
                    PID:"0"
                },
                {
                    BName:"提现拒绝",
                    PID:"-1"
                }
            ],
            pindex:0,
            currentPage1:0,
            pageSize:0,
            RecordCount:0,
            tableData:null,
            stripe:true,
            clsssStatus:'',
            dialogFormVisible:false,
            tixian:{
                tx:""
            },
            AliAccount:"",
            AliName:"",
            Balance:"",
            Rax:"",
            rule:{
                tx: [
                    { validator: checkNum, trigger: 'blur' }
                ],
            }
        }
    },
    filters: {
        statess(value){
            let aa="";
            if(value == 0){
                aa = "提现中";
            }else if(value == 1){
                aa = "提现成功";
            }else {
                aa = "提现拒绝";
            }
            return aa;
        }
    },
    methods:{
        onSubmit(){
            let _this = this;
            var searchData;
            if(!this.inputTimt){
                if(this.selectVal){
                    searchData = {
                        m:"getwithdraw",
                        btime:this.value6.split(" ")[0],
                        etime:this.value6.split(" ")[1],
                        btype:this.value1,
                        pindex:this.pindex
                    }
                }else{
                    searchData = {
                        m:"getwithdraw",
                        btime:this.value6.split(" ")[0],
                        etime:this.value6.split(" ")[1],
                        btype:0,
                        pindex:this.pindex
                    }
                }
                
            }else{
                if(this.selectVal){
                    searchData = {
                        m:"getwithdraw",
                        btime:this.value6[0],
                        etime:this.value6[1],
                        btype:this.value1,
                        pindex:this.pindex
                    }
                }else{
                    searchData = {
                        m:"getwithdraw",
                        btime:this.value6[0],
                        etime:this.value6[1],
                        btype:0,
                        pindex:this.pindex
                    }
                }
                
            }
            var loading;
            axios.interceptors.request.use(config => {
                 loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                
                return config;
            })

            axios.interceptors.response.use(config => {
                loading.close();
                return config
            })
            axios.post(commonUrl.apiUrl(),qs.stringify(searchData))
            .then(function(res){
                const data = res.data;
                
                if(data.Code == 1){
                    _this.currentPage1 =data.CurIndex;
                    _this.pageSize =data.PageSize;
                    _this.RecordCount =data.RecordCount;
                    _this.tableData = data.Data
                }else{
                    _this.$message({
                        message: data.Msg
                        });
                }
            })
            .catch(function (response) {
                // console.log(response);
            });
        },
        getTime(){
            this.inputTimt = true;
        },
        selVal(){
            this.selectVal = true;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pindex = val;
            this.onSubmit();
        },
        getMoney(formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = {
                        m:"addwithdraw" ,
                        money:_this.tixian.tx
                    }
                    axios.post(commonUrl.apiUrl(), qs.stringify(data))
                    .then(function (response) {
                        const res = response.data;
                        _this.$message({
                            message: '提交成功!',
                            type: 'success'
                        });
                        _this.geiUserInfo();
                    })
                    .catch(function (response) {
                        const res = response.data;
                        _this.$message.error({res});
                    });
                } else {
                    return false;
                }
            });
        },
        geiUserInfo(){
            const _this = this;
            // 获取提现用户信息
            axios.post(commonUrl.apiUrl(), qs.stringify({m:"getwithdrawrax"}))
            .then(function(res){
                let msg = res.data;
                if(msg.Code == 1){
                    _this.AliAccount = msg.AliAccount;
                    _this.AliName = msg.AliName;
                    _this.Balance = msg.Balance;
                    _this.Rax = msg.Rax;
                }
            })
            .catch(function(res){
                console.log(res)
            })
        }
    },
    created () {
        const _this = this , myDate = new Date(),selectDate = new Object(),data1 = {
            m:"getbtype"
        };
        //获取当前年
        const year=myDate.getFullYear().toString();
        //获取当前月
        const month=(myDate.getMonth()+1).toString();
        //获取当前日
        const date=myDate.getDate().toString();
        this.startDate = year+"-"+month+"-"+date;
        this.endDate = year+"-"+month+"-"+date;
        this.value6 = this.startDate + " " +this.endDate;
        this.geiUserInfo();
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
        .borderBottom{
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
            font-size: 14px;
            line-height: 42px;
            padding: 0 10px;
            margin-bottom: 15px;
        }
        .borderTop{
            text-align: center;
        }
        .page{
            margin-top: 24px;
        }
    }
</style>
