<template>
    <div>
        <el-row class="header">
            <el-col :span="12"  class="logos">
                <router-link to="/" class="logo"><img src="../assets/images/logo1.png" alt=""></router-link>
            </el-col>
            <el-col :span="12" class="logout">
                <router-link to="/login" class="logOut" @click="logout">退出登录</router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
          this.$store.state.userLogin = false;
      }
    }
  }
</script>

<style scoped lang = "scss">
.header{
    height: 60px;
    background: rgb(84, 92, 100);
    .logos{
        width: 200px;
        position: relative;
        height: 100%;
        img{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            height: 42px;
            margin: auto;
        }
    }
    .logout{
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        line-height: 60px;
        
        a{
            color: #fff;
            display: block;
            float:right;
            padding: 0 20px;
        }
        a:hover{
            background: rgb(67,74,80);
            transition: background .3s ease-in;
        }
    }
}
</style>
