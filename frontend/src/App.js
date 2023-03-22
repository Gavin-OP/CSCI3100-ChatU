import {
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import './App.css';
import { NavigationBar } from './Navbar.js';
import { Route, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { TweetCard } from './TweetCard'

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
        <TweetCard avatarUrl='./avatar.png' username='Gavin OP' tweetId='#10034' imageSrc='./avatar.png' tweetText='This is my first tweet!!!!!!!!!!' />
        <Routes>
          {<Route path="/Login" element={<Login />} />}
          { /*<Route path="/Login" element={<Navigate to="/Login" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
