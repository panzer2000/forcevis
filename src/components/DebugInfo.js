import * as Data from './Data';

  // Cache values
  let timeMeasurements     = [];
  let fps = 0;
  const decimalPlaces    = 2;
  const updateEachSecond = 1;
  const decimalPlacesRatio = Math.pow(10, decimalPlaces);
  


  export function showFps(ctx){
    timeMeasurements.push(performance.now());

    const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];
    
    if (msPassed >= updateEachSecond * 1000) {
      fps = Math.round(timeMeasurements.length / msPassed * 1000 * decimalPlacesRatio) / decimalPlacesRatio;
      timeMeasurements = [];
    }
  
    ctx.fillStyle = "White";
    ctx.font      = "normal 16pt Arial";
  
    ctx.fillText(fps + " fps", 10, 26);
  }


  export function showDebugInfo(ctx, mousemoveevent, mousewheelevent){
    if(Data.showDebugInfo)
    {
      ctx.fillStyle = "White";
      ctx.font      = "normal 12pt Arial";
      ctx.fillText(Data.baseData.baseNodes.length + " objects", 250, 26);
      ctx.fillText(Data.baseData.baseLinks.length + " links", 500, 26);
      ctx.fillText(ctx.canvas.width + " width", 250, 50);
      ctx.fillText(ctx.canvas.height + " height", 350, 50);
      showFps(ctx)

      var mousemoveworldspace = Data.screenToWorldCoords(ctx, mousemoveevent.clientX, mousemoveevent.clientY);
      ctx.font      = "normal 10pt Arial";
      ctx.fillText(`Mouse Pos Canvas coords x: ${mousemoveevent.clientX ?? "none2"} y:${ mousemoveevent.clientY ?? "none"}`, 50 , 80);
      ctx.fillText(`Mouse Pos world coords x : ${mousemoveworldspace.x ?? "none2"} y:${ mousemoveworldspace.y ?? "none"}`, 50 , 100);

      ctx.fillText(`Wheel deltaY: ${mousewheelevent.deltaY ?? "none"}`, 50 , 120);

    }
  }