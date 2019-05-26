let Index = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts)
    },
    loadData() {
        this.ec01_map_geoMap();//
    },
    ec01_map_geoMap() {
        let chart = echarts.init($("#ec01_map_geoMap")[0]); //初始化图表，注意命名的规范合理
        this.charts.ec01_map_geoMap = chart; //放入charts对象方便后面的刷新缩放以及其他操作
        chart.setOption(com_charts); // 设置这个类型（折线图）图表的共性

        chart.setOption({
            grid: {
                top: '5%'
            },
            legend: {
                orient: 'vertical',
                right: 0,
                bottom: 0
            },
            geo: {
                map: 'world',
                roam: true,
                center: [99.85, 32.56],
                zoom: 4.59,
                itemStyle: {
                    areaColor: colors[0]
                }
            },
            series: [
                {
                    name: '我的位置',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbolSize: 8 * scale,
                    itemStyle: {
                        color: 'red',

                    },
                    rippleEffect: {
                        scale: 10 * scale,
                        brushType: 'stroke'
                    }
                }, {
                    name: '玄奘取经路线(去)',
                    zlevel: 10,
                    type: 'lines',
                    coordinateSystem: 'geo',
                    polyline: true,
                    lineStyle: {
                        color: colors[5]
                    },
                    data: [{
                        coords: [
                            [120, 50],
                            [112, 67],
                            [122, 67]
                        ],
                        // 统一的样式设置

                    }]
                }
            ]
        });
        $.get({
                url: 'https://api.asilu.com/geo/',
                dataType: 'jsonp',
            },
            data => {
                let opt = chart.getOption();
                opt.series[0].data = [[data.bd09.lng, data.bd09.lat]];
                chart.setOption(opt)
            }
        );
        //详细版：https://baijiahao.baidu.com/s?id=1596010378178932953&wfr=spider&for=pc
        let xuanZangTo = [
            {name: '西安', oldName: '长安'},
            // {name: '天水', oldName: '秦州'},
            {name: '兰州', oldName: '兰州'},
            {name: '武威', oldName: '凉州'},
            // {name: '张掖', oldName: '甘州'},
            // {name: '肃州', oldName: '酒泉'},
            {name: '瓜州', oldName: '安西'},
            // {name: '窟窿河', oldName: '葫芦河'},
            {name: '玉门关', oldName: '安西县城东五十公里疏勒河南岸双塔堡'},
            {name: '天水', oldName: '秦州'},
            {name: '天水', oldName: '秦州'},
            {name: '天水', oldName: '秦州'},
            {name: '天水', oldName: '秦州'},
            {name: '天水', oldName: '秦州'},
            {name: '天水', oldName: '秦州'},
        ]
    },
};
Index.init();



















