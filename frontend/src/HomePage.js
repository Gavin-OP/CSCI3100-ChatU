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

export function HomePage() {
    return (
        <>
            <ScrollToTop />
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'user'} />
            </div>

            <div class="wrapper" id="homepage">
                <div class="col col1">
                    <div class="col-content">
                        {/*Empty space in which additional content can be put in the future */}
                    </div>
                </div>
                <div class="col col2">
                    <div class="col-content">
                        <SearchBar page={'homepage'} />
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


