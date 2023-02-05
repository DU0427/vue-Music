<template>
    <div class="chart">
        <div class="nav">
            音乐分析图
        </div>
        <div id="main">

        </div>
        <div id="main1">

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent, TooltipComponent, } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout]);



export default {
    name: 'Chart',
    data() {
        return {
        }
    },
    methods: {
        Chart() {
            // 雷达图
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '歌手综合能力对比图',
                    left:'center'
                },
                legend: {
                    show:'true',
                    data: ['华语歌手平均值', '韩语歌手平均值','欧美歌手平均值','日语歌手平均值'],
                    left:'right',
                    orient: 'vertical',
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            fontSize: 15,
                            color: '#91cc75'

                        }
                    },
                    indicator: [
                        { name: '音域', max: 6500 },
                        { name: '音色', max: 16000 },
                        { name: '技巧', max: 30000 },
                        { name: '作词', max: 38000 },
                        { name: '作曲', max: 52000 },
                        { name: '编曲', max: 25000 }
                    ]
                },
                calculable: true,
                series: [
                    {
                        name: 'singer vs singer',
                        type: 'radar',
                        symbol: 'node',
                        center: ['50%', '50%'],
                        // radius: 200,
                        
                        data: [
                            {
                                value: [6000, 15000, 23000, 35000, 50000, 18000],
                                name: '华语歌手平均值',
                            },
                            {
                                value: [5500, 13000, 27000,28000, 42000, 21000],
                                name: '韩语歌手平均值',
                            },
                            {
                                value: [6300, 12000, 24000, 21000, 39000, 19000],
                                name: '欧美歌手平均值',
                            },
                            {
                                value: [5000, 10099, 28460, 25000, 38000, 21600],
                                name: '日语歌手平均值',
                            },

                        ]
                    },

                ]
            };

            option && myChart.setOption(option);

            // 饼状图
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '各种音乐风格听众人数',
                    subtext: '国内数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'right'
                },
                series: [
                    {
                        name: '音乐风格',
                        type: 'pie',
                        radius: '50%',
                        roseType:'radius',
                        selectedMode: 'multiple',
                        label:{
                            show:true,
                            formatter(arg){
                                return arg.name+'听众人数'+arg.value+'万人'+'\n'+'占比'+ arg.percent+'%'
                            }
                        },
                        data: [
                            { value: 9483, name: '说唱' },
                            { value: 8888, name: '流行' },
                            { value: 7804, name: '摇滚' },
                            { value: 6846, name: '民谣' },
                            { value: 5003, name: '爵士' },
                            { value: 4080, name: '纯音乐' },
                            { value: 3240, name: '电子' },
                            { value: 2190, name: '古典' },

                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);
        },
        singerPk() {
            this.Chart
        }
    },
    mounted() {
        this.Chart()
    }

}
</script>

<style scoped>
#main {
    height: 500px;
    width: 50%;
    float: left;
    margin-top: 30px;
}
#main1{
    height: 500px;
    width: 50%;
    float: right;
    margin-top: 30px;
}

.chart {
    margin: 20px 100px;
}

.nav {
    height: 35px;
    width: 100%;
    border-bottom: 3px solid rgb(20, 102, 12);
    text-align: center;
    color: rgb(0, 0, 0);
    font-size: 25px;
}
</style>