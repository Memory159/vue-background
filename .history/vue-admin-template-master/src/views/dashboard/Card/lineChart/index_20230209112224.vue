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
                // 隐藏x轴
                show:false,
                type:'category'
            },
            // 设置y轴
            yAxis:{
                // 隐藏y轴
                show:false,
            },
            // 系列
            series:[
                {
                    type:'line',
                    // symbol: 'circle',
                    symbolSize: 1,
                    // 让曲线更加圆滑
                    smooth: true,
                    data:[30,7,24,12,30,6],
                    // 拐点样式的设置
                    itemStyle:{
                        opacity:0
                    },
                    // 线条的样式
                    lineStyle:{
                        color:"purple"
                    },
                    // 填充颜色设置
                    areaStyle:{
                        color:{
                            type:"linear",
                            x:0,
                            y:0,
                            x2:0,
                            y2:1,
                            colorStops:[
                                {
                                    offset:0,
                                    color:"purple",
                                },
                                {
                                    offset:1,
                                    color:"#fff",
                                },
                            ],
                            global:false,
                        },
                    },
                },
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
        width:220px;
        height: 50px;
    }
</style>