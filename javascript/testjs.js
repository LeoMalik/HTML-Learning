document.write("hello");
for(var i=0;i<10;i++){
    document.write(i);
}
function get(){
	var firstnum=document.getElementById("firstnum").value;
	var secondnum=document.getElementById("secondnum").value;
	var firstnum=parseInt(firstnum);
    var secondnum=parseInt(secondnum);
	var result=firstnum+secondnum;
	document.getElementById("result").value=result;
}

function $(id){
    var id = document.getElementById(id).value;
    return id;
}
function getText(){
    var tpy = $("place").toString(),
        cpt = $("company").toString(),
        restrue = tpy + cpt ;
    document.getElementById("result1").value = restrue;
}

function showmenu(type) {
    var menus=document.getElementsByClassName("menu");
    for (i=0;i<menus.length;i++){
        var d=menus[i];
        d.style.display="none";
    }
    var menutype="menu"+type;
    var div=document.getElementsByClassName(menutype)[0];
    div.style.display="block";
}
function hidemenu(){
	var menus=document.getElementsByClassName("menu");
    for (i=0;i<menus.length;i++){
        var d=menus[i];
        d.style.display="none";
    }
}