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
let getWeatherPeriod = 1;
let bodyScale = 1;
let [pageH, pageW] = [$(window).height(), $(window).width()];
const Public = {
    ajaxHeaders: {
        token: ''
    },
    chartsResize(charts) {
        window.onresize = () => {
            Object.keys(charts).forEach(item => {
                console.log(item);
                charts[item].resize();
            })
        }
    },
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
                $(this).text(hasVal(parseFloat($(this).text() + 'e' + power).toFixed(n) + str));
            })
        }
    })
})();

function hasVal(val) {
    if (val === null) {
        return '-';
    }
    return val;
}

/**
 * 通过时间对象获取日期和时间格式
 * @param dateObj 时间对象
 * @return {{timeStr: string, dateStr: string, dateStrNoHyphen: string}}
 * @constructor
 */
function DateFormatter(dateObj) {
    let [year, mon, date, hour, min, sec, milliSec] = [
        dateObj.getFullYear(),
        dateObj.getMonth() + 1,
        dateObj.getDate(),
        dateObj.getHours(),
        dateObj.getMinutes(),
        dateObj.getSeconds(),
        dateObj.getMilliseconds()
    ];
    let timeStr = `${hour}:${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
    let dateStr = `${year}-${mon > 9 ? mon : "0" + mon}-${date > 9 ? date : "0" + date}`;
    let dateStrNoHyphen = `${year}${mon > 9 ? mon : "0" + mon}${date > 9 ? date : "0" + date}`;
    let dateStrWithHyphen = `${year}-${mon > 9 ? mon : "0" + mon}-${date > 9 ? date : "0" + date}`;
    return {timeStr, dateStr, dateStrNoHyphen, dateStrWithHyphen, year, mon, date, hour, min, sec,}
}
// 页面顶部时间
let colonShow =true;
function setHeaderTime(){
    setTimeout(function () {
        let t = new Date();
        let timeHtml = `<span class="digital-num">${t.getFullYear()}</span>
                        年<span class="digital-num">${t.getMonth()+1}</span>
                        月<span class="digital-num">${t.getDate()}</span>
                        日<span class="digital-num">
                            ${t.getHours()} 
                            <span class="colon" style="">${colonShow?' :':'&nbsp;'}</span>
                            ${t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes()}
                        </span>`;
        colonShow = !colonShow;
        $("#headerTime").html(timeHtml);


        setHeaderTime();
    },500)
}
setHeaderTime();
function pageResize() {
    [pageH, pageW] = [$(window).height(), $(window).width()];
    if (pageW / pageH > 16 / 9) { //扁
        $("#container").css({width: pageH * 16 / 9, height: '100%'});
        bodyScale = pageH / 1080;
        // console.info("扁")
    } else { //方
        $("#container").css({height: pageW * 9 / 16, width: '100%'});
        bodyScale = pageW / 1920;
        // console.info("方")
    }
    $("html").css("font-size", bodyScale * 16 + "px").css("opacity", 1);
    // console.log("~~~~~~~~~窗口高度：" + pageH + ",\n宽度:" + pageW + " \nbody字号：" + htmlFontSize)
}

pageResize();

onresize = function () {
    pageResize();
    pageResize();

};

//设置请求header
function setHeader(request) {
    request.setRequestHeader("X-Sign", xSign);
    request.setRequestHeader("X-Token", xToken);
}

//获取token
function getToken(loadData) {
    $.post({
        url: domain + '/api/' + version + '/accessToken',
        data: {
            loginName: 'admin',
            password: '123456'
        },
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("Accept", '*/*');
            request.setRequestHeader("X-Platform", "PC");
        },
        success: function (data) {
            // console.log(data);
            if (data.data.accessToken) {
                xToken = data.data.accessToken;
            }
            loadData();
        },
        error: function () {
            loadData();
        }
    });
}

