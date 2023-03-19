import { useState } from "react";
import * as Data from './Data'

export function Panel_Data(props) {
      

      const [name, setName] = useState("");
      const [error, setError] = useState("");
      const [data, setData] = useState("");

      const showError = (message) =>
      {
        console.log("showERror was called")
        setError(message)
      }


      const loadData = (fileName) =>
      {
        var fileToLoad = ""
        if(fileName != "")
          fileToLoad = fileName
        else
          fileToLoad = name

        console.log("loadData. name=")
        console.log(fileToLoad)
        if(fileToLoad != "Select Data Source")
          Data.populateBaseData(fileToLoad, showError, setData, props.updateFileName)
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

      const Stats = ({ newData }) => {
        console.log("stats external")
        console.log(newData)
        if(newData && newData !== null)
        {
          console.log("stats internal")
          console.log(newData)
          return (
            <div>
              Nodes: {newData.baseNodes.length} <p/>
              Links: {newData.baseLinks.length} 
            </div>
          );
          }
        }

        if(props.fileName != null && name == "")
        {
          console.log("fileName:")
          console.log(props.fileName)
          setName(props.fileName)
          loadData(props.fileName)
        }

      return (
        <div>
                  Data<p/><p/>
          <div class="sidebar-panel" style={{minHeight: "200px"}} >
          Path to data:
          <button class="button-10" type="button" style={{float: 'right'}} onClick={() => loadData("")}>Load</button>
          <form>

              <div class="Spacer-v">
              {  <textarea  class="Textarea"
                  name="Text1" 
                  value={name}
                  rows="4"
                  cols="32" 
                  onChange={(e) => setName(e.target.value)}>             
                </textarea>}
              </div>              

          </form>
          <Errorbox error={error}/>
          <Stats newData={data}/>
          </div>
        </div>
      )


     
    }
  
  
  export default Panel_Data;
  