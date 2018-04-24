
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
function uniqArray(arr) {
    var res=[];
    var json={};
    for (var i=0;i<arr.length;i++){
        if(!json[arr[i]]){
            res.push(arr[i]);
            json[arr[i]]=true;
        }
    }
    return res;
}

function uniqArray1(arr) {
    var n=[];
    for (var i=0;i<arr.length;i++){
        if (n.indexOf(arr[i])===-1){
            n.push(arr[i]);
        }
    }
    return n;
}

function uniqArray2(arr) {
    var temp=arr.join("");
    console.log(temp);
    var result="";
    for (var i=0;i<temp.length;i++){
        if (!result.includes(temp.charAt(i))){
            result+=temp.charAt(i);
        }
    }
    result1=result.split("");
    return result1;
}
var arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];
console.log(uniqArray(arr));
console.log(uniqArray1(arr));
console.log(uniqArray2(arr));
console.log('Blue Whale'.includes('blue')); // returns false