import {NavigationBar} from './NavBar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import { Link } from "react-router-dom";
import "./PersonalPage.css"
import { TweetCard } from './TweetCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faComment, faStar, faTwitter} from '@fortawesome/free-solid-svg-icons'

const tweet_data = {
    avatarUrl: '../avatar.png',
    username: 'Gavin OP',
    tweetId: '100056',
    likeStatus: 0,
    dislikeStatus: 0,
    followStatus: 'following',
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};
const user_data1 = {
     avatar: '../avatar2.png',
     username: 'test user',
     followStatus: 'Following'
};
const user_data2 = {
     avatar: '../avatar.png',
     username: 'user31',
     followStatus: 0
};


const info = {
     username: 'Gavin OP',
     userid: 852,
     avatar: '../avatar.png',
     description: 'This is a test message',
     followers: ['user1', 'user82', 'user912'],
     fans: ['user1', 'user82'],
     followtype: 0
};
const tweets = [tweet_data, tweet_data, tweet_data];
const users = [user_data2,user_data1, user_data2, user_data1];
export function PersonalPage({page, userid}){

     // var url='/personalpage/'+userid+'/'+page;
     // fetch(url)
     // .then(res=>res.json())
     // .then(res=>{
     //      var info = res.userinfo;
     //      var tweets = res.tweets;
     // })
     // .catch(err=>console.log(err))

     if (page === 'tweet' || page === 'favourate') {
        return (
          <>
              <ScrollToTop />
              <div>
              {/* NavigationBar */}
              <NavigationBar page={'PersonalPage'} />
              </div> 
    
              <div className="a container col-8 offset-2">
                   <button class="return-button" onClick={()=>window.history.back()}> <i class="fa fa-arrow-left"></i></button>
    
    
                   <div className="container p-2 d-flex row">
                        <div className='col-2'> <img class='pg-avatar' src='../avatar.png' alt="avatar" style={{width:'75px'}} /> </div>
                        <div className="col-3 py-3 m-0 center" style={{fontSize:'x-large'}}>{info.username} </div>
                        <div className='col-7 d-flex flex-row-reverse'>
                              {/* {()=>{
                                   switch(info.followtype){
                                        case 0: console.log(0);return (<button className="btn btn-primary p-2" style={{height:'48px'}}>Follow</button>)
                                        case 1: return (<button className="btn btn-secondary p-2" style={{height:'48px'}}>Unfollow</button>)
                                        case 2: return (<button className="btn blacklist-button m-3"  style={{height:'48px'}}> See Blacklist</button>)
                                   }
                              }}   */}
                              <button className="btn blacklist-button m-3"  style={{height:'48px'}}> See Blacklist</button>
                              <button className="btn message-button m-3" style={{height:'48px'}}> <i className="fa fa-comment"></i></button> 
                        </div> 
                    </div>
                    <div className='m-2 p-2'>NO. {info.userid}</div> 
                    <div className='m-2 p-2' style={{fontSize:'large',backgroundColor:'white'}}>{info.description}</div>
             

                    <br/> <br/>
                    <div className='container d-flex flex-row justify-content-center'>
                         <div className='p-2 border-1 text-center'>
                              <Link to='/personal/following' state={{userid:info.userid}} className='btn btn-outline-primary' style={{width:'12vw'}}>Followers <br/>{info.followers.length}</Link>
                         </div>
                         <div className='p-2 border-1 text-center'>
                              <Link to='/personal/fans' state={{userid:info.userid}} className='btn btn-outline-primary' style={{width:'12vw'}}>Fans <br/>{info.fans.length}</Link>
                         </div>
                         <div className='p-2 border-1 text-center'>
                              <a href='#tweetcontainer' className='btn btn-outline-primary' style={{width:'12vw'}}>Tweets <br/>{tweets.length}</a>
                         </div>
                    </div>
                    <div className='horizontal-line'></div>
                    <a href='./fav' class="btn fav-button"> <i class="fa fa-star"></i></a>
                    <div class="tweet-container" id="tweetcontainer">
                    <br/>
                    {tweets.map((tweet,i)=><TweetCard {...tweet}/>)}
                    </div>
                </div>
         </>
        )
    }
    else if (page === 'following' || page === 'fans') {
        return (
            <>
                <ScrollToTop />
                <div>
                {/* NavigationBar */}
                <NavigationBar page={'PersonalPage'} />
                </div> 
      
                <div className="container col-8 offset-2">
                     <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
      
                     <div className="container-fluid text-center">
                         <h2>Following User List</h2>
                     </div>
                    <div className="container-fluid p-2">
                         {users.map((user,index)=><UserCard user={user}/>)}
                    </div>
                     {/* <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User7 
                                   <button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Unfollow</button>  
                              </div> 
                          
               
                          </div>
                     </div> */}
                     
       
      
                </div>
           </>
          )
    }
    
    else if (page === 'blacklist') {
        return (
            <>
                <ScrollToTop />
                <div>
                {/* NavigationBar */}
                <NavigationBar page={'PersonalPage'} />
                </div> 
      
                <div class="a">
                     <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
      
                     <div class="blacklist-title">Blacklist</div>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User13 
                                   {/*<button class="message-button"> Chat </button> &nbsp; &nbsp;*/}
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   <button class="blacklist-button"> Remove from Blacklist</button>  
                              </div> 
                          
               
                          </div>
                     </div>
                    
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User14 
                                   {/*<button class="message-button"> Chat </button> &nbsp; &nbsp;*/}
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   <button class="blacklist-button"> Remove from Blacklist</button> 
                              </div> 
                          
               
                          </div>
                     </div>
                     
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User15 
                                   {/*<button class="message-button"> Chat </button> &nbsp; &nbsp;*/}
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                   &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   <button class="blacklist-button"> Remove from Blacklist</button>
                              </div> 
                          
               
                          </div>
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
               var url='/follow/' + this.user.username;
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