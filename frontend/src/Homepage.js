import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import { NavigationBar } from './Navbar';
import { SearchBar } from './SearchBar';
import { TweetCard } from './TweetCard'
import "./Homepage.css"
import { retweet_data, tweet_data } from "./Test";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';


export function Homepage() {
    return (
        <>
            <ScrollToTop />
            <div>
                {/* NavigationBar */}
                <NavigationBar page={'homepage'} />
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
                        <TweetCard {...tweet_data} />
                    </div>
                </div>
                <div class="col col3">
                    <div class="col-content">
                        <br /><br /> &nbsp; &nbsp; <button class="write-post-button"><i class="fa fa-plus"></i></button>
                        <div class="user-rec-font">  <br /> <br /> &nbsp; &nbsp; <button class="reload-button"><i class="fa fa-rotate-right"></i> </button>
                            &nbsp; User Recommendation
                        </div>
                        <br /> <br /> <br /> <br />
                        <div class="user-rec-box">
                            <div className="user-rec-avatar">
                                <img src='./avatar2.png' alt="Avatar2" class="center" />
                            </div>
                            <div className="user-rec-text"> User2  </div>
                            <div className='user-rec-follow'>
                                <button className="user-rec-follow-button">follow</button>
                            </div>
                        </div>

                        <br /> <br />

                        <div class="user-rec-box">
                            <div className="user-rec-avatar">
                                <img src='./avatar2.png' alt="Avatar2" class="center" />
                            </div>
                            <div className="user-rec-text"> User3  </div>
                            <div className='user-rec-follow'>
                                <button className="user-rec-follow-button">follow</button>
                            </div>
                        </div>

                        <br /> <br />

                        <div class="user-rec-box">
                            <div className="user-rec-avatar">
                                <img src='./avatar2.png' alt="Avatar2" class="center" />
                            </div>
                            <div className="user-rec-text"> User4  </div>
                            <div className='user-rec-follow'>
                                <button className="user-rec-follow-button">follow</button>
                            </div>
                        </div>

                        <br /> <br />

                        <div class="user-rec-box">
                            <div className="user-rec-avatar">
                                <img src='./avatar2.png' alt="Avatar2" class="center" />
                            </div>
                            <div className="user-rec-text"> User5  </div>
                            <div className='user-rec-follow'>
                                <button className="user-rec-follow-button">follow</button>
                            </div>
                        </div>

                        <br /> <br />

                        <div class="user-rec-box">
                            <div className="user-rec-avatar">
                                <img src='./avatar2.png' alt="Avatar2" class="center" />
                            </div>
                            <div className="user-rec-text"> User6  </div>
                            <div className='user-rec-follow'>
                                <button className="user-rec-follow-button">follow</button>
                            </div>
                        </div>

                        <br /> <br />

                    </div>
                </div>


            </div>
        </>
    )
}


