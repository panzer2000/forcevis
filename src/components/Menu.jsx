import React from 'react';

export function Menu({expand, contract, panelState}) {

var DataIcon = panelState === "Data" ? "highlight1.png" : "highlight2.png"
var FilterIcon = panelState === "Filter" ? "highlight1.png" : "highlight2.png"
var SettingsIcon = panelState === "Settings" ? "highlight1.png" : "highlight2.png"

    return (
      
      <div >   
        <div>
          <img 
              src={DataIcon}
              width="2px" 
              height="45px"
          />     
          <img class="menuitem"
              src="icons1.png"
              alt="car"
              onClick={() => expand("Data", "200px")}
              width="25px" 
              height="25px"
          />
        </div>
        <div>       
        <img 
            src={FilterIcon}
            width="2px" 
            height="45x"
        />     
        <img class="menuitem"
            src="icons2.png"
            alt="car"
            onClick={() => expand("Filter", "300px")}
            width="25px" 
            height="25px"
        />
        </div> 
        <div>  
        <img 
            src={SettingsIcon}
            width="2px" 
            height="45px"
        />     
        <img class="menuitem"
            src="icons3.png"
            alt="car"
            onClick={() => expand("Settings", "200px")}
            width="25px" 
            height="25px"
        />
                </div> 
      </div>
    )
  
    }

  export default Menu;
  