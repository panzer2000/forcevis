import React from 'react';
import ReactDOM from 'react-dom/client';
import CanvasHolder from './CanvasHolder';
import Banner from './Banner';
import SidePanel from './SidePanel';
import Footer from './Footer';
import Menu from './Menu';
import '../App.css';

export function App() {
      


  return (
    // <div class="flex-master">
    //   <div class="page-header">
    //   <Banner />
    //   </div>
      
    //   <table>
    //     <td class="sidebar-left" style={{width: "200px"}}>
    //     <SidePanel/>
    //     </td>
    //     <td style={{width: "500px"}}>
    //     <CanvasHolder />
    //     </td>
    //   </table>
    //   <div class="footer"><Footer/></div>
      
    // </div>

    <div class="flex-master">
        <header class="banner">
            <Banner />
        </header>

        <div class="page-content">
        <nav class="menu">
              <Menu />
            </nav>
            <nav >
              <SidePanel />
            </nav>
            <div class="splitter">
            </div>
            <div class="content-container">
  
                <CanvasHolder />

            </div>
        </div>

        <footer>
            <Footer/>
        </footer>
    </div>

  )

}


export default App;
