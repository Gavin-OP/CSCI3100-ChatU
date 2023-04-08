import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './TweetCard.css';


export function TweetCard(props) {
    const [state, setState] = useState({
        commentDisplay: 'none',
        picDisplay: 'none',
        likeLight: '#657786',
        dislikeLight: '#657786',
        forwardLight: '#657786',
        starLight: '#657786',
        commentLight: '#657786',
        followStatus: 'follow',
    });


    useEffect(() => {
        const isLike = props.likeStatus;
        const isDislike = props.dislikeStatus;
        const isStar = props.starStatus;
        const isPic = props.imageSrc;
        const isFollow = props.followStatus;
        //Check whether the user have already follow the user, if so, light the follow button, else grey the button.
        if (isFollow === 'follow') {
            setState(prevState => ({ ...prevState, followLight: '#ff4444' }))

        }
        else if (isFollow === 'following') {
            setState(prevState => ({ ...prevState, followLight: '#b5b5b5' }))
        }


        // Check whether the user have already like the tweet, if so, light the like button, else grey the button. 
        if (isLike === 1) {
            setState(prevState => ({ ...prevState, likeLight: '#d92534' }))
        }
        else if (isLike === 0) {
            setState(prevState => ({ ...prevState, likeLight: '#657786' }))
        }


        // Check whether the user have already dislike the tweet, if so, light the dislike button, else grey the button. 
        if (isDislike === 1) {
            setState(prevState => ({ ...prevState, dislikeLight: '#39aaf9' }))
        }
        else if (isDislike === 0) {
            setState(prevState => ({ ...prevState, dislikeLight: '#657786' }))
        }


        // Check whether the user have already favorite the tweet, if so, light the favorite button, else grey the button. 
        if (isStar === 1) {
            setState(prevState => ({ ...prevState, starLight: '#d92534' }))
        }
        else if (isStar === 0) {
            setState(prevState => ({ ...prevState, starLight: '#657786' }))
        }


        // Check whether there is a picture and decide whether we should display the picture
        if (isPic === undefined || isPic === '')
            setState(prevState => ({ ...prevState, picDisplay: 'none' }))
        else
            setState(prevState => ({ ...prevState, picDisplay: '' }))
    }, [props.likeStatus, props.dislikeStatus, props.starStatus, props.imageSrc, props.likeCount, props.starCount, props.commentCount, props.followStatus]);


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
    //function to change the prop.followStatus


    function handleFollow() {
        if (state.followStatus === 'follow') {
            setState({ ...state, followStatus: 'following' });
            fetch('/follow/add/'+props.userId)

        }
        else if (state.followStatus === 'following') {
            setState({ ...state, followStatus: 'follow' })
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

    function handleOpen(){
        window.location.href='/tweet?tweetId='+props.tweetId;
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
                            <button className="follow-button" onClick={handleFollow}>{state.followStatus}</button>
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
                    <div className='tweet-text-container' onClick={handleOpen}>
                        <div className="tweet-text">{props.tweetText}</div>
                        <div className="tweet-actions">
                            <button className="like-button" style={{ color: state.likeLight }} onClick={handleLike}><FontAwesomeIcon icon={faHeart} /></button>
                            <div className="action-number">{props.likeCount}</div>
                            <button className="dislike-button" style={{ color: state.dislikeLight }} onClick={handleDislike}><FontAwesomeIcon icon={faHeartBroken} /></button>
                            <button className="favorite-button" style={{ color: state.starLight }} onClick={handleStar}><FontAwesomeIcon icon={faStar} /></button>
                            <div className="action-number">{props.starCount}</div>
                            <button className="comment-button" style={{ color: state.commentLight }} onClick={toggleCommentInput}><FontAwesomeIcon icon={faComment} /></button>
                            <div className="action-number">{props.commentCount}</div>
                            <button className="retweet-button"><FontAwesomeIcon icon={faShare} /></button>
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


