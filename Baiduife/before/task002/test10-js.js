window.onload=onDrag;
//拖动窗口功能实现
function onDrag() {
    var main=document.getElementsByTagName("p")[0];
    main.onmousedown=fnDown;

}

function fnDown(event) {
    var box=document.getElementById("box");
    var disX=event.clientX-box.offsetLeft;
    var disY=event.clientY-box.offsetTop;
    document.onmousemove=function (ev) {
        ev=ev||window.event;
        var l=(ev.clientX-disX), t=(ev.clientY-disY),
            winW=document.documentElement.clientWidth || document.body.clientWidth,
            winH=document.documentElement.clientHeight || document.body.clientHeight,
            maxW=winW-box.offsetWidth,
            maxH=winH-box.offsetHeight;
        if(l<0){
            l=0;
        }
        else if (l>maxW){
            l=maxW;
        }
        if(t<0){
            t=10;
        }else if(t>maxH){
            t=maxH;
        }
        box.style.left=(l)+"px";
        box.style.top=(t)+"px";
    };
    document.onmouseup=function () {
        document.onmousemove=null;
        document.onmouseup=null;
    }


}

