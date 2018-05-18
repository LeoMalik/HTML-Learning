/// <reference path="../../../../typings/index.d.ts" />

$(document).ready(function(){
    var obj=$('#fade-obj');
    var btn=$('#fade-btn');
    // 透明度
    var num=10;
    var flag=true;
    var insertIn;
    var btnText='';
    btn.on('click',function(){
        fade();
    });


    var fade=function(){
        
        insertIn=setInterval(function(){
            btn.attr("disabled","true");
            if(flag==true){
                num--;
            }
            else{
                num++;
            }
            var opacity=num/10;
            obj.css("opacity",opacity);
            var end=((num<=0 || num>=10) ? true : false);
            if(end){
                clearInterval(insertIn);  
                btn.removeAttr("disabled");
                if(num){
                    
                    fadeText = (flag = true)? '淡出' : '淡入';
                    btn.html(fadeText);
                }
                else{
                    
                    fadeText = (flag = false)? '淡出' : '淡入';
                    btn.html(fadeText);
                }
            }
        },30);
    };
});

