import './Login.css';
import { NavigationBar } from './Navbar';
export function Login(){   
   return(
    <div>
        {/* Navigationbar */}
        <NavigationBar page={"login"}/>
        <div class="wrapper">
            {/* Login page */}
                <div class="logo">
                    <img src="./logo_colorful.svg" alt="Logo" / >
                </div>
                <br/>
                <br/>
                <div class = "login">
                    <form class="p-3 mt-3" method='post' >
                        <div class="form-field">
                            <span class="Email"></span>
                            <input type="email" name="email" id="email" placeholder="Email"/>
                        </div>
                        <div class="form-field">
                            <span class="pw"></span>
                            <input type="password" name="password" id="pwd" placeholder="Password"/>
                        </div>
                        <button type="submit" class="btn mt-3">Login</button>
                    </form>
                    <div class="text-center">
                        <a href="#">Forget password?</a> or <a href="./Signup">Sign up</a>
                    </div>
                </div>
            </div>
    </div>
    )
}
