let Index = {
    init() {
        // let that = this;
        // this.ctx = 'http://192.168.25.55:9999';
        // this.charts = {};
        this.loadData();
        // Public.chartsResize(this.charts)
    },
    loadData() {
        this.ec01_line_tiobe();//数据走势
        // this.ec02_map3d_globe_a();//地球
        // this.ec03_radar_fieldDistribution_a();//区域分布雷达图
        // this.ec04_hLine_dataDistribution_a();//数据分布横条图
    },
    ec01_line_tiobe() {
        let chart = echarts.init($("#ec01_line_tiobe")[0]);
        chart.setOption(opt_line);
        chart.setOption({
            xAxis: {
                name:'年份',
                nameLocation:'start',
                inverse:true,
                data: ['2019', '2014', '2009', '2004', '1999', '1994', '1989']
            },
            yAxis:{
                name:'排名',
                nameLocation:'start',
                min:1,
                inverse:true
            },
            series: [
                {"name": "Java", data: [1, 2, 1, 1, 12, 0, 0]},
                {"name": "C", data: [2, 1, 2, 2, 1, 1, 1]},
                {"name": "C++", data: [3, 4, 3, 3, 2, 2, 3]},
                {"name": "Python", data: [4, 7, 5, 9, 27, 21, 0]},
                {"name": "Visual Basic .NET", data: [5, 10, 0, 0, 0, 0, 0]},
                {"name": "C#", data: [6, 5, 6, 7, 23, 0, 0]},
                {"name": "JavaScript", data: [7, 8, 8, 8, 17, 0, 0]},
                {"name": "PHP", data: [8, 6, 4, 5, 0, 0, 0]},
                {"name": "SQL", data: [9, 0, 0, 6, 0, 0, 0]},
                // {"name": "Objective" - "C", data: [10, 3, 36, 44, 0, 0, 0]},
                // {"name": "COBOL", data: [25, 20, 16, 11, 3, 9, 12]},
                // {"name": "Lisp", data: [29, 13, 19, 14, 14, 5, 2]},
                // {"name": "Pascal", data: [207, 14, 14, 96, 6, 3, 17]}
            ].map(item => {
                return $.extend(true, {}, seri_line, item)
            })

        })
    }
};

Index.init();