import React from 'react';
import { useState } from "react";
import CanvasHolder from './CanvasHolder';
import Banner from './Banner';
import SidePanel from './SidePanel';
import Footer from './Footer';
import Menu from './Menu';
import '../App.css';
import * as Data from './Data';



export function App() {
      
  const [panelWidth, setPanelWidth] = useState("300px"); 
  const [panelState, setPanelState] = useState("Data"); 
  const [fileName, setFileName] = useState("Select File To Load"); 
  const [physicsParams, setPhysicsParams] = useState({
      FRICTION : 0.95, // FRICTION coefficient
      REPULSION_FORCE : 80,
      REPULSION_DISTANCE : 300,// if distance between two unconnected nodes is less than this they will repulse
      Repulsion_Distance_SameGroup : 50,
      Repulsion_Distance_Partners : 400, // if distance between two connected nodes is less than this they will repulse
      ATTRACTION_FORCE : 60,
      MIN_ATTRACT_DISTANCE : 200, // if any two nodes are closer than this they will attract
      REPULSION_POWER : 3,
      TIMEDELTA : 0.05,
  }); 

  const expandPanel = (newPanelState, newPanelWidth) =>
  {
    setPanelWidth(newPanelWidth)
    console.log(newPanelWidth)
    setPanelState(newPanelState)
  }

  const contractPanel = () =>
  {
    setPanelWidth('0x')
    setPanelState("Hidden")
  }

  const params = new URLSearchParams(window.location.search)
  console.log("URL params")
  console.log(params.get("FileName"))

  const fn = params.get("FileName") ?? ""
  console.log("URL FileName:")
  console.log(fn)
    if(fn=="" && fileName != "Select File To Load")
      setFileName("Select File To Load")
    
    if(fn != "" && (fileName == "" || fileName == null))
      setFileName(fn)

  


  return (
   
    <div class="flex-master">
        <header class="banner">
            <Banner fileName={fileName}/>
        </header>
        <div class="page-content">
            <nav class="menu">
              <Menu expand = {expandPanel} contract = {contractPanel} panelState = {panelState}/>
            </nav>            
            <SidePanel panelWidth = {panelWidth} panelState = {panelState} expand = {expandPanel} contract = {contractPanel} fileName = {fileName} updateFileName={setFileName} physicsParams={physicsParams} updatePhysicsParams={setPhysicsParams}/>
            <div class="splitter">
            </div>
            <div class="content-container">  
                <CanvasHolder  physicsParams={physicsParams} updatePhysicsParams={setPhysicsParams}/>
            </div>
        </div>

        <footer>
            <Footer/>
        </footer>
    </div>

  )

}


export default App;
