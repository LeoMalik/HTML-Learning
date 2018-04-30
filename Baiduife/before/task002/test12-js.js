
//鼠标事件
var title=document.querySelector("span");
var choices=document.querySelectorAll("li");
var menu=document.querySelector("ul");
var index=-1;
// console.log(span);
flag=true;//true打开 false关闭
title.onclick=showChoice;

function resetMenu() {
    menu.style.display="none";
}

function resetA() {
    for(var i = 0; i < choices.length; i++) {
        choices[i].style.background = "#fff";
    }
}

function showChoice(ev) {
    flag=true; //显示菜单
    if(flag){
        menu.style.display="block";
        flag=false;
    }
    else {
        menu.style.display="none";
        flag=true;
    }
    ev.stopPropagation();//阻止回调

    for(var i=0;i<choices.length;i++){      //改变标题
        choices[i].index=i;
        choices[i].onmouseover=function (ev2) {
            resetA();
            this.style.background="#ccc";
            index = this.index - 1;
            console.log(index);
        }
        choices[i].onclick=function (e) {
            e.stopPropagation();
            resetMenu();
            title.innerHTML=this.innerText;
        }
    }
}
document.onclick=function (ev) {
    resetMenu();
};



document.onkeyup=function (ev) {    //键盘事件
    if(ev.keyCode===40){
        index++;
        if (index>choices.length-1){
            index=0;
        }
        resetA();
        choices[index].style.background="#ccc";
    }
    else if(ev.keyCode===38){
        index--;
        if(index<0){
            index=choices.length-1;
        }
        resetA();
        choices[index].style.background="#ccc";
    }
    else if(ev.keyCode===13 && index!==-1){
        title.innerHTML=choices[index].innerText;
        index=-1;
        resetA();
        resetMenu();
    }
};