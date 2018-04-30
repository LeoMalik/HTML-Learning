/**
 * 选择器
 * @param selector
 * @returns {*}
 */
function $(selector) {
    var all=selector.split(/\s+/);
    var result=[];
    var root=[document];
    for (var i=0;i<all.length;i++){
        var type=all[i][0];
        switch (type){
            case "#":
                for (var j=0;j<root.length;j++){
                    var ele=root[j].getElementById(all[i].slice(1));
                    if (ele){
                        result.push(ele);
                    }
                }
                break;
            case ".":
                for (var j=0;j<root.length;j++){
                    var eles=root[j].getElementsByClassName(all[i].slice(1));
                    if (eles){
                        result=result.concat(Array.prototype.slice.call(eles));
                    }
                }
                break;
            case "[":
                var classMap=selector.slice(1,selector.length-1).split("=");//获取键值对
                var name=classMap[0];//获取属性名
                var value=classMap[1];
                var tagList=document.getElementsByTagName("*");//获取所有标签
                if (value){
                    for (var i=0;i<tagList.length;i++){
                        if (tagList[i].getAttribute(name)===value){
                            result.push(tagList[i]);
                        }
                    }
                }else {
                    for (var i=0;i<tagList.length;i++){
                        if (tagList[i].getAttribute(name)){
                            result.push(tagList[i]);
                        }
                    }
                }
                break;
            default:
                for (var j = 0; j < root.length; j++) {
                    eles=root[j].getElementsByTagName(all[i]);
                    if (eles) {
                        result=result.concat(Array.prototype.slice.call(eles));
                    }
                }
        }
        root=result;
        result=[];
    }
    // console.log(1);

    return root[0];
}
//事件处理
function addEvent(element, event, listener) {
    element.addEventListener(event,listener,false);

}

function removeEvent(element, event, listener) {
    element.removeEventListener(event,listener,false);
}

function addClickEvent(element,listener){
    element.addEventListener("click",listener,false);
}

function addEnterEvent(element,listener) {
    addEvent(element,"keypress",function (ev) {
        if (ev.keyCode===13){
            listener();
        }
    })
}

/**
 * 事件代理
 * @param element
 * @param tag
 * @param event
 * @param listener
 */
function delegateEvent(element, tag, event, listener) {
    return addEvent(element,event,function (ev) {
        var target=ev.target||ev.srcElement;//兼容性
        if (target.tagName.toLocaleLowerCase()===tag){
            listener.call(target,ev);
        }
    })
}
//监听器
function enterListener() {
    alert(777);
}
function clickListener() {
    console.log(666);
}

$.on = function (element, type, listener) {
    return addEvent(element, type, listener);
};
$.un = function (element, type, listener) {
    return removeEvent(element, type, listener);
};
$.click = function (element, listener) {
    return addClickEvent(element, listener);
};
$.enter = function (element, listener) {
    return addEnterEvent(element, listener);
};




//测试
function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}
$.click($("#btn"), renderList);
$.delegate=function (element, tag, event, listener) {
    return delegateEvent(element, tag, event, listener);
};
$.delegate($("#list"), "li", "click", clickListener);

