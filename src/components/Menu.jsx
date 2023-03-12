import React from 'react';

export function Menu({expand, contract, panelState}) {
      
    return (
      <div >
        <img class="menuitem"
            src="icons1.png"
            alt="car"
            onClick={expand}
            width="25px" 
            height="25px"
        />
        <img class="menuitem"
            src="icons2.png"
            alt="car"
            onClick={expand}
            width="25px" 
            height="25px"
        />
        <img class="menuitem"
            src="icons3.png"
            alt="car"
            onClick={expand}
            width="25px" 
            height="25px"
        />
      </div>
    )
  
    }

  export default Menu;
  