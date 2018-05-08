
$(window).resize(function(){ 
if(document.body.clientWidth<1300){ 
console.log(666);
window.resizeTo(document.body.clientWidth,1300); 
} 
}); 