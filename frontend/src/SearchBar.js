import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export function SearchBar({ page }) {
    let Bar;

    // Search bar for tweet
    // !!! need a search button
    if (page === 'tweet') {
        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content' />
                    </form>
                </div>
            </div>
        )
    }
    // Search bar for home page
    else if (page === 'homepage') {
        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='Tweet ID/Key Words/Tags' />
                    </form>
                </div>
            </div>
        )
    }

    // Search bar for user
    // !!! need a search button
    else if (page === 'user') {
        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='ID/UserName' />
                    </form>
                </div>
            </div>
        )
    }

    // Search bar for comment
    // !!! need a search button
    else if (page === 'comment') {
        Bar = (
            <div class="search-container">
                <div className="search-box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" className="search-input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content' />
                    </form>
                </div>
            </div>
        )
    }
    return Bar;
}