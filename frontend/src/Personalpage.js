import {NavigationBar} from './Navbar';
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import ReactDOM from 'react-dom';
import "./Personalpage.css"
import { TweetCard } from './TweetCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faComment, faStar, faTwitter} from '@fortawesome/free-solid-svg-icons'

const tweet_data = {
    avatarUrl: '../avatar.png',
    username: 'Gavin OP',
    tweetId: '100056',
    likeStatus: 0,
    dislikeStatus: 0,
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};

export function Personalpage({page}){
    if (page === 'tweet') {
        return (
          <>
              <ScrollToTop />
              <div>
              {/* NavigationBar */}
              <NavigationBar page={'personalpage'} />
              </div> 
    
              <div class="a">
                   <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
    
    
                   <div className="pg-avatar">
                        <br/>  <img src='../avatar.png' alt="1" /> 
     
                        <div class="pg-username">&nbsp; Gavin OP 
                            <button class="message-button"> <i class="fa fa-comment"></i></button> &nbsp; &nbsp;
                            <button class="blacklist-button"> See Blacklist</button>  
                        </div> 
                        <br/> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;100056 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hello World! 
             
                    </div>
                    <br/> <br/>
                    <div class="pg-text">Follows &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fans &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tweets
                    </div>

                    <div class="pg-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12</div>
                    <div className='horizontal-line'></div>
                    <button class="fav-button"> <i class="fa fa-star"></i></button>
                    <div class="tweet-container">
                    <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                      <TweetCard {...tweet_data} /> <br/> <br/>
                    </div>
     
    
                </div>
         </>
        )
    }

    else if (page === 'favourite') {
        return (
            <>
                <ScrollToTop />
                <div>
                {/* NavigationBar */}
                <NavigationBar page={'personalpage'} />
                </div> 
      
                <div class="a">
                     <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
      
      
                     <div className="pg-avatar">
                          <br/>  <img src='../avatar.png' alt="1" /> 
       
                          <div class="pg-username">&nbsp; Gavin OP 
                              <button class="message-button"> <i class="fa fa-comment"></i></button> &nbsp; &nbsp;
                              <button class="blacklist-button"> See Blacklist</button>  
                          </div> 
                          <br/> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;100056 <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hello World! 
               
                      </div>
                      <br/> <br/>
                      <div class="pg-text">Follows &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fans &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tweets
                      </div>
  
                      <div class="pg-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12</div>
                      <div className='horizontal-line'></div>
                      <button class="fav-button"> <i class="fa fa-twitter"></i></button>
                      <div class="tweet-container">
                      <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                        <TweetCard {...tweet_data} /> <br/> <br/>
                      </div>
       
      
                  </div>
           </>
          )
        
    }
    else if (page === 'following') {
        return (
            <>
                <ScrollToTop />
                <div>
                {/* NavigationBar */}
                <NavigationBar page={'personalpage'} />
                </div> 
      
                <div class="a">
                     <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
      
                     <div class="title">Following User List</div>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User7 
                                   <button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Unfollow</button>  
                              </div> 
                          
               
                          </div>
                     </div>
                    
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User8 
                                   <button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Unfollow</button> 
                              </div> 
                          
               
                          </div>
                     </div>
                     
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <div class="pg-username2">&nbsp; User9 
                                   <button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Unfollow</button> 
                              </div> 
                          
               
                          </div>
                     </div>
                     
       
      
                </div>
           </>
          )
    }
    else if (page === 'fans') {
        return (
            <>
                <ScrollToTop />
                <div>
                {/* NavigationBar */}
                <NavigationBar page={'personalpage'} />
                </div> 
      
                <div class="a">
                     <button class="return-button"> <i class="fa fa-arrow-left"></i></button>
      
                     <div class="fanlist-title">Fan List</div>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <span class="pg-username2">&nbsp; User10 
                                   &ensp;<button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Remove</button>  
                              </span> 
                          
               
                          </div>
                     </div>
                    
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <span class="pg-username2">&nbsp; User11 
                                  &ensp; <button class="message-button"> Chat </button> &nbsp; &nbsp; 
                                   <button class="blacklist-button"> Remove</button> 
                              </span> 
                          
               
                          </div>
                     </div>
                     
                     <br/> <br/>

                     <div class="user-list-bar">
                          <div className="pg-avatar2">
                              <img src='../avatar2.png' alt="1" /> 
                              
                              <span class="pg-username2">&nbsp; User12 
                                   &ensp;<button class="message-button"> Chat </button> &nbsp; &nbsp;
                                   <button class="blacklist-button"> Remove</button> 
                              </span> 
                          
               
                          </div>
                     </div>
                     
       
      
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
                <NavigationBar page={'personalpage'} />
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