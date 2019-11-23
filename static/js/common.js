/**
 * Created by Administrator on 2019/4/19.
 */
let settings = JSON.parse(localStorage.getItem('settings')) || {};
const Cfg = {
    designW: settings.designW || 1920, //设计图宽度
    designH: settings.designH || 1080, //设计图高度
    zoomMode: settings.zoomMode || (innerWidth < 768 ? 'cover' : 'contain'),
    notebookOptim: [undefined, true].includes(settings.notebookOptim),
    getWeatherPeriod: settings.getWeatherPeriod || 5, //天气预报更新周期（分）
    chartRefreshPeriod: settings.chartRefreshPeriod || 10, // 图表刷新周期（秒）
    colors: settings.colors || 'default',
    colorData: {//配色方案，部分色彩参考 http://rmco.jp/coloringroom/haisyoku_rei/haisyoku_haru.html
        default: ['lightskyblue', 'orange', 'greenyellow', 'limegreen',
            'mediumturquoise', 'mediumpurple'],
        spring: ['#BEDC6E', '#FA8C8C', '#FAAAC8', '#FAC8C8',
            '#FFFFE6', '#6E6464'],
        summer: ['#FFAE00', '#FF5200', '#007AFF', '#00BF05',
            '#DCFFFF', '#505064'],
        autumn: ['#c1ad2f',/*'#A5912D',*/ '#782323', '#783723', '#A05027',
            '#FAE6DC', '#283C14'],
        winter: ['#F5F5FA', '#96822D', '#6E5A19', '#BECDEB',
            '#E1E1F0', '#281E1E'],
    },
    hideGesture: settings.hideGesture
};
let hasGetWeather = false;
let scale = 1;
let notebookOptim = true;
let colonShow = true;
let [pageH, pageW] = [$(window).height(), $(window).width()];
const weather2Code = {
    "晴": 100,
    "多云": 101,
    "少云": 102,
    "晴间多云": 103,
    "阴": 104,
    "有风": 200,
    "平静": 201,
    "微风": 202,
    "和风": 203,
    "清风": 204,
    "强风/劲风": 205,
    "疾风": 206,
    "大风": 207,
    "烈风": 208,
    "风暴": 209,
    "狂爆风": 210,
    "飓风": 211,
    "龙卷风": 212,
    "热带风暴": 213,
    "阵雨": 300,
    "强阵雨": 301,
    "雷阵雨": 302,
    "强雷阵雨": 303,
    "雷阵雨伴有冰雹": 304,
    "小雨": 305,
    "中雨": 306,
    "大雨": 307,
    "极端降雨": 308,
    "毛毛雨/细雨": 309,
    "暴雨": 310,
    "大暴雨": 311,
    "特大暴雨": 312,
    "冻雨": 313,
    "小到中雨": 314,
    "中到大雨": 315,
    "大到暴雨": 316,
    "暴雨到大暴雨": 317,
    "大暴雨到特大暴雨": 318,
    "雨": 399,
    "小雪": 400,
    "中雪": 401,
    "大雪": 402,
    "暴雪": 403,
    "雨夹雪": 404,
    "雨雪天气": 405,
    "阵雨夹雪": 406,
    "阵雪": 407,
    "小到中雪": 408,
    "中到大雪": 409,
    "大到暴雪": 410,
    "雪": 499,
    "薄雾": 500,
    "雾": 501,
    "霾": 502,
    "扬沙": 503,
    "浮尘": 504,
    "沙尘暴": 507,
    "强沙尘暴": 508,
    "浓雾": 509,
    "强浓雾": 510,
    "中度霾": 511,
    "重度霾": 512,
    "严重霾": 513,
    "大雾": 514,
    "特强浓雾": 515,
    "热": 900,
    "冷": 901,
    "未知": 999,
};
const Public = {
    hasVal(val) {
        if (val === null) {
            return '-';
        }
        return val;
    },
    // 页面顶部时间
    setHeaderTime() {
        setTimeout(function () {
            let t = new Date();
            let [year, mon, date, hour, min, sec, milliSec] = [
                t.getFullYear(),
                t.getMonth() + 1,
                t.getDate(),
                t.getHours(),
                t.getMinutes(),
                t.getSeconds(),
                t.getMilliseconds()
            ];
            let timeHtml = `
                <span class="date"> ${year}-${mon}-${date}</span>
                <span class="digital-num">
                    ${hour} 
                    <span class="colon" style="">${colonShow ? ' :' : '&nbsp;'}</span>
                    ${(min + "").padStart(2, '0')}
                </span>`;
            colonShow = !colonShow;
            $("#headerTime").html(timeHtml);
            if (!hasGetWeather) {
                Public.getWeather(t);
                hasGetWeather = true;
            } else {
                if (min % Cfg.getWeatherPeriod === 0 && sec === 0 && milliSec < 500) {
                    Public.getWeather(t);
                }
            }
            Public.setHeaderTime();
        }, 500)
    },
    // 获取天气情况
    getWeather(currTime) {
        // 获取地理位置
        $.get({
            //这里的url不能写到data对象的外面
            url: 'https://api.asilu.com/weather_v2/',
            dataType: 'jsonp',  // 请求方式为jsonp
            success: function (data) {
                const city = data.forecasts[0].city;
                let temperatureTxt = '';
                let daily_forecast = data.forecasts[0].casts[0];
                let [code, txt] = ['', ''];
                if ((currTime.getHours() >= 6) && (currTime.getHours() < 18)) {
                    txt = daily_forecast.dayweather;
                    temperatureTxt = daily_forecast.nighttemp + "℃~" + daily_forecast.daytemp + "℃";
                } else {
                    txt = daily_forecast.nightweather;
                    temperatureTxt = daily_forecast.daytemp + "℃~" + daily_forecast.nighttemp + "℃";
                }
                $("#weather").html(txt + '&emsp;' + city);
                $("#temperature").text(temperatureTxt);
                $("#weatherIcon").css('background-image', `url("https://cdn.heweather.com/cond_icon/${weather2Code[txt]}.png")`);
            }
        })

    },
    //页面缩放
    pageResize() {
        [pageH, pageW] = [$(window).height(), $(window).width()];
        let isWider = pageW / pageH > Cfg.designW / Cfg.designH;
        let [scaleW, scaleH] = [pageW / Cfg.designW, pageH / Cfg.designH];
        let $container = $("#container");
        switch (Cfg.zoomMode) {
            case "contain":
                if (isWider) {
                    $container.css({width: pageH * Cfg.designW / Cfg.designH, height: '100%'});
                } else {
                    $container.css({height: pageW * Cfg.designH / Cfg.designW, width: '100%'});
                }
                scale = isWider ? scaleH : scaleW;
                break;
            case 'cover':
                $("html,body").css('overflow', 'initial');
                if (isWider) {
                    $container.css({height: pageW * Cfg.designH / Cfg.designW, width: '100%'});
                } else {
                    $container.css({width: pageH * Cfg.designW / Cfg.designH, height: '100%'});
                }
                scale = isWider ? scaleW : scaleH;
                break;
            case 'stretch':
                scale = isWider ? scaleH : scaleW;
                $container.css({width: '100%'}, {height: '100%'});
                break;
        }
        $("html").css("font-size", scale * 16 + "px").css("opacity", 1);
        notebookOptim = !(Cfg.notebookOptim === false || scale > .75);
        // console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + scale)
    },
    //图表缩放
    chartsResize(charts, param) {
        $(window).resize(() => {
            Object.keys(charts).forEach(id => {
                if (param && param.notResize.includes(id)) {
                    return
                }
                charts[id].resize();
            })
        });
    },
    /**
     *
     * @param charts
     * @param t 默认刷新时间（秒）
     * @param noRefresh 无需刷新的图表
     * @param someRefresh 指定要刷新的图表，有重复指定的图表时优先权高于noRefresh
     */
    chartsReDraw(charts, t = Cfg.chartRefreshPeriod, noRefresh, someRefresh) {
        let counter = setInterval(() => {
            Object.keys(charts).forEach(item => {
                if (noRefresh && noRefresh.includes(item) && !(someRefresh && someRefresh.includes(item))) return;
                let chart = charts[item];
                let opt = chart.getOption();
                chart.clear();
                chart.setOption(opt);
            })
        }, (t || Cfg.chartRefreshPeriod) * 1000)

    },
    // 自定义方法
    initTools() {
        $.fn.extend({
            /**
             * 将文本转为数字并保留相应小数位数
             * @param n 小数位数
             * @param power 数据缩放到10的多少次方
             * @param str 后面可以跟上个字符串，比如‘%’
             */
            str2NumFixed: function (n, power, str = '') {
                $.each($(this), function () {
                    $(this).text(Public.hasVal(parseFloat($(this).text() + 'e' + power).toFixed(n) + str));
                })
            }
        })
    }
};

//jsonP
function onBack(data) {
}

Public.pageResize();
let init = () => {
    Public.initTools(); // 自定义方法
};

$(window).resize(() => {
    Public.pageResize();
});

$(function () {
    // 加载源不能写成body>header>*,原因不明
    $('#container>header').load('common.html header>*', function () {
        if ($('body').attr('id') === 'pb_studyPlan') {
            $('header>h1').text('学习进度执行图表')
        }
        Public.setHeaderTime(); // 页面顶部时间
        if (Cfg.zoomMode === 'cover' && !Cfg.hideGesture) {
            $('header').addClass('showGesture')
        }

    });
    // 加载设置面板
    $('body>aside').load('common.html aside >*', function () {
        $("#getWeatherPeriod").val(settings.getWeatherPeriod || 5);
        $("#chartRefreshPeriod").val(settings.chartRefreshPeriod || 10);
        $("#notebookOptim").attr('checked', [undefined, true].includes(settings.notebookOptim));
        $("#designW").val(settings.designW || 1920);
        $("#designH").val(settings.designH || 1080);
        $("#" + Cfg.zoomMode).prop('checked', true);
        let $colors = $("body>aside .colors");
        Object.keys(Cfg.colorData).forEach(item => {
            $colors.append(`
            <label for="colors_${item}">
                <input type="radio" id="colors_${item}" name="colors" ${Cfg.colors === item ? 'checked' : ''}><span>${item}</span>
            </label>
        `)
        });
    });
    // 保存设置
    $("body").on('click', '#saveSetting', function () {
        settings = {
            getWeatherPeriod: $("#getWeatherPeriod").val(),
            chartRefreshPeriod: $("#chartRefreshPeriod").val(),
            notebookOptim: $("#notebookOptim").is(":checked"),
            designW: $("#designW").val(),
            designH: $("#designH").val(),
            colors: $("body>aside input[type=radio][name=colors]:checked").next().text(),
            zoomMode: $("body>aside input[type=radio][name=zoomMode]:checked").next().text(),
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        window.location.reload();
    }).on('click', '#container>header', function () {
        if (!Cfg.hideGesture) {
            $(this).removeClass('showGesture');
            settings.hideGesture = true;
            localStorage.setItem('settings', JSON.stringify(settings))
        }
    });
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    // body的id以“pb_”开头的将作为屏保，无需alert
    if (!(sessionData && sessionData.settingTip) && !$('body').attr('id').startsWith('pb_')) {
        alert('请把鼠标移动到屏幕左侧边靠下的位置，可以滑出设置面板。' +
            '\n如果浏览器已经解除最小字号限制，请在设置面板中取消“低分辨率优化”的勾选。');
        sessionStorage.setItem('sessionData', JSON.stringify({settingTip: true}))
    }


});
