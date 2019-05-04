# 大屏图表前端开发案例

#### 介绍
笔者入行前端以来，参与过一些大屏图表开发项目，
因经常看到一些前端工作几年的小伙伴们对可视化大屏的等比例缩放的实现总遇到问题，也遇到过图表配置非常冗余导致维护繁琐的情况，
于是笔者总结了一些开发经验，业余时间里系统的完善了一下常见需求，整理一个demo开源出来供需要的小伙伴们参考。
由于笔者水平有限，代码中难免有不合理不优雅的地方，大家可以通过issue或pr或邮箱daoke_li@qq.com一起参与建设。

#### 作者简介
[github](https://github.com)/[码云]( https://gitee.com)昵称**daoke0818**，中文网名**关中刀客在青岛**，个人博客http://e-art.top。
<br>2008年毕业于青岛某**不知名**大学，随后从事过硬件电路、系统仪器、视频后期、淘宝多媒体服务、开花店、视频配乐等工作。
接触编程时已经30岁，决定学前端时31岁，也由于年龄关系，学习效率不比年轻人，学习时间也非常有限，但生活所迫仍奋斗在代码前线上。
<br>在这里也希望所有转行过来的it小伙伴们能坚持下去，平时有空多学习多总结，三五年就能有小成，这些经验可以让自己着手做些喜欢的事，
而不像我这样急促——大部分业余时间不得不花在家里。
<br>欢迎访问我的博客：[关中刀客在青岛](http://e-art.top)

#### 预计要完成的功能
1. 页面内容自动等比例缩放适应大屏。√
2. 图表的配置项抽取各层级公用部分，以对象的合并方式(jquery的extend方法)实现最简配置。√
3. 窗口缩放时图表自动缩放无需刷新。√
4. 图表定时刷新重绘效果，可分别指定需要和不需要刷新的图表。这里仅是前端展示用，也可配合异步加载数据后重绘图表√
5. 页面显示时钟、城市定位和天气。√
6. 四套皮肤更换（含春夏秋冬四季）。√
7. 配置面板，配置内容如下：√
    1. 设计图尺寸
    2. 图表自动刷新频率
    3. 天气预报更新周期
    4. 指定皮肤
8. 增加地球和地图两个页面
9. 以后可能用vue等重构
10. logo制作

#### 目前存在问题
1. 不刷新时的自动缩放图表只能改变图表图形，而图表内文字(如label标签)不会缩放。
4. 配色待优化
5. 多行图例的间距


#### 软件架构
* HTML5结构
* css采用[sass](https://www.sass.hk/)
* 布局采用css3中的[flex](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)
* 部分js使用了ES6+
* 图表采用[百度echarts](http://echarts.baidu.com)
* 缩放原理是通过计算页面和原始尺寸的比例，控制html的fontSize来进行所有元素的尺寸缩放，元素尺寸单位用rem。

#### 使用说明
1. 先配置设计图尺寸
    ``` 
    const Cfg = {
           designW: 1920, //设计图宽度
           designH: 1080, //设计图高度
           getWeatherPeriod: 5, //天气预报更新周期（分）
           chartRefreshPeriod: 10 // 图表刷新周期（秒）
       };
    ```
    <!--尺寸用62.5%的HTML字号，即1rem=10px。-->
2. 开发过程中，遇到图表先用最简单的代码画出来，然后再根据设计图梳理一下，哪些配置是共性，哪些是个性，共性的就在chartsCom.js里修改，个性的就在图表实例下修改。
    ```
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
            ...
        ].map(item => {
            return $.extend(true, {}, seri_line,// 折线图图表series的共性
                { // 本图表series的个性
                    smooth: false,
                    showSymbol: false,
            }, item)
        })
    })
    ```
3. css中尺寸单位用rem，js中图表配置里的长度数值都要乘以scale。


#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md，Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)