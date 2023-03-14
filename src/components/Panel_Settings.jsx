
import React from 'react';
import * as Data from './Data';

export function Panel_Settings() {
      
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
      Data.setShowDebugInfo(!checked);

    };
  
    return (
      <div>
        Settings<p/><p/>
        <div class="sidebar-panel" style={{minHeight: "200px"}}>
            <Checkbox
            label="Show Debug Info"
            value={checked}
            onChange={handleChange}
            />
         </div>
  
      </div>
    );
  };
  
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
    }

  export default Panel_Settings;
  