import React from 'react';
import Canvas from './Canvas';
import * as DebugInfo from './DebugInfo';
import * as Data from './Data';
import * as Draw from './DrawHelper';
import * as MathHelper from './MathHelper'

export function CanvasHolder(params) {
    
 

    // Draw is the primary play loop. It is executed 60 times per second from within useCanvas.jsx
    // This function need to do everything that is required to calculate /  modify / paint the next frame on the Canvas
      const draw = (ctx, frameCount) => {
        if(Data.renderData && Data.renderData != null)
        {



          Data.calculateMovement(params.physicsParams)
          Data.setTemperature(Data.temperature * Data.coolDown)
      
          // Prepare canvas for next frame
          ctx.fillStyle = '#1E1E1E'
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
          // Draw links
          Data.renderData.links.forEach(element => {
            Draw.DrawLink(ctx, centerX + element.fromNode.x, centerY + element.fromNode.y, centerX + element.toNode.x, centerY + element.toNode.y, "#555555", 1)
         });
          // Draw Shapes

          Data.renderData.nodes.forEach(element => {
            Draw.DrawNode(ctx, centerX + element.x, centerY + element.y, 'rgba(0,100,250,1)', "#1E1E1E", 5,3)
         });


        }
      }
        
      return <Canvas draw={draw} />
    
    }

    export default React.memo(CanvasHolder);