import React from 'react';
import Panel_Data from './Panel_Data';
import Panel_Filter from './Panel_Filter';
import Panel_Settings from './Panel_Settings';

export function SidePanel({panelWidth, panelState, expand, contract, fileName, updateFileName}) {
  

    if (panelState != "Hidden") {        
        return (
        <div class="sidebar-left" style={{width: panelWidth}}>
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
                    <Panel_Data fileName={fileName} updateFileName={updateFileName}/>
                </div>   
            }
            
            { panelState == "Filter" && 
                <div>
                    <Panel_Filter/>
                </div>   
            }

            { panelState == "Settings" && 
                <div>
                    <Panel_Settings/>
                </div>   
            }

        </div>)
    } else {
        return <div class="sidebar-left" style={{width: '0px', padding: 0}}></div>;
    }

}


export default SidePanel;
  