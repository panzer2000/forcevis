

 export function DrawLink(ctx, x, y, x1, y1, strokeColor, width){

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = width
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
     
 }

 export function DrawNode(ctx, x, y, fillColor, strokeColor, radius, outlineWidth){

    ctx.beginPath();
    ctx.arc(x, y,radius,0,2*Math.PI);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = outlineWidth
    ctx.fillStyle=fillColor;
    ctx.fill();    
    ctx.stroke();
     
 }

 export function WriteText(ctx, font, text, x, y, color){

    ctx.fillStyle = color;
    if(font == "")
        font = "normal 16pt Arial"
    ctx.font      = font
     
    ctx.fillText(text, x, y);
     
 }
 