<template>
    <div>
        <commonHeader></commonHeader>
        
        <div>
            <aside1></aside1>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import commonHeader from "@/components/commonHeader"
import aside from "@/components/aside"
export default {
    components: {
        commonHeader,
        aside1:aside
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
</style>
