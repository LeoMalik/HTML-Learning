function RotateSVG()
{

    var svgTag = document.getElementById("svg");
    var svgDoc = null;

    svgDoc = svgTag.getSVGDocument();

    return svgDoc;
}

function setSvg(data){
    var x=76;
    var month=1;
    var svg=RotateSVG();   
    var svgDoc=svg.getElementById("svg_in");
    for(var i=0;i<12;i++){
        console.log(svg);
        var rect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var text=document.createElementNS("http://www.w3.org/2000/svg", "text");
        rect.setAttribute('x',x);
        rect.setAttribute('y',650-(data[0].sale[i]));
        text.setAttribute('x',x-5);
        text.setAttribute('y',670);
        text.textContent=month+"月";
        rect.setAttribute('width',20);
        rect.setAttribute('style',"fill:rgb(0,139,139);")
        rect.setAttribute('height',(data[0].sale[i]));
        month++;
        x=x+48;
        svgDoc.appendChild(rect);
        svgDoc.appendChild(text);
    }
}