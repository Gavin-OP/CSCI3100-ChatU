import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import { NavigationBar } from './NavBar';
import { SearchBar } from './SearchBar';
import { TweetCard } from './TweetCard'
import { RetweetCard } from "./RetweetCard";
import "./HomePage.css"
import { retweet_data, tweet_data } from "./Test";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';
import { UserRecomBox } from './UserRecommendBox';



// export const tweet_data = {
//     avatarUrl: './avatar.png',
//     username: 'Gavin OP',
//     tweetId: '100056',
//     likeStatus: 1,
//     dislikeStatus: 0,
//     starStatus: 1,
//     likeCount: 49,
//     starCount: 32,
//     commentCount: 4,
//     followStatus: 'Following',
//     imageSrc: '/tweet_card_pic_1.jpg',
//     // imageSrc: '',
//     tweetText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante at mi pharetra, quis blandit elit interdum. Cras vulputate, arcu eu sodales lucsdfasdf adfasdfasdfasdf dasdfasdfasdf sdfasdf asdfasdf asdfasdfasdfasdf sdfasdfasd asdfasdf asdftus, nibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
//     // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
// };

// export const retweet_data = {
//     retweetAvatarUrl: './avatar2.png',
//     retweetUsername: 'King Arthur',
//     retweetFollowStatus: 'Follow',
//     avatarUrl: './logo.svg',
//     username: 'ChatU Official',
//     tweetId: '1',
//     likeStatus: 1,
//     dislikeStatus: 0,
//     starStatus: 1,
//     likeCount: 234,
//     starCount: 387,
//     commentCount: 2344,
//     followStatus: 'Follow',
//     imageSrc: '/logo_colorful.svg',
//     // imageSrc: '',
//     tweetText: 'Welcome to ChatU. We are glad to announce that ChatU is officially release a brand new version!!',
//     // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
// };



export function HomePage() {
    //fetch data from '/home/tweet'
    function HandleTweet(){
        fetch ('/home/tweet')
    }
    return (
        <div>
            <ScrollToTop />
            <div className="stiky-bar">
                {/* NavigationBar */}
                <NavigationBar page={'user'} />
            </div>
            <div class="wrapper" id="homepage">
                <div class="col col1">
                    <div class="col-content">
                         <a href="/post"><button class="write-post-button" ><i class="fa fa-plus"></i>   Post my tweet!</button></a>
                    </div>
                </div>
                <div class="col col2">
                    <SearchBar page={'homepage'} />
                    <div class="col-content">
                        
                        <TweetCard {...tweet_data} />
                        <RetweetCard {...retweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                    </div>
                </div>
                <div class="col col3">
                    <div class="col-content">
                              <div class="user-rec-font">  <br/> &nbsp; &nbsp; 
                                User Recommendation 
                              </div>
                              <br/> <br/>
                              <UserRecomBox />
                    </div>
                </div>
            </div>
        </div>
    )
}


