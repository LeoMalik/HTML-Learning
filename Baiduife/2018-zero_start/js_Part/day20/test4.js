/// <reference path="../../../../typings/index.d.ts" />

$(document).ready(function(){
    div=$('div');
    flag=true;
    var top=0;
    div.css({
        'background':'url("http://ife.baidu.com/2016/static/img/erik_ce204002.jpg")',
        'width':'480px',
        'height':"480px",
        'backgroundRepeat': 'no-repeat',
        'margin':'0 auto'
    });
    loop=setInterval(function(){
        if(flag){
            top+=480;
            div.css('backgroundPosition','0 -'+top+"px")
        }
        else{
            top-=480;
            div.css('backgroundPosition','0 -'+top+"px")
        }
        if(top>7200 || top<480){
            flag=!flag;
        }
    },50)
   
});
// +top+"px"