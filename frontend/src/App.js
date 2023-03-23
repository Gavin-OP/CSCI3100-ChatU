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
import { UnderDevelopment } from './UnderDevelopment';

function App() {
  return (
    <div>
      {/* Frontend Router */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminpage" element={<Adminpage page="tweet" />} />
          <Route path="/adminpage/user" element={<Adminpage page="user" />} />
          <Route path="/adminpage/comment" element={<Adminpage page="comment" />} />
          <Route path='/test' element={<Test />} />
          <Route path='/*' element={<UnderDevelopment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
