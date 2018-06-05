// 测试数据
let productData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [78, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

// 主体程序
$(document).ready(function () {
    var region = $('#region');
    var product = $('#product');
    // var month = $('#month');
    // 全选标签
    var checkAll_region = $('#region .checkAll');
    var checkAll_product = $('#product .checkAll');
    // 获取用户提交的查询
    // getSearchInput(productData);

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
        var result = getSearchInput(productData);
        console.log(result.data);
        // 保存到本地
        // save(result);
        // var localresult=get(result);
        // if(localresult==''){
        //     showTable(localresult);
        //     setSvg(localresult.data);
        // }
        // else{
        showTable(result);
        setSvg(result.data,0);
        setCanvas(result.data,0,true);
        $('tr').trigger('mouseleave');
        $('#body').trigger('mouseleave');
        // }
        // localStorage.clear();
    })
    
    $('button').trigger('click');
});









