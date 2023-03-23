import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { Login } from './Login';
import { Test } from './Test'

import { Signup } from './Signup';
import { Adminpage } from './Adminpage';

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
          {<Route path="/Signup" element={<Signup />} />}
          {<Route path="/Adminpage" element={<Adminpage page="tweet"/>}/>}
          {<Route path="/Adminpage/user" element={<Adminpage page="user"/>}/>}
          {<Route path="/Adminpage/comment" element={<Adminpage page="comment"/>}/>}
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
