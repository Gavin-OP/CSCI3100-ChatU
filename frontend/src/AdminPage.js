import { NavigationBar } from './NavBar';
import { SearchBar } from './SearchBar';
export function AdminPage({ page }) {
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