import React from 'react';
import { useState } from "react";

import CanvasHolder from './CanvasHolder';
import Banner from './Banner';
import SidePanel from './SidePanel';
import Footer from './Footer';
import Menu from './Menu';
import '../App.css';

export function App() {
      
  const [panelWidth, setPanelWidth] = useState("200px"); 
  const [panelState, setPanelState] = useState("Data"); 

  const expandPanel = () =>
  {
    setPanelWidth('200px')
  }

  const contractPanel = () =>
  {
    setPanelWidth('0x')
  }

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
