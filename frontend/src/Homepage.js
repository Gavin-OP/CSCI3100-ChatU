import { NavigationBar } from './Navbar';
import { SearchBar } from './SearchBar';
import "./Homepage.css"
import { TweetCard } from './TweetCard'
import { RetweetCard } from './RetweetCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import ScrollToTop from 'react-scroll-to-top';
import ReactDOM from 'react-dom';



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


            <div class="wrapper">
                <div class="col col1">
                    <div class="col-content">
                        {/*Empty space in which additional content can be put in the future */}
                    </div>
                </div>
                <div class="col col2">
                    <div class="col-content">
                        <TweetCard {...tweet_data} />
                        <TweetCard {...tweet_data} />
                        <RetweetCard {...tweet_data} />
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
                            &nbsp; User Recommendation </div>
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
            </div> </>
    )
}


