import {
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Navbar.js';


function App() {

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: "center" }}>ChatU is under development. </h1>
        &nbsp;<img src='./logo_colorful.svg' style={{ height: 200, alignItems: "center" }} className='center' alt='logo'></img>&nbsp;
      </div>

      <BrowserRouter>
        {/* <NavigationBar page='login' /> */}
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
