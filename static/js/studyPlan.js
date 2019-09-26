let stydyPlan = {
    init() {
        this.totalDays = 36;
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts);
        console.log(this)
    },
    loadData() {
        this.ec01_line_studyPlan();//
    },
    ec01_line_studyPlan() {
        let chart = echarts.init($("#ec01_line_studyPlan")[0]); //初始化图表，注意命名的规范合理
        this.charts.ec01_line_studyPlan = chart; //放入charts对象方便后面的刷新缩放以及其他操作
        chart.setOption(opt_line); // 设置这个类型（折线图）图表的共性
        let recordData = [1., .5, 1., 0., // 7月
            .0, .5, .5, .5, .8, .8, .0,
            .9, .6, .5, .5, .2, .2, .2,
            .1, .0, .0, .1, .1, .2, .1,
            .2, .1, .1, .2, .2, .3, .2, // 8月
            .2, .0, .2, .1, .1, .3, .2,
            .2, .2, .2, .0, .8, .7, .4,
            1., 1., .8, .5, .1, .1, .9,
            .9, .8, .0, .9, 1., .8, .8, // 9月
            1., .2, .9, .4, .9, .9, .9,
            .6, .8, .4, .3, .4, .9, .5,
            .8, .7, .6, .9, .5, .5, .0,
            .0, .0, .0,
        ];
        let [xData0, planData] = [[], []];
        let xData = (function () {
            let startTime = new Date('2019-07-04');
            let now = new Date();
            let data = [];
            while (startTime.getTime() < now.getTime()) {
                data.push(startTime);
                if (startTime.getDay() === 0) { // 周日处理其他事情
                    planData.push(0)
                } else {
                    planData.push(1)
                }
                startTime = new Date(startTime.getTime() + 86400 * 1000);
            }
            // console.log(data.map(item => item.getMonth() + 1 + '-' + item.getDate()))
            let weekStr = '日一二三四五六';
            return data.map(item => item.getMonth() + 1 + '-' + item.getDate() + '\n周' + weekStr[item.getDay()] + '')
        })();
        let planDataSum = planData.map((item, index) => {
            let sum = planData.slice().splice(0, index + 1).reduce((pre, cur) => {
                return pre + cur
            });
            return sum > this.totalDays ? this.totalDays : sum.toFixed(1)
        });
        let lineFontSize = (xData.length > 36 ? 13 : (xData.length > 24 ? 14 : 16)) * scale;
        console.log(xData, lineFontSize);
        chart.setOption({
            grid: {
                top: '10%',
                left: '7%',
                right: '5%'
            },
            xAxis: { // 本图表option的个性
                name: '日期',
                boundaryGap: true,
                data: xData,
                axisLabel: {
                    fontSize: 16 * scale,
                },
            },
            yAxis: {
                name: '学习进度(天) / %',
                // max: this.totalDays,
                splitLine: {show: true},
                axisLabel: {
                    formatter: val => {
                        console.log(this)
                        return `${val} / (${(val * 100 / this.totalDays).toFixed(0)}%)`
                    }
                },

            },
            dataZoom: {
                type: 'inside',
                orient: 'horizontal'
            },
            // tooltip:{trigger:'item'},
            series: [
                {
                    name: "当日计划",
                    // yAxisIndex: 0,
                    type: 'bar',
                    data: planData
                }, {
                    name: "当日完成",
                    // yAxisIndex: 0,
                    type: 'bar',
                    data: recordData
                }, {
                    name: "累计计划",
                    itemStyle: {
                        color: 'red'
                    },
                    label: {show: false},
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'transparent' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    data: planDataSum
                }, {
                    // 折线图不显示label的bug，只能用scatter实现
                    name: "累计计划",
                    type: 'scatter',
                    tooltip: {show: false},
                    itemStyle: {color: 'red'},
                    label: {
                        fontSize: lineFontSize,
                        fontWeight: 'bold',
                        formatter: function (param) {
                            console.log('~~', param.dataIndex)
                            let percentStr = param.dataIndex % 2 === 0?`(${(param.value / .3).toFixed(1)})%`:'';
                            return `\v${param.value}\n\v${percentStr}`
                        }
                    },
                    data: planDataSum
                }, {
                    name: "累计完成",
                    label: {show: false},
                    itemStyle: {color: 'greenyellow'},
                    // series.tooltip 仅在 tooltip.trigger 为 'item' 时有效，所以下面设置无效
                    tooltip: {
                        formatter: function (param) {
                            return `${(param.value / planDataSum[param.dataIndex]).toFixed(1)}%)`
                        }
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'green' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'transparent' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    data: recordData.map((item, index) => {
                        return recordData.slice().splice(0, index + 1).reduce((pre, cur) => {
                            return pre + cur
                        }).toFixed(1)
                    })
                }, {
                    // 折线图不显示label的bug，只能用scatter实现
                    name: "累计完成",
                    type: 'scatter',
                    tooltip: {show: false},
                    label: {
                        fontSize: lineFontSize,
                        fontWeight: 'bold',
                        formatter: function (param) {
                            let percentStr = param.dataIndex % 2 === 0?`(${(param.value / .3).toFixed(1)})%`:'';
                            return `\v${param.value}\n\v${percentStr}`
                        }
                    },
                    itemStyle: {color: 'greenyellow'},
                    data: recordData.map((item, index) => {
                        return recordData.slice().splice(0, index + 1).reduce((pre, cur) => {
                            return pre + cur
                        }).toFixed(1)
                    })
                },
                // {"name": "C", data: [2, 1, 2, 2, 1, 1, 1]},
            ].map(item => {
                return $.extend(true, {}, seri_line,// 折线图图表series的共性
                    { // 本图表series的个性
                        // symbol: 'circle',
                        barGap: 0,
                        smooth: false,
                        showSymbol: false,
                        label: {
                            show: true,
                            position: 'top',
                            fontWeight: 'bolder',
                            fontFamily: 'sans-serif'
                        },
                    }, item)
            })
        })
    },
};
stydyPlan.init();
