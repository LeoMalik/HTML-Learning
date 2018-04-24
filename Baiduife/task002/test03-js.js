// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var whiteSpace=new String(" \n\t\r");
    var tempstr=new String(str);
    if(whiteSpace.indexOf(tempstr.charAt(0))!=-1){
        var j=0;i=tempstr.length;
        while(j<i && whiteSpace.indexOf(tempstr.charAt(j))!=-1){
            j++;
        }
        tempstr=tempstr.substr(j,i);
    }
    return tempstr;
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}
var a="      abcdefg  ";
var b=simpleTrim(a);
var c=trim(a);
console.log(b);
console.log(c);



// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function fn(item,index) {
    console.log(Object.prototype.toString.call(item)+"  位置是:"+index);
}
function each(arr, fn) {
    for (var i=0;i<arr.length;i++){
        fn(arr[i],i);
    }
}
var arr = ['java', 'c', 'php', 'html'];
each(arr,fn);

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var objectType=Object.prototype.toString.call(obj);
    if (objectType==="[object String]"){
        return obj.length;
    }
    else if(objectType==="[object Object]")
    var keys=Object.keys(obj);
    var j=0;
    for (var i=0,a;a=keys[i];i++){
       j++;
    }
    return j;
}

var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
var obj1="abcdefg"
console.log(getObjectLength(obj)); // 3
console.log(getObjectLength(obj1)); // 7
obj1=obj1.concat("hijk");
console.log(obj1);