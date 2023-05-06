import './Login.css';
import { NavigationBar } from './NavBar';
import React from "react";

export class Login extends React.Component {
    handleLogin=(e)=>{
        // function to handle the login
        e.preventDefault();
        let em = document.getElementById('email').value;
        let password = document.getElementById('pwd').value;
        
        // POST the data to the server
        fetch('/user/login', 
        {method:'POST', 
        body: JSON.stringify({email: em, pwd: password}),
        headers: { 'Content-Type': 'application/json' }})
        .then(res=>res.json())
        .then(res=>{
            console.log(res.message);
            if (res.login_status===0 || res.login_status===1){
                // fail to login
                document.getElementById('warning').style.display='flex';
            }
            else if (res.login_status===2){
                // success
                console.log(document.cookie);
                let is_admin=getCookieValue("isAdmin");
                if (is_admin==='true'){
                    // redirect to admin page
                    window.location.href="/admin/tweet";
                }
                else {
                    // redirect to user page
                    window.location.href="/home";
                }
                
            }
            else {
                // banned user
                alert("You have been banned! ")
            }
        })
        .catch(error=>{
            console.log(error);
            
        })
    }
    render(){
        return (
            <div>
                {/* Navigationbar */}
                <NavigationBar page={"login"} />
                <div className="login-wrapper">
                    {/* Login page */}
                    <div className="logo">
                        <img src="./logo_colorful.svg" alt="Logo" />
                    </div>
                    <br />
                    <br />
                    <div className="login">
                        <form className="p-3 mt-3" method='post' >
                            <div className="form-field">
                                <span className="Email"></span>
                                <input type="email" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className="form-field">
                                <span className="pw"></span>
                                <input type="password" name="password" id="pwd" placeholder="Password" />
                            </div>
                            <button type="button" onClick={this.handleLogin} className="btn mt-3">Login</button>
                        </form>
                        <div className="text-center">
                            <a href="./Signup">Sign up</a>
                        </div>
                        <div className="text-center alert alert-danger" id='warning' style={{display:'none'}}>Wrong Email/Password! Please Check it again! </div>
                    </div>
                </div>
            </div>
        )
    }
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}