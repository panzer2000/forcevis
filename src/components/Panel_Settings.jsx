
import React from 'react';
import * as Data from './Data';

export function Panel_Settings() {
      
    const [checked, setChecked] = React.useState(false);

    const [friction, setfriction ] = React.useState(0.95); // friction coefficient
    const [REPULSION_FORCE, setREPULSION_FORCE] = React.useState(80);
    const [REPULSION_DISTANCE, setREPULSION_DISTANCE] = React.useState(300);// if distance between two unconnected nodes is less than this they will repulse
    const [Repulsion_Distance_SameGroup, setRepulsion_Distance_SameGroup] = React.useState(50);
    const [Repulsion_Distance_Partners, setRepulsion_Distance_Partners] = React.useState(400); // if distance between two connected nodes is less than this they will repulse
    const [ATTRACTION_FORCE, setATTRACTION_FORCE] = React.useState(60);
    const [MIN_ATTRACT_DISTANCE, setMIN_ATTRACT_DISTANCE] = React.useState(200); // if any two nodes are closer than this they will attract
    const [REPULSION_POWER, setREPULSION_POWER] = React.useState(3);
    const [TIMEDELTA, setTIMEDELTA] = React.useState(0.05);


    const debug_Change = () => {
      setChecked(!checked);
      Data.setShowDebugInfo(!checked);
    };
  
    const REPULSION_FORCE_Change = (value) => {
      setREPULSION_FORCE(value)
      UpdateData()
    };

    const REPULSION_DISTANCE_Change = (value) => {
      setREPULSION_DISTANCE(value)
      UpdateData()
    };

    const Repulsion_Distance_SameGroup_Change = (value) => {
      setRepulsion_Distance_SameGroup(value)
      UpdateData()
    };

    const Repulsion_Distance_Partners_Change = (value) => {
      setRepulsion_Distance_Partners(value)
      UpdateData()
    };

    const ATTRACTION_FORCE_Change = (value) => {
      setATTRACTION_FORCE(value)
      UpdateData()
    };

    const MIN_ATTRACT_DISTANCE_Change = (value) => {
      setMIN_ATTRACT_DISTANCE(value)
      UpdateData()
    };

    const REPULSION_POWER_Change = (value) => {
      setREPULSION_POWER(value)
      UpdateData()
    };

    const TIMEDELTA_Change = (value) => {
      setTIMEDELTA(value)
      UpdateData()
    };


    const UpdateData = () => 
    {
      
    }

    return (
      <div>
        Settings<p/><p/>
        <div class="sidebar-panel" style={{minHeight: "300px"}}>
            <Checkbox label="Show Debug Info" value={checked} onChange={debug_Change}/>
          <form>
            <div class="Spacer-v">
              Max Repulsion Distance
              <input className="field" name="Text1" value={REPULSION_DISTANCE} onChange={(e) => REPULSION_DISTANCE_Change(e.target.value)}></input><p/>
              Repulsion Distance (Same Group)
              <input class="field" name="Text1" value={Repulsion_Distance_SameGroup} onChange={(e) => Repulsion_Distance_SameGroup_Change(e.target.value)}></input><p/>
              Repulsion Distance (Partners)
              <input class="field" name="Text1" value={Repulsion_Distance_Partners} onChange={(e) => Repulsion_Distance_Partners_Change(e.target.value)}></input><p/>
              Repulsion Force (Unrelated)
              <input class="field" name="Text1" value={REPULSION_FORCE} onChange={(e) => REPULSION_FORCE_Change(e.target.value)}></input><p/>
              Attraction Force
              <input class="field" name="Text1" value={ATTRACTION_FORCE} onChange={(e) => ATTRACTION_FORCE_Change(e.target.value)}></input><p/>
              Min Attraction Distance
              <input class="field" name="Text1" value={MIN_ATTRACT_DISTANCE} onChange={(e) => MIN_ATTRACT_DISTANCE_Change(e.target.value)}></input><p/>
              Exponential Power
              <input class="field" name="Text1" value={REPULSION_POWER} onChange={(e) => REPULSION_POWER_Change(e.target.value)}></input><p/>
              Time Multiplier
              <input class="field" name="Text1" value={TIMEDELTA} onChange={(e) => TIMEDELTA_Change(e.target.value)}></input><p/>
            </div>              
          </form>
         </div>
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
  