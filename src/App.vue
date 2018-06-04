<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html{
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
  background:#f2f2f2;
  font-family: "微软雅黑";
}
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
