function diyTrim(str){
    var first=0;
    var j=str.length;
    var end=j;
    var i=0;
    
    while(str.charAt(i)==" "||str.charAt(i)=="　"){
        first++;
        i++;
        if(str.charAt(i)!=" " && str.charAt(i)!="　")
        break;
    }
    for (var j = end - 1; j >= 0; j--) {
        // 字符的 Unicode 编码固定不变 半角空格32 全角空格12288
        if (str[j] && str.charCodeAt(j) !== 32 && str.charCodeAt(j) !== 12288) {
          endIndex = j;
          break;
        }
      }
    
    return str.slice(first,endIndex+1);
}
console.log(diyTrim(' a f b    ')); // ->a f b
console.log(diyTrim('    ffdaf    ')); // ->ffdaf
console.log(diyTrim('1    ')); // ->1
console.log(diyTrim('　　f')); // ->f
console.log(diyTrim('  　  a f b 　　 ')); // ->a f b
console.log(diyTrim(' ')); // ->
console.log(diyTrim('　')); // ->
console.log(diyTrim('')); // ->

function removeRepetition1(str){
    var result=[];
    var json={};
    for(var i=0;i<str.length;i++){
        if(!json[str.charAt(i)]){
            result.push(str.charAt(i));
            json[str.charAt(i)]=true;
        }
    }
    return result.join("");
}

function removeRepetition(str){
    var result=str.split("");
    for(var i=0;i<result.length;i++){
        if(result[i]==result[i+1]){
            result[i]="";
        }
    }
    str=result.join("");
    return str;
}
console.log(removeRepetition("aaa")); // ->a
console.log(removeRepetition("abbba")); // ->aba
console.log(removeRepetition("aabbaabb")); // ->abab
console.log(removeRepetition("")); // ->
console.log(removeRepetition("abc")); // ->abc