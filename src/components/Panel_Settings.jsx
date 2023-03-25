
import React from 'react';
import * as Data from './Data';

export function Panel_Settings() {
      
    const [checked, setChecked] = React.useState(false);

    const [friction, setfriction ] = React.useState(Data.friction); // friction coefficient
    const [REPULSION_FORCE, setREPULSION_FORCE] = React.useState(Data.REPULSION_FORCE);
    const [REPULSION_DISTANCE, setREPULSION_DISTANCE] = React.useState(Data.REPULSION_DISTANCE);// if distance between two unconnected nodes is less than this they will repulse
    const [Repulsion_Distance_SameGroup, setRepulsion_Distance_SameGroup] = React.useState(Data.Repulsion_Distance_SameGroup);
    const [Repulsion_Distance_Partners, setRepulsion_Distance_Partners] = React.useState(Data.Repulsion_Distance_Partners); // if distance between two connected nodes is less than this they will repulse
    const [ATTRACTION_FORCE, setATTRACTION_FORCE] = React.useState(Data.ATTRACTION_FORCE);
    const [MIN_ATTRACT_DISTANCE, setMIN_ATTRACT_DISTANCE] = React.useState(Data.MIN_ATTRACT_DISTANCE); // if any two nodes are closer than this they will attract
    const [REPULSION_POWER, setREPULSION_POWER] = React.useState(Data.REPULSION_POWER);
    const [TIMEDELTA, setTIMEDELTA] = React.useState(Data.TIMEDELTA);


    const debug_Change = () => {
      setChecked(!checked);
      Data.setShowDebugInfo(!checked);
    };
  
    const REPULSION_FORCE_Change = (value) => {
      setREPULSION_FORCE(value)
      UpdateData();
    };

    const REPULSION_DISTANCE_Change = (value) => {
      setREPULSION_DISTANCE(value)
      UpdateData();
    };

    const Repulsion_Distance_SameGroup_Change = (value) => {
      setRepulsion_Distance_SameGroup(value)
      UpdateData();
    };

    const Repulsion_Distance_Partners_Change = (value) => {
      setRepulsion_Distance_Partners(value)
      UpdateData();
    };

    const ATTRACTION_FORCE_Change = (value) => {
      setATTRACTION_FORCE(value)
      UpdateData();
    };

    const MIN_ATTRACT_DISTANCE_Change = (value) => {
      setMIN_ATTRACT_DISTANCE(value)
      UpdateData();
    };

    const REPULSION_POWER_Change = (value) => {
      setREPULSION_POWER(value)
      UpdateData();
    };

    const TIMEDELTA_Change = (value) => {
      setTIMEDELTA(value)
      UpdateData();
    };

    const UpdateData = () => 
    {
      const params = {
        friction : friction,
        REPULSION_FORCE : REPULSION_FORCE,
        REPULSION_DISTANCE : REPULSION_DISTANCE,
        Repulsion_Distance_SameGroup : Repulsion_Distance_SameGroup,
        Repulsion_Distance_Partners : Repulsion_Distance_Partners,
        ATTRACTION_FORCE : ATTRACTION_FORCE,
        MIN_ATTRACT_DISTANCE : MIN_ATTRACT_DISTANCE,
        paramREPULSION_POWER : REPULSION_POWER,
        TIMEDELTA : TIMEDELTA
      }
      Data.UpdateValues(params)
    }

    return (
      <div>
        Settings<p/><p/>
        <div class="sidebar-panel">
            <Checkbox label="Show Debug Info" value={checked} onChange={debug_Change}/>
        </div>
          <form>
            <div class="Spacer-v">
              <div class="sidebar-panel">
                Max Repulsion Distance
                <input className="field" name="Text1" value={REPULSION_DISTANCE} onChange={(e) => REPULSION_DISTANCE_Change(e.target.value)}></input><p/>
                Repulsion Distance (Same Group)
                <input class="field" name="Text1" value={Repulsion_Distance_SameGroup} onChange={(e) => Repulsion_Distance_SameGroup_Change(e.target.value)}></input><p/>
                Repulsion Distance (Partners)
                <input class="field" name="Text1" value={Repulsion_Distance_Partners} onChange={(e) => Repulsion_Distance_Partners_Change(e.target.value)}></input><p/>
                Repulsion Force (Unrelated)
                <input class="field" name="Text1" value={REPULSION_FORCE} onChange={(e) => REPULSION_FORCE_Change(e.target.value)}></input><p/>
              </div> <p/>
              <div class="sidebar-panel">
                Attraction Force
                <input class="field" name="Text1" value={ATTRACTION_FORCE} onChange={(e) => ATTRACTION_FORCE_Change(e.target.value)}></input><p/>
                Min Attraction Distance
                <input class="field" name="Text1" value={MIN_ATTRACT_DISTANCE} onChange={(e) => MIN_ATTRACT_DISTANCE_Change(e.target.value)}></input><p/>
              </div> <p/>
              <div class="sidebar-panel">
                Exponential Power
                <input class="field" name="Text1" value={REPULSION_POWER} onChange={(e) => REPULSION_POWER_Change(e.target.value)}></input><p/>
                Time Multiplier
                <input class="field" name="Text1" value={TIMEDELTA} onChange={(e) => TIMEDELTA_Change(e.target.value)}></input><p/>
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
  