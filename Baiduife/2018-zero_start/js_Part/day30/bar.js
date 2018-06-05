
function setSvg(data,index){
    // x轴起始坐标
    var x=76;
    // y轴起始坐标
    var y=0;

    var month=1;
    // y轴缩放比例
    var y_scale;
    // svg对象
    var svgDoc=document.getElementById("svg");

    // y轴自适应
    if(data[index].sale[0]<20){
        y_scale=10;
    }
    else{
        y_scale=1;
    }
    $('text').remove();
    $('rect').remove();
    $('.temp').remove();


    
    // 角标
    var x_corner=document.createElementNS("http://www.w3.org/2000/svg", "text");
    var y_corner=document.createElementNS("http://www.w3.org/2000/svg", "text");
    x_corner.setAttribute('x',640);
    x_corner.setAttribute('y',670);
    x_corner.textContent='月份'
    y_corner.setAttribute('x',70);
    y_corner.setAttribute('y',60);
    y_corner.textContent='销售量'
    svgDoc.appendChild(x_corner);
    svgDoc.appendChild(y_corner);

    console.log(data[index])
    for(var i=0;i<12;i++){
        var rect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var x_text=document.createElementNS("http://www.w3.org/2000/svg", "text");
        var y_text=document.createElementNS("http://www.w3.org/2000/svg", "text");
        var girdLine=document.createElementNS("http://www.w3.org/2000/svg","line");

        rect.setAttribute('x',x);
        rect.setAttribute('y',(650-(data[index].sale[i])*y_scale));
        rect.setAttribute('width',20);
        rect.setAttribute('style',"fill:rgb(0,139,139);")
        rect.setAttribute('height',(data[index].sale[i]*y_scale));
        
        // x轴坐标文本
        x_text.setAttribute('x',x-5);
        x_text.setAttribute('y',650+20);
        x_text.textContent=month+"月";
        
        // y轴坐标文本
        y_text.setAttribute('x',5);
        y_text.setAttribute('y',650-y);

        // y座標值過小時按比例縮放
        y_text.textContent=y/y_scale;

        // 对齐线
        girdLine.setAttribute('y1',650-y);
        girdLine.setAttribute('y2',650-y);
        girdLine.setAttribute('x1',50);
        girdLine.setAttribute('x2',650);
        girdLine.setAttribute('stroke-width',1);
        girdLine.setAttribute('style',"stroke:gray");
        girdLine.classList.add('temp');

        // 月份
        month++;
        // 坐标
        x=x+48;
        y=y+50;

        
        svgDoc.appendChild(x_text);
        svgDoc.appendChild(y_text);
        svgDoc.appendChild(girdLine);
        svgDoc.appendChild(rect);

        // 柱状图动画 
        // var animate=document.createElementNS("http://www.w3.org/2000/svg","animate");
        // animate.setAttribute('attributeName','height');
        // animate.setAttribute('from',0);
        // animate.setAttribute('to',(data[index].sale[i]*y_scale))
        // animate.setAttribute('begin','0s');
        // animate.setAttribute('dur','1s');
        // rect.appendChild(animate);
        
    }
}

function setCanvas(data,index){
    var c=document.getElementById("canvas");
    var ctx=c.getContext('2d');
    var cty=c.getContext('2d');
    var ct_triangle1=c.getContext('2d');
    var ct_triangle2=c.getContext('2d');
    c.height=c.height;

    var x=50;
    var month=1;
    var y=0;
    var y_scale;

    ctx.beginPath();
    cty.beginPath();
    ct_triangle1.beginPath();
    ct_triangle2.beginPath();

    ctx.moveTo(50,50);
    ctx.lineTo(50,650);
    ctx.stroke();
    ctx.closePath();

    cty.moveTo(50,650);
    cty.lineTo(650,650);
    cty.stroke();
    cty.closePath();

    ct_triangle1.moveTo(60,60);
    ct_triangle1.lineTo(40,60);
    ct_triangle1.lineTo(50,40);
    ct_triangle1.fill();
    ct_triangle1.closePath();

    ct_triangle2.moveTo(650,640);
    ct_triangle2.lineTo(650,660);
    ct_triangle2.lineTo(670,650);
    ct_triangle2.fill();
    ct_triangle2.closePath();

    // y轴自适应
    if(data[index].sale[0]<20){
        y_scale=10;
    }
    else{
        y_scale=1;
    }

    for(var i=0;i<12;i++){
       
        // 对齐线
        var girdLine=c.getContext('2d');
        girdLine.beginPath();
        girdLine.moveTo(50,650-y);
        girdLine.lineTo(650,650-y);
        girdLine.strokeStyle="gray";
        girdLine.stroke();
        girdLine.closePath();

        // x轴坐标文本
        var ctx_text=c.getContext('2d');
        ctx_text.fillText(month+"月",x+40,670);
        ctx_text.font="13px Verdana"
        x+=48;
        month+=1;
        // y轴坐标文本
        var cty_text=c.getContext('2d');
        cty_text.fillText(y/y_scale,5,650-y);
        cty_text.font="13px Verdana"
        y+=50;
        
        // 折线
        var ct_Line=c.getContext('2d');
        ct_Line.beginPath();
        i==0?ct_Line.moveTo(50,650):ct_Line.moveTo(x-50,(650-(data[index].sale[i-1])*y_scale));
        ct_Line.lineTo(x,(650-(data[index].sale[i])*y_scale));
        ct_Line.strokeStyle="#60ACFC"
        ct_Line.stroke();
        ct_Line.closePath();

        // 圆点
        var ctPoint=c.getContext('2d');
        ctPoint.beginPath();
        ctPoint.arc(x,(650-(data[index].sale[i])*y_scale),3,0,2*Math.PI);
        // ctPoint.fillStyle="#60ACFC"
        ctPoint.fill();
    }
   
}