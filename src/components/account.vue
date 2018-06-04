<template>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的账户</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <el-row type="flex" justify="center" class="borderBottom">
                <el-col :span="20">
                    <el-col :span="14" class="clearfix">
                        <span class="l">
                            11
                        </span>
                        <em class="r">
                            222
                        </em>
                    </el-col>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    
  }
</script>

<style lang = "scss" scoped>
    .box{
        position: absolute;
        left: 200px;
        top: 60px;
        bottom: 60px;
        right: 0;
        .nav{
            padding: 24px;
        }
        .borderBottom{
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
        }
    }
</style>
