let MapGeo = {
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
                    data: []
                }
            ]
        });
        $.get({
                url: 'https://api.asilu.com/geo/',
                dataType: 'jsonp',
            }, data => {
            let opt = chart.getOption();
            opt.series[0].data = [[data.bd09.lng, data.bd09.lat]];
            chart.setOption(opt)
        }

        );
        //详细版：https://baijiahao.baidu.com/s?id=1596010378178932953&wfr=spider&for=pc
        let xuanZangToPoints = [
            {name: '西安', oldName: '长安'},
            // {name: '天水', oldName: '秦州'},
            {name: '兰州', oldName: '兰州'},
            {name: '武威', oldName: '凉州',remark:'武威市凉州区'},
            // {name: '张掖', oldName: '甘州'},
            // {name: '酒泉', oldName: '肃州'},
            {name: '瓜州', oldName: '安西'},
            // {name: '葫芦河', oldName: '窟窿河'},
            {name: '双塔水库', oldName: '唐代玉门关',remark:'瓜州(曾长期叫安西)县城东五十公里双塔水库'},
            {name: '哈密', oldName: '伊吾'},
            {name: '鄯善', oldName: '白力城'},
            {name: '吐鲁番', oldName: '高昌王城'},
            // {name: '布干台', oldName: '无半城'},
            {name: '焉耆', oldName: '阿耆尼'},
            {name: '阿克苏', oldName: '跋禄迦国'},
            {name: '托克马克', oldName: '碎叶',remark:'今吉尔吉斯之托克马克西南八公里处'},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
            {name: '', oldName: ''},
        ].map(item=> geoCoordMap[item.name]).filter(item=>item);
        let opt = chart.getOption();
        opt.series[1].data = [{coords:xuanZangToPoints}];
        chart.setOption(opt)
        // console.log(xuanZangToPoints)
    },
};
MapGeo.init();



















