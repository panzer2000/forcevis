
import React from 'react';
import * as Data from './Data';
import Select from 'react-select';

const options = [
  { value: 0, label: 'Naive' },
  { value: 1, label: 'Barnes-Hut' }
]



export function Panel_Settings(params) {
      
    const debug_Change = () => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  showDebugInfo: !params.physicsParams.showDebugInfo })) 
      Data.setShowDebugInfo(params.physicsParams.showDebugInfo);
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

    const Repulsion_Distance_Siblings_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  Repulsion_Distance_Siblings: value })) 
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

    const FRICTION_Change = (value) => {
      params.updatePhysicsParams(prevState => ({ ...prevState,  FRICTION: value })) 
    };

    const Solver_Change = e => { {
      params.updatePhysicsParams(prevState => ({ ...prevState,  Solver: e.value })) 
      console.log(e.value);
    };
  };

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor:'#404040', color: '#FFFFFF'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = 'black';
      return {
        ...styles,
        backgroundColor:'#404040',
        color: '#FFFFFF',
        //cursor: isDisabled ? 'not-allowed' : 'default'
      };
    }
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#a8a8a8" : "#a6a6a6",
      backgroundColor: state.isSelected ? "#404040" : "#404040",
      padding: "10px",
      border: "none",
      boxShadow: "none",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#404040",
      padding: "1px",
      border: "none",
      boxShadow: "none",
      width: '150px',
      height: '5px',
      float: 'right',
      color: "#a6a6a6",
      minHeight: '30px',
      height: '30px',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px'
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#a6a6a6" }),
  };

    //3Data.setShowDebugInfo(params.physicsParams.showDebugInfo);
    console.log("params");

console.log(params);

    return (
      <div>
        <div style={{ color: "#488EF7"}}>Settings<p/><p/></div>
        <div class="sidebar-panel">
            <Checkbox key="debugInfo" label="Show Debug Info" checked={params.physicsParams.showDebugInfo} onChange={debug_Change}/>
        </div>
          <form>
            <div class="Spacer-v">

              <div class="sidebar-panel">
              <div class="panel-heading">Repulsion<p/></div>
                Repulsion Force
                <input class="field" name="Text1" value={params.physicsParams.REPULSION_FORCE} onChange={(e) => REPULSION_FORCE_Change(e.target.value)}></input><p/>
              <div class="panel-heading">Repulse if closer than<p/></div>
                Linked nodes
                <input class="field" name="Text1" value={params.physicsParams.Repulsion_Distance_Partners} onChange={(e) => Repulsion_Distance_Partners_Change(e.target.value)}></input><p/>
                Siblings
                <input class="field" name="Text1" value={params.physicsParams.Repulsion_Distance_Siblings} onChange={(e) => Repulsion_Distance_Siblings_Change(e.target.value)}></input><p/>
                Same Group
                <input class="field" name="Text1" value={params.physicsParams.Repulsion_Distance_SameGroup} onChange={(e) => Repulsion_Distance_SameGroup_Change(e.target.value)}></input><p/>
                Unrelated
                <input className="field" name="Text1" value={params.physicsParams.REPULSION_DISTANCE} onChange={(e) => REPULSION_DISTANCE_Change(e.target.value)}></input><p/>
              </div> <p/>
              <div class="sidebar-panel">
              <div class="panel-heading">Attraction<p/></div>
                Attraction Force
                <input class="field" name="Text1" value={params.physicsParams.ATTRACTION_FORCE} onChange={(e) => ATTRACTION_FORCE_Change(e.target.value)}></input><p/>
              <div class="panel-heading">Attract if further apart than<p/></div>
                Linked nodes
                <input class="field" name="Text1" value={params.physicsParams.MIN_ATTRACT_DISTANCE} onChange={(e) => MIN_ATTRACT_DISTANCE_Change(e.target.value)}></input><p/>
              </div> <p/>
              <div class="sidebar-panel" style={{minHeight: "200px"}}>
              <div class="panel-heading">Other<p/></div>
                Exponential Power
                <input class="field" name="Text1" value={params.physicsParams.REPULSION_POWER} onChange={(e) => REPULSION_POWER_Change(e.target.value)}></input><p/>
                Time Multiplier
                <input class="field" name="Text1" value={params.physicsParams.TIMEDELTA} onChange={(e) => TIMEDELTA_Change(e.target.value)}></input><p/>
                Friction
                <input class="field" name="Text1" value={params.physicsParams.FRICTION} onChange={(e) => FRICTION_Change(e.target.value)}></input><p/>
                <table border="0px" padding="0px" width="100%">
                  <tr>
                    <td>Solver</td>
                    <td><Select  options={options} defaultValue={options.find(item => item.value === params.physicsParams.Solver)} onChange={Solver_Change} styles={customStyles}/></td>
                  </tr>
                </table>                              
              </div>
            </div>              
          </form>
         </div>

    );
  };
  


  const Checkbox = ({ label, checked, onChange }) => {
    return (
      <label>
        <input class="Checkbox" type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    );
    }

  export default Panel_Settings;
  