import {
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Navbar.js';


function App() {

  return (
    <BrowserRouter>
      {/* <NavigationBar page='login' /> */}
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
