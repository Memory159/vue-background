<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from 'echarts';
export default {
    name:'',
    mounted(){
        // 初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts);
        lineCharts.setOption({
            
        });
    }
}
</script>

<style>
    .charts{
        width:100px;
        height: 100px;
    }
</style>