import React from 'react';
import Canvas from './Canvas';
import * as DebugInfo from './DebugInfo';
import * as Data from './Data';
import * as Draw from './DrawHelper';
import * as MathHelper from './MathHelper'

export function CanvasHolder() {
  
  
// define the force parameters
const k = 0.05; // spring constant
const l = 200; // natural length of the springs
const friction = 0.95; // friction coefficient

const REPULSION_FORCE = 80000;
const REPULSION_DISTANCE = 4;
const Repulsion_Distance_SameGroup = 0.5;
const Repulsion_Distance_Partners = 6;
const ATTRACTION_FORCE = 60000;
const Min_Attraction_Distance = 1;

    // Grab our base data
    

    // Draw is the primary play loop. It is executed 60 times per second from within useCanvas.jsx
    // This function need to do everything that is required to calculate /  modify / paint the next frame on the Canvas
      const draw = (ctx, frameCount) => {
        if(Data.renderData && Data.renderData != null)
        {

          var centerX = ctx.canvas.width / 2
          var centerY = ctx.canvas.height / 2

          // Calculate forces
         // apply the spring forces to the nodes
          for (const link of Data.renderData.links) {
            const source = link.fromNode;
            const target = link.toNode;
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            const force = k * (distance - l);
            const fx = force * dx / distance;
            const fy = force * dy / distance;
            source.vx += fx;
            source.vy += fy;
            target.vx -= fx;
            target.vy -= fy;
          }

          // apply the friction force to the nodes
          for (const node of Data.renderData.nodes) {
            node.vx *= friction;
            node.vy *= friction;
          }

          // update the node positions
          for (const node of Data.renderData.nodes) {
            node.x += node.vx;
            node.y += node.vy;
          }
          
          
          // Apply forces - move actual locations based on force, damping and mass
      
          // Prepare canvas for next frame
          ctx.fillStyle = '#1E1E1E'
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
          // Draw links
          Data.renderData.links.forEach(element => {
            Draw.DrawLink(ctx, centerX + element.fromNode.x, centerY + element.fromNode.y, centerX + element.toNode.x, centerY + element.toNode.y, "#555555", 5)
         });
          // Draw Shapes

          Data.renderData.nodes.forEach(element => {
            Draw.DrawNode(ctx, centerX + element.x, centerY + element.y, 'rgba(250,0,0,1)', "#555555", 20,3)
         });


          // for (let step = 0; step < Data.renderData.nodes.length -1; step++) {
            
          //   var x = MathHelper.RandomInt(ctx.canvas.width-100) + 50
          //   var y = MathHelper.RandomInt(ctx.canvas.height-100) + 50
      
          //   Draw.DrawLink(ctx, x, y, x+100, y, "#555555", 5)
          //   Draw.DrawNode(ctx, x, y, 'rgba(250,0,0,1)', "#555555", 20,3)
          //   Draw.WriteText(ctx, "normal 8pt Arial", Data.baseData.baseNodes[step].name, x, y, "White")
      
          // }


          // Draw.DrawNode(ctx, centerX, centerY, 'rgba(250,0,0,1)', "#555555", 20,3)

          if(Data.baseData && Data.baseData != null)
          DebugInfo.showDebugInfo(ctx);
        }
      }
        
      return <Canvas draw={draw} />
    
    }

    export default React.memo(CanvasHolder);