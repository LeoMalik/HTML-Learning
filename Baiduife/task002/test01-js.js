function $(id){
    return document.getElementById(id);
}

var test1 = "12321";
var test2 = new String("12321");
var result1=(test1);
var result2=(test2);
console.log(result1);
console.log(result2);

var cloneObject=function(src){
    var result;
	switch (Object.prototype.toString.call(src)){
        case "[object Number]":
            result=(typeof src==="object"?new Number(src):parseInt(src.toString()));
            break;
        case "[object String]":
            result=(typeof src==="object"?new String(src):src.toString());
            break;
        case "[object Boolean]":
            result=(typeof src==="Boolean"?new Boolean(src):src);
            break;
        case "[object Date]":
            result=new Date(src);
            break;
        case "[object Array]":
            var temp=new Array();
            for (var i=0,a;a=src[i];i++){
                temp[i]=cloneObject(a);
            }
            result=temp;
            delete temp;
            break;
        case "[object Object]":
            var temp={};
            var keys=Object.keys(src);
            for (var i=0,a;a=keys[i];i++){
                temp[a]=cloneObject(src[a]);
            }
            result=temp;
            delete temp;
            delete keys;
            break;
    }
    return result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[1]);    // "hello"