import {useState} from 'react';
export function ProcessData(tweetID){
let [props,setProps]=useState ({
    avatarUrl: './avatar.png',
    username: '',
    tweetId: '',
    likeStatus: 1,
    dislikeStatus: 1,
    starStatus: 1,
    likeCount: 1000,
    commentCount: 0,
    followStatus: 'following',
    imageSrc: '/tweet_card_pic_1.jpg',
    // imageSrc: '',
    tweetText: '',
    // tweetText: 'dfasdfanibh massa blandit orci, eget ultricies turpis lorem ut nulla.',
    });


//Initial the current user id
let current_user_id = -1;
//process the fetched data
fetch('/tweet/getTweet/'+tweetID.tweet_id)
.then(response => response.json())
.then(data => {
    //save the current user id -1 if the user is not logged in
    if(getCookieValue('userId') !== ""){
        current_user_id = getCookieValue('userId');
    }
    else{
        current_user_id = -1;
    }
    //If the tweet is not a retweet
    if(data.tweet.original === -1){
        //Set the like status
        if(data.tweet.like.find(id => id === current_user_id) !== 'undefined'){setProps(preProps=>({...preProps,likeStatus:1}));} else {setProps(preProps=>({...preProps,likeStatus:0}));}
        //Set the dislike status
        if(data.tweet.dislike.find(id => id === current_user_id) !== 'undefined'){setProps(preProps=>({...preProps,dislikeStatus:1}));} else {setProps(preProps=>({...preProps,dislikeStatus:0}));}
        //Set the star status
        if (data.user.favorite.includes(Number(current_user_id))){
            setProps(preProps=>({...preProps,starStatus:1}));
        }
        console.log(data.tweet.like.length);
        setProps(preProps=>({...preProps,
            tweetId:data.tweet.tweet_id,
            tweetText:data.tweet.content,
            likeCount:data.tweet.like.length,
        }))
        //fetch the user data
        fetch('/user/getUser/'+ data.tweet.user)
        .then(response => response.json())
        .then(userData => {
            console.log(props);
            //Determmine whether the current user is following the user, 0 for not following, 1 for following, 2 for self
            if(userData.follow_status === 0){setProps(preProps=>({...preProps,followStatus:'follow'}));}else if(userData.follow_status === 1){setProps(preProps=>({...preProps,followStatus:'following'}));}else if(userData.follow_status === 2){setProps(preProps=>({...preProps,followStatus:'self'}));}
            
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
.catch(error => {console.log(error)})
return props;
}


function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}