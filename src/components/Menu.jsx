import React from 'react';

export function Menu({expand, contract}) {
      
    return (
      <div >
        <img class="menuitem"
            src="icons1.png"
            alt="car"
            onClick={expand}
        />
        <img class="menuitem"
            src="icons2.png"
            alt="car"
            onClick={expand}
        />
        <img class="menuitem"
            src="icons3.png"
            alt="car"
            onClick={expand}
        />
      </div>
    )
  
    }

  export default Menu;
  