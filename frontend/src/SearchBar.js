import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fa-solid fa-magnifying-glass} from '@fortawesome/free-solid-svg-icons'
export function SearchBar({page}){
    let Bar;
    if(page === 'tweet'){
        Bar = (
            <div class="container">
                <div class="box">
                <form name="search">
                    <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" placeholder='#ID/content'/>
                </form>
                </div>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{color: "#ffffff",}} />
            </div>
        )
    }
    if (page === 'user'){
        Bar = (
            <div class="container">
                <div class="box">
                <form name="search">
                    <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();"placeholder='#'/>
                </form>
                <i class="fa-solid fa-magnifying-glass" ></i>

                </div>
            </div>
        )
    }
    if(page === 'comment'){
        Bar = (
            <div class="container">
                <div class="box">
                <form name="search">
                    <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();"placeholder='#'/>
                </form>
                <i class="fa-solid fa-magnifying-glass"></i>

                </div>
            </div>
        )
    }
    return Bar;
}