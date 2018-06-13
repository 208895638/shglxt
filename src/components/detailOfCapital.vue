<template>
    <div class="box">
       <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/detailOfCapital' }">资金管理</el-breadcrumb-item>
            <el-breadcrumb-item>资金明细</el-breadcrumb-item>
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
                    </el-form>
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
                                        prop="HistoryDate"
                                        label="时间"
                                        sortable
                                       >
                                    </el-table-column>
                                    <el-table-column
                                        prop="BalanceType"
                                        label="变动类型"
                                        sortable
                                        >
                                    </el-table-column>
                                        <el-table-column
                                        prop="OrderNO"
                                        label="相关单号"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="TradeAmount"
                                        label="交易金额"
                                        sortable
                                        width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="TradeBefore"
                                        label="交易前"
                                        sortable
                                        width="120">
                                    </el-table-column>
                                        <el-table-column
                                        prop="TradeAfter"
                                        label="交易后"
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
import commonUrl from "@/js/common.js"
var searchData;
export default {
    data () {
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
            options:[],
            pindex:0,
            currentPage1:0,
            pageSize:0,
            RecordCount:0,
            tableData:null,
            stripe:true
        }
    },
    methods:{
        onSubmit(){
            let _this = this;
            var searchData;
            if(!this.inputTimt){
                if(this.selectVal){
                    searchData = {
                        m:"pagebh",
                        btime:this.value6.split(" ")[0],
                        etime:this.value6.split(" ")[1],
                        btype:this.value1,
                        pindex:this.pindex
                    }
                }else{
                    searchData = {
                        m:"pagebh",
                        btime:this.value6.split(" ")[0],
                        etime:this.value6.split(" ")[1],
                        btype:0,
                        pindex:this.pindex
                    }
                }
                
            }else{
                if(this.selectVal){
                    searchData = {
                        m:"pagebh",
                        btime:this.value6[0],
                        etime:this.value6[1],
                        btype:this.value1,
                        pindex:this.pindex
                    }
                }else{
                    searchData = {
                        m:"pagebh",
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
                console.log(searchData , data)
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
        this.value6 = this.startDate + " " +this.endDate
        axios.post(commonUrl.apiUrl(), qs.stringify(data1))
        .then(function (response) {
            const res = response.data , msg =res.Data ;
            console.log(data1);
            if(res.Code == 1){
                _this.options = msg;
            }else{
                _this.$message({
                    message: res.Msg,
                    type: 'warn'
                });
            }
        })
        .catch(function (response) {
            // _this.$message.error(response.data.Msg);
        });
        
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
