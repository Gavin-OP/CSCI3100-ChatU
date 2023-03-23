import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './TweetCard.css';

export function TweetCard(props) {
    const [state, setState] = useState({
        commentDisplay: 'none',
        picDisplay: 'none'
    });


    function picCheck() {

    }
    // Display comment or hide comment when click the comment button
    function toggleCommentInput() {
        if (state.commentDisplay === 'none')
            setState({ commentDisplay: '' })
        else if (state.commentDisplay === '')
            setState({ commentDisplay: 'none' })
    }

    // Hid comment input after click send comment button
    function sendComment() {
        setState({ commentDisplay: 'none' })
    }

    return (
        <div className='tweet-card-container'>
            <div className="tweet-card" >


                {/* User information and Tweet Information */}
                <div className="tweet-header">
                    <div className="avatar">
                        <img src={props.avatarUrl} alt="Avatar" />
                    </div>
                    <div className="user-info">
                        <div className="username">{props.username}</div>
                        <div className='follow'>
                            <button className="follow-button">{props.followStatus}</button>
                        </div>
                        <div className='vertical-line'></div>
                    </div>
                    <div className="tweet-id">{props.tweetId}</div>
                </div>
                <div className='horizontal-line'></div>


                {/* Tweet Content */}
                <div className="tweet-content">
                    {/* Tweet Image */}
                    <div className='squared-image-container'>
                        <div className="tweet-image">
                            <img src={props.imageSrc} alt="Tweet Image" />
                        </div>
                    </div>
                    {/* Tweet content and action buttons */}
                    <div className='tweet-text-container'>
                        <div className="tweet-text">{props.tweetText}</div>
                        <div className="tweet-actions">
                            <button className="like-button"><FontAwesomeIcon icon={faHeart} /></button>
                            <button className="dislike-button"><FontAwesomeIcon icon={faHeartBroken} /></button>
                            <button className="retweet-button"><FontAwesomeIcon icon={faShare} /></button>
                            <button className="favorite-button"><FontAwesomeIcon icon={faStar} /></button>
                            <button className="comment-button" onClick={toggleCommentInput}><FontAwesomeIcon icon={faComment} /></button>
                        </div>
                    </div>
                </div>


                {/* Comment input */}
                <div className="comment-input" style={{ display: state.commentDisplay }}>
                    <input type="text" placeholder="Comment..." />
                    <button type='submit' onClick={sendComment} className='send-comment'><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>

            </div >
        </div>
    );
}


