

import axios from 'axios';

export var baseData  // The raw, as-loaded data set involving only Groups (optionally hierarchical), Nodes (optionally linked to a group) and Links between nodes

export var renderData // The filtered, group expand/collapse-aware set of baseData including node location, current velocity, force, color, size and other display information
                     // renderData holds everything that the play loop needs to perform calculations and display the graph
                      = {
                        nodes: [],
                        links: [],
                        groups: []
                    };
export var showDebugInfo = false
export var canvasXOffset = 0;
export var canvasYOffset = 0;
export function updateCanvasOffset(x, y)
{
   canvasXOffset = x
   canvasYOffset = y
}
export const coolDown = 0.96;
export var temperature = 0;
export function setTemperature(temp)
{
   temperature = temp;
}

export function resetTemperature()
{
   temperature = 1;
}

export function calc(iterations, physicsParams)
{
   resetTemperature()
   for (let index = 0; index < iterations; index++) {
      calculateMovement(physicsParams);      
   }

   centerNodes();
   updateCanvasOffset(0,0)
}

export var transform =  {scale : 1, offset : {x:0, y:0}};
export function setTransform(scale, offset)
{
   transform.scale = scale;
   transform.offset = offset;
}

export function calculateMovement(params)
{

   function hasCommonElement(arr1, arr2) {
      // Create a new Set object with the elements of the first array
      const set = new Set(arr1);
    
      // Loop through each element of the second array
      for (let i = 0; i < arr2.length; i++) {
        // If the second array element is already in the Set, return true
        if (set.has(arr2[i])) {
          return true;
        }
      }
    
      // If we haven't found any common elements, return false
      return false;
    }
   const GetRepulsionDistance = (node1, node2) =>
   {
       // Are the two nodes partners?
       if (node1.relatedNodeIds.includes(node2.id))
           return params.Repulsion_Distance_Partners;

       // siblings - one of the relatedNodeIds of either node is the same
      if(hasCommonElement(node1.relatedNodeIds, node2.relatedNodeIds))
         return params.Repulsion_Distance_Siblings;

       if (node1.groupId != "" && node1.groupId == node2.GroupId)
           return params.Repulsion_Distance_SameGroup;

       return params.REPULSION_DISTANCE;
   }

       // Apply Repulsion Force - all nodes repulse all other nodes - need to iterate over all node 2 node pairs
       renderData.nodes.forEach(node1 => {
         renderData.nodes.forEach(node2 => {
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
                   distanceForce = Math.pow(repulsion_dist - distance, params.REPULSION_POWER) / Math.pow(repulsion_dist, params.REPULSION_POWER);
 
                   var fx = distanceForce * params.REPULSION_FORCE  * ndx * params.TIMEDELTA;
                   var fy = distanceForce * params.REPULSION_FORCE  * ndy * params.TIMEDELTA;
 
                   //node1.go.GetComponent<Rigidbody2D>().AddForce(forceDirection * distanceForce * REPULSION_FORCE * Time.deltaTime * node1.Size * node2.Size);
 
                   // Apply Forces
                   node1.vx -= fx;
                   node1.vy -= fy;
 
               }

               // attract any nodes who are further apart than default repulsion distance to stop unlinked nodes from flying off
               if(distance >= params.REPULSION_DISTANCE + 1000 )
               {
                  // Compute distance force
                  var distanceForce = 0;
                   
                  // Power (MaxDist - Dist) ^2  / MaxDit ^2  
                  distanceForce = Math.pow(repulsion_dist - distance, params.REPULSION_POWER) / Math.pow(repulsion_dist, params.REPULSION_POWER);
                  var fx = params.REPULSION_FORCE  /2 * ndx * params.TIMEDELTA;
                  var fy = params.REPULSION_FORCE  /2 * ndy * params.TIMEDELTA;

                  //node1.go.GetComponent<Rigidbody2D>().AddForce(forceDirection * distanceForce * REPULSION_FORCE * Time.deltaTime * node1.Size * node2.Size);

                  // Apply Forces
                  node1.vx += fx;
                  node1.vy += fy;
               }
           }
         })
       })
 
 // Attraction force - things that are linked attract
       for (const link of renderData.links) {
        
         const node1 = link.fromNode;
         const node2 = link.toNode;
 
         const dx = node2.x - node1.x;
         const dy = node2.y - node1.y;
 
         var distance = Math.sqrt(dx * dx + dy * dy) // magnitude of entire vector
         var ndx = dx / distance; // normalized x direction
         var ndy = dy / distance; // normalized y direction
 
         var distanceForce = 0;
         if (distance >= params.MIN_ATTRACT_DISTANCE) 
           distanceForce = 1; // outside of attract distance we attract uniformly
         else // we are within min attract distance. fall off attract force exponentially towards 0 
           distanceForce = 0//1 - Math.pow(params.MIN_ATTRACT_DISTANCE - distance, params.REPULSION_POWER) / Math.pow(params.MIN_ATTRACT_DISTANCE, params.REPULSION_POWER); // Inside attract distance. falloff with power
           //1 - Math.pow(MIN_ATTRACT_DISTANCE - distance, REPULSION_POWER) / Math.pow(MIN_ATTRACT_DISTANCE, REPULSION_POWER);
         
 
 
         var fx = ndx * distanceForce * params.ATTRACTION_FORCE * params.TIMEDELTA
         var fy = ndy * distanceForce * params.ATTRACTION_FORCE * params.TIMEDELTA
 
         node1.vx += fx;
         node1.vy += fy;
         node2.vx -= fx;
         node2.vy -= fy;
 
       }
 
 
           // apply the friction force and update positions of nodes
           for (const node of renderData.nodes) {
             node.vx *= params.FRICTION * temperature;
             node.vy *= params.FRICTION * temperature;
 
             node.x += node.vx ;
             node.y += node.vy ;
           }
 

}

export function centerNodes()
{
   var minX = 10000000
   var maxX = -10000000
   var minY = 10000000
   var maxY = -10000000

   console.log("centerNodes")
   console.log(renderData.nodes)

   for (const node of renderData.nodes) {
      if(node.x > maxX) maxX = node.x
      if(node.x < minX) minX = node.x
      if(node.y > maxY) maxY = node.y
      if(node.y < minY) minY = node.y
    }

    var centX = (maxX + minX) / 2
    var centY = (maxY + minY) / 2

    console.log("Center:")
    console.log(centX)
    console.log(centY)
    console.log(minX)
    console.log(maxX)

    for (const node of renderData.nodes) {
      node.x -= centX
      node.y -= centY
    }
    console.log(renderData.nodes)
    console.log(" end of centerNodes")
}


export function setShowDebugInfo(flag)
{
   showDebugInfo = flag
}


// The user decides to start with either 
export function populateRenderData(physicsParams){

   renderData // The filtered, group expand/collapse-aware set of baseData including node location, current velocity, force, color, size and other display information
                     // renderData holds everything that the play loop needs to perform calculations and display the graph
                      = {
                        nodes: [],
                        links: [],
                        groups: []
                    };
   
                    
console.log("populateRenderData start");
   baseData.baseNodes.forEach(element => {
      renderData.nodes.push(element)
   });

   baseData.baseLinks.forEach(element => {
      renderData.links.push(element)
   });

   baseData.baseGroups.forEach(element => {
      renderData.groups.push(element)
   });

   renderData.nodes.forEach(element => {
      element.x = Math.random() * 500
      element.y = Math.random() * 500
      element.vx = 0
      element.vy = 0
      element.relatedNodeIds = [];
   });

   renderData.links.forEach(element => {
      element.fromNode = renderData.nodes.find(x => x.id == element.fromId)
      element.toNode = renderData.nodes.find(x => x.id == element.toId)

      element.fromNode.relatedNodeIds.push(element.toId);
      element.toNode.relatedNodeIds.push(element.fromId);

   });

   calc(350, physicsParams);
   console.log("end of populateRenderData:");
   console.log(renderData);
}

export async function populateBaseData(path, showError, physicsParams){
 
// const jsonData = require('../lesMis.json');
// baseData = jsonData;
// console.log("populateBaseData");
  // Details of the uploaded file
 
  // Request made to the backend api
  // Send formData object

//"http://skforcegraph.s3-website-ap-southeast-2.amazonaws.com/lesMis.json"

console.log(showError)
try {
   const res = await axios.get(path)
   baseData = res.data;
   showError("")
   //setData(baseData);
   //updateFileName(path)
   console.log("res.data")
   console.log(res.data)
   populateRenderData(physicsParams)
} catch (error) {
	baseData = null;
   console.log(error.message)
   showError(error.message)
}


  console.log("populateBaseData");
}


export var InitOption = {
   ExpandAll: 'ExpandAll',
   CollapseAll: 'CollapseAll'
 };

