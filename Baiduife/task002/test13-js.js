var $=document.querySelectorAll.bind(document);
var lis=$("li");
var boxes=$(".box");
function reset() {
    for (var i=0;i<boxes.length;i++){
        boxes[i].style.display="none";
    }
    for (var i=0;i<lis.length;i++){
        lis[i].style.border="1px #ccc solid";
        lis[i].style.borderBottom="0 solid";
    }
}
function changeBox() {
    for (var i=0;i<lis.length;i++){
        lis[i].onclick=function () {
            reset();
            this.style.borderBottom="1px #fff solid";
            var choice="."+this.id;  //拼接参数
            var box=$(choice)[0];
            this.style.borderTop="1px #d01d3b solid";
            box.style.display="block";
        }
    }
}
window.onload=changeBox;