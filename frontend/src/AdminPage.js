import { NavigationBar } from './NavBar';
import { SearchBar } from './SearchBar';
export function AdminPage({ page }) {
// Using cookie to identify if the user is an admin
let is_admin=getCookieValue("isAdmin");
if(is_admin==='true'){
    if (page === 'tweet') {

        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Table */}
                <SearchBar page={'tweet'} />
            </div>
        )
    }
    if (page === 'comment') {
        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Table */}
                <SearchBar page={'comment'} />
            </div>
        )
    }
    if (page === 'user') {

        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Table */}
                <SearchBar page={'user'} />
            </div>
        )
    }
}
else{
    window.location.href = '/login';
}
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}