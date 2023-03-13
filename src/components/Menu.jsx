import React from 'react';

export function Menu({expand, contract, panelState}) {
   var ButtonStyle;   
  if (1==1) {
    ButtonStyle = "menuitem";
  } else {
    ButtonStyle = "menu";
  }
    return (
      <div >
        <img class={ButtonStyle}
            // {panelState == "Data" && src="icons1.png"}
            src="icons1.png"
            alt="car"
            onClick={() => expand("Data")}
            width="25px" 
            height="25px"
        />
        <img class={ButtonStyle}
            src="icons2.png"
            alt="car"
            onClick={() => expand("Filter")}
            width="25px" 
            height="25px"
        />
        <img class={ButtonStyle}
            src="icons3.png"
            alt="car"
            onClick={() => expand("Settings")}
            width="25px" 
            height="25px"
        />
      </div>
    )
  
    }

  export default Menu;
  