

// 数据类
function pData(product, region, sale) {
    this.product = product;
    this.region = region;
    this.sale = sale;
}

// 获取用户输入
function getSearchInput(datas) {
    var temp=datas.slice();
    // flag为true: 商品第一列,地区第二列,否则相反
    var flag;
    var regionCount;
    var productCount;
    var Rowspan;
    
    // 用户选择
    var checked_region_Array=[];
    var checked_product_Array=[];
    var inputList_region = $("#region input:not('.checkAll'):checkbox:checked");
    var inputList_product = $("#product input:not('.checkAll'):checkbox:checked");
    inputList_region.each(function(index,ele){
        checked_region_Array.push(ele.value);
    });
    inputList_product.each(function(index,ele){
        checked_product_Array.push(ele.value);
    });
    

    // 利用datas去重,判断勾选地区和产品的数量
    var regionArray = [];
    var productArray = [];
    // console.log(datas);
    if(inputList_region.length!=0 && inputList_product.length!=0){
        temp.forEach(function (item, index) {
            if($.inArray(item.product, checked_product_Array) == -1){
                delete temp[index];
            }
            if($.inArray(item.region, checked_region_Array) == -1){
                delete temp[index];
            }
        });
        console.log(temp);
    }
    temp=temp.filter(function(val){
        return !(!val || val === "");
    });
    temp.forEach(function(item,index){
        // 数组去重
        if ($.inArray(item.product, productArray) == -1) {
            productArray.push(item.product);
        }
        if ($.inArray(item.region, regionArray) == -1) {
            regionArray.push(item.region);
        }
    })

    // 跨列
    regionCount = regionArray.length;
    productCount = productArray.length;
    //  获取排序方式,flag为true: 商品第一列,地区第二列,否则相反
    if ((regionCount > 1 && productCount > 1) || (regionCount == 1 && productCount == 1)) {
        flag = true;
        Rowspan=regionCount;
    } else if (regionCount == 1 && productCount > 1) {
        flag = false;
        Rowspan = productCount;
    } else {
        flag = true;
        Rowspan=regionCount;
    }


    // 返回特定属性值的对象
    var object = {
        data: temp,
        order: flag,
        rowspan: Rowspan
    }
    return object;
}

function tableHover(data){
    console.log($('#body'));
    $('#body').delegate('tr','mouseenter',function(){
        setSvg(data,$(this).index());
        setCanvas(data,$(this).index());
    });
}

// 拼接表格(没做简化 懒了= =)
function showTable(datas) {
    var order = datas.order;
    var data = datas.data;
    var rowspan = datas.rowspan;
    var innerHtml1 = "";
    var rowspanArray = [];
    var tableTitle = "";
    if (order == true) {
        tableTitle = "<thead class='bg-info'><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></thead>";
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

    $('table').html(tableTitle + "<tbody id='body'>" + innerHtml1 + "</tbody>");

    // 增加rowsapn
    rowspanArray.forEach(function (item, index) {
        var test = 1 + parseInt(index) * rowspan;
        var selector = 'tbody tr:nth-child(' + test + ')';
        $(selector).prepend("<td rowspan=" + rowspan + ">" + item + "</td>");
    });

    // 鼠标滑过事件
    tableHover(data);
}


