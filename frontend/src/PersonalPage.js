import {NavigationBar} from './NavBar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import { Link } from "react-router-dom";
import "./PersonalPage.css";
import { TweetCard } from './TweetCard';
import { Loading } from './Loading';


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
export class PersonalPage extends React.Component{
     constructor(props){
          super(props);
          this.page = this.props.page;
          this.state = {isload: 0, info:{}};
     }
     componentDidMount(){
          let params = (new URL(document.location)).searchParams;
          let uid = params.get("userId");
          fetch('/user/getUser/'+uid)
          .then(res=>res.json())
          .then(data=>{
               let info = {
                    username: data.username,
                    userId: data.user_id,
                    avatar: '../avatar.png',
                    description: 'Hello ChatU',
                    followStatus: '',
                    blackStatus: 0,
                    tweets: [],
               }
               console.log(data)
               if (data.follow_status===0){
                    info.followStatus = 'Follow';
               }
               else if (data.follow_status===1){
                    info.followStatus = 'Following';
               }
               else if (data.follow_status===2){
                    info.followStatus = 'Self';
               }
               if (data.description!=='' && data.description!==undefined){
                    info.description=data.description;
               }
               fetch('/follow/followNum/'+uid)
               .then(res=>res.json())
               .then(res=>info.followNum=res.following_count)
               .then(fetch('/fan/fansNum/'+uid)
                    .then(res=>res.json())
                    .then(res=>info.fansNum=res.fansNum))
                    .then(fetch('/blacklist/list')
                              .then(res=>res.json())
                              .then(blacklist=>{
                                   if (blacklist.message ===undefined && blacklist.length>0){
                                        blacklist.map((b)=>{
                                             if (b.user_id===data.user_id){
                                                  info.blackStatus=1;
                                             }
                                        })
                                   }
                                   let url=''
                                   if (this.page==='tweet'){
                                        url='/personal/tweetid/'+uid;
                                   }
                                   else if (this.page ==='fav'){
                                        url='/favorite/tweetid/'+uid;
                                   }
                                   fetch(url)
                                   .then(res=>res.json())
                                   .then(res=>{
                                        console.log(res)
                                        info.tweets=res;
                                        this.setState({isload: 1, info: info})
                                   })
                                   .catch(err=>console.log(err))
                              })
                         )
          })
     }
     render(){
          return(
               <>
               {this.state.isload===0?<Loading/>: <PersonPage info={this.state.info}/>}
               </>
          )
     }    
}

class PersonPage extends React.Component{
     constructor(props){
          super(props);
          this.info = this.props.info;
          this.state = {follow: this.props.info.followStatus, black: this.props.info.blackStatus}

     };
     handleFollow = () => {
          if (this.state.follow === 'Following') {
              this.setState({ follow: 'Follow' });
              fetch('/follow/delete/'+this.info.userId)
              .then(res=>console.log(res))
          }
          else if (this.state.follow === 'Follow'){
              this.setState({ follow: 'Following' });
              fetch('/follow/add/'+this.info.userId)
              .then(res=>console.log(res))
          }
      }
      handleBlacklist = () =>{
          if (this.state.follow === 'Self'){
               window.location.href='/personal/blacklist';
          }
          else {
               if (this.state.black===0){
                    this.setState({black: 1})
                    fetch('/blacklist/add/'+this.info.userId)
                    .then(res=>res.json()).then(res=>console.log(res))
               }
               else if (this.state.black===1){
                    this.setState({black: 0})
                    fetch('/blacklist/delete/'+this.info.userId)
                    .then(res=>res.json()).then(res=>console.log(res))
               }

          }
      }
     render(){
          let blackmessage='';
          if (this.state.follow==='Self'){
               blackmessage = "See Blacklist";
          }
          else if (this.state.black===0){
               blackmessage = "Add to Blacklist"; 
          }
          else {
               blackmessage = "Remove from Blacklist";
          }
          return(
               <>
              <ScrollToTop />
              <div>
              {/* NavigationBar */}
              <NavigationBar page={'user'} />
              </div> 
    
              <div className="a container col-8 offset-2">
                   <button class="return-button" onClick={()=>window.history.back()}> <i class="fa fa-arrow-left"></i></button>
    
    
                   <div className="container p-2 d-flex row">
                        <div className='col-2'> <img class='pg-avatar' src={this.info.avatar} alt="avatar" style={{width:'75px'}} /> </div>
                        <div className="col-3 py-3 m-0 center" style={{fontSize:'x-large'}}>{this.info.username} </div>
                        <div className='col-7 d-flex flex-row-reverse'>
                              <button className="btn blacklist-button m-3" style={{height:'48px'}} onClick={this.handleBlacklist}>{blackmessage}</button>
                              <button className="btn btn-primary m-3" style={{height:'48px'}} onClick={this.handleFollow}>{this.state.follow} </button> 
                        </div> 
                    </div>
                    <div className='m-2 p-2'>NO. {this.info.userid}</div> 
                    <div className='m-2 p-2' style={{fontSize:'large',backgroundColor:'white'}}>{this.info.description}</div>
             

                    <br/> <br/>
                    <div className='container d-flex flex-row justify-content-center'>
                         <div className='p-2 border-1 text-center'>
                              <button className='btn btn-outline-primary' style={{width:'12vw'}} onClick={()=>{window.location.href='/personal/following?userId='+this.info.userId}}>Followers <br/>{this.info.followNum}</button>
                         </div>
                         <div className='p-2 border-1 text-center'>
                              <button className='btn btn-outline-primary' style={{width:'12vw'}} onClick={()=>{window.location.href='/personal/fans?userId='+this.info.userId}}>Fans <br/>{this.info.fansNum}</button>
                         </div>
                         <div className='p-2 border-1 text-center'>
                              <a href='#tweetcontainer' className='btn btn-outline-primary' style={{width:'12vw'}}>Tweets <br/>{this.info.tweets===undefined ? 0: this.info.tweets.length}</a>
                         </div>
                    </div>
                    <div className='horizontal-line'></div>
                    <button class="btn fav-button" onClick={()=>{window.location.href='/personal/fav?userId='+this.info.userId}}> <i class="fa fa-star"></i></button>
                    <div class="tweet-container" id="tweetcontainer">
                    <br/>
                    {this.info.tweets.map((tweet,i)=><TweetCard tweet_id={tweet}/>)}
                    </div>
                </div>
         </>
        )
    }
}

