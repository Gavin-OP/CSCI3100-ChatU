import './NavBar.css';
import { useState } from 'react'

export function NavigationBar({ page }) {
    const [state, setState] = useState({
        personalDisplay: '',
        settingDisplay: ''
    });

    let navContent;

    // Navigation bar for user
    if (page === "user") {
        navContent = (
            <nav>
                <img src="./logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/message">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="./avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/personalpage/tweet">Personal Page</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a id='logout' href="#">Log out</a></li>
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }

    // Navigation bar for admin
    else if (page === "admin") {
        navContent = (
            <nav>
                <img src="./logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/adminpage-tweet">Tweet</a></li>
                    <li><a href="/adminpage-comment">Comment</a></li>
                    <li><a href="/adminpage-user">User</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/personalpage/tweet">Personal Page</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a id='logout' href="#">Log out</a></li>
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }

    // Navigation bar for homepage
    else if (page === "homepage") {
        navContent = (
            <nav>
                <img src="./logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/homepage">Home</a></li>
                    <li><a href="/message">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="./avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a id='logout' href="#">Log out</a></li>
                            <li><a id='setting' href="##">Setting</a></li>
                            <li><a id='personal-page' href="/personalpage/tweet">Personal Page</a></li>
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }

    // Navigation bar for personalpage
    else if (page === "personalpage") {
        navContent = (
            <nav>
                <img src="../logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/homepage">Home</a></li>
                    <li><a href="/message">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a id='logout' href="#">Log out</a></li>
                            <li><a id='setting' href="##">Setting</a></li>
                            <li><a id='personal-page' href="/personalpage/tweet">Personal Page</a></li>
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }

    // Navigation bar for login page
    else if (page === "login") {
        navContent = (
            <nav>
                <img src="./logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/login">login</a></li>
                </ul>
                <div className="user-avatar">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </div>
            </nav >
        );

    }

    console.log(window.location['pathname'])
    return navContent;
}