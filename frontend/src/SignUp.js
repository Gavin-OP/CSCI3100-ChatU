import './Login.css';
import { NavigationBar } from './NavBar';
export function SignUp() {
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
                    <form method='post'>
                        <div className="form-field">
                            <span className="User-name"></span>
                            <input id="user-name" type="string" name="user-name" placeholder="User-name" />
                        </div>
                        <div className="form-field">
                            <span className="Email"></span>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-field">
                            <span className="pw"></span>
                            <input type="password" name="password" id="pwd" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn sign-up-submit">Sign-up</button>
                        <div className="text-center">
                            <a href='./Login'>Existed an account?</a>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
