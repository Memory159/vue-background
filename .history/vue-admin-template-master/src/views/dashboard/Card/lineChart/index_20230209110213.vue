<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts';
export default {
    name:'',
    mounted(){
        // 初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts);
        // 配置数据
        lineCharts.setOption({
            // 设置x轴
            xAxis:{
                show:false,
            },
            // 设置y轴
            yAxis:{},
            // 系列
            series:[
                {
                    type:'line',
                    data:[10,7,24,32]
                }
            ],
            // 布局调试
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            }
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