import { NavigationBar } from './NavBar';
import { SearchBar } from './SearchBar';
import { AdminTable } from './AdminTable';
export function AdminPage({ page }) {
    if (page === 'tweet') {

        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Search bar */}
                <SearchBar page={'tweet'} />
                {/* Table */}
                <AdminTable page={'tweet'} />
            </div>
        )
    }
    if (page === 'comment') {
        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Search bar */}
                <SearchBar page={'comment'} />
                {/* Table */}
                <AdminTable page={'comment'} />
            </div>
        )
    }
    if (page === 'user') {

        return (
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'admin'} />
                {/* Search bar */}
                <SearchBar page={'user'} />
                {/* Table */}
                <AdminTable page={'user'} />
            </div>
        )
    }
}