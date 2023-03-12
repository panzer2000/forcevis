import React from 'react';

export function SidePanel({panelWidth, expand, contract}) {
  

    if (panelWidth == '200px') {        
        return (
        <div class="sidebar-left" style={{width: '200px'}}>
            <div >
                <img class="collapseButton"
                    src="icons4.png"
                    alt="car"
                    onClick={contract}
                    style={{float: 'right'}}
                />
            </div>

            <div>
                {panelWidth}<p/>
                Data
            </div>
        </div>)
    } else {
        return <div class="sidebar-left" style={{width: '0px', padding: 0}}></div>;
    }


    function collapseClick()
    {
        if(panelWidth == '0px')
            expand()
        else
            contract()
    }
}


export default SidePanel;
  