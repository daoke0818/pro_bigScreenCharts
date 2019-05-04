let colors = Cfg.colorData[Cfg.colors];

let c_axisLine = 'rgba(76,180,231,0.33)';
let c_bg_bar = 'rgba(76,180,231,0.15)';

//所有图表的公共属性
let com_charts = {
    color: colors,
    grid: {
        top: '25%',
        bottom: '10%'
    },

    textStyle: {
        fontFamily: 'PingFang SC, sans-serif',
        fontSize: 10 * scale
    },
    legend: {
        itemWidth: 20 * scale,
        itemHeight: 5 * scale,
        inactiveColor: '#666',
        lineHeight: 10 * scale,
        textStyle: {
            color: colors[0],
            fontSize: 16 * scale,
        }
    },
    tooltip: {
        textStyle: {
            fontSize: 16 * scale,
            color: colors[0]
        },
    },
};

//直角坐标系坐标轴
let com_axis = {
    axisLabel: { //标签名称
        color: colors[0],
        margin: 8 * scale,
        fontSize: 16 * scale,
    },
    nameTextStyle: { //坐标轴名称
        color: colors[0],
        fontSize: 18 * scale
    },
    nameGap: 16 * scale, //坐标轴名称距离
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
    }),
    //这里写此类图表其他属性
    tooltip: {
        trigger: 'axis',
    },
});
let seri_line = {
    type: 'line',
    smooth: true,
    lineStyle: {
        width: 1.5 * scale,
        shadowColor: 'rgba(255,255,255,0.4)', //线条外发光
        shadowBlur: 1.5 * scale,
    },
};
let seri_area = $.extend(true, {}, seri_line, {
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
});
let seri_bar_h = {
    type: 'bar',
    // symbol: 'circle',
    // showSymbol: false,
    // smooth: true,
    // lineStyle: {
    //     normal: {
    //         width: 1.5 * scale,
    //         shadowColor: 'rgba(255,255,255,0.4)', //线条外发光
    //         shadowBlur: 1.5 * scale,
    //     }
    // },
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
    tooltip: {
        trigger: 'axis',
    }
    //这里写此类图表其他属性
});
let seri_bar_v = {
    type: 'bar',
    barWidth: '60%'

};
//圆环图 series里的属性设置
let circle_series_label = {
    normal: {
        show: true,
        fontSize: 12 * scale
    },
    emphasis: {
        show: true,
        textStyle: {
            fontSize: 15 * scale,
            fontWeight: 'normal'
        }
    }
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
        backgroundColor: 'rgba(0,51,124,0.8)',
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: "rgba(6,88,255,0.1)",
            }
        },
        textStyle: {
            fontSize: 16 * scale,
            color: '#fff'
        },
    },
    //这里写此类图表其他属性*/
});
let com_lineBarSeries = {
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
        itemWidth: 7 * scale,
        itemHeight: 7 * scale,
        textStyle: {
            fontSize: 12 * scale,
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
            // fontSize: 15 * scale
        }
    },
    radar: {
        center: ['50%', '58%'],
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#0cf',
                fontSize: 12 * scale
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
let opt_pie = $.extend(true, {}, com_charts, {});

let seri_pie = $.extend(true, {}, com_charts, {
    type: 'pie',
    radius: '60%',
    center: ['50%', '55%'],
    label: {
        fontSize: 16 * scale
    },

});
let seri_circle = $.extend(true, {}, com_charts, seri_pie, {
    radius: ['20%', '60%'],

});

function scatterSymbolSize(data) {
    return Math.sqrt(data[2]) * scale / 2;
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
