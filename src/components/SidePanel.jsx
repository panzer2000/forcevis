import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom/client';



export function SidePanel() {

    const [panelWidth, setPanelWidth] = useState("200px"); 
   
    return (
        <div class="sidebar-left" style={{width: panelWidth}}>
            <div >
                <img class="collapseButton"
                    src="icons4.png"
                    alt="car"
                    onClick={collapseClick}
                    style={{float: 'right'}}
                />
            </div>

            <div>
                {panelWidth}<p/>
                Data
            </div>
        </div>
    )

    function collapseClick()
    {
        if(panelWidth === '10px')
            setPanelWidth('200px')
        else
            setPanelWidth('10px');
    }
}

export function collapse()
{
    //setPanelWidth('200px')
}


export default SidePanel;
  