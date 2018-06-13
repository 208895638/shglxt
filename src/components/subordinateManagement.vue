<template>
    <div class="box">
       <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/subordinateManagement' }">下级管理</el-breadcrumb-item>
            <el-breadcrumb-item>商户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-row type="flex" justify="center">
                <el-col :span="20"  >
                    
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
                                        prop="PID"
                                        label="商户ID"
                                        sortable
                                       >
                                    </el-table-column>
                                    <el-table-column
                                        prop="LoginName"
                                        label="登录名"
                                        sortable
                                        >
                                    </el-table-column>
                                        <el-table-column
                                        prop="MerchantName"
                                        label="商户姓名"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="QQ"
                                        label="QQ"
                                        sortable
                                        width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="Rax"
                                        label="基础手续费"
                                        sortable
                                        width="120">
                                        
                                    </el-table-column>
                                    <el-table-column
                                        prop="Status"
                                        label="状态"
                                        width="120"
                                        >
                                        <template slot-scope="scope">
                                            <div slot="reference" class="name-wrapper" >
                                                <el-tag size="medium" >{{ scope.row.Stauts |statess }}</el-tag>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="operate"
                                        label="操作"
                                        >
                                        <template slot-scope="scope">
                                            <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        </template>
                                    </el-table-column>
                            </el-table>
                        </div>
                        <el-dialog title="修改散户费率"  :visible.sync="dialogFormVisible">
                            <el-form :model="tixian" ref="tixian" >
                                <el-form-item  class="clearfix" label="基础费率">
                                    <span style="width:95%;float:left;">
                                        <el-input  type="text" v-model.trim="tixian.rax" placeholder="请输入基础费率"  auto-complete="off"></el-input>
                                    </span>
                                    <em class="l" style="margin:0 4px;">%</em>
                                </el-form-item>
                                <el-form-item label="每笔最低费用">
                                    <span style="width:95%;float:left;">
                                        <el-input  type="text" v-model.trim="tixian.minRax" placeholder="请输入每笔最低费用"  auto-complete="off"></el-input>
                                    </span>
                                    <em class="l" style="margin:0 4px;">
                                        元
                                    </em>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getMoney">确 定</el-button>
                            </div>
                        </el-dialog>
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
            tableData:[],
            stripe:true,
            pindex:0,
            currentPage1:0,
            pageSize:0,
            RecordCount:0,
            dialogFormVisible:false,
            tixian:{
                rax:1,
                minRax :1 
            },
            userPid:1
        }
    },
    filters: {
        statess(value){
            let aa="";
            if(value == 1){
                aa = "开通";
            }else {
                aa = "禁用";
            }
            return aa;
        }
    },
    methods:{
        onSubmit(){
            let _this = this;
            var searchData;
            
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pindex = val;
            this.onSubmit();
        },
        handleEdit(a, b){
            this.dialogFormVisible = true;
            this.userPid = b.PID;
            let _this = this,data = {
                m:"getchildmrax",
                mid:b.PID
            };
            axios.post(commonUrl.apiUrl(), qs.stringify(data))
            .then(function(res){
                const msg = res.data;
                if(msg.Code == 1){
                    _this.tixian.rax = msg.Rax;
                    _this.tixian.minRax = msg.RaxMin;
                }else{
                    _this.$message.error(msg.Msg);
                }
            })
            .catch(function(res){
                console.log(res)
            })
        },
        getMoney(){
            let _this = this,data = {
                m:"updatechildrax",
                mid:_this.userPid,
                rax:_this.tixian.rax,
                raxmin:_this.tixian.minRax
            };
            axios.post(commonUrl.apiUrl(), qs.stringify(data))
            .then(function(res){
                const msg = res.data;
                if(msg.Code == 1){
                    _this.$message({
                        message: msg.Msg,
                        type: 'success'
                    });
                    _this.dialogFormVisible = false;
                    _this.getChildList();
                }else{
                    _this.$message({
                        message: msg.Msg,
                        type: 'warning'
                    });
                }
            })
            .catch(function(res){
                console.log(res)
            })
        },
        getChildList(){
            const _this = this , myDate = new Date(),selectDate = new Object(),data1 = {
                m:"getbtype"
            };

            let postData = {
                m:"getchildmerchant",
                pindex:_this.pindex
            }
            // 获取提现用户信息
            axios.post(commonUrl.apiUrl(), qs.stringify(postData))
            .then(function(res){
                let msg = res.data;
                console.log(msg);
                if(msg.Code == 1){
                    _this.currentPage1 =msg.CurIndex;
                    _this.pageSize =msg.PageSize;
                    _this.RecordCount =msg.RecordCount;
                    _this.tableData = msg.Data;
                }else{
                    _this.$message.error(msg.Msg);
                }
            })
            .catch(function(res){
                console.log(res)
            })
        }
    },
    created () {
        this.getChildList();
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
