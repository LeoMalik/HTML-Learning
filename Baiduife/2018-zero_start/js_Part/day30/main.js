
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
    // 表格的展现
    $('button').click(function () {
        var result = getSearchInput();
        console.log(result);
        showTable(result)
        // 图表的展现
        setSvg(result.data);
    })

    
});









// // 测试数据
//     let productData = [{
//         product: "手机",
//         region: "华东",
//         sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
//     }, {
//         product: "手机",
//         region: "华北",
//         sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
//     }, {
//         product: "手机",
//         region: "华南",
//         sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
//     }, {
//         product: "笔记本",
//         region: "华东",
//         sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
//     }, {
//         product: "笔记本",
//         region: "华北",
//         sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
//     }, {
//         product: "笔记本",
//         region: "华南",
//         sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
//     }, {
//         product: "智能音箱",
//         region: "华东",
//         sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
//     }, {
//         product: "智能音箱",
//         region: "华北",
//         sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
//     }, {
//         product: "智能音箱",
//         region: "华南",
//         sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
//     }]

//     // 利用datas去重,判断勾选地区和产品的数量,同样可以达到判断排序方式和rowspan的问题,这样就可以传入一组数据直接开搞(懒了,省略)
//     var regionArray=[];
//     var productArray=[];
//     // console.log(datas);
//     datas.forEach(function (item, index) {
//         // 数组去重
//         if ($.inArray(item.product, productArray) == -1) {
//             productArray.push(item.product);
//         }
//         if ($.inArray(item.region, regionArray) == -1) {
//             regionArray.push(item.region);
//         }      
//     });
//     regionCount=regionArray.length;
//     productCount=productArray.length;
//     regionCount > productCount ? Rowspan = regionCount : Rowspan = productCount;
//    获取排序方式,flag为true: 商品第一列,地区第二列,否则相反
//     if ((regionCount > 1 && productCount > 1) || (regionCount == 1 && productCount == 1)) {
//         flag = true;
//     } else if (regionCount == 1 && productCount > 1) {
//         flag = false;
//     } else {
//         flag = true;
//     }