let Index = {
    init() {
        let that = this;
        this.ctx = 'http://192.168.25.55:9999';
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts)
    },
    loadData() {
        this.ec01_line_trend_a();//数据走势
        this.ec02_map3d_globe_a();//地球
        this.ec03_radar_fieldDistribution_a();//区域分布雷达图
        this.ec04_hLine_dataDistribution_a();//数据分布横条图
    },
    ec01_line_trend_a() {
        let that = this;
        $.ajax({
            url: this.ctx + '/api/common/innter?dataType=yeesight_pc_homepage_trend',
            type: 'get',
            headers: Public.ajaxHeaders,
            success(data) {
                if (data.msg !== 'success') {
                    console.log(data.msg);
                    return;
                }
                let dataObj = data.data;
                //console.log(dataObj)
                let legendArr = []
                let xAxisArr = []
                let yAxisArr = []
                Object.keys(dataObj).forEach((item, index) => {
                    legendArr.push(dataObj[item][0]["legend"]);
                    xAxisArr = []
                    let axisY = []
                    dataObj[item].forEach(item => {
                        xAxisArr.push(item.axisX);
                        axisY.push(Number(item.axisY));
                    })
                    yAxisArr.push(axisY)
                })
                // console.log(legendArr,xAxisArr,yAxisArr)
                let series = []
                yAxisArr.forEach((item, index) => {
                    series.push({
                        name: legendArr[index],
                        symbol: 'circle',
                        symbolSize: 8 * bodyScale,
                        type: 'line',
                        stack: '总量',
                        // hoverAnimation: false,
                        areaStyle: {
                            // opacity: '.1',
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0.3, color: 'rgba(0,138,255,0.3)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(0,138,255,0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        lineStyle: {
                            width: 1 * bodyScale,
                        },
                        data: item
                    })
                });
                that.ec01_line_trend_d(xAxisArr, series);
            }
        })
    },
    ec01_line_trend_d(xAxisArr, seriesData) {
        let myChart = echarts.init($("#ec01_line_trend")[0]);
        this.charts.ec01_line_trend = myChart;
        myChart.setOption({
            color: ["#008aff", "#40e9ea"],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'item',
                    label: {
                        fontSize: 12 * bodyScale,
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                // data: legendArr,
                right: '8%',
                top: 20 * bodyScale,
                itemHeight: 10 * bodyScale,
                itemWidth: 15 * bodyScale,
                textStyle: {
                    fontSize: 12 * bodyScale,
                    color: "#fff"
                }
            },
            grid: {
                left: '8%',
                right: '8%',
                bottom: '14%',
                top: '15%'
            },
            xAxis: [
                {
                    boundaryGap: false,
                    type: 'category',
                    data: xAxisArr,
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1 * bodyScale,
                            color: 'rgba(141,200,255,.8)'
                        }
                    },
                    axisLabel: {
                        fontSize: 12 * bodyScale,
                        color: '#fff'
                    }
                }
            ],
            yAxis: [
                {
                    name: '数据（/万条）',
                    type: 'value',
                    nameGap: 15 * bodyScale,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    nameTextStyle: {
                        padding: [0, 0, 5 * bodyScale, 5 * bodyScale],
                        fontSize: 12 * bodyScale,
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(141,200,255,.8)'
                        }
                    },
                    axisLabel: {
                        fontSize: 12 * bodyScale,
                        color: '#fff',
                        formatter: function (value, index) {
                            return value / 10000;
                        }
                    }
                }
            ],
            series: seriesData.map(function (item, index) {
                return $.extend(true, {}, {}, item);
            })
        })
    },
    ec02_map3d_globe_a() {
        let that = this;
        $.ajax({
            url: '../static/data/earth3d.json',//'/api/index/news/map'
            type: 'get',
            headers: Public.ajaxHeaders,
            success(data) {
                // console.log('HomePage_earth3d_flights', data);
                const dataFromInterface = data.data.maps;
                const coordsXiAn = [109.1162, 34.2004]; //西安经纬度
                // 散点数据
                const mapDataScatters = dataFromInterface.concat([{
                    name: '西安',
                    latitude: 109.1162,
                    longitude: 34.2004
                }]).map(function (item) {
                    return {
                        // name: item.name,
                        // value: [item.latitude, item.longitude]
                        name: item.areacity,
                        value: [item.citylatitude, item.citylongitude]
                    }
                });
                // 连线数据
                const mapDataLines = dataFromInterface.map(function (item) {
                    return {
                        // name: item.name,
                        // coords: [[item.latitude, item.longitude], coordsXiAn]
                        name: item.areacity,
                        coords: [[item.citylatitude, item.citylongitude], coordsXiAn]
                    }
                });
                that.ec02_map3d_globe_d(mapDataScatters, mapDataLines);
            }
        });
    },
    ec02_map3d_globe_d(mapDataScatters, inCity) {
        let myChart = echarts.init($("#ec02_map3d_globe")[0]);
        this.charts.ec02_map3d_globe = myChart;
        let series = [
            {//绘制点
                type: 'scatter3D',
                coordinateSystem: 'globe',
                // blendMode: 'lighter',
                symbolSize: 5 * bodyScale,
                itemStyle: {
                    color: '#fff',
                    opacity: 1,
                    borderColor: '#57fafa',
                    borderWidth: 3 * bodyScale,
                },
                label: {
                    show: false,//不知如何取消鼠标移上去后触发的动作
                    formatter: '{b}',
                    distance: 15 * bodyScale
                },
                data: mapDataScatters
            },
            {//绘制线
                type: 'lines3D',
                effect: {
                    show: true,
                    trailWidth: 2 * bodyScale,
                    trailLength: 0.25 * bodyScale,
                    trailOpacity: .7,
                    trailColor: '#ff3ecf'
                },

                lineStyle: {
                    width: 1 * bodyScale,
                    color: '#6e0fff',
                    opacity: .6
                },
                // blendMode: 'lighter',

                data: inCity
            }
        ];

        myChart.setOption({//地球背景图
            // background: 'transparent',
            globe: {
                // environment: ctx + '/images/starfield.jpg',
                // baseColor: '#4a7dff',
                // baseColor: '#fff',
                // environment: '#000',
                // baseTexture: ctx + '/images/bg_world_2.png',
                // left:'20%',
                // top:'20%',
                baseTexture: '../static/imgs/earth3d_190410.jpg',
                globeRadius: 100,
                globeOuterRadius: 140,
                viewControl: {
                    // autoRotate: false,
                    autoRotateSpeed: 9,
                    alpha: 33,
                    beta: 135,
                    // targetCoord: [87.68, 43.77]//可以定位到乌鲁木齐等城市
                },
                light: { // 主光源,影响地图颜色
                    ambient: {
                        intensity: 1
                    },
                    main: {
                        intensity: 0
                    }
                },
                // layers: [{
                //     type: 'blend',
                //     blendTo: 'emission',
                //     texture: ctx + '/images/night.jpg'
                // }],
                // ambientCubemap: {
                //     texture: ctx + '/images/pisa.hdr',
                // }
            },
            tooltip: {
                show: false,
                // formatter:'{}'
            },
            series: series
        });
    },
    ec03_radar_fieldDistribution_a() {
        let that = this;
        $.ajax({
            // url: '../../test.json',
            url: this.ctx + '/api/common/innter?dataType=yeesight_pc_homepage_category',
            type: 'get',
            headers: Public.ajaxHeaders,
            success(data) {
                if (data.msg !== 'success') {
                    console.log(data.msg);
                    return;
                }
                let obj = data.data
                let legendArr = []
                let indicator = []
                let seriesData = []
                let valueArr = []
                let selectedArr = {};
                Object.keys(obj).forEach((item, index) => {
                    legendArr = []
                    let temp = []
                    obj[item].forEach(item => {
                        legendArr.push(item.name)
                        temp.push(isNaN(item.value) ? '0' : item.value)
                    })
                    indicator.push({
                        name: obj[item][0].class,
                        max: isNaN(obj[item][0].max) ? '10000' : obj[item][0].max
                    })
                    valueArr.push(temp)
                })
                //console.log(valueArr)

                let newArray = valueArr[0].map(function (col, i) {
                    return valueArr.map(function (row) {
                        return row[i];
                    })
                });

                legendArr.forEach((item, index) => {

                    seriesData.push({
                        value: newArray[index],
                        name: item
                    })
                    if (index > 3) {
                        selectedArr[item] = false
                    }
                })


                /* // console.log(legendArr,xAxisArr,yAxisArr)
                 let series = []
                 yAxisArr.forEach((item, index) => {
                     series.push({
                         name: legendArr[index],
                         symbol: 'circle',
                         symbolSize: 5 * bodyScale,
                         type: 'line',
                         stack: '总量',
                         // hoverAnimation: false,
                         areaStyle: {
                             // opacity: '.1',
                             color: {
                                 type: 'linear',
                                 x: 0,
                                 y: 0,
                                 x2: 0,
                                 y2: 1,
                                 colorStops: [{
                                     offset: 0.3, color: 'rgba(0,138,255,0.3)' // 0% 处的颜色
                                 }, {
                                     offset: 1, color: 'rgba(0,138,255,0)' // 100% 处的颜色
                                 }],
                                 global: false // 缺省为 false
                             }
                         },
                         lineStyle: {
                             width: 1 * bodyScale
                         },
                         data: item
                     })
                 });*/
                that.ec03_radar_fieldDistribution(indicator, seriesData,selectedArr);
            },
            timeout: 3000,
            error() {
                const indicator = [
                    {name: '政治', max: 6500},
                    {name: '经济', max: 16000},
                    {name: '社会', max: 28000},
                    {name: '农业', max: 38000},
                    {name: '能源', max: 52000},
                    {name: '文化', max: 38000},
                    {name: '科技', max: 25000}
                ];
                const seriesData = [
                    {
                        value: [4300, 10000, 3800, 35000, 50000, 19000, 19000],
                        name: '交通'
                    },
                    {
                        value: [5000, 14000, 4800, 31000, 42000, 21000, 5900],
                        name: '游览'
                    },
                    {
                        value: [2300, 10000, 20000, 35000, 50000, 38000, 19000],
                        name: '安全'
                    },
                    {
                        value: [3000, 14000, 6800, 31000, 42000, 21000, 19000],
                        name: '通讯'
                    },
                    {
                        value: [1300, 10000, 18000, 45000, 50000, 33000, 19000],
                        name: '经营'
                    },
                    {
                        value: [6000, 14000, 5800, 51000, 42000, 21000],
                        name: '资源'
                    },
                ];
                that.ec03_radar_fieldDistribution(indicator, seriesData)
            }

        })
    },
    ec03_radar_fieldDistribution(indicator, seriesData,selectedArr) {
        let myChart = echarts.init($("#ec03_radar_fieldDistribution")[0]);
        this.charts.ec02_map3d_globe = myChart;
        myChart.setOption({
            color: ['#008aff', '#41e9ea', '#fffea7', '#fa8e9b',  '#f04965', '#bc8554', '#f3f294', '#4be1d4','#f07f8b','#8ec3ea',],
            tooltip: {
                show: true,
                backgroundColor: '#008aff30',
            },
            legend: {
                type:'scroll',
                pageIconColor:'#008aff',
                pageIconInactiveColor:'#008aff50',//翻页按钮不激活的颜色
                pageTextStyle:{
                    color:'#fff',
                },
                itemHeight: 2.5 * bodyScale,
                itemWidth: 15 * bodyScale,
                bottom: "15%",
                right: '5%',
                width: 270*bodyScale,
                itemGap: 10 * bodyScale,
                textStyle: {
                    fontSize: 12 * bodyScale,
                    color: '#fff'
                },
                selected:selectedArr,
            },
            radar: {
                // shape: 'circle',
                radius: '45%',
                center: ['50%', '34%'],
                name: {
                    textStyle: {
                        fontSize: 12 * bodyScale,
                        color: "#fff",
                        borderRadius: 3 * bodyScale,
                        padding: [3 * bodyScale, 5 * bodyScale]
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 138, 255, 0.2)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 138, 255, 0.2)'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(0, 138, 255, 0)', 'rgba(0, 138, 255, 0.05)']
                    }
                },
                indicator: indicator
            },
            series: [
                {
                    symbol: 'none',
                    name: "领域分布",
                    type: "radar",
                    label: {
                        fontSize: 12 * bodyScale
                    },

                    lineStyle: {
                        width: 1 * bodyScale
                    },
                    data: seriesData
                }
            ]
        })
    },
    ec04_hLine_dataDistribution_a() {
        const that = this
        let max = 0;//数据最大值
        let yAxisData = [];
        let seriesData = [];
        let dataArr = [];
        let quantityFormatter = [];
        $.ajax({
            headers: {
                "token": ''//此处放置请求到的用户token
            },
            // url: '/api/test.json',
            url: this.ctx+'/api/common/innter?dataType=yeesight_pc_homepage_source',
            type: 'get',
            dataType: 'json',
            success: (data) => {
                if (data.msg === 'success') {
                    dataArr = data.data.yeesight
                    dataArr = dataArr.sort(that.sortBy('value'))
                    dataArr.forEach((item, index) => {
                        max = item.max
                        yAxisData.push(item.class)
                        seriesData.push(item.value)
                    });
                    this.ec04_hLine_dataDistribution_d(seriesData, yAxisData, max);
                }
            },
            error() {
                yAxisData = ['政务', '门户', '报刊', '通讯社', '微博'];
                seriesData = [744657, 655887, 604713, 583744, 390583];
                max = 800000;
                that.ec04_hLine_dataDistribution_d(seriesData, yAxisData, max);
            }
        })

    },
    ec04_hLine_dataDistribution_d(seriesData, yAxisData, max) {
        let myChart = echarts.init($("#ec04_hLine_dataDistribution")[0]);
        myChart.setOption({
            tooltip: {},
            grid: {
                left: '8%',
                right: '8%',
                top: '5%',
                bottom: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'value',
                    show: false,
                    axisLabel: {
                        fontSize: 12 * bodyScale,
                        color: '#fff'
                    },
                    max
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisLine: {show: false},
                    axisLabel: {
                        color: '#fff',
                        fontSize: 12 * bodyScale,
                    },
                    axisTick: { //小刻度线
                        show: false
                    },
                    data: yAxisData,

                }, {
                    type: 'category',
                    axisLine: {show: false},
                    axisLabel: {
                        color: '#fff',
                        fontSize: 12 * bodyScale,
                    },
                    axisTick: { //小刻度线
                        show: false
                    },
                    data: seriesData.map(function (item) {
                        console.log(item)
                        return Number(item).toLocaleString();
                    })
                }
            ],
            series: [
                {
                    name: '数据量',
                    type: 'bar',
                    barWidth: 8 * bodyScale,
                    label: {
                        normal: {
                            show: false,
                            verticalAlign: 'top'
                        }
                    },
                    itemStyle: {
                        barBorderRadius: 5 * bodyScale,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: 'rgba(1,136,251,0.1)'},
                                {offset: 1, color: 'rgba(1,136,251,1)'}
                            ]
                        )
                    },
                    zlevel: 3,
                    data: seriesData
                },
                {
                    name: '补位',
                    type: 'bar',
                    itemStyle: {
                        color: '#1f3255',
                        shadowColor: '#1f3255',
                        barBorderRadius: 5 * bodyScale
                    },
                    barGap: '-100%',
                    barWidth: 8 * bodyScale,

                    data: new Array(seriesData.length).fill(max)
                    // data:['59999','59999','59999','59999']
                }
            ]
        })
    },

    /**
     * 按照对象中某个字段给整个对象数组排序
     * @param field 要排序的字段
     * @returns {function(*, *): number}
     */
    sortBy(field) {
        return function (a, b) {
            return a[field] - b[field]
        }
    },
};
Index.init();


//旅客级别 - 环形图
function ec01_circle_getMemberLevel_d(seriesData) {
    let chart = echarts.init($("#ec01_circle_passengerLevel")[0]);
    charts.ec01_circle_passengerLevel = chart;
    chart.setOption(opt_circle);
    chart.setOption({
        title: {
            text: '团散客人数占比',
            textStyle: {
                color: '#fff',
                fontSize: 16 * bodyScale
            },
            x: 'center',
            y: 'bottom'
        },
        series: [{
            startAngle: 0,
            center: ['50%', '45%'],
            label: {
                height: 60 * bodyScale,
                formatter: '{b}\n{c}%',
                fontSize: 18 * bodyScale
            },
            labelLine: {length: 24 * bodyScale},
            data: seriesData
        }].map(function (item, index) {
            return $.extend(true, {}, com_circleSeries, item);
        })
    })
}






