import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { Login } from './Login';
import { Test } from './Test'


function App() {
  return (
    <div>
      {/* This is useless, it can be deleted when the development is finished.  */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: "center" }}>ChatU is under development. </h1>
        &nbsp;<img src='./logo_colorful.svg' style={{ height: 200, alignItems: "center" }} className='center' alt='logo'></img>&nbsp;
      </div>

      {/* Frontend Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
