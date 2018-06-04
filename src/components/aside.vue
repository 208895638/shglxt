<template>
    <div class="asideBarContent">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu  class="el-menu-vertical-demo asideBar" @open="handleOpen" @close="handleClose" background-color="#545c64"
                text-color="#fff"
                :router = "router"
                :default-active = "activeLink"
                :default-openeds = "array"
                active-text-color="#ffd04b"  :collapse="false">
            <el-submenu index="1" >
                <template slot="title">
                    <i class="iconfont icon-zhanghuguanli"></i>
                    <span slot="title">账户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="account">我的账户</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont icon-zijinguanli"></i>
                    <span slot="title">资金管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="detailOfCapital">资金明细</el-menu-item>
                    <el-menu-item index="recharge">账户充值</el-menu-item>
                    <el-menu-item index="widthdrawalsManagement">提现列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="iconfont icon-wodexiaji"></i>
                    <span slot="title">下级管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="subordinateManagement">商户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import iconfont from "@/assets/iconfont/iconfont.css"
export default {
    data() {
      return {
        isCollapse: false,
        array: [ "1" , "2" , "3" ],
        router:true,
        activeLink:""
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created:function(){
        this.activeLink = this.$route.name;
    }
  }
</script>

<style scoped lang = "scss">
.asideBarContent{
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    background: #545c64;
    z-index: 99;
}
.asideBar{
    width: 200px;
}
.el-menu{
    border-right: 0;
}
.el-submenu__title:hover{
    background: forestgreen!important;
}
</style>
