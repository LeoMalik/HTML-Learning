function diyTrim(str){
    var first=0;
    var end=str.length;
    var i=0;
    var j=str.length;
    while(str.charAt(i)==" "||str.charAt(i)=="　"){
        first++;
        i++;
        if(str.charAt(i)!=" " && str.charAt(i)!="　")
        break;
    }
    while(str.charAt(j)==" "||str.charAt(j)=="　"){
        end--;
        j--;
        if(str.charAt(j)!=" " && str.charAt(j)!="　")
        break;
    }
    
    return str.slice(first,end);
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