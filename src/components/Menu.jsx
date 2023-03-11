import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import * as SidePanel from './SidePanel'

export function Menu() {
      
    return (
      <div >
        <img class="menuitem"
            src="icons1.png"
            alt="car"
            onClick={handleClick}
        />
                <img class="menuitem"
            src="icons2.png"
            alt="car"
            onClick={handleClick}
        />
                <img class="menuitem"
            src="icons3.png"
            alt="car"
            onClick={handleClick}
        />
      </div>
    )
  
    }
  
  
function handleClick()
{
    //SidePanel.collapse()
}

  export default Menu;
  