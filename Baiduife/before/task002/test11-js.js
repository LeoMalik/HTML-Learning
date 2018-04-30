var myAjax=ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText) {
            console.log(responseText);
        },
        onfail: function () {
            console.log("fail");
        }
    }
);

/**
 * AJAX函数封装
 * @param url
 * @param options
 * @returns {XMLHttpRequest}
 */
function ajax(url,options) {
    var oAjax=new XMLHttpRequest();
    //连接服务器
    var param="";//请求参数
    var data=options.data ? options.data :0;//获取数据
    if (Object.prototype.call(options)==="[object Object]")//只有参数为object才执行
    {
        for (var key in data){
            if (data.hasOwnProperty(key)){
                param+=key+"="+data[key]+"$";
            }
        }
        param.replace(/&$/,"");  //去除掉结尾的$

        //判断请求类型
        var type=options.type ? options.type.toUpperCase() : "GET";
        if (type==="GET"){
            oAjax.open("GET",url+"?"+param,true);
            oAjax.send();
        }
        else {
            oAjax.open("Post",url,true);
            oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            oAjax.send(param);
        }
    }
    //接受返回
    oAjax.onreadystatechange=function (ev) {
        if (oAjax.readyState===4 && oAjax.status===200){
            options.onsuccess(oAjax.responseText);
        }
        else{
            options.onfail(oAjax);
        }
    };
    return oAjax;
}