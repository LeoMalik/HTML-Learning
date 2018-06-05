
function save(data){
    localStorage.setItem("datas",JSON.stringify(data.data));
    localStorage.setItem("order",data.order);
    localStorage.setItem("rowspan",data.rowspan);
    
}

function get(data){
    var datas=JSON.parse(localStorage.getItem("datas"));
    datas=datas.sort(function (a, b) {
        if (a.product < b.product)
            return -1;
        else if (a.product > b.product)
            return 1;
        else
            return 0;
    });
    var flag=localStorage.getItem("order");
    var Rowspan=localStorage.getItem("rowspan");
    if(datas && flag && Rowspan){
        var result={
            data: datas,
            order: flag,
            rowspan:Rowspan
        }
        console.log(result);
        return result;
    }
    return '';
}