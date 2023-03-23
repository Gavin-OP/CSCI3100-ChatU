import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './TweetCard.css';


export function TweetCard(props) {
    const [state, setState] = useState({
        commentDisplay: 'none',
        picDisplay: 'none',
        likeLight: '#657786',
        dislikeLight: '#657786',
        forwardLight: '#657786',
        starLight: '#657786',
        commentLight: '#657786'
    });


    useEffect(() => {
        const isLike = props.likeStatus;
        console.log(isLike)
        const isPic = props.imageSrc;

        // Check whether the user have already like the tweet, if so, light the like button
        if (isLike) {
            // setState({ ...state, likeLight: '#d92534' })
            console.log(state.likeLight)
            setState(prevState => ({ ...prevState, likeLight: '#d92534' }))
        }
        // Check whether there is a picture and decide whether we should display the picture
        if (isPic === undefined || isPic === '')
            // setState({ ...state, picDisplay: 'none' })
            setState(prevState => ({ ...prevState, picDisplay: 'none' }))
        else
            // setState({ ...state, picDisplay: '' })
            setState(prevState => ({ ...prevState, picDisplay: '' }))
    }, [props.likeStatus, props.dislikeStatus]);

    console.log(state.likeLight)
    // Light or grey the like button when click, it should also contain a fetch function to send data back to server
    function handleLike() {
        if (state.likeLight === '#657786') {
            setState({ ...state, likeLight: '#d92534', dislikeLight: '#657786' })
        }
        else if (state.likeLight === '#d92534') {
            setState({ ...state, likeLight: '#657786' })
        }
    }


    // Light or grey the dislike button when click, it should also contain a fetch function to send data back to server
    function handleDislike() {
        if (state.dislikeLight === '#657786') {
            setState({ ...state, dislikeLight: '#39aaf9', likeLight: '#657786' })
        }
        else if (state.dislikeLight === '#39aaf9') {
            setState({ ...state, dislikeLight: '#657786' })
        }
    }


    // Light or grey the star button when click, it should also contain a fetch function to send data back to server
    function handleStar() {
        if (state.starLight === '#657786') {
            setState({ ...state, starLight: '#d92534' })
        }
        else if (state.starLight === '#d92534') {
            setState({ ...state, starLight: '#657786' })
        }
    }


    // Display comment or hide comment when click the comment button, and light or grey the button
    function toggleCommentInput() {
        if (state.commentDisplay === 'none')
            setState({ ...state, commentDisplay: '', commentLight: '#d92534' })
        else if (state.commentDisplay === '')
            setState({ ...state, commentDisplay: 'none', commentLight: '#657786' })
    }


    // Hide comment input after click send comment button, grey the comment button
    function sendComment() {
        setState({ ...state, commentDisplay: 'none', commentLight: '#657786' })
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
                    <div className='squared-image-container' style={{ display: state.picDisplay }}>
                        <div className="tweet-image">
                            <img src={props.imageSrc} alt="Tweet Pic" />
                        </div>
                    </div>
                    {/* Tweet content and action buttons */}
                    <div className='tweet-text-container'>
                        <div className="tweet-text">{props.tweetText}</div>
                        <div className="tweet-actions">
                            <button className="like-button" style={{ color: state.likeLight }} onClick={handleLike}><FontAwesomeIcon icon={faHeart} /></button>
                            <button className="dislike-button" style={{ color: state.dislikeLight }} onClick={handleDislike}><FontAwesomeIcon icon={faHeartBroken} /></button>
                            <button className="favorite-button" style={{ color: state.starLight }} onClick={handleStar}><FontAwesomeIcon icon={faStar} /></button>
                            <button className="retweet-button"><FontAwesomeIcon icon={faShare} /></button>
                            <button className="comment-button" style={{ color: state.commentLight }} onClick={toggleCommentInput}><FontAwesomeIcon icon={faComment} /></button>
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


