import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export function SearchBar({ page }) {
    let Bar;

    // Search bar for tweet
    if (page === 'tweet') {
        Bar = (
            <div class="container">
                <div class="box">
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
                    <form name="search">
                        <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content' />
                    </form>
                </div>
            </div>
        )
    }

    // Search bar for user
    // !!! Search Icon is not shown
    else if (page === 'user') {
        Bar = (
            <div class="container">
                <div class="box">
                    <form name="search">
                        <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#' />
                    </form>
                    <i class="faMagnifyingGlass" ></i>
                </div>
            </div>
        )
    }

    // Search bar for comment
    // !!! Search Icon is not shown
    else if (page === 'comment') {
        Bar = (
            <div class="container">
                <div class="box">
                    <form name="search">
                        <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#' />
                    </form>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
        )
    }
    return Bar;
}