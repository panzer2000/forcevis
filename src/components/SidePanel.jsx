import React from 'react';

export function SidePanel({panelWidth, panelState, expand, contract}) {
  

    if (panelWidth === '200px') {        
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
            { panelState == "Data" && 
                <div>
                    {panelWidth}<p/>
                    Data
                </div>   
            }
            
            { panelState == "Filter" && 
                <div>
                    {panelWidth}<p/>
                    Filter
                </div>   
            }

            { panelState == "Settings" && 
                <div>
                    {panelWidth}<p/>
                    Settings
                </div>   
            }

        </div>)
    } else {
        return <div class="sidebar-left" style={{width: '0px', padding: 0}}></div>;
    }

}


export default SidePanel;
  