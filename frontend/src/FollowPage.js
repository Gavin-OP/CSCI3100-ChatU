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
            var followStatus='';
            if (data.message===undefined && data.length>0){
                new_file = data.map((user)=>{
                    if (user.follow_status===0){
                        followStatus = 'Follow';
                   }
                   else if (user.follow_status===1){
                        followStatus = 'Following';
                   }
                   else if (user.follow_status===2){
                        followStatus = 'Self';
                   }
                    return {userId: user.user_id, username: user.username, avatar: '../avatar.png', followStatus: followStatus}
                })
                
            }
            this.setState({isload: 1, file: new_file});
        })
    }
    render(){
        return(
            <>
            {this.state.isload===0?<Loading/>:<UserPage page={this.page} file={this.state.file}/>}
            </>
        )
    }
}




class UserPage extends React.Component{
    constructor(props){
        super(props);
        this.file = this.props.file;
        this.page = this.props.page;
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
                    <button className="return-button"> <i className="fa fa-arrow-left"></i></button>
     
                    <div className="container-fluid text-center">
                        <h2>{this.page==='following'?"Following User List" : "Fans List"}</h2>
                    </div>
                    
                   <div className="container-fluid p-2">
                        {this.file.length===0? <div className="p-2 container-fluid text-center"><h3>No Result!</h3></div>:<div></div>}
                        {this.file.map((user,index)=><UserCard key={index} user={user}/>)}
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
    handleFollow = () => {
        if (this.state.follow === 'Following') {
            this.setState({ follow: 'Follow' });
            fetch('/follow/delete/'+this.user.userId)
            .then(res=>console.log(res))
        }
         else if (this.state.follow === 'Follow'){
            this.setState({ follow: 'Following' });
            fetch('/follow/add/'+this.user.userId)
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
                        {this.state.follow==='Following'?
                        (<button className="btn btn-secondary m-3" style={{height:'48px'}}> Unfollow</button>):
                        (<button className="btn btn-primary m-3" style={{height:'48px'}}> Follow</button>)}
                       
                   </div> 
              </div>
              </>
         )
    }
}