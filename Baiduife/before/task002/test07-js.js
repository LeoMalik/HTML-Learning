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
    console.log(root);
    return root[0];
}

