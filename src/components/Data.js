

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

export function setShowDebugInfo(flag)
{
   showDebugInfo = flag
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
                    
console.log("populateRenderData");
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
      element.x = Math.random() * 5
      element.y = Math.random() * 5
      element.vx = 0
      element.vy = 0
   });

   renderData.links.forEach(element => {
      element.fromNode = renderData.nodes.find(x => x.id == element.fromId)
      element.toNode = renderData.nodes.find(x => x.id == element.toId)
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

