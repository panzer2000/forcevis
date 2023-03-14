import { useState } from "react";

export function Panel_Data() {
      

      const [name, setName] = useState("");

      return (
        <div>
                  Settings<p/><p/>
<div class="sidebar-panel" style={{minHeight: "200px"}} >
        <form>
          <label>Enter your name:
            <input
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </form>
        </div>
        </div>
      )

    }
  
  
  export default Panel_Data;
  