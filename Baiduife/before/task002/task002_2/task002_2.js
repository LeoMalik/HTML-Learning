var today=new Date();
var $=document.querySelectorAll.bind(document);
var future=null;

var input=$("input")[0];
var flag=false;

input.onclick=submit;
function submit() {
    if (input.value.match(/(^\d{4})-(\d{2})-(\d{2}$)/)){
        var result=input.value.split("-");
        future=new Date(parseInt(result[0]),parseInt(result[1]),parseInt(result[2]));
        console.log(future);
    }
    flag=true;
}


function checkTime(){
    if(flag===true){
        var Time=(future.getTime()-today.getTime())/1000;
        var day=Time%(60*60*24);
        var hour=Time%((60*60)%24);
        var minute=Time%((60)%(24*60));
        console.log(day+","+hour+","+minute);
    }
}

setInterval(checkTime,1000);



