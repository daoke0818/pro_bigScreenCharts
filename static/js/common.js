/**
 * Created by Administrator on 2018/7/4.
 */
//天气预报更新周期
// let domain = "http://localhost:9999";
let domain = "http://172.16.3.170:9999";
let version = "v1"; //接口版本
let xSign = "hlsofttech"; //系统签名-加密值 不同平台签名不同
let xToken = "zuo"; //用户认证信息-可以通过接口获取 暂时写死
let clientUrl = domain + "/api/" + version + "/common/interface/getByDataType";//接口地址 定量
let param = {"dataType": "a_a_a_a", "params": "time::20180731;;cbkCode::;;startIndex::1;;pageSize::10"};//接口请求参数 变量   新增用户数
let todayDate = '';
let yesterdayDate = '';
let beforeYesterdayDate = '';
let beforeYesterdayDateWithHyphen = '';
let hasGetWeather = false;
let getWeatherPeriod = 5;
const chartRefreshPeriod = 10;
let scale = 1;
let [pageH, pageW] = [$(window).height(), $(window).width()];
const Public = {
    ajaxHeaders: {
        token: ''
    },
    hasVal(val) {
        if (val === null) {
            return '-';
        }
        return val;
    },
    chartsResize(charts) {
        $(window).resize(() => {
            Object.keys(charts).forEach(item => {
                charts[item].resize();
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
    chartsReDraw(charts, t = chartRefreshPeriod, noRefresh, someRefresh) {
        let counter = setInterval(() => {
            Object.keys(charts).forEach(item => {
                if (noRefresh.includes(item) && !someRefresh.includes(item)) return;
                let chart = charts[item];
                let opt = chart.getOption();
                chart.clear();
                chart.setOption(opt);
            })
        }, t * 1000)

    }
};

// 自定义方法
(function initTools() {
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
})();

//jsonP
function onBack(data) {
}

//获取天气情况
function getWeather(currTime) {
    // 获取地理位置
    $.get({
        url: 'https://api.asilu.com/weather_v2/',
        type: 'get',
        dataType: 'jsonp',  // 请求方式为jsonp
        jsonpCallback: "onBack",    // 自定义回调函数名
        success: function (data) {
            const city = data.forecasts[0].city;

            //如果以后找到合适的天气图标将替代和风天气
            /*
            let temperatureTxt = '';
            let daily_forecast = data.forecasts[0].casts[0];
            let [code, txt] = ['', ''];
            if ((currTime.getHours() >= 6) && (currTime.getHours() < 18)) {
                code = daily_forecast.cond_code_d;
                txt = daily_forecast.dayweather;
                temperatureTxt = daily_forecast.nighttemp + "℃~" + daily_forecast.daytemp + "℃";
            } else {
                code = daily_forecast.cond_code_n;
                txt = daily_forecast.nightweather;
                temperatureTxt = daily_forecast.daytemp + "℃~" + daily_forecast.nighttemp + "℃";
            }
            $("#weather").html(txt + '&emsp;' + city);
            $("#temperature").text(temperatureTxt);
*/
            // $("#weatherIcon").css('background-image', `url("https://cdn.heweather.com/cond_icon/${code}.png")`);


            // 官方文档 http://www.heweather.com/douments/api/s6/weather-forecast 因为要用图标，所以暂时还是用了和风天气
            $.get(`https://free-api.heweather.com/s6/weather/forecast?location=${city}&key=7e07c4303b4841e6b1595dca70f9d4a7`, data => {
                let temperatureTxt = '';
                let daily_forecast = data.HeWeather6[0].daily_forecast[0];
                let [code, txt] = ['', ''];
                if ((currTime.getHours() >= 6) && (currTime.getHours() < 18)) {
                    code = daily_forecast.cond_code_d;
                    txt = daily_forecast.cond_txt_d;
                    temperatureTxt = daily_forecast.tmp_min + "℃~" + daily_forecast.tmp_max + "℃";
                } else {
                    code = daily_forecast.cond_code_n;
                    txt = daily_forecast.cond_txt_n;
                    temperatureTxt = daily_forecast.tmp_max + "℃~" + daily_forecast.tmp_min + "℃";
                }
                $("#weather").html(txt+'&emsp;'+city);
                $("#temperature").text(temperatureTxt);
                $("#weatherIcon").css('background-image', `url("https://cdn.heweather.com/cond_icon/${code}.png")`);
            })
        }
    })

}

// 页面顶部时间
let colonShow = true;

function setHeaderTime() {
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
            getWeather(t);
            hasGetWeather = true;
        } else {
            if (min % getWeatherPeriod === 0 && sec === 0 && milliSec < 500) {
                getWeather(t);
            }
        }
        console.log(sec)
        setHeaderTime();
    }, 500)
}

setHeaderTime();

function pageResize() {
    [pageH, pageW] = [$(window).height(), $(window).width()];
    if (pageW / pageH > 16 / 9) { //扁
        $("#container").css({width: pageH * 16 / 9, height: '100%'});
        scale = pageH / 1080;
        // console.info("扁")
    } else { //方
        $("#container").css({height: pageW * 9 / 16, width: '100%'});
        scale = pageW / 1920;
        // console.info("方")
    }
    $("html").css("font-size", scale * 16 + "px").css("opacity", 1);
    // console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + scale)
}

pageResize();
$(window).resize(() => {
    pageResize();
});

//设置请求header
function setHeader(request) {
    request.setRequestHeader("X-Sign", xSign);
    request.setRequestHeader("X-Token", xToken);
}

