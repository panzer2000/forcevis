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


  export function showDebugInfo(ctx){

    ctx.fillStyle = "White";
    ctx.font      = "normal 12pt Arial";
    ctx.fillText(Data.baseData.baseNodes.length + " objects", 250, 26);
    ctx.fillText(Data.baseData.baseLinks.length + " links", 500, 26);
    ctx.fillText(ctx.canvas.width + " width", 250, 50);
    ctx.fillText(ctx.canvas.height + " height", 250, 100);
    showFps(ctx)
  }