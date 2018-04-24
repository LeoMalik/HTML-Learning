console.log( (navigator.appVersion));

function setCookie(cookieName,cookieValue,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    var a=document.cookie=cookieName+ "=" +escape(cookieValue)+
        ((expiredays==null) ? "" : ";expires="+exdate.toTimeString())
    console.log(a);
}
//检查cookie是否存在
function getCookie(cookieName) {
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(cookieName+"=");
        if (c_start!=-1){
            c_start=c_start+cookieName.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if(c_end==-1){
                c_end=document.cookie.length;
             }
            return unescape(document.cookie.substr(c_start,c_end));
        }
    }
    return "";
}
//获取用户cookie信息
function checkCookie(cookieName) {
    var userName=getCookie(cookieName);
    if (userName!=null && userName!=""){
        alert("welcome "+userName);
    }
    else {
        userName=prompt('please input your name:',"");
        if (userName!=null && userName!="")
        {
            setCookie('username',userName,365);
        }
    }
}
setCookie("leo",666,36500);
console.log(getCookie("leo"));
checkCookie("le1");