import {
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Navbar.js';
import { Route, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { TweetCard } from './TweetCard'
import { Signup } from './Signup';
import { Adminpage } from './Adminpage';

function App() {

  return (
    <div>
    {
    /* //   <div style={{ textAlign: 'center' }}>
    //     <NavigationBar page={"login"}/>
    //     <h1 style={{ textAlign: "center" }}>ChatU is under development. </h1>
    //     &nbsp;<img src='./logo_colorful.svg' style={{ height: 200, alignItems: "center" }} className='center' alt='logo'></img>&nbsp;
    //   </div> */}

      <BrowserRouter>
        {/* <NavigationBar page='login' /> */}
        <TweetCard />
        <Routes>
          {<Route path="/Login" element={<Login />} />}
          {<Route path="/Signup" element={<Signup />} />}
          {<Route path="/Adminpage" element={<Adminpage page="tweet"/>}/>}
          {<Route path="/Adminpage/user" element={<Adminpage page="user"/>}/>}
          {<Route path="/Adminpage/comment" element={<Adminpage page="comment"/>}/>}
          { /*<Route path="/Login" element={<Navigate to="/Login" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
