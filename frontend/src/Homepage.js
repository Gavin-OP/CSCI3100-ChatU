import {NavigationBar} from './Navbar';
import {SearchBar} from './SearchBar';
import React from 'react';
import ReactDOM from 'react-dom';

export function Homepage() {
    return(
        <div>
            {/* NavigationBar */}
            <NavigationBar page={'homepage'}/>
            {/* Search bar */}
            <SearchBar page={'homepage'}/>
        </div>
    )
}


