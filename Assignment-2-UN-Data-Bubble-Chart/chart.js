 var svg = document.getElementById("chart");

 if (svg == null){
     console.log("Element could not be retrieved by ID")
 }
 else{
     console.log("SVG successfully retrieved from html")
 }


 const circleAttributes = [{cx:"355.41px",cy:"355.081px",r:"351.496px"},
     {cx:"708.215px",cy:"628.446px",r:"65.764px"},
     {cx:"170.126px",cy:"774.499px",r:"93.354px"},
     {cx:"575.016px",cy:"902.8px",r:"211.653px"},
     {cx:"302.616px",cy:"878.485px",r:"50.078px"},
     {cx:"58.799px",cy:"906.130px",r:"46.677px"},
     {cx:"184.129px",cy:"968.687px",r:"42.708px"},
     {cx:"315.971px",cy:"1004.53px",r:"35.149px"},
     {cx:"115.576px",cy:"1062.659px",r:"34.015px"},
     {cx:"225.338px",cy:"1076.348px",r:"28.913px"}]

 for (var j=0;j<circleAttributes.length;j++){
     var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
     circle.setAttribute("cx", circleAttributes[j].cx);
     circle.setAttribute("cy", circleAttributes[j].cy);
     circle.setAttribute("r", circleAttributes[j].r);
     svg.appendChild(circle);
 }

 const textAttributes = [{x:"15.494px",y:"351.939px",size:"114px",text:"United States"},
    {x:"85.494px",y:"471.939px",size:"114px",text:"of America"},
    {x:"646.457px",y:"638.446px",size:"30px",text:"Germany"},
    {x:"88.126px",y:"790.499px",size:"60px",text:"Japan"},
    {x:"385.016px",y:"952.8px",size:"144px",text:"China"},
    {x:"270.616px",y:"873.485px",size:"22px",text:"United"},
    {x:"258.616px",y:"898.485px",size:"22px",text:"Kingdom"},
    {x:"22.799px",y:"913.130px",size:"24px",text:"France"},
    {x:"149.129px",y:"978.687px",size:"32px",text:"India"},
    {x:"288.971px",y:"1014.53px",size:"30px",text:"Italy"},
    {x:"85.576px",y:"1069.659px",size:"24px",text:"Brazil"},
    {x:"198px",y:"1082.348px",size:"15.5px",text:"Canada"}]

 for (var i=0;i<textAttributes.length;i++){
     var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
     text.setAttribute("x", textAttributes[i].x);
     text.setAttribute("y", textAttributes[i].y);
     text.setAttribute("font-size", textAttributes[i].size)
     text.innerHTML = textAttributes[i].text;
     svg.appendChild(text);
 }