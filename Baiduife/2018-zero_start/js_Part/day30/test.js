
// 主体程序
$(document).ready(function () {
    var region = $('#region');
    var product = $('#product');
    // var month = $('#month');
    // 全选标签
    var checkAll_region = $('#region .checkAll');
    var checkAll_product = $('#product .checkAll');
    // 获取用户提交的查询
    getSearchInput();

    // checkbox框的事件代理
    checkAll_region.click(function () {
        var currentItem = this;
        JudgeCheckAll(true, currentItem);
    });
    checkAll_product.click(function () {
        var currentItem = this;
        JudgeCheckAll(false, currentItem);
    });
    region.delegate("input:not('.checkAll')", 'click', function () {
        var currentItem = this;
        JudgeCheckBox(true, currentItem);
    });
    product.delegate("input:not('.checkAll')", 'click', function () {
        var currentItem = this;
        JudgeCheckBox(false, currentItem);
    });
    $('button').click(function () {
        var result = getSearchInput();
        console.log(result);
        showTable(result)
    })
});



// 全选框的事件代理
function JudgeCheckAll(flag, currentItem) {
    var inputList;
    var inputList_region = $("#region input:not('.checkAll')");
    var inputList_product = $("#product input:not('.checkAll')");
    // true为地点代理
    if (flag == true) {
        inputList = inputList_region;
    }
    // false为产品代理
    else {
        inputList = inputList_product;
    }
    if (currentItem.checked == true) {
        inputList.each(function () {
            $(this).prop('checked', true);
        });
    } else {
        inputList.each(function () {
            $(this).prop('checked', false);
        });
    }
}

// 普通框的事件代理
function JudgeCheckBox(flag, currentItem) {
    // 统计选中数目s
    var checkCount = 0;
    // 未选中的数目
    var notCheckCount = 0;
    // 获取当前点击对象的副本
    var checkAll_region = $('#region .checkAll');
    var checkAll_product = $('#product .checkAll');
    var inputList_region = $("#region input:not('.checkAll')");
    var inputList_product = $("#product input:not('.checkAll')");
    var inputList;
    var checkAll;
    // true为地点代理
    if (flag == true) {
        inputList = inputList_region;
        checkAll = checkAll_region;
    }
    // false为产品代理
    else {
        inputList = inputList_product;
        checkAll = checkAll_product;
    }
    inputList.each(function () {
        console.log($(this).prop('checked'));
        ($(this).prop('checked') == true) ? checkCount++ : notCheckCount++;
        // 全选框的操作
        (checkCount == inputList.length) ? checkAll.prop('checked', true): checkAll.prop('checked', false);
        // 只要一个选中
        if (notCheckCount == inputList.length) {
            currentItem.checked = true;
        }
    })
}



// 数据类
function pData(product, region, sale) {
    this.product = product;
    this.region = region;
    this.sale = sale;
}

// 获取用户输入
function getSearchInput() {
    // 可批量导入数据
    var datas = [];
    // flag为true: 商品第一列,地区第二列,否则相反
    var flag;
    var regionCount;
    var productCount;
    var Rowspan;
    var inputList_region = $("#region input:not('.checkAll')");
    var inputList_product = $("#product input:not('.checkAll')");
    regionCount = $("#region input:not('.checkAll'):checkbox:checked").length;
    productCount = $("#product input:not('.checkAll'):checkbox:checked").length;
    // regionCount > productCount ? Rowspan = regionCount : Rowspan = productCount;
    // 获取排序方式,flag为true: 商品第一列,地区第二列,否则相反
    if ((regionCount > 1 && productCount > 1) || (regionCount == 1 && productCount == 1)) {
        flag = true;
    } else if (regionCount == 1 && productCount > 1) {
        flag = false;
    } else {
        flag = true;
    }
    flag == true ? Rowspan = regionCount : Rowspan = productCount;
    // 导入用户选择
    inputList_region.each(function (index, element1) {
        if ($(this).prop('checked') == true) {
            inputList_product.each(function (index, element2) {
                if ($(this).prop('checked') == true) {
                    datas.push(new pData(element2.value, element1.value, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
                }
            })
        }
    });

    // 返回特定属性值的对象
    return {
        data: datas,
        order: flag,
        rowspan: Rowspan
    }

    // // 测试数据
    // let productData = [{
    //     product: "手机",
    //     region: "华东",
    //     sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    // }, {
    //     product: "手机",
    //     region: "华北",
    //     sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    // }, {
    //     product: "手机",
    //     region: "华南",
    //     sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    // }, {
    //     product: "笔记本",
    //     region: "华东",
    //     sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    // }, {
    //     product: "笔记本",
    //     region: "华北",
    //     sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    // }, {
    //     product: "笔记本",
    //     region: "华南",
    //     sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    // }, {
    //     product: "智能音箱",
    //     region: "华东",
    //     sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    // }, {
    //     product: "智能音箱",
    //     region: "华北",
    //     sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    // }, {
    //     product: "智能音箱",
    //     region: "华南",
    //     sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
    // }]

    // // 利用datas去重,判断勾选地区和产品的数量,同样可以达到判断排序方式和rowspan的问题,这样就可以传入一组数据直接开搞(懒了,省略)
    // var regionArray=[];
    // var productArray=[];
    // // console.log(datas);
    // datas.forEach(function (item, index) {
    //     // 数组去重
    //     if ($.inArray(item.product, productArray) == -1) {
    //         productArray.push(item.product);
    //     }
    //     if ($.inArray(item.region, regionArray) == -1) {
    //         regionArray.push(item.region);
    //     }      
    // });
    // regionCount=regionArray.length;
    // productCount=productArray.length;
    // regionCount > productCount ? Rowspan = regionCount : Rowspan = productCount;
    // 获取排序方式,flag为true: 商品第一列,地区第二列,否则相反
    // if ((regionCount > 1 && productCount > 1) || (regionCount == 1 && productCount == 1)) {
    //     flag = true;
    // } else if (regionCount == 1 && productCount > 1) {
    //     flag = false;
    // } else {
    //     flag = true;
    // }

}

// 拼接表格(没做简化 懒了= =)
function showTable(datas) {
    var order = datas.order;
    var data = datas.data;
    var rowspan = datas.rowspan;
    var innerHtml1 = "";
    var rowspanArray = [];
    var tableTitle="";
    if (order == true) {
        tableTitle = "<thead class='bg-info'><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        // 按照产品对应三个地区来排序
        data = data.sort(function (a, b) {
            if (a.product < b.product)
                return -1;
            else if (a.product > b.product)
                return 1;
            else
                return 0;
        });
        console.log(datas);
        data.forEach(function (item, index) {
            // 数组去重
            if ($.inArray(item.product, rowspanArray) == -1) {
                rowspanArray.push(item.product);
            }
            // 导入每月的销售数据
            var monthData = "";
            for (var i = 0; i < item.sale.length; i++) {
                monthData += "<td>" + item.sale[i] + "</td>";
            }
            innerHtml1 += "<tr><td>" + item.region + "</td>" + monthData + "</tr>";
        });
    } else {
        tableTitle = "<thead class='bg-info'><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
        console.log(datas);
        data.forEach(function (item, index) {
            // 数组去重
            if ($.inArray(item.region, rowspanArray) == -1) {
                rowspanArray.push(item.region);
            }
            // 导入每月的销售数据
            var monthData = "";
            for (var i = 0; i < item.sale.length; i++) {
                monthData += "<td>" + item.sale[i] + "</td>";
            }
            innerHtml1 += "<tr><td>" + item.product + "</td>" + monthData + "</tr>";
        });
    }
    $('table').html(tableTitle +"<tbody>"+ innerHtml1+"</tbody>");

    // 增加rowsapn
    rowspanArray.forEach(function (item, index) {
        var test = 1 + parseInt(index) * rowspan;
        var selector = 'tbody tr:nth-child(' + test + ')';
        $(selector).prepend("<td rowspan=" + rowspan + ">" + item + "</td>");
    });
}