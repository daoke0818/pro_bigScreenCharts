let stydyPlan = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        // Public.chartsReDraw(this.charts, null)
    },
    loadData() {
        this.ec01_line_studyPlan();//
    },
    ec01_line_studyPlan() {
        let chart = echarts.init($("#ec01_line_studyPlan")[0]); //初始化图表，注意命名的规范合理
        this.charts.ec01_line_studyPlan = chart; //放入charts对象方便后面的刷新缩放以及其他操作
        chart.setOption(opt_line); // 设置这个类型（折线图）图表的共性
        let recordData = [1., .5, 1., 0.,
            .0, .5, .5, .5, .8, .8, .0,
            .9, .6, .5, .5, .2
        ];
        chart.setOption({
            xAxis: { // 本图表option的个性
                name: '日期',
                boundaryGap: true,
                data: (function () {
                    let startTime = new Date('2019-07-04');
                    let now = new Date();
                    let data = [];
                    while (startTime.getTime() < now.getTime()) {
                        data.push(startTime);
                        startTime = new Date(startTime.getTime() + 86400 * 1000);
                    }
                    console.log(data.map(item => item.getMonth() + 1 + '-' + item.getDate()))
                    return data.map(item => item.getMonth() + 1 + '-' + item.getDate())
                })()
            },
            /*yAxis: [{
                name: '每日学习时间(天)',
                max:30
                // offset:'right'
            }, {
                name: '累计完成',
                max:30
            }].map(item => {
                $.extend(true, {}, com_axis, {
                    type: 'value',
                }, item)
            }),*/
            yAxis: {
                name: '学习时间(天)',
                max:30
                // offset:'right'
            },
            dataZoom: {
                type: 'inside',
                orient: 'horizontal'
            },
            series: [
                {
                    name: "每日完成",
                    yAxisIndex: 0,
                    type:'bar',
                    // label:{show:true},
                    data: recordData
                }, {
                    name: "累计完成",
                    yAxisIndex: 0,
                    label:{show:true},
                    data: recordData.map((item, index) => {
                        return recordData.slice().splice(0, index + 1).reduce((pre, cur) => {
                            return pre + cur
                        })
                    })
                },
                // {"name": "C", data: [2, 1, 2, 2, 1, 1, 1]},
            ].map(item => {
                return $.extend(true, {}, seri_line,// 折线图图表series的共性
                    { // 本图表series的个性
                        symbol: 'circle',
                        smooth: false,
                        showSymbol: false,
                    }, item)
            })
        })
    },
};
stydyPlan.init();