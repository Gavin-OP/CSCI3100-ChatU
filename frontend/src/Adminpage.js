import {NavigationBar} from './Navbar';
import {SearchBar} from './SearchBar';
import {AdminTable} from './AdminTable';
export function Adminpage({page}){
if (page === 'tweet'){
    
    return(
        <div>
            {/* NavigationBar */}
            <NavigationBar page={'admin'}/>
            {/* Search bar */}
            <SearchBar page={'tweet'}/>
            {/* Table */}
            <AdminTable page={'tweet'} />
        </div>
    )
}
if (page === 'comment'){
    
    return(
        <div>
            {/* NavigationBar */}
            <NavigationBar page={'admin'}/>
            {/* Search bar */}
            <SearchBar page={'comment'}/>
            {/* Table */}
            <AdminTable page={'comment'} />
        </div>
    )
}
if (page === 'user'){
    
    return(
        <div>
            {/* NavigationBar */}
            <NavigationBar page={'admin'}/>
            {/* Search bar */}
            <SearchBar page={'user'}/>
            {/* Table */}
            <AdminTable page={'user'} />
        </div>
    )
}
}