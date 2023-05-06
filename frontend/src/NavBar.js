import './NavBar.css';
import { useEffect, useState } from 'react'

// This NavBar is on the top of each page

export function NavigationBar({ page }) {
    let current_user_id = -1;

    if (getCookieValue('userId') !== "") {
        current_user_id = Number(getCookieValue('userId'));
    }
    
    const [state, setState] = useState({
        avatar: '../avatar.png',
    });
    useEffect(() => {
        // get user data from the server
        if (current_user_id !== -1) {
            fetch('/user/getUser/' + current_user_id)
            .then(response => response.json())
            .then(userData => {
                console.log(userData);
                setState(state=>({...state,avatar: userData.avatar_url}))
                });
        }
    },[]);
    let uid = getCookieValue("userId");
    let isadmin = getCookieValue("isAdmin");
    function handleLogout(){
        fetch('/user/logout',{
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            //alert(data.message);
            window.location.href = "/login";
        })
        .catch(error => {
            console.error(error);
        });
    }       

    let navContent;

    // Navigation bar for user
    if (page === "user") {
        if (isadmin === 'true') {
            fetch()
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                        <li><a href="/admin/tweet">Admin</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
        else {
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
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
                    <li><a href="/home">Home</a></li>
                </ul>
                <div className="user-avatar">
                    <img src={state.avatar} alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            {/* <li><a href="/personal/tweet">Personal Page</a></li> */}
                            {/* <li><a href="#">Settings</a></li> */}
                            <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                        </ul>
                    </div>
                </div>
            </nav >
        );
    }

    // Navigation bar for homepage
    else if (page === "homepage") {
        if (isadmin === 'true') {
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                        <li><a href="/admin/tweet">Admin</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
        else {
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
    }

    // Navigation bar for personalpage
    else if (page === "personalpage") {
        if (isadmin === 'true') {
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                        <li><a href="/admin/tweet">Admin</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
        else {
            navContent = (
                <nav>
                    <img src="../logo_colorful.svg" alt="Logo" />
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href={"/personal/tweet?userId="+uid}>Personal page</a></li>
                    </ul>
                    <div className="user-avatar">
                        <img src={state.avatar} alt="User Avatar" />
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="/setting">Settings</a></li>
                                <li><div id='logout' onClick={handleLogout}>Log out</div></li>
                            </ul>
                        </div>
                    </div>
                </nav >
            );
        }
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
    // function to read some props in cookie
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}