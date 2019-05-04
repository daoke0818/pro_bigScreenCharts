let Index = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts, null, [
            'ec01_line_tiobe', 'ec06_pie_findSong'
        ], [
            'ec03_barV_timeDistribute', 'ec05_lineBar_timeDistribute', 'ec06_pie_findSong'
        ])
    },
    loadData() {
        this.ec01_line_tiobe();//
        this.ec02_area_accessSource();//
        this.ec03_barV_timeDistribute();//
        this.ec04_pie_computerBroken();//
        this.ec05_lineBar_timeDistribute();//
        this.ec06_pie_findSong();//
    },
    ec01_line_tiobe() {
        let chart = echarts.init($("#ec01_line_tiobe")[0]); //初始化图表，注意命名的规范合理
        this.charts.ec01_line_tiobe = chart; //放入charts对象方便后面的刷新缩放以及其他操作
        chart.setOption(opt_line); // 设置这个类型（折线图）图表的共性
        chart.setOption({
            xAxis: { // 本图表option的个性
                nameLocation: 'start',
                inverse: true,
                data: ['2019', '2014', '2009', '2004', '1999', '1994', '1989']
            },
            yAxis: { // 本图表option的个性
                name: '排名',
                nameLocation: 'start',
                min: 1,
                inverse: true
            },
            dataZoom: { // 本图表option的个性
                type: 'inside',
                orient: 'vertical'
            },
            series: [
                {"name": "Java", data: [1, 2, 1, 1, 12, '-', 0]},
                {"name": "C", data: [2, 1, 2, 2, 1, 1, 1]},
                {"name": "C++", data: [3, 4, 3, 3, 2, 2, 3]},
                {"name": "Python", data: [4, 7, 5, 9, 27, 21, 0]},
                {"name": "Visual Basic .NET", data: [5, 10, '-', '-', '-', '-', 0]},
                {"name": "C#", data: [6, 5, 6, 7, 23, '-', 0]},
                {"name": "JavaScript", data: [7, 8, 8, 8, 17, '-', 0]},
                {"name": "PHP", data: [8, 6, 4, 5, '-', '-', 0]},
                {"name": "SQL", data: [9, '-', '-', 6, '-', '-', 0]},
                {"name": "Objective-C", data: [10, 3, 36, 44, '-', '-', 0]},
                // {"name": "COBOL", data: [25, 20, 16, 11, 3, 9, 12]},
                // {"name": "Lisp", data: [29, 13, 19, 14, 14, 5, 2]},
                // {"name": "Pascal", data: [207, 14, 14, 96, 6, 3, 17]}
            ].map(item => {
                return $.extend(true, {}, seri_line,// 折线图图表series的共性
                    { // 本图表series的个性
                        symbol:'circle',
                        smooth: false,
                        showSymbol: false,
                    }, item)
            })
        })
    },
    ec02_area_accessSource() {
        let chart = echarts.init($("#ec02_area_accessSource")[0]);
        this.charts.ec02_area_accessSource = chart;
        chart.setOption(opt_line);
        chart.setOption({
            xAxis: {
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '数量/次',
            },
            series: [{
                name: '邮件营销',
                data: [120, 132, 101, 134, 90, 230, 210]
            }, {
                name: '联盟广告',
                data: [220, 182, 191, 234, 290, 330, 310]
            }, {
                name: '视频广告',
                data: [550, 432, 501, 454, 390, 530, 410]
            }, {
                name: '直接访问',
                data: [420, 432, 401, 434, 490, 530, 320]
            }, {
                name: '搜索引擎',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }].map(item => {
                return $.extend(true, {}, seri_area, {
                    symbol: 'circle',
                }, item)
            })
        });
    },
    ec03_barV_timeDistribute() {
        let chart = echarts.init($("#ec03_barV_timeDistribute")[0]);
        this.charts.ec03_barV_timeDistribute = chart;
        chart.setOption(opt_bar_v);
        chart.setOption({
            xAxis: {
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '时间/小时',
            },
            series: [
                {"name": "吃饭", data: [3, 2, 2, 2, 2, 2, 3]},
                {"name": "睡觉", data: [8, 7, 7, 7, 7, 7, 7.5]},
                {"name": "工作", data: [0, 8, 8, 8, 8, 7.5, 8]},
                {"name": "学习", data: [3, 1, 1, 1.5, 1, 1, 2]},
                {"name": "其他", data: [10, 6, 6, 5.5, 6, 6.5, 3.5]},
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item, {stack: '总时间'})
            })
        })
    },
    ec04_pie_computerBroken() {
        let chart = echarts.init($("#ec04_pie_computerBroken")[0]);
        this.charts.ec04_pie_computerBroken = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            series: [
                {
                    name: "电脑坏了",
                    data: [{
                        value: 72,
                        name: '重启'
                    },{
                        value: 3,
                        name: '找人帮忙'
                    }, {
                        value: 10,
                        name: '放弃使用'
                    }, {
                        value: 15,
                        name: '想法修复'
                    } ]
                },
            ].map(item => {
                return $.extend(true, {}, seri_circle, item)
            })
        })
    },
    ec05_lineBar_timeDistribute() {
        let chart = echarts.init($("#ec05_lineBar_timeDistribute")[0]);
        this.charts.ec05_lineBar_timeDistribute = chart;
        chart.setOption(opt_line);
        chart.setOption({
            legend: {
                data: ["吃饭", "学习", "工作", "其他", '睡觉',]
            },
            tooltip: {
                formatter: function (param) {
                    return param.map(item => {
                        if (item.seriesName === '补位') {
                            return ''
                        } else {
                            return `${item.seriesName}: ${item.value}<br>`
                        }
                    }).join("").replace(',', '')

                }
            },
            xAxis: {
                boundaryGap: true,
                data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            },
            yAxis: {
                name: '时间/小时',
            },
            series: [
                {
                    name: '睡觉',
                    data: [8, 7, 7, 7, 6, 6.5, 7.5]
                }, {
                    name: '补位',
                    silent: true,
                    itemStyle: {
                        color: c_bg_bar,
                    },
                    barGap: '-100%',
                    data: new Array(7).fill(12)
                }
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item)
            }).concat([
                {"name": "吃饭", data: [3, 2, 2, 2, 2, 2, 3]},
                {"name": "学习", data: [3, 1, 1, 1.5, 1, 1, 2]},
                {"name": "工作", data: [0, 8, 8, 8, 8, 7.5, 8]},
                {"name": "其他", data: [10, 6, 6, 5.5, 7, 7, 3.5]},
            ].map(item => {
                return $.extend(true, {}, seri_line, {
                    symbol: 'emptyCircle'
                }, item)
            }))
        })
    },
    ec06_pie_findSong() {
        let chart = echarts.init($("#ec06_pie_findSong")[0]);
        this.charts.ec06_pie_findSong = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0.3, 1.2]
                }
            },

            series: [
                {
                    name: "视频网站找歌的结果",
                    itemStyle: {
                        normal: {
                            color: colors[0],
                            shadowBlur: 100 * scale,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                        value: 40,
                        name: '手机拍的现场版'
                    }, {
                        value: 30,
                        name: '翻唱'
                    }, {
                        value: 18,
                        name: '尤克里里的演奏'
                    }, {
                        value: 10,
                        name: '该视频已被删除'
                    }, {
                        value: 2,
                        name: '找到了'
                    }].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
            ].map(item => {
                return $.extend(true, {}, seri_pie, item)
            })
        })
    }
};
Index.init();