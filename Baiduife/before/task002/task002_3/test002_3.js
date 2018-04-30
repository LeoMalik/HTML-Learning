var $=document.querySelectorAll.bind(document);
var imgList=$(".imgList")[0],  //图片列表
    choiceList=$(".choiceList li"),  //选项列表
    timer=null, //播放计时器
    timer1=null, //过渡动画计时器
    leftButton=$(".arrow_left")[0],
    rightButton=$(".arrow_right")[0],
    index=1; //当前元素的下标

//设置点击事件
window.onload=function() {
    leftButton.onclick = function () {   //上一张
        index-=1;
        if (index<1){
            index=4;  //图片循环
        }
        // console.log(index);
        resetChoice(index); //重置下方按钮
        nextPic(200); //图片组移动
        clearInterval(timer); //重置播放计时器,平均过渡时间
        autoPlay(false); //重新启动自动播放
    }
    rightButton.onclick = function () {   //下一张
        index+=1;
        if (index>4){
            index=1;
        }
        // console.log(index);
        resetChoice(index); //重置下方按钮
        nextPic(-200); //图片组移动
        clearInterval(timer); //重置图片切换计时器,平均过渡时间
        autoPlay(false);
    }
    for (var i = 0; i < choiceList.length; i++) {    //
        choiceList[i].onmouseover = showImg;
        //设置鼠标划过事件
        choiceList[i].onmouseleave=function () {
            autoPlay(false);//重置图片切换计时器,平均过渡时间
        }
        //设置鼠标离开事件
    }
    autoPlay(false);
};

//重置菜单选项
function resetChoice(index) {
    for (var i=0;i<choiceList.length;i++){
        if (choiceList[i].className==="on"){
            choiceList[i].className="";
        }
        if (index){
            choiceList[index-1].className="on";
        }
    }
}

// 图片播放 上/下一张
function nextPic(offset) {
    clearInterval(timer1);
    var oldLeft=parseInt(imgList.style.left);
    var newLeft=parseInt(imgList.style.left)+offset;
    if (newLeft>0){
        oldLeft=-800; //模拟循环效果
        imgList.style.left=oldLeft+"px";
        newLeft=-600;
    }
    if(newLeft<-1000){
        oldLeft=-200;
        imgList.style.left=oldLeft+"px";
        newLeft=-400;
    }
    //     if (newLeft===0){
    //         newLeft=-800;
    //     }
    //     if (newLeft===-1000){
    //         newLeft=-200;
    //     }
    slowStep(oldLeft,newLeft);

}

//点击选项列表切换效果
function showImg() {
    clearInterval(timer1); //重置动画效果时间
    resetChoice(); //重置下方按钮
    var choice=this.getAttribute("id"); //获取按钮值
    var oldLeft=parseInt(imgList.style.left);
    index=parseInt(choice);
    // console.log(index);
    var newLeft=index*-200;
    slowStep(oldLeft,newLeft);//模拟移动动画
    //imgList.style.left="-"+(choice)*200+"px";
    this.className="on"; //设置按钮选中效果
    clearInterval(timer); //重置图片切换计时器
}


//图片自动播放循环
function autoPlay(direction) {
    timer=setInterval(function () {
        if (direction===true) //设置滚动方向
            leftButton.onclick();
        else
            rightButton.onclick();
    },4000)
}

//模拟过渡动画
function slowStep(start,off) {
    var step=(off-start)/5;
    console.log(start+","+off);
    timer1=setInterval(function test() {  //每次动一点点,模拟平移
        imgList.style.left=parseInt(imgList.style.left)+step+"px";
        console.log(parseInt(imgList.style.left));
        if (parseInt(imgList.style.left)===off){
            clearInterval(timer1);
        }

    },100);

}



