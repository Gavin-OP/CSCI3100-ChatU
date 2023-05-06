import {NavigationBar} from './NavBar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import "./PersonalPage.css"
import { Loading } from './Loading'

export class BlackList extends React.Component{
    constructor(props){
        super(props);
        this.state = {isload:0, file:{}};

    }
    componentDidMount(){
        // Load the data from the server
        fetch('/blacklist/list')
        .then(res=>res.json())
        .then(data=>{
            let new_file=[];
            if (data.message===undefined && data.length>0){
                new_file = data.map((user)=>{
                    
                    return {userId: user.user_id, username: user.username, avatar: user.avatar_url}
                })
                
            }
            // Start to render the page
            this.setState({isload: 1, file: new_file});
        })
    }
    render(){
        return(
            <>
            {this.state.isload===0?<Loading/>:<BlackPage file={this.state.file}/>}
            </>
        )
    }
}


class BlackPage extends React.Component{
    constructor(props){
        super(props);
        this.file = this.props.file;
    }
    render(){
         return(
              <>
               <ScrollToTop />
               <div>
               {/* NavigationBar */}
               <NavigationBar page={'user'} />
               </div> 
     
               <div className="container col-8 offset-2" style={{backgroundColor:'#e0e5ec'}}>
                    <div className="container m-2"><button className='btn m-3' onClick={() => { window.history.back() }} style={{color:'#db2431',borderColor:'#a6366a'}}>
                         <i className="bi bi-arrow-left"></i> Back to Previous Page</button>
                    </div>
     
                    <div className="container-fluid text-center">
                        <h2>Black List</h2>
                    </div>
                    
                   <div className="container-fluid p-2">
                        {this.file.length===0? <div className="p-2 container-fluid text-center"><h3>No Result!</h3></div>:<div></div>}
                        {this.file.map((user,index)=><BlackCard key={index} user={user}/>)}
                   </div>
                    
               </div>
               </>
         )
    }
}

class BlackCard extends React.Component{
    constructor(props){
         super(props);
         this.user=this.props.user;
         this.state = {black: 1};
    }
    handleBlackList = () => {
        if (this.state.black === 1) {
            this.setState({ black: 0 });
            fetch('/blacklist/delete/'+this.user.userId)
            .then(res=>console.log(res))
        }
         else {
            this.setState({ black: 1 });
            fetch('/blacklist/add/'+this.user.userId)
            .then(res=>console.log(res))
        }
    }
    render(){
         return(
              <>
              <div className="container m-3 p-2 d-flex row user-list-bar" >
                   <div className='col-2'> <img class='pg-avatar' src={this.user.avatar} alt="avatar" style={{width:'75px'}} /> </div>
                   <div className="col-5 py-3 m-0 center" style={{fontSize:'x-large'}} onClick={()=>{window.location.href='/personal/tweet?userId='+this.user.userId}}>{this.user.username} </div>
                   <div className='col-5 d-flex flex-row-reverse'>
                        {this.state.black===1?
                        (<button className="btn btn-secondary m-3" style={{height:'48px'}} onClick={this.handleBlackList}> Remove</button>):
                        (<button className="btn btn-danger m-3" style={{height:'48px'}} onClick={this.handleBlackList}> Add</button>)}
                       
                   </div> 
              </div>
              </>
         )
    }
}