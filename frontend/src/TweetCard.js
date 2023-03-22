import React, { useState } from 'react';
import './TweetCard.css';

export function TweetCard(props) {
    const [showCommentInput, setShowCommentInput] = useState(false);

    function toggleCommentInput() {
        setShowCommentInput((prev) => !prev);
    }
    return (
        <div className='container'>
            <div className="tweet-card" >
                {/* User information and Tweet Information */}
                <div className="tweet-header">
                    <div className="avatar">
                        <img src={props.avatarUrl} alt="Avatar" />
                    </div>
                    <div className="user-info">
                        <div className="username">{props.username}</div>
                        <div className='follow'>
                            <button className="follow-button">Follow</button>
                        </div>
                    </div>



                    {/* not test yet */}
                    <div className="tweet-id">{props.tweetId}</div>
                </div>

                {/* Tweet Content */}
                <div className="tweet-content">
                    <div className="tweet-image">
                        <img src={props.imageSrc} alt="Tweet Image" />
                    </div>
                    <div className="tweet-text">{props.tweetText}</div>
                    <div className="tweet-actions">
                        <button className="retweet-button">Retweet</button>
                        <button className="like-button">Like</button>
                        <button className="dislike-button">Dislike</button>
                        <button className="comment-button">Comment</button>
                        <button className="favorite-button">Favorite</button>
                    </div>
                    <div className="comment-input">
                        <input type="text" placeholder="Type your comment here" />
                    </div>
                </div>
            </div >
        </div>
    );
}


