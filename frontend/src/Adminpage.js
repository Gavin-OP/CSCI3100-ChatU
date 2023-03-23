import {NavigationBar} from './Navbar';
import {SearchBar} from './SearchBar';
export function Adminpage({page}){
return(
    <div>
        {/* NavigationBar */}
        <NavigationBar page={'admin'}/>
        {/* Search bar */}
        <SearchBar page={'tweet'}/>
        {/* Table */}
        <section class="content-info">
        <div class="container paddings-mini">
            <div class="row">
                <div class="col-lg-12">
                    <table class="table-striped table-responsive table-hover result-point">
                    <tbody class="text-center">
                        <tr>
                            <td class="text-left number">1 <i class="fa fa-caret-up" aria-hidden="true"></i></td>
                            <td class="text-left">
                                <img src="http://html.iwthemes.com/sportscup/run/img/clubs-logos/bra.png" alt="Colombia"/><span>Colombia</span>
                            </td>
                            <td>38</td>
                            <td>26</td>
                            <td>9</td>
                            <td>3</td>
                            <td>73</td>
                            <td>32</td>
                            <td>+41</td>
                            <td>87</td>
                        </tr>
                    
                        
                
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        </section>
    </div>
)

}