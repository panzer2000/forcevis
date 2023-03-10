import React from 'react';
import Canvas from './Canvas';
import * as DebugInfo from './DebugInfo';
import * as Data from './Data';
import * as Draw from './DrawHelper';
import * as MathHelper from './MathHelper'

export function CanvasHolder() {
  
    // Grab our base data
    

    // Draw is the primary play loop. It is executed 60 times per second from within useCanvas.jsx
    // This function need to do everything that is required to calculate /  modify / paint the next frame on the Canvas
      const draw = (ctx, frameCount) => {
        
        // Calculate forces
      
        
        // Apply forces - move actual locations based on force, damping and mass
    
        // Prepare canvas for next frame
        ctx.fillStyle = '#1E1E1E'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
        // Draw links
         
        // Draw Shapes
        
        if(Data.baseData != null)
        for (let step = 0; step < Data.baseData.baseNodes.length -1; step++) {
          
          var x = MathHelper.RandomInt(ctx.canvas.width-100) + 50
          var y = MathHelper.RandomInt(ctx.canvas.height-100) + 50
    
          Draw.DrawLink(ctx, x, y, x+100, y, "#555555", 5)
          Draw.DrawNode(ctx, x, y, 'rgba(250,0,0,1)', "#555555", 20,3)
          Draw.WriteText(ctx, "normal 8pt Arial", Data.baseData.baseNodes[step].name, x, y, "White")
    
        }
        if(Data.baseData != null)
        DebugInfo.showDebugInfo(ctx);
    
      }
        
      return <Canvas draw={draw} />
    
    }

    export default React.memo(CanvasHolder);