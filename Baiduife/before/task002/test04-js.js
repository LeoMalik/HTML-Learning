function addclass(element,newclass) {
    element.setAttribute(newclass,"background: blue;");
}
function removeClass(element,oldClassName) {
    element.removeAttribute(oldClassName);
}
function isSiblingNode(element, siblingNode) {
    if (element.parentElement===siblingNode.parentElement){
        return true;
    }
    else {
        return false;
    }
}

function getPosition(element) {
    var top=element.offsetTop;
    if (element.offsetParent!=null){
        top+=getPosition(element.offsetParent);
    }
    var left=element.offsetLeft;
    if (element.offsetLeft!=null){
        left+=getPosition(element.offsetParent);
    }
    document.write("top:"+top+",left:"+left);
}
function $(id){
    return document.getElementById(id);
}

var first=$("1");
addclass(first,"style");

var node1=document.getElementsByTagName("p");
var node2=document.getElementsByTagName("span");
document.write(isSiblingNode(node1[0],node1[1]));
getPosition(first);