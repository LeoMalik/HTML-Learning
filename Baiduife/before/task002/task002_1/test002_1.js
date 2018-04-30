var $=document.querySelectorAll.bind(document);
var submit=$("button")[0];  //第一个提交按钮
var submit1=$("button")[1];  //第二个提交按钮
var submit2=$("button")[2];
var datas=$("#hobbies")[0];  //第一个输入框
var datas1=$("#hobbies1")[0];  //第二个输入框
var newText=$("span")[0];     //显示框
var message=$("#message")[0];  //提示信息框
var timer=null;  //计时器
var div=$("div")[0];
function uniqArray(arr) {
    var res=[];
    var json={};
    for (var i=0;i<arr.length;i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]]=true;
        }
    }
    return res;
}

//提交框1
submit.onclick=function (ev) {
    // console.log(newText);s
    // console.log(uniqarr(datas.value.split(",")));
    var result=uniqArray(datas.value.split(","));
    if (result!=="")
    newText.innerHTML=result;
};

//提交框2
submit1.onclick=function (ev) {
    var result1=uniqArray(datas1.value.split(/\s+|\n|\,|\、|\;/));
    newText.innerHTML=result1;  //匹配字符的时候要加转义
};

datas1.onclick=checkMessage;
//提示错误信息
function checkMessage() {
    timer=setInterval(function () {
        var result1=uniqArray(datas1.value.split(/\s+|\n|\,|\、|\;/)),
            num=result1.length;
        console.log(num);
        if (num<10 && num!==1){
            message.style.display="none";
        }
        else {
            message.style.display="block";
        }
    },50)
}

//提交框3
submit2.onclick=function () {
    var result1=uniqArray(datas1.value.split(/\s+|\n|\,|\、|\;/));
    for (var j=0;j<result1.length;j++){
            div.innerHTML+="<label>"+"<input type='checkbox'>"+result1[j]+"</label>"

    }
};



