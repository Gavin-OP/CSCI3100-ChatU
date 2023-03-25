import { NavigationBar } from './Navbar';
import { SearchBar } from './SearchBar';
import "./Homepage.css"
import { TweetCard } from './TweetCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import ReactDOM from 'react-dom';
import { UserRecomBox } from './UserRecommendBox';


const tweet_data = {
    avatarUrl: './avatar.png',
    username: 'Gavin OP',
    tweetId: '100056',
    likeStatus: 0,
    dislikeStatus: 0,
    followStatus: 'Following',
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
};

export function Homepage() {
    return (
        <>
               <ScrollToTop />
               <div>
                 {/* NavigationBar */}
               <NavigationBar page={'homepage'} />
                 {/* Search bar */}
               <SearchBar page={'homepage'} />
               </div>


          <div class="wrapper" id="homepage">
              <div class="col col1">
                   <div class="col-content"> 
                    {/*Empty space in which additional content can be put in the future */}
                   </div>
              </div>
              <div class="col col2">
                   <div class="col-content">
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
               <div class="col col3">
                    <div class="col-content">
                         <br/><br/> &nbsp; &nbsp; <button class="write-post-button"><i class="fa fa-plus"></i></button>
                              <div class="user-rec-font">  <br/> <br/> &nbsp; &nbsp; 
                              User Recommendation 
                              </div>
                              <br/> <br/> <br/> <br/> 
                              <UserRecomBox />

                    </div>
                </div>
                
                
                </div>
            </>
    )
}


