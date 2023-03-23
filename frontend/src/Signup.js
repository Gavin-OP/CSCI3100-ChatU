import './Login.css';
import { NavigationBar } from './Navbar';
export function Signup(){   
   return(
    <div>
        {/* Navigationbar */}
        <NavigationBar page={"login"}/>
        {/*Sign-up page */}
        <div class="wrapper">
            <div class="logo">
                <img src="./logo_colorful.svg" alt="Logo" / >
            </div>
            <br/>
            <br/>
            {/* sign-up */}
            <div class="sign-up">
                <form method='post'>
                    <div class="form-field">
                        <span class="User-name"></span>
                        <input id="user-name" type="string" name = "user-name" placeholder="User-name"/>
                    </div>
                    <div class="form-field">
                        <span class="Email"></span>
                        <input type="email" name="email" id="email" placeholder="Email"/>
                    </div>
                    <div class="form-field">
                        <span class="pw"></span>
                        <input type="password" name="password" id="pwd" placeholder="Password"/>
                    </div>
                    <button type="submit" class="btn sign-up-submit">Sign-up</button>
                    <div class="text-center">
                        <a href='./Login'>Existed a account?</a>
                    </div>
                </form>
            </div>
        </div>

    </div>
    )
}
