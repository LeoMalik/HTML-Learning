$(document).ready(function () {
    var region = $('#region');
    var product = $('#product');
    var month = $('month');
    // 全选标签
    var checkAll_region = $('#region .checkAll');
    var checkAll_product = $('#product .checkAll');
    var inputList_region = $("#region input:not('.checkAll')");
    var inputList_product = $("#product input:not('.checkAll')");

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
});

// 全选框
function JudgeCheckAll(flag, currentItem) {
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

// 普通框
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
        if ($(this).prop('checked') == true) {
            checkCount++;
        } else {
            notCheckCount++;
        }
        // 全选框的操作
        (checkCount == inputList.length) ? checkAll.prop('checked', true): checkAll.prop('checked', false);
        // 只要一个选中
        if (notCheckCount == inputList.length) {
            currentItem.checked = true;
        }
    })
}