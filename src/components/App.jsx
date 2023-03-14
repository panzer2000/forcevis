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
      
  const [panelWidth, setPanelWidth] = useState("0px"); 
  const [panelState, setPanelState] = useState("Hidden"); 

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

  // If we haven't got any data initialised, do it now
  if(Data.baseData == null ? Data.populateBaseData(): null);
    

  return (
   
    <div class="flex-master">
        <header class="banner">
            <Banner />
        </header>

        <div class="page-content">
            <nav class="menu">
              <Menu expand = {expandPanel} contract = {contractPanel} panelState = {panelState}/>
            </nav>            
            <SidePanel panelWidth = {panelWidth} panelState = {panelState} expand = {expandPanel} contract = {contractPanel}/>
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
