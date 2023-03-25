import { useState } from "react";
import * as Data from './Data'

export function Panel_Data(props) {
      

      const [name, setName] = useState("");
      const [error, setError] = useState("");

      const showError = (message) =>
      {
        console.log("showERror was called")
      }


      const loadData = (fileName) =>
      {
        console.log("loadData. name=")
        console.log(props.fileName)
        if(props.fileName != "Select File To Load")
          Data.populateBaseData(props.fileName, showError)
      }


      const Errorbox = ({ error }) => {

        if(error !== "")
        {
          console.log("error" + error)
          return (
            <div class="errorText">
  {error}
            </div>
          );
        }
        }

      const Stats = () => {

        if(Data !== null && Data.baseData != null && Data.baseData.baseNodes != null)
        {
          return (
            <div>
              Nodes: {Data.baseData.baseNodes.length} <p/>
              Links: {Data.baseData.baseLinks.length} 
            </div>
          );
          }
        }

        // if(props.fileName != "Select File To Load")
        // {
        //   console.log("fileName:")
        //   console.log(props.fileName)
        //   loadData(props.fileName)
        // }
        const handleChange = (event) => {
          console.log("handlechange:")
          console.log(event)
          props.updateFileName(event);
      };

      return (
        <div>
           <div style={{ color: "#488EF7"}}>Data<p/><p/></div>
          <div class="sidebar-panel" style={{minHeight: "200px"}} >
          Path to data
          <button class="button-10" type="button" style={{float: 'right'}} onClick={() => loadData("")}>Load</button>

              <div class="Spacer-v">
              {  <textarea  class="Textarea"
                  name="Text1" 
                  value={props.fileName}
                  rows="4"
                  cols="32" 
                  onChange={(e) => handleChange(e.target.value)}>             
                </textarea>}
              </div>              

          <Errorbox error={error}/>
          <Stats />
          </div>
        </div>
      )


     
    }
  
  
  export default Panel_Data;
  