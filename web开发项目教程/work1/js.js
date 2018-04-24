var inputList=document.querySelectorAll("input[required]");
var messages=document.querySelectorAll(".message");
var timer=null;
for (var i=0;i<4;i++){
    (function(i) {
        inputList[i].onclick=function () {
            timer=setInterval(function () {
                var data=inputList[i].value;
                if (data!==""){
                    messages[i].style.display="none";
                }
                else {
                    messages[i].style.display="block";
                }
                if (inputList[i].clientWidth!==400){
                    messages[i].style.display="none";
                }
            },50)
        };
    })(i)
}
