import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import { useMatch, useParams, useLocation } from 'react-router-dom';
import Home from './pages/home'

function LogIn(props){
  let navigate = useNavigate();
  let user='';
  let password='';
  function handleSubmit(e){
    e.preventDefault();
    document.querySelector("#warn").style.display='none';
    console.log(window.history);
    if (user=="admin" && password=="admin"){
      navigate('/user/admin', {state:{user:'admin'}});
    }
    else {
      document.querySelector("#warn").style.display='block';
      document.querySelector("form").reset();
    }
  };
  return (
      <>
      <div className="d-block container-fluid align-items-center p-8">
        <div className="d-block container-fluid" style={{height:'90vh'}}>

        </div>
        <div className="container" style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
            <br></br>
            <div className='align-center' style={{fontSize:'xx-large',fontFamily:'Indie+Flower'}}>Log in with my account</div>
            <hr></hr>
            <form className='p-5' onSubmit={(e)=>handleSubmit(e)}>
            <label className="form-input-label" style={{fontFamily:'Acme',fontSize:'large'}}>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input className="form-input" type='text' minLength="4" 
            maxLength="20" required onChange={(e)=>{user=e.target.value}}/>
            
            <br></br>
            <br></br>
            <label className="form-input-label" style={{fontFamily:'Acme',fontSize:'large'}}>Password:&nbsp;&nbsp;</label>
            <input className="form-input" type='password' minLength="4" 
            maxLength="20" required onChange={(e)=>{password=e.target.value}}/>

            
            <br></br>
            <br></br>
            <div>
                <button className='btn btn-primary p-2' type='submit'>Log in</button>
                <div className='d-inline-block' style={{width:'15vw'}}></div>
                <Link className="btn btn-primary p-2" style={{margin:'auto'}} to="/register">Sign up</Link>
            </div>
            <br></br>
            <p id="warn" style={{display:'none', color:'red'}}>Wrong account or password! Please try again!</p>
            </form>
            
        </div>
      </div>
      </>
    );
  }



function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
function Show(){
  return(
    <div>test</div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="root" style={{padding:'0',backgroundColor:'#c9f2fd'}}>
        <div className="container-fluid sticky-top d-flex mx-0 my-3 row" style={{padding:'0',backgroundColor:'white'}}>
          <div className="d-flex col-4 center">
            <h1 className="logo p-2"><Link style={{textDecoration:'none',fontFamily:'Rubik Iso'}} to="/">ChatU</Link></h1>
          </div>
          <div className="d-flex col-5">
            <nav className="navbar navbar-expand-md navbar-info navbar-collapse" id="topnav">
              <ul className="nav" id="topnav-ul">
                  <li className="nav-item">
                      <i className="bi bi-box-fill"></i>&nbsp;<a href="index.html" style={{textDecoration:'none',fontSize:'x-large'}}>Home</a> <span style={{textDecoration:'none',fontSize:'x-large'}}>|</span> </li>
                  <li className="nav-item">
                      <a href="#about" style={{textDecoration:'none',fontSize:'x-large'}}>&nbsp;Address List</a> <span style={{textDecoration:'none',fontSize:'x-large'}}>|</span></li>
              </ul>
            </nav>
          </div> 
          <div className="d-flex col-3 flex-row-reverse ">
            <div className="p-2 mx-2"><Link className="btn btn-primary btn-lg" style={{margin:'auto'}} to="/login">Log in</Link></div>
          </div> 
        </div>
        <div className="container-fluid" style={{padding:'0'}}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          {/* <Route path="/user/*" element={<Main />} /> */}
          <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>

    </div>
    </BrowserRouter>
  );
}

export default App;