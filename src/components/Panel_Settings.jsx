
import React from 'react';
import * as Data from './Data';

export function Panel_Settings(params) {
      
    const [checked, setChecked] = React.useState(false);

    const debug_Change = () => {
      setChecked(!checked);
      Data.setShowDebugInfo(!checked);
    };
  
    const REPULSION_FORCE_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  REPULSION_FORCE: value })) 
    };

    const REPULSION_DISTANCE_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,   REPULSION_DISTANCE: value })) 
    };

    const Repulsion_Distance_SameGroup_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  Repulsion_Distance_SameGroup: value })) 
    };

    const Repulsion_Distance_Partners_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  Repulsion_Distance_Partners: value })) 
    };

    const ATTRACTION_FORCE_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  ATTRACTION_FORCE: value })) 
    };

    const MIN_ATTRACT_DISTANCE_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  MIN_ATTRACT_DISTANCE: value })) 
    };

    const REPULSION_POWER_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  REPULSION_POWER: value })) 
    };

    const TIMEDELTA_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  TIMEDELTA: value })) 
    };
    console.log("params");
console.log(params);

    return (
      <div>
        <div style={{ color: "#488EF7"}}>Settings<p/><p/></div>
        <div class="sidebar-panel">
            <Checkbox label="Show Debug Info" value={checked} onChange={debug_Change}/>
        </div>
          <form>
            <div class="Spacer-v">

              <div class="sidebar-panel">
              <div class="panel-heading">Repulsion<p/></div>
                Repulsion Force
                <input class="field" name="Text1" value={params.physicsParams.REPULSION_FORCE} onChange={(e) => REPULSION_FORCE_Change(e.target.value)}></input><p/>
                Repulsion Distance - Unrelated
                <input className="field" name="Text1" value={params.physicsParams.REPULSION_DISTANCE} onChange={(e) => REPULSION_DISTANCE_Change(e.target.value)}></input><p/>
                Repulsion Distance - Grouped
                <input class="field" name="Text1" value={params.physicsParams.Repulsion_Distance_SameGroup} onChange={(e) => Repulsion_Distance_SameGroup_Change(e.target.value)}></input><p/>
                Repulsion Distance - Partners
                <input class="field" name="Text1" value={params.physicsParams.Repulsion_Distance_Partners} onChange={(e) => Repulsion_Distance_Partners_Change(e.target.value)}></input><p/>
 
              </div> <p/>
              <div class="sidebar-panel">
              <div class="panel-heading">Attraction<p/></div>
                Attraction Force
                <input class="field" name="Text1" value={params.physicsParams.ATTRACTION_FORCE} onChange={(e) => ATTRACTION_FORCE_Change(e.target.value)}></input><p/>
                Min Attraction Distance
                <input class="field" name="Text1" value={params.physicsParams.MIN_ATTRACT_DISTANCE} onChange={(e) => MIN_ATTRACT_DISTANCE_Change(e.target.value)}></input><p/>
              </div> <p/>
              <div class="sidebar-panel">
              <div class="panel-heading">Other<p/></div>
                Exponential Power
                <input class="field" name="Text1" value={params.physicsParams.REPULSION_POWER} onChange={(e) => REPULSION_POWER_Change(e.target.value)}></input><p/>
                Time Multiplier
                <input class="field" name="Text1" value={params.physicsParams.TIMEDELTA} onChange={(e) => TIMEDELTA_Change(e.target.value)}></input><p/>
              </div>
            </div>              
          </form>
         </div>

    );
  };
  
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input class="Checkbox" type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
    }

  export default Panel_Settings;
  