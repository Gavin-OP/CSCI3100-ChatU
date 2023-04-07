import './NavBar.css';
import { useState } from 'react'

export function NavigationBar({ page }) {
    const [state, setState] = useState({
        personalDisplay: '',
        settingDisplay: ''
    });

    function handleLogout(){
        fetch('/user/logout',{
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = "/login";
        })
        .catch(error => {
            console.error(error);
        });
    }       

    let navContent;

    // Navigation bar for user
    if (page === "user") {
        navContent = (
            <nav>
                <img src="../logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/chat">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/personal/tweet">Personal Page</a></li>
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
                <img src="../logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/admin/tweet">Tweet</a></li>
                    <li><a href="/admin/comment">Comment</a></li>
                    <li><a href="/admin/user">User</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            {/* <li><a href="/personal/tweet">Personal Page</a></li> */}
                            {/* <li><a href="#">Settings</a></li> */}
                            <li><a id='logout' href='#' onClick={handleLogout}>Log out</a></li>
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
                <img src="../logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/message">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a id='logout' href="#">Log out</a></li>
                            <li><a id='setting' href="##">Setting</a></li>
                            <li><a id='personal-page' href="/personal/tweet">Personal Page</a></li>
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
                    <li><a href="/home">Home</a></li>
                    <li><a href="/message">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a id='logout' href="#">Log out</a></li>
                            <li><a id='setting' href="##">Setting</a></li>
                            <li><a id='personal-page' href="/personal/tweet">Personal Page</a></li>
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
                <img src="../logo_colorful.svg" alt="Logo" />
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