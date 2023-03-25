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
    

    
}