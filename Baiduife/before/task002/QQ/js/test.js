

window.onload=changeStates;
function changeStates() {
    var loginState=document.querySelector("#loginState"),
        loginStateShow=document.querySelector("#loginStateShow"),
        loginStateTxt=document.querySelector(".login-state-txt"),
        loginStatePanel=document.querySelector("#loginStatePanel"),
        //列表的数组
        lis=document.querySelectorAll("#loginStatePanel li");
    loginState.addEventListener("click",function listener(ev) {
        loginStatePanel.style.display="block";
        ev.stopPropagation();
    })
    for (var i=0;i<lis.length;i++){
        lis[i].onmouseover=function () {
            this.style.background="#567";
        }
        lis[i].onmouseout=function(){
            this.style.background='#FFF';
        }
        lis[i].onclick=function (e) {
            e.stopPropagation();
            loginStatePanel.style.display='none';
            loginStateShow.className="";
            loginStateShow.className='login-state-show '+this.id;
            console.log(loginStateTxt.innerHTML=this.querySelector(".stateSelect_text").innerHTML);
        }
        document.onclick=function(){
            loginStatePanel.style.display='none';
        }
    }
}