// 星期转换成中文
function m_getDay(time){
    switch(time.getDay()){
        case 1:return "一";
        case 2:return "二";
        case 3:return "三";
        case 4:return "四";
        case 5:return "五";
        case 6:return "六";
        case 0:return "日";
    };
}
function m_getDay2(time){
    switch(time.getDay()){
        case 1:return "Monday";
        case 2:return "Tuesday";
        case 3:return "Wednesday";
        case 4:return "Thursday";
        case 5:return "Friday";
        case 6:return "Saturday";
        case 0:return "Sunday";
    };
}
// 小于10补0
function appendZero(time){
    return time=(time<10) ? "0"+time : time;
}
// 格式化日期
function formatTime(time){ 
    var result="",
        year=time.getFullYear(),
        month=appendZero(time.getMonth()),
        date=appendZero(time.getDate()),
        hours=appendZero(time.getHours()),
        minutes=appendZero(time.getMinutes()),
        second=appendZero(time.getSeconds()),
        day=m_getDay(time);
        return result=year+"年"+month+"月"+date+"日"+"星期"+day+hours+":"+minutes+":"+second;
}
// 格式化日期
function formatTime2(time){
    var result="",
        flag;
        year=time.getFullYear(),
        month=appendZero(time.getMonth()),
        date=appendZero(time.getDate()),
        hours=appendZero(time.getHours()),
        minutes=appendZero(time.getMinutes()),
        second=appendZero(time.getSeconds()),
        day=m_getDay2(time);
        if(hours>12){
            hours-=12;
            flag="PM";
        }
        else 
        flag="AM";
        return result=year+"-"+month+"-"+date+" "+day+" "+hours+":"+minutes+":"+second+" "+flag;
}
// 计算时间
function pastTime(time,h_select,min_select,s_select){
    var now3=new Date();
        past=(now3.getTime()-time.getTime())/1000
        flag=(past>0)?"已经过去":"还有";
    var date=Math.abs(Math.floor((past/(3600*24)))),
        hour=Math.abs(Math.floor((past%(3600*24))/3600)),
        minute=Math.abs(Math.floor(((past/3600)%1)*60)),
        // minute=past%3600/60;
        second=Math.abs(Math.floor(((past/(60)%1))*60)),
        result=$('#result-wrapper');
        result.html("现在距离"+time.getFullYear()+"年"+(parseInt(time.getMonth())+1)+"月"+time.getDate()+"日"+"星期"+m_getDay(time)+" "+h_select+":"+min_select+":"+s_select+' '+flag+date+"天"+ hour +"小时"+minute+"分"+second+"秒");
    return time;
    //     long days = mss / (1000 * 60 * 60 * 24);  
    // long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);  
    // long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);  
    // long seconds = (mss % (1000 * 60)) / 1000;
}
function refreshTime(){
    var selects=$('select');
    selects.each(function(){
        this.onchange=function (e) { 
            var y_select=$('#year-select option:checked'),
                m_select=$('#month-select option:checked'),
                d_select=$('#day-select option:checked'),
                h_select=$('#hour-select option:checked'),
                min_select=$('#minute-select option:checked'),
                s_select=$('#second-select option:checked'),
                time=new Date();
            time.setFullYear(y_select.val(),parseInt(m_select.val())-1,d_select.val());
            time.setHours(h_select.val(),min_select.val(),s_select.val());
            
            pastTime(time,h_select.val(),parseInt(m_select.val())-1,s_select.val());
            e.preventDefault();
        };
    });
}


// 主体程序
var now1=new Date();
var now2=new Date();
document.getElementById("time1").innerText=formatTime(now1);
document.getElementById("time2").innerText=formatTime2(now2);
var getCurrentTime1=setInterval(function(){
    now1=new Date();
    document.getElementById("time1").innerHTML=formatTime(now1);
},1000);
var getCurrentTime2=setInterval(function(){
    now2=new Date();
    document.getElementById("time2").innerHTML=formatTime2(now2);
},1000);
refreshTime();




