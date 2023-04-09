import {NavigationBar} from './NavBar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import "./PersonalPage.css"
import { Loading } from './Loading'

export class FollowPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {isload:0, file:{}};
        this.page = this.props.page;
    }
    componentDidMount(){
        let url='';
        let params = (new URL(document.location)).searchParams;
        let uid = params.get("userId");
        if (this.page === 'following'){
            url = '/follow/followList/' + uid;
        }
        else {
            url = '/fan/fanList/' + uid;
        }
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            let new_file=[];
            if (data.message===undefined && data.length>0){
                new_file = data.map((user)=>{
                    return {userId: user.user_id, username: user.username, avatar: '../avatar.png', followStatus: user.follow_status}
                })
                
            }
            this.setState({isload: 1, file: new_file});
        })
    }
    render(){
        return(
            <>
            {this.state.isload===0?<Loading/>:<UserPage file={this.state.file}/>}
            </>
        )
    }
}




class UserPage extends React.Component{
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
     
               <div className="container col-8 offset-2">
                    <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
     
                    <div className="container-fluid text-center">
                        <h2>Following User List</h2>
                    </div>
                    
                   <div className="container-fluid p-2">
                        {this.file.length===0? <div className="p-2 container-fluid text-center"><h3>No Result!</h3></div>:<div></div>}
                        {this.file.map((user,index)=><UserCard user={user}/>)}
                   </div>
                    
               </div>
               </>
         )
    }
}

class UserCard extends React.Component{
    constructor(props){
         super(props);
         this.user=this.props.user;
         this.state={follow: this.props.user.followStatus}
    }
    handleFollow=()=>{
         if (this.state.follow==="Follow"){
              this.setState({follow:'Following'});
              var url='/follow/';
              fetch(url)
              .then(res=>console.log(res))
         }
         else {
              this.setState({follow:'Follow'});
              var url='/unfollow/' + this.user.username;
              fetch(url)
              .then(res=>console.log(res))
         }
    }
    render(){
         return(
              <>
              <div className="container m-3 p-2 d-flex row user-list-bar" >
                   <div className='col-2'> <img class='pg-avatar' src={this.user.avatar} alt="avatar" style={{width:'75px'}} /> </div>
                   <div className="col-5 py-3 m-0 center" style={{fontSize:'x-large'}}>{this.user.username} </div>
                   <div className='col-5 d-flex flex-row-reverse'>
                        {this.state.follow==='Following'?
                        (<button className="btn btn-secondary m-3" style={{height:'48px'}}> Unfollow</button>):
                        (<button className="btn btn-primary m-3" style={{height:'48px'}}> Follow</button>)}
                        <button className="btn message-button m-3" style={{height:'48px'}}> <i className="fa fa-comment"></i></button> 
                   </div> 
              </div>
              </>
         )
    }
}