import './Login.css';
import { NavigationBar } from './NavBar';


export function Login() {
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
                        <button type="submit" className="btn mt-3">Login</button>
                    </form>
                    <div className="text-center">
                        <a href="#">Forget password?</a> or <a href="./Signup">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
