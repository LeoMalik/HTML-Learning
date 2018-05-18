/// <reference path="../../../../typings/index.d.ts" />

$(document).ready(function(){
    $('input').on('click', function () {
        // 用this来调用调用该函数的对象
        var id="#"+$(this).attr('id')+'-select';
        $("select").hide();
        console.log(id);
        $(id).show().attr("style","display:inline");
    });
})
