import * as Data from './Data'

export function Banner(props) {
      

  console.log(props)
  const fn = props.fileName ?? "No Data FIle Loaded"

  const refreshData = (fileName) =>
  {
    console.log("loadData. name=")
    console.log(props.fileName)
    if(props.fileName != "Select File To Load")
      Data.populateRenderData(props.physicsParams)
  }

  return (
       <div style={{ height:20, padding: "10px"}}>
    FORCE VISUALISATION GRAPH: 

        <span class="Spacer-h" style={{ color: "#488EF7"}}>{fn.split('\\').pop().split('/').pop()}</span>
        <span class="Spacer-h">
            <button class="button-10" type="button" onClick={() => refreshData("")}>Restart: 300 Iterations</button>
        </span>
        <span class="Spacer-h">
            <button class="button-10" type="button" onClick={() => Data.calc(50, props.physicsParams)}>+50 Iterations</button>
        </span>
        <span class="Spacer-h">
            <button class="button-10" type="button" onClick={() => Data.resetTemperature()}>Reset Temp</button>
        </span>
      </div>
    )
  
    }
  
  
  export default Banner;
  