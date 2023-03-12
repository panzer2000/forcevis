

export var baseData  // The raw, as-loaded data set involving only Groups (optionally hierarchical), Nodes (optionally linked to a group) and Links between nodes

export var renderData // The filtered, group expand/collapse-aware set of baseData including node location, current velocity, force, color, size and other display information
                     // renderData holds everything that the play loop needs to perform calculations and display the graph

// The user decides to start with either 
export function populateRenderData(initOption){
//console.log("populateRenderData");
   baseData.baseNodes.forEach(element => {
      renderData.nodes.push(element)
   });

   baseData.baseLinks.forEach(element => {
      renderData.links.push(element)
   });

   baseData.baseGroups.forEach(element => {
      renderData.groups.push(element)
   });
   //console.log("end of populateRenderData");
}

export function populateBaseData(){

   const jsonData = require('../lesMis.json');
   baseData = jsonData;
    
}

export var InitOption = {
   ExpandAll: 'ExpandAll',
   CollapseAll: 'CollapseAll'
 };

