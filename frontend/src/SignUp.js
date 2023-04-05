import './Login.css';
import React from "react";
import { NavigationBar } from './NavBar';
export class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state={failure:0};
    }
    handleSignup=(e)=>{
        e.preventDefault();
        let em = document.getElementById('email').value;
        let password = document.getElementById('pwd').value;
        let user_name = document.getElementById('user-name').value;
        
        fetch('/user/signUp', 
        {method:'POST', 
        body: JSON.stringify({email: em, pwd: password, username: user_name}),
        headers: { 'Content-Type': 'application/json' }})
        .then(res=>res.json())
        .then(res=>{
            console.log(res.message);
            window.location.href="/home";
            this.setState({failure: 0});
        })
        .catch(error=>{
            console.log(error);
            document.getElementById('warning').style.display='block';
        })
    }
    render(){
        return (
            <div>
                {/* Navigationbar */}
                <NavigationBar page={"login"} />
                {/*Sign-up page */}
                <div className="login-wrapper">
                    <div className="logo">
                        <img src="./logo_colorful.svg" alt="Logo" />
                    </div>
                    <br />
                    <br />
                    {/* sign-up */}
                    <div className="sign-up">
                        <form>
                            <div className="form-field">
                                <span className="User-name"></span>
                                <input id="user-name" type="string" name="user-name" placeholder="User-name" maxLength={20} required/>
                            </div>
                            <div className="form-field">
                                <span className="Email"></span>
                                <input type="email" name="email" id="email" placeholder="Email" required />
                            </div>
                            <div className="form-field">
                                <span className="pw"></span>
                                <input type="password" name="password" id="pwd" placeholder="Password" minLength={6} maxLength={20} required/>
                            </div>
                            <button type="button" className="btn sign-up-submit" onClick={this.handleSignup}>Sign-up</button>
                            <div className="text-center">
                                <a href='./Login'>Existed an account?</a>
                            </div>
                           <div className="text-center alert alert-danger" id='warning' style={{display:'none'}}>Fail to Sign up!</div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
