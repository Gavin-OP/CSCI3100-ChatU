import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faHeartBroken, faComment, faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './TweetCard.css';

function addPic(file) {
    if (file.image === undefined) {return '';}
    else{
        var type = file.image.contentType;
        var data = file.image.data;
        var code='';
        code += "data:"+type+";base64, " + data ;
        //console.log(data)
        return code;
    }
}

export function TweetCard(tweetID){
    
    //Handle tweet card state
    const [state, setState] = useState({
        commentDisplay: 'none',
        picDisplay: 'none',
        likeLight: '',
        dislikeLight: '',
        forwardLight: '#657786',
        starLight: '#657786',
        commentLight: '#657786',
        followLight: '#ff4444',
    });
    //process the fetched data
    useEffect(() => {
    //Initial the current user id
    let current_user_id = -1;
    if(getCookieValue('userId') !== ""){
        current_user_id = Number(getCookieValue('userId'));
    }
    else{
        current_user_id = -1;
    }
    fetch('/tweet/getTweet/'+tweetID.tweet_id)
    .then(response => response.json())
    .then(data => {
        //save the current user id -1 if the user is not logged in

        //If the tweet is not a retweet
        if(data.tweet.original === -1){
            //Set the like status
            if(data.tweet.like.includes(current_user_id)){setProps(preProps=>({...preProps,likeStatus:1, likeLight: '#d92534'})); setState({ ...state, likeLight: '#d92534',});} 
            else {setProps(preProps=>({...preProps,likeStatus:0,likeLight: '#657786'}));setState(prevState=>({ ...prevState, likeLight: '#657786',}));}
            //Set the dislike status
            if(data.tweet.dislike.includes(current_user_id)){setProps(preProps=>({...preProps,dislikeStatus:1, dislikeLight: '#39aaf9'})); setState({...state, dislikeLight: '#39aaf9',});} 
            else {setProps(preProps=>({...preProps,dislikeStatus:0,dislikeLight: '#657786'}));setState(prevState=>({...prevState, dislikeLight: '#657786',}));}
            //Set the star status
            if (data.user.favorite.includes(Number(current_user_id))){
                setProps(preProps=>({...preProps,starStatus:1}));
            }
            setProps(preProps=>({...preProps,
                userId:data.tweet.user,
                tweetId:data.tweet.tweet_id,
                tweetText:data.tweet.content,
                likeCount:data.tweet.like.length-data.tweet.dislike.length,
                imageSrc:addPic(data),
            }))
            //fetch the user data
            fetch('/user/getUser/'+ data.tweet.user)
            .then(response => response.json())
            .then(userData => {
                // console.log(props);
                //Determmine whether the current user is following the user, 0 for not following, 1 for following, 2 for self
                if(userData.follow_status === 0){setProps(preProps=>({...preProps,followStatus:'follow'}));}else if(userData.follow_status === 1){setProps(preProps=>({...preProps,followStatus:'following'}));}else if(userData.follow_status === 2){setProps(preProps=>({...preProps,followStatus:'self'}));};
                //Set the tweet card username
                setProps(preProps=>({...preProps,
                    username:userData.username,
                }))
            .catch(error => {console.log(error)})
            })
            fetch('/comment/commentList/'+data.tweet.tweet_id)
            .then(response => response.json())
            .then(commentData => {
                setProps(preProps=>({...preProps,
                    commentCount:commentData.length,
                }))
            })
        }
        //If the tweet is a retweet
        else{
            setProps(preProps=>({...preProps}));
        }
    })
    .catch(error => {console.log(error)});
    }, []);

    let [props,setProps]=useState ({
    userId:'',
    avatarUrl: './avatar.png',
    username: 'Loading',
    tweetId: 'Loading',
    likeStatus: 0,
    dislikeStatus: 0,
    starStatus: 0,
    likeCount: 0,
    commentCount: 0,
    followStatus: 'Loading',
    imageSrc: 'Loading',
    // imageSrc: '',
    tweetText: 'Loading',
    // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
    });
    



    useEffect(() => {
        console.log(props);
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
            setState(prevState => ({ ...prevState, followLight: '#c9c9c9' }))
        }
        else if(isFollow === 'self'){
            setState(prevState => ({ ...prevState, followLight: '#c9c9c9' }))
        }


        // Check whether the user have already like the tweet, if so, light the like button, else grey the button. 
        if (isLike === 1) {
            setProps(prevState => ({ ...prevState, likeLight: '#d92534' }))
        }
        else if (isLike === 0) {
            setProps(prevState => ({ ...prevState, likeLight: '#657786' }))
        }


        // Check whether the user have already dislike the tweet, if so, light the dislike button, else grey the button. 
        if (isDislike === 1) {
            setProps(prevState => ({ ...prevState, dislikeLight: '#39aaf9' }))
        }
        else if (isDislike === 0) {
            setProps(prevState => ({ ...prevState, dislikeLight: '#657786' }))
        }


        // Check whether the user have already favorite the tweet, if so, light the favorite button, else grey the button. 
        if (isStar === 1) {
            setProps(prevState => ({ ...prevState, starLight: '#d92534' }))
        }
        else if (isStar === 0) {
            setProps(prevState => ({ ...prevState, starLight: '#657786' }))
        }


        // Check whether there is a picture and decide whether we should display the picture
        if (isPic === undefined || isPic === '')
            setState(prevState => ({ ...prevState, picDisplay: 'none' }))
        else
            setState(prevState => ({ ...prevState, picDisplay: '' }))
    }, [props.likeStatus, props.dislikeStatus, props.starStatus, props.imageSrc, state.followLight,props.likeCount,props.commentCount, props.followStatus,]);


    // Light or grey the like button when click, it should also contain a fetch function to send data back to server
    function handleLike() {
        if (state.likeLight === '#657786' && state.dislikeLight === '#39aaf9') {
            setState({ ...state, likeLight: '#d92534', dislikeLight: '#657786',})
            setProps({...props,likeCount:props.likeCount+2,})
            fetch('/tweet/like/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
            fetch('/tweet/undislike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
            
        }   
        else if (state.likeLight === '#657786' && state.dislikeLight === '#657786') {
            setState({ ...state, likeLight: '#d92534', })
            setProps({...props,likeCount:props.likeCount+1, })
            fetch('/tweet/like/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
        else if (state.likeLight === '#d92534') {
            setState({ ...state, likeLight: '#657786', })
            setProps({...props,likeCount:props.likeCount-1})
            fetch('/tweet/unlike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        
        }
    }


    // Light or grey the dislike button when click, it should also contain a fetch function to send data back to server
    function handleDislike() {
        if (state.dislikeLight === '#657786' && state.likeLight === '#d92534') {
            setState({ ...state, dislikeLight: '#39aaf9', likeLight: '#657786',})
            setProps({...props,likeCount:props.likeCount-2})
            fetch('/tweet/dislike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
            fetch('/tweet/unlike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
        else if (state.dislikeLight === '#657786' && state.likeLight === '#657786') {
            setState({ ...state, dislikeLight: '#39aaf9',})
            setProps({...props,likeCount:props.likeCount-1})
            fetch('/tweet/dislike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
        else if (state.dislikeLight === '#39aaf9') {
            setState({ ...state, dislikeLight: '#657786',})
            setProps({...props,likeCount:props.likeCount+1})
            fetch('/tweet/undislike/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
    }


    // Light or grey the star button when click, it should also contain a fetch function to send data back to server
    function handleStar() {
        if (state.starLight === '#657786') {
            setState({ ...state, starLight: '#d92534' })
            fetch('/favorite/add/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
        else if (state.starLight === '#d92534') {
            setState({ ...state, starLight: '#657786' })
            fetch('/favorite/delete/'+props.tweetId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
    }
    //function to change the prop.followStatus


    function handleFollow() {
        if (props.followStatus === 'follow') {
            setState({ ...state, followLight: '#c9c9c9' });
            setProps(preProps=>({...preProps,followStatus:'following'}))
            fetch('/follow/add/'+props.userId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
        else if (props.followStatus === 'following') {
            setState({ ...state, followLight: '#ff4444' });
            setProps(preProps=>({...preProps,followStatus:'follow'}))
            fetch('/follow/delete/'+props.userId)
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
        }
    }

    // Display comment or hide comment when click the comment button, and light or grey the button
    function toggleCommentInput() {
        if (state.commentDisplay === 'none')
            setState({ ...state, commentDisplay: '', commentLight: '#d92534' })
        else if (state.commentDisplay === '')
            setState({ ...state, commentDisplay: 'none', commentLight: '#657786' })
    }
    // Get the comment input value
    const[comment,setComment]=useState('');
    const HandleComment = (event) => {
        setComment(event.target.value);
      };


    // Hide comment input after click send comment button, grey the comment button
    function sendComment(event) {
        if( comment !== ''){
            event.preventDefault();
            setState({ ...state, commentDisplay: 'none', commentLight: '#657786',})
            setProps({...props,commentCount:props.commentCount+1})
            fetch('/comment/create',{
                method:'POST',
                body:JSON.stringify({tweet_id:Number(props.tweetId),content:String(comment),})
            })
            .then(res=>res.json())
            .then(data=>console.log(data.message))
            .catch(err=>console.log(err))
            setComment('');
            event.target.value.reset();
    }
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
                            <button className="follow-button" onClick={handleFollow} style={{'background':state.followLight}}>{props.followStatus}</button>
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
                        <div className="tweet-text" onClick={handleOpen}>{props.tweetText}</div>
                        <div className="tweet-actions">
                            <button className="like-button" style={{ color: state.likeLight }} onClick={handleLike}><FontAwesomeIcon icon={faHeart} /></button>
                            <div className="action-number">{props.likeCount}</div>
                            <button className="dislike-button" style={{ color: state.dislikeLight }} onClick={handleDislike}><FontAwesomeIcon icon={faHeartBroken} /></button>
                            <div className="action-number">{}</div>
                            <button className="favorite-button" style={{ color: state.starLight }} onClick={handleStar}><FontAwesomeIcon icon={faStar} /></button>
                            <div className="action-number">{}</div>
                            <button className="comment-button" style={{ color: state.commentLight }} onClick={toggleCommentInput}><FontAwesomeIcon icon={faComment} /></button>
                            <div className="action-number">{props.commentCount}</div>
                            <button className="retweet-button"><FontAwesomeIcon icon={faShare} /></button>
                        </div>
                    </div>
                </div>


                {/* Comment input */}
                <div className="comment-input" style={{ display: state.commentDisplay }}>
                    <input type="text" placeholder="Comment..." value={comment} onChange={HandleComment}/>
                    <button type='submit' onClick={event=>sendComment(event)} className='send-comment'><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>

            </div >
        </div>
    );
}
function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}

