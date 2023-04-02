import { useRef, useEffect } from 'react'
import * as Data from './Data';



function resizeCanvasToDisplaySize(context) {
    
    var parent = context.canvas.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10),
    h = parseInt(styles.getPropertyValue("height"), 10);

    context.canvas.width = w - 2;
    context.canvas.height = h;

    return false
  }

const useCanvas = (draw, options={}) => {
  
  const canvasRef = useRef(null)
  
   

  useEffect(() => {
    
    canvas = canvasRef.current

   
    // Set the scale factor and initial mouse coordinates
    var mouseX = 0;
    var mouseY = 0;
    
    var context;
    var canvas;

    var mouseButton = 0;
    var dragging = false;
    var movingNode = false;
    var nodeBeingMoved = null;

    function findPointWithinDistance(pointX, pointY, pointsArray, minDistance) {
      for (let i = 0; i < pointsArray.length; i++) {
        const distance = Math.sqrt(
          (pointX - pointsArray[i].x) ** 2 + (pointY - pointsArray[i].y) ** 2
        );
        if (distance <= minDistance) {
          return pointsArray[i];
        }
      }
      return null; // return null if no point is within min distance
    }

     // Add event listeners to the canvas for mouse movements and wheel scrolling
     canvas.addEventListener("mousemove", function(e) {
      // Get the mouse coordinates relative to the canvas element
      mouseX = e.clientX - canvas.offsetLeft;
      mouseY = e.clientY - canvas.offsetTop;

      if(mouseButton === 0 && e.buttons === 1) // the button has jusdt been pressed
      {
        console.log("Mouse:")
        console.log(e.clientX)
        console.log(e.clientY)
        
        // Check if we have clicked on a node:
        var nodeBeingMoved = findPointWithinDistance(e.clientX, e.clientY, Data.renderData.nodes, 15)
        console.log(nodeBeingMoved)
        if(nodeBeingMoved != null)
          movingNode = true
        else
          dragging = true
      }
      // If the left mouse button is pressed, move the canvas
      if (e.buttons === 1 && dragging) {
        Data.updateCanvasOffset(Data.canvasXOffset + e.movementX, Data.canvasYOffset + e.movementY)       
      }
      if (e.buttons === 1 && movingNode) {
        nodeBeingMoved.x += e.movementX;
        nodeBeingMoved.y += e.movementY;        
      }
      if(e.buttons ===0)
      {
        dragging = false;
        movingNode = false;
      }
      mouseButton = e.buttons;
    });

    canvas.addEventListener("wheel", function(e) {
      // Prevent default scroll behavior
      //e.preventDefault();

      // Get the current mouse position relative to the canvas element
      var mouseCanvasX = mouseX - Data.canvasXOffset;
      var mouseCanvasY = mouseY - Data.canvasYOffset;
      const deltaScale = e.deltaY > 0 ? 0.9 : 1.1;
      // Scale the canvas based on the direction of the scroll
      if (e.deltaY < 0) {
        Data.transform.scale *= 1.1;
      } else {
        Data.transform.scale /= 1.1;
      }
      //canvasX = (canvas.width / 2 - mouseX) * deltaScale + mouseX;
      //canvasY = (canvas.height / 2 - mouseY) * deltaScale + mouseY;

      // Calculate the new canvas position based on the mouse position and scale factor
      //canvasX = mouseX - mouseCanvasX * Data.transform.scale;
      //canvasY = mouseY - mouseCanvasY * Data.transform.scale;
    });

    context = canvas.getContext(options.context || '2d')
    let frameCount = 0
    let animationFrameId
    const render = () => {
            frameCount++
      resizeCanvasToDisplaySize(context)
      //context.setTransform(Data.transform.scale, 0, 0, Data.transform.scale, canvasX, canvasY);
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}



export default useCanvas