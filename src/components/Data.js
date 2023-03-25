

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

export var friction = 0.95; // friction coefficient
export var REPULSION_FORCE = 80;
export var REPULSION_DISTANCE = 300;// if distance between two unconnected nodes is less than this they will repulse
export var Repulsion_Distance_SameGroup = 50;
export var Repulsion_Distance_Partners = 400; // if distance between two connected nodes is less than this they will repulse
export var ATTRACTION_FORCE = 60;
export var MIN_ATTRACT_DISTANCE = 200; // if any two nodes are closer than this they will attract
export var REPULSION_POWER = 3;
export var TIMEDELTA = 0.05;

export function UpdateValues(params)
{
   friction = params.friction; // friction coefficient
   REPULSION_FORCE = params.REPULSION_FORCE;
   REPULSION_DISTANCE = params.REPULSION_DISTANCE;// if distance between two unconnected nodes is less than this they will repulse
   Repulsion_Distance_SameGroup = params.Repulsion_Distance_SameGroup;
   Repulsion_Distance_Partners = params.Repulsion_Distance_Partners; // if distance between two connected nodes is less than this they will repulse
   ATTRACTION_FORCE = params.ATTRACTION_FORCE;
   MIN_ATTRACT_DISTANCE = params.MIN_ATTRACT_DISTANCE; // if any two nodes are closer than this they will attract
   REPULSION_POWER = params.REPULSION_POWER;
   TIMEDELTA = params.TIMEDELTA;
}

export function setShowDebugInfo(flag)
{
   showDebugInfo = flag
}

export function setSimulationParameters(parameters)
{

}

// The user decides to start with either 
export function populateRenderData(initOption){

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
      element.x = Math.random() * 50
      element.y = Math.random() * 50
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

   console.log("end of populateRenderData:");
   console.log(renderData);
}

export async function populateBaseData(path, showError, setData, updateFileName){
 
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
   setData(baseData);
   updateFileName(path)
   console.log("res.data")
   console.log(res.data)
   populateRenderData()
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

