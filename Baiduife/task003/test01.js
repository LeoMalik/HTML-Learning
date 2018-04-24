var $=document.querySelectorAll.bind(document);

var container1=$(".container")[0];//第一个容器
var container2=$(".container")[1];//第二个容器


var flag=false;
window.onload=Drag;
function Drag() {

    setClickEvent();
}

function appEnd(flag) {   //加一行
    var newDiv=document.createElement("div");
    newDiv.className="content";
    if(flag){
        container2.appendChild(newDiv);
        getLastContent(1).parentNode.removeChild(getLastContent(1)); //删除一行
    }
    else{
        container1.appendChild(newDiv);
        getLastContent(2).parentNode.removeChild(getLastContent(2));
    }
}

function resetPostionStatic() {   //重置Position属性,使得最下面的一行可以移动
    var contentList1=document.querySelector("#first").querySelectorAll(".content");
    var contentList2=document.querySelector("#second").querySelectorAll(".content");
    var len=contentList1.length?contentList1.length:contentList2.length;//防止列表不存在

    for (var i=0;i<len;i++){
        // console.log(1);
        // console.log(contentList1[i]);
        // console.log(2);
        // console.log(contentList2[i]);
        if(contentList1.length!==0)
        contentList1[i].style.position="static";
        if (contentList2.length!==0)
        contentList2[i].style.position="static";
    }
    if(contentList1.length!==0)
        getLastContent(1).style.position="absolute";

    if (contentList2.length!==0)
        getLastContent(2).style.position="absolute";
}
function setClickEvent() {  //给最后一行添加点击事件
    var contentList1=document.querySelector("#first").querySelectorAll(".content");
    var contentList2=document.querySelector("#second").querySelectorAll(".content");
    var len=contentList1.length?contentList1.length:contentList2.length;//防止列表不存在

    if(contentList1.length!==0)
        getLastContent(1).onmousedown=mouseDown;
    if (contentList2.length!==0)
        getLastContent(2).onmousedown=mouseDown;

}

function getLastContent(choice) {  //获取最后一行,choice=1代表选择容器1,2代表选择容器2
    var content1=document.querySelector("#first").querySelectorAll(".content")[container1.querySelectorAll(".content").length-1];
    //获取最后一个元素
    var content2=document.querySelector("#second").querySelectorAll(".content")[container2.querySelectorAll(".content").length-1];
    if(choice==1)
        return content1;
    else
        return content2;
}

function checkMoved(content) {   //检测移动是否有效,否则返回原位
    var currentX=content.offsetLeft;
    if(content.parentElement.id==="first"){
        if (currentX>250 && currentX<555){
            flag=true;  //传给appEnd,判断加在哪个容器的后面(true/加第二个,false/加第一个)
            appEnd(flag);
        }
        else {
            resetPos(content);
        }
        resetPostionStatic();
        setClickEvent();
    }
    else {
        if (currentX<150 && currentX>=0){
            flag=false;
            appEnd(flag);
        }
        else {
            resetPos(content);
        }
        resetPostionStatic();
        setClickEvent();
    }
}

function resetPos(content) {    //移动无效时返回原本的坐标
    if (content.parentElement.id==="first"){
        getLastContent(1).style.left=8.5+"px";
        var Len1=container1.querySelectorAll(".content").length;
        getLastContent(1).style.top=9+(Len1-1)*50+"px";
    }
    else{
        getLastContent(2).style.left=411+"px";
        var Len2=container2.querySelectorAll(".content").length;
        getLastContent(2).style.top=9+(Len2-1)*50+"px";
    }
}

function mouseDown(event) {
    var position=event.clientX;//通过鼠标点击位置判断在哪个容器中

    if(position<310){
        var container=$(".container")[0],
            disX=event.clientX-container.offsetLeft,
            disY=event.clientY-container.offsetTop;
        Move(disX,disY,getLastContent(1));
    }
    else {
        var container=$(".container")[1],
            disX=event.clientX-container.offsetLeft,
            disY=event.clientY-container.offsetTop;
        Move(disX,disY,getLastContent(2));
    }
}

function Move(disX,disY,content) {
    document.onmousemove=function (ev) {
        var l=ev.clientX-disX,
            h=ev.clientY-disY,
            maxW=document.documentElement.clientWidth,
            maxH=document.documentElement.clientHeight;
        if(l<0){
            l=0;
        }
        else if (l>maxW){
            l=maxW;
        }
        if(h<0){
            h=0;
        }else if(h>maxH){
            h=maxH;
        }
        content.style.left=l+"px";
        content.style.top=h+"px";
    };
    document.onmouseup=function () {
        document.onmousemove=null;
        document.onmouseup=null;
         checkMoved(content);
    }
}

