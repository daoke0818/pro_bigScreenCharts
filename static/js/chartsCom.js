// let bodyScale = 1;

let colors = [
    '#4cb4e7',
    '#ffc09f',
    '#ffee93',
    '#e2dbbe',
    '#a3a380',
    // '#ffc002',
];
let c_axisLine = 'rgba(76,180,231,0.33)';
let c_bg_bar = 'rgba(76,180,231,0.15)';
let [cTextWeek, cSplitLine] = ["#0083b3", "#0083b3"];
let barWidth = 14 * bodyScale;
let lineStyle = {
    shadowColor: 'rgba(255, 255, 255, 1)',
    shadowBlur: 2 * bodyScale
};

let geoCoordMap = {
    '上海': [121.4648, 31.2891],
    '东莞': [113.8953, 22.901],
    '东营': [118.7073, 37.5513],
    '中山': [113.4229, 22.478],
    '临汾': [111.4783, 36.1615],
    '临沂': [118.3118, 35.2936],
    '丹东': [124.541, 40.4242],
    '丽水': [119.5642, 28.1854],
    '乌鲁木齐': [87.9236, 43.5883],
    '佛山': [112.8955, 23.1097],
    '保定': [115.0488, 39.0948],
    '兰州': [103.5901, 36.3043],
    '包头': [110.3467, 41.4899],
    '北京': [116.4551, 40.2539],
    '北海': [109.314, 21.6211],
    '南京': [118.8062, 31.9208],
    '南宁': [108.479, 23.1152],
    '南昌': [116.0046, 28.6633],
    '南通': [121.1023, 32.1625],
    '厦门': [118.1689, 24.6478],
    '台州': [121.1353, 28.6688],
    '合肥': [117.29, 32.0581],
    '呼和浩特': [111.4124, 40.4901],
    '咸阳': [108.4131, 34.8706],
    '哈尔滨': [127.9688, 45.368],
    '唐山': [118.4766, 39.6826],
    '嘉兴': [120.9155, 30.6354],
    '大同': [113.7854, 39.8035],
    '大连': [122.2229, 39.4409],
    '天津': [117.4219, 39.4189],
    '太原': [112.3352, 37.9413],
    '威海': [121.9482, 37.1393],
    '宁波': [121.5967, 29.6466],
    '宝鸡': [107.1826, 34.3433],
    '宿迁': [118.5535, 33.7775],
    '常州': [119.4543, 31.5582],
    '广州': [113.5107, 23.2196],
    '廊坊': [116.521, 39.0509],
    '延安': [109.1052, 36.4252],
    '张家口': [115.1477, 40.8527],
    '徐州': [117.5208, 34.3268],
    '德州': [116.6858, 37.2107],
    '惠州': [114.6204, 23.1647],
    '成都': [103.9526, 30.7617],
    '扬州': [119.4653, 32.8162],
    '承德': [117.5757, 41.4075],
    '拉萨': [91.1865, 30.1465],
    '无锡': [120.3442, 31.5527],
    '日照': [119.2786, 35.5023],
    '昆明': [102.9199, 25.4663],
    '杭州': [119.5313, 29.8773],
    '枣庄': [117.323, 34.8926],
    '柳州': [109.3799, 24.9774],
    '株洲': [113.5327, 27.0319],
    '武汉': [114.3896, 30.6628],
    '汕头': [117.1692, 23.3405],
    '江门': [112.6318, 22.1484],
    '沈阳': [123.1238, 42.1216],
    '沧州': [116.8286, 38.2104],
    '河源': [114.917, 23.9722],
    '泉州': [118.3228, 25.1147],
    '泰安': [117.0264, 36.0516],
    '泰州': [120.0586, 32.5525],
    '济南': [117.1582, 36.8701],
    '济宁': [116.8286, 35.3375],
    '海口': [110.3893, 19.8516],
    '淄博': [118.0371, 36.6064],
    '淮安': [118.927, 33.4039],
    '深圳': [114.5435, 22.5439],
    '清远': [112.9175, 24.3292],
    '温州': [120.498, 27.8119],
    '渭南': [109.7864, 35.0299],
    '湖州': [119.8608, 30.7782],
    '湘潭': [112.5439, 27.7075],
    '滨州': [117.8174, 37.4963],
    '潍坊': [119.0918, 36.524],
    '烟台': [120.7397, 37.5128],
    '玉溪': [101.9312, 23.8898],
    '珠海': [113.7305, 22.1155],
    '盐城': [120.2234, 33.5577],
    '盘锦': [121.9482, 41.0449],
    '石家庄': [114.4995, 38.1006],
    '福州': [119.4543, 25.9222],
    '秦皇岛': [119.2126, 40.0232],
    '绍兴': [120.564, 29.7565],
    '聊城': [115.9167, 36.4032],
    '肇庆': [112.1265, 23.5822],
    '舟山': [122.2559, 30.2234],
    '苏州': [120.6519, 31.3989],
    '莱芜': [117.6526, 36.2714],
    '菏泽': [115.6201, 35.2057],
    '营口': [122.4316, 40.4297],
    '葫芦岛': [120.1575, 40.578],
    '衡水': [115.8838, 37.7161],
    '衢州': [118.6853, 28.8666],
    '西宁': [101.4038, 36.8207],
    '西安': [109.1162, 34.2004],
    '贵阳': [106.6992, 26.7682],
    '连云港': [119.1248, 34.552],
    '邢台': [114.8071, 37.2821],
    '邯郸': [114.4775, 36.535],
    '郑州': [113.4668, 34.6234],
    '鄂尔多斯': [108.9734, 39.2487],
    '重庆': [107.7539, 30.1904],
    '金华': [120.0037, 29.1028],
    '铜川': [109.0393, 35.1947],
    '银川': [106.3586, 38.1775],
    '镇江': [119.4763, 31.9702],
    '长春': [125.8154, 44.2584],
    '长沙': [113.0823, 28.2568],
    '长治': [112.8625, 36.4746],
    '阳泉': [113.4778, 38.0951],
    '青岛': [120.4651, 36.3373],
    '韶关': [113.7964, 24.7028],
    '敦煌': [94.71, 40.13]
};
//所有图表的公共属性
let com_charts = {
    color: colors,
    textStyle: {
        fontFamily: 'PingFang SC, sans-serif',
        // color: '#fff',
        fontSize: 10 * bodyScale
    },
    legend: {
        // padding:[0,5*bodyScale],
        itemWidth: 20 * bodyScale,
        itemHeight: 5 * bodyScale,
        inactiveColor:'#666',
        lineHeight:10*bodyScale,
        textStyle:{
            color:colors[0],
            fontSize:16*bodyScale,
        }
    },
    tooltip: {
        // backgroundColor:'rgba(0,51,124,0.8)',
        // axisPointer: {
        //     type: 'shadow',
        //     shadowStyle:{
        //         color:"rgba(6,88,255,0.1)",
        //     }
        // },
        textStyle:{
            fontSize:16*bodyScale,
            color:colors[0]
        },
    },
    grid: {
        top:'15%',
        left: '10%',
        right: '10%',
        bottom: '20%',
    },
};

//直角坐标系坐标轴
let com_axis = {
    axisLabel: { //标签名称
        color: colors[0],
        margin: 8 * bodyScale,
        fontSize: 16 * bodyScale,
        // fontWeight: 'bold'
    },
    nameTextStyle: { //坐标轴名称
        color:colors[0],
        fontSize: 18 * bodyScale
    },
    nameGap: 16 * bodyScale, //坐标轴名称距离
    axisTick: { //小刻度线
        show: false
    },
    axisLine: { //坐标轴
        show: true,
        lineStyle: {
            color: c_axisLine
        }
    },
    splitLine: { //分割线
        show: false,
    },
    boundaryGap: false
};

//折线图公共属性
let opt_line = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        type: 'category',
    }),
    yAxis: $.extend(true, {}, com_axis, {
        type: 'value',
        // nameGap: 10 * bodyScale,
        // nameTextStyle: {
        //     padding: [0, 12 * bodyScale, 0, 0],
        // }
    }),
    legend: {
        itemHeight: 5 * bodyScale,
        itemWidth: 15 * bodyScale,
        top:0,
    },
    grid:{
        top:'25%',
        bottom:'10%'
    },
    //这里写此类图表其他属性
    tooltip: {
        trigger: 'axis',
        /*backgroundColor:'rgba(0,51,124,0.8)',
        axisPointer: {
            type: 'shadow',
            shadowStyle:{
                color:"rgba(6,88,255,0.1)",
            }
        },
        textStyle:{
            fontSize:16*bodyScale,
            color:'#fff'
        },*/
    },
});
let seri_line = {
    type: 'line',
    symbol: 'circle',
    showSymbol: false,
    smooth: true,
    lineStyle: {
        normal: {
            width:1.5*bodyScale,
            shadowColor: 'rgba(255,255,255,0.4)', //线条外发光
            shadowBlur: 1.5*bodyScale,
        }
    },
};
let seri_area = $.extend(true,{},seri_line,{
    areaStyle: {
        color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: colors[0] // 0% 处的颜色
            }, {
                offset: 1, color: 'transparent' // 100% 处的颜色
            }]
        }
    }
});

// let opt_area = $.extend(true, {}, com_charts,opt_line)
//横条图公共属性
let opt_bar_h = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        type: 'value'
    }),
    yAxis: $.extend(true, {}, com_axis, {
        boundaryGap: true,
        type: 'category'
    }),
    barWidth: '60%'
});
let seri_bar_h = {
    type: 'bar',
    symbol: 'circle',
    showSymbol: false,
    smooth: true,
    lineStyle: {
        normal: {
            width:1.5*bodyScale,
            shadowColor: 'rgba(255,255,255,0.4)', //线条外发光
            shadowBlur: 1.5*bodyScale,
        }
    },
};
//竖条图公共属性
let opt_bar_v = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        boundaryGap: true,
        type: 'category'
    }),
    yAxis: $.extend(true, {}, com_axis, {
        type: 'value'
    }),
    tooltip:{
        trigger: 'axis',
    }
    //这里写此类图表其他属性
});
let seri_bar_v = {
    type: 'bar',
    barWidth: '40%'

};
//圆环图 series里的属性设置
let circle_series_label = {
    normal: {
        show: true,
        fontSize: 12 * bodyScale
    },
    emphasis: {
        show: true,
        textStyle: {
            fontSize: 15 * bodyScale,
            fontWeight: 'normal'
        }
    }
};
let circle_series_labline = {
    normal: {
        show: true,
    }

};
let axisLine_Y = {
    lineStyle: {
        color: '#0083b3'
    }
};
let splitLine = {
    show: false
};


//竖柱条组合图公共属性
let com_lineBar_vertical = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        boundaryGap: true,
        type: 'category'
    }),
    yAxis: [
        {
            min: 0,
            max: 250,
            interval: 50,

        },
        {
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {       //y轴
                show: false
            },
            axisTick: {       //y轴刻度线
                show: false
            },
            splitLine: {     //网格线
                show: false
            }
        }
    ].map(function (item, index) {
        return $.extend(true, {type: 'value'}, com_axis, item);
    }),
    legend: {
        show: true,
        x: 'right',
        y: 'top',
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor:'rgba(0,51,124,0.8)',
        axisPointer: {
            type: 'shadow',
            shadowStyle:{
                color:"rgba(6,88,255,0.1)",
            }
        },
        textStyle:{
            fontSize:16*bodyScale,
            color:'#fff'
        },
    },
     //这里写此类图表其他属性*/
});
let com_lineBarSeries ={
    type: 'bar',
    barGap: 0,
    barWidth: '30%',
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 1, color: '#227cff'},
                    //{offset: 0.5, color: '#188df0'},
                    {offset: 0, color: '#2377fe'}
                ]
            )
        }
    },
};

let com_circleSeries = {
    type: 'pie',
    radius: ['45%', '65%'],
}
//散点图公共属性
let opt_scatter = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        type: 'category'
    }),
    yAxis: $.extend(true, {}, com_axis, {
        type: 'category'
    }),

    //这里写此类图表其他属性

});

//雷达图公共属性
let opt_radar = $.extend(true, {}, {
    legend: {
        itemWidth: 7 * bodyScale,
        itemHeight: 7 * bodyScale,
        textStyle: {
            fontSize: 12 * bodyScale,
            color: cTextWeek, //图例白色,全局样式不能影响到
        },
        top: '2%',
        left: 'right',
        orient: 'vertical'
    },
    tooltip: {
        axisPointer: {
            label: {
                backgroundColor: '#6a7985'
            }
        },
        textStyle: {
            align: 'left',
            fontFamily: 'PingFang SC, sans-serif',
            // fontSize: 15 * bodyScale
        }
    },
    radar: {
        center: ['50%', '58%'],
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#0cf',
                fontSize: 12 * bodyScale
                // backgroundColor: '#999',
                // borderRadius: 3,
                // padding: [3, 5]
            }
        },

        splitArea: {
            areaStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#0cf'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#0cf'
            }
        }
    },
});
//饼图公共属性
let opt_pie = $.extend(true, {}, com_charts, {

});

let seri_pie = $.extend(true, {}, com_charts, {
    type:'pie',
    radius:'60%',
    center:['50%','55%'],
    label:{
        fontSize:16*bodyScale
    },

});
let seri_circle = $.extend(true, {}, com_charts, seri_pie,{
    radius:['20%','60%'],

});

function scatterSymbolSize(data) {
    return Math.sqrt(data[2]) * bodyScale / 2;
}

function lineAreaStyle(index) {
    return {
        color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: colors[index] // 0% 处的颜色
            }, {
                offset: 1, color: '#00adef11' // 100% 处的颜色
            }]
        }
    }

}

let [planePath, fighter, star] = ['path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    'path://M494.521958 24.17971199c-45.699789 6.34173401-66.025779 85.663437-72.025395 117.68094701-3.843584 20.485427-5.638451 85.725901-4.65705 191.326208-12.159898 6.959821-43.276595 24.822374-82.359808 47.340134-10.474598-11.662029-40.452301-44.619981-54.63121901-55.886029-25.983795-20.643021-38.269645 7.100006-38.23278099 26.34711 0.0256 19.533619 0 74.446541 0 83.18904301-71.003136 41.183642-141.403546 82.377523-165.938278 97.99167999-55.611597 35.388416-29.318758 104.157389 0 101.114982 26.371584-2.739507 292.381082-71.70601 345.573581-85.544755 0.09001 2.951373 0.15145 5.731738 0.245555 8.702566 2.394522 80.854733 11.654451 149.065011 22.78697 204.360602-18.16064 16.956928-78.32279 72.931942-115.815731 106.08332799-45.595443 40.314778-10.207437 62.112154 5.054157 59.66223401 43.798528-7.03037399 137.783091-34.860339 145.493709-37.156762 3.8016 15.28780801 9.184154 24.915456 15.181722 25.00649 0.023552 0.054272 0.063488 0.101274 0.09001 0.153498 0.0256-0.052224 0.075674-0.106394 0.107418-0.155546 5.988352-0.114586 11.362816-9.735066 15.156224-25.005466 7.69833 2.28823 101.695181 30.126387 145.497805 37.15676199 15.259546 2.44992 50.6496-19.347456 5.056205-59.66223399-37.497037-33.151386-97.65816301-89.125478-115.817779-106.083328 11.136614-55.29559 20.394496-123.50586901 22.789018-204.36060199 0.092058-2.970829 0.153498-5.751194 0.243507-8.70256601 53.193523 13.838746 319.204045 82.805248 345.573581 85.544755 29.32183 3.04240599 55.612621-65.726566 0-101.114982-24.531763-15.615283-94.933094-56.808141-165.935206-97.99168001 0-8.742502-0.027648-63.655322 0-83.18904299 0.03584-19.248128-12.25001-46.990131-38.233805-26.34711-14.17789401 11.267072-44.15365101 44.224-54.635315 55.886029-39.081062-22.51776-70.196736-40.380314-82.354688-47.340134 0.979354-105.600307-0.817664-170.840781-4.659098-191.326208C562.076467 109.843149 537.064858 28.900352 494.521958 24.17971199',
    'path://M525.837838 852.410811L199.264865 1001.859459l41.513513-357.016216L0 381.924324l351.481081-69.189189L525.837838 0l174.356757 312.735135L1051.675676 381.924324l-240.778379 262.918919 41.513514 357.016216z'];
