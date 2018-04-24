function $(selector){
    var result;
    switch (selector.charAt(0)){
        case "#":
            result=document.getElementById(selector.slice(1,selector.length));
            break;
        case ".":
            result=document.getElementsByClassName(selector.substr(1,selector.length))[0];
            break;
        case "[":
            var classMap=selector.slice(1,selector.length-1).split("=");//获取键值对
            var name=classMap[0];//获取属性名
            var value=classMap[1];
            var tagList=document.getElementsByTagName("*");//获取所有标签
            if (value){
                for (var i=0;i<tagList.length;i++){
                    if (tagList[i].getAttribute(name)===value){
                        return tagList[i];
                    }
                }
            }else {
                for (var i=0;i<tagList.length;i++){
                    if (tagList[i].getAttribute(name)){
                        return tagList[i];
                    }
                }
            }

        default:
            result=document.getElementsByTagName(selector)[0];
    }
    return result;
}

$("#id1").value="show";
$(".class1").innerText="show";
$("[data-log]").innerText="show";