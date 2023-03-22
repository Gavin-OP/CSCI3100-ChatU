import './Navbar.css';

export function NavigationBar({ page }) {
    let navContent;

    // Navigation bar for user
    if (page === "user") {
        navContent = (
            <nav>
                <img src="./logo_colorful.svg" alt="Logo" />
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Message</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="./avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a href="#">Profile</a></li>
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
                    <li><a href="#">Tweet</a></li>
                    <li><a href="#">Comment</a></li>
                    <li><a href="#">User</a></li>
                </ul>
                <div className="user-avatar">
                    <img src="./avatar.png" alt="User Avatar" />
                    <div className="dropdown-menu">
                        <ul>
                            <li><a id='logout' href="#">Log out</a></li>
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
                    <li><a href="/">Home</a></li>
                    <li><a href="/Login">login</a></li>
                </ul>
                <div className="user-avatar">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </div>
            </nav >
        );

    }
    return navContent;
}