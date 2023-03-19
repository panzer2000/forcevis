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
  const [fileName, setFileName] = useState(""); 

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
  console.log("params")
  console.log(params.get("FileName"))

  const fn = params.get("FileName") ?? ""
  console.log("FileName:")
  console.log(fn)
    if(fn=="" && fileName != "Select Data Source")
      setFileName("Select Data Source")
    
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
            <SidePanel panelWidth = {panelWidth} panelState = {panelState} expand = {expandPanel} contract = {contractPanel} fileName = {fileName} updateFileName={setFileName}/>
            <div class="splitter">
            </div>
            <div class="content-container">  
                <CanvasHolder />
            </div>
        </div>

        <footer>
            <Footer/>
        </footer>
    </div>

  )

}


export default App;
