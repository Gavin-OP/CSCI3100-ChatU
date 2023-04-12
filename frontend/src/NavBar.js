import './NavBar.css';
import { useState } from 'react'

export function NavigationBar({ page }) {
    const [state, setState] = useState({
        personalDisplay: '',
        settingDisplay: ''
    });
    let uid = getCookieValue("userId");
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
                    <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/setting">Settings</a></li>
                            <li><button id='logout' onClick={handleLogout}>Log out</button></li>
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
                            <li><button id='logout' onClick={handleLogout}>Log out</button></li>
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
                    <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/setting">Settings</a></li>
                            <li><button id='logout' onClick={handleLogout}>Log out</button></li>
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
                    <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="../avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="/setting">Settings</a></li>
                            <li><button id='logout' onClick={handleLogout}>Log out</button></li>
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

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}