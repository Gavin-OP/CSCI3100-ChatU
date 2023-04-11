import { TweetCard } from './TweetCard';
import './RetweetCard.css';
import { useState } from 'react';

export function RetweetCard(props) {
    return (
        <>
            <div className='retweet-card-container'>
                <div className="retweet-card">
                    <div className="retweet-header">

                        {/* User information and Tweet Information */}
                        <div className="avatar">
                            <img src={props.retweetAvatarUrl} alt="Avatar" />
                        </div>
                        <div className="user-info">
                            <div className="username">{props.retweetUsername}</div>
                            <div className='follow'>
                                <button className="follow-button" >{props.retweetFollowStatus}</button>
                            </div>
                            <div className='vertical-line'></div>
                        </div>
                        <div className="retweet-sign">retweet</div>
                    </div>
                    <div className='horizontal-line'></div>
                    <div className='retweet-content'>
                        {props.retweetcontent}
                    </div>
                    <div className="retweet-body">
                        <TweetCard tweet_id={props.OriginalTweetId} />
                    </div>
                </div>
            </div>
        </>
    );
}