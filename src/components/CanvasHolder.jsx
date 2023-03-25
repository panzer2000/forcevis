import React from 'react';
import Canvas from './Canvas';
import * as DebugInfo from './DebugInfo';
import * as Data from './Data';
import * as Draw from './DrawHelper';
import * as MathHelper from './MathHelper'

export function CanvasHolder(params) {
    
// define the force parameters
// var friction = 0.95; // friction coefficient
// var REPULSION_FORCE = 80;
// var REPULSION_DISTANCE = 300;// if distance between two unconnected nodes is less than this they will repulse
// var Repulsion_Distance_SameGroup = 50;
// var Repulsion_Distance_Partners = 400; // if distance between two connected nodes is less than this they will repulse
// var ATTRACTION_FORCE = 60;
// var MIN_ATTRACT_DISTANCE = 200; // if any two nodes are closer than this they will attract
// var REPULSION_POWER = 3;
// var TIMEDELTA = 0.05;
    // Helper Functions

    const GetRepulsionDistance = (node1, node2) =>
    {
        // Are the two nodes partners?
        if (node1.relatedNodeIds.includes(node2.Id))
            return params.physicsParams.Repulsion_Distance_Partners;

        if (node1.groupId != "" && node1.groupId == node2.GroupId)
            return params.physicsParams.Repulsion_Distance_SameGroup;

        return params.physicsParams.REPULSION_DISTANCE;
    }
    

    // Draw is the primary play loop. It is executed 60 times per second from within useCanvas.jsx
    // This function need to do everything that is required to calculate /  modify / paint the next frame on the Canvas
      const draw = (ctx, frameCount) => {
        if(Data.renderData && Data.renderData != null)
        {

          var centerX = ctx.canvas.width / 2
          var centerY = ctx.canvas.height / 2


      // Apply Repulsion Force - all nodes repulse all other nodes - need to iterate over all node 2 node pairs
      Data.renderData.nodes.forEach(node1 => {
        Data.renderData.nodes.forEach(node2 => {
          if (node1 != node2) // && node1.go.transform != Globals.CurrentlyDraggedTransform)
          {

            // determine min distance for these nodes at which repulsion kicks in depending on whether they are in the same group, partners or unrelated
            const repulsion_dist = GetRepulsionDistance(node1, node2);

            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
    
            var distance = Math.sqrt(dx * dx + dy * dy)
            var ndx = dx / distance; // normalized x direction
            var ndy = dy / distance; // normalized y direction

              if (distance <= repulsion_dist)
              {

                  // Compute distance force
                  var distanceForce = 0;
                  
                  // Power (MaxDist - Dist) ^2  / MaxDit ^2  
                  distanceForce = Math.pow(repulsion_dist - distance, params.physicsParams.REPULSION_POWER) / Math.pow(repulsion_dist, params.physicsParams.REPULSION_POWER);

                  var fx = distanceForce * params.physicsParams.REPULSION_FORCE  * ndx * params.physicsParams.TIMEDELTA;
                  var fy = distanceForce * params.physicsParams.REPULSION_FORCE  * ndy * params.physicsParams.TIMEDELTA;

                  //node1.go.GetComponent<Rigidbody2D>().AddForce(forceDirection * distanceForce * REPULSION_FORCE * Time.deltaTime * node1.Size * node2.Size);

                  // Apply Forces
                  node1.vx -= fx;
                  node1.vy -= fy;

              }
          }
        })
      })

// Attraction force - things that are linked attract
      for (const link of Data.renderData.links) {
       
        const node1 = link.fromNode;
        const node2 = link.toNode;

        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;

        var distance = Math.sqrt(dx * dx + dy * dy) // magnitude of entire vector
        var ndx = dx / distance; // normalized x direction
        var ndy = dy / distance; // normalized y direction

        var distanceForce = 0;
        if (distance <= params.physicsParams.MIN_ATTRACT_DISTANCE) // we are within min attract distance. fall off attract force exponentially towards 0 
            distanceForce = 0 //1 - Math.pow(MIN_ATTRACT_DISTANCE - distance, REPULSION_POWER) / Math.pow(MIN_ATTRACT_DISTANCE, REPULSION_POWER);
        else // outside of min attract distance we attract uniformly
            distanceForce = 1;

        var fx = ndx * distanceForce * params.physicsParams.ATTRACTION_FORCE * params.physicsParams.TIMEDELTA
        var fy = ndy * distanceForce * params.physicsParams.ATTRACTION_FORCE * params.physicsParams.TIMEDELTA

        node1.vx += fx;
        node1.vy += fy;
        node2.vx -= fx;
        node2.vy -= fy;

      }


          // apply the friction force and update positions of nodes
          for (const node of Data.renderData.nodes) {
            node.vx *= params.physicsParams.FRICTION;
            node.vy *= params.physicsParams.FRICTION;

            node.x += node.vx;
            node.y += node.vy;
          }

      
          // Prepare canvas for next frame
          ctx.fillStyle = '#1E1E1E'
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      
          // Draw links
          Data.renderData.links.forEach(element => {
            Draw.DrawLink(ctx, centerX + element.fromNode.x, centerY + element.fromNode.y, centerX + element.toNode.x, centerY + element.toNode.y, "#555555", 1)
         });
          // Draw Shapes

          Data.renderData.nodes.forEach(element => {
            Draw.DrawNode(ctx, centerX + element.x, centerY + element.y, 'rgba(250,0,0,1)', "#555555", 5,3)
         });

          if(Data.baseData && Data.baseData != null)
          DebugInfo.showDebugInfo(ctx);
        }
      }
        
      return <Canvas draw={draw} />
    
    }

    export default React.memo(CanvasHolder);