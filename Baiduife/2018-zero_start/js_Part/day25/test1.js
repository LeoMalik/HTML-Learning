// GO封装
function Go()
{
    console.log("GO...");
}

function GoSteps(n) {
    var number=(arguments.length==0)?1:n;
    if(!isNaN(number) && number>0){
        number=Math.floor(number);
        Go();
        console.log(number+"\n");
    }
}

GoSteps(10); // Go 10次
GoSteps(1); // Go 1次
GoSteps(); // Go 1次，认为缺少参数时，默认参数为1
GoSteps(0);  // 0次
GoSteps(-1);  // 0次
GoSteps(1.4);  // Go 1次
GoSteps(1.6);  // Go 1次
GoSteps(-1);  // 0次
GoSteps(true);  // Go 1次
GoSteps(false);  // 0次
GoSteps("Test");  // 0次
GoSteps(NaN);  // 0次
GoSteps(null);  // 0次

