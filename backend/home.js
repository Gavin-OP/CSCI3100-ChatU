const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5555'
});

const Tweet = require('./tweetSchema');
const Favorite = require('./favoriteSchema');
const User = require('./userSchema');


// Get all tweets posted by time
router.get('/tweet', (req, res) => {
    Tweet.find()
       // .limit(3)
       // .sort({ time: -1 })
        .then((tweets) => {
            if (tweets.length == 0) {
                return res.status(404).json({
                    message: 'No tweet found.'
                });
            }

            const promises = tweets.map((tweet) => {
                return axios.get(`/tweet/getTweet/${tweet.tweet_id}`, { headers: { 'Cookie': req.headers.cookie } })
                    .then(response => {
                        if (response.data.tweet.original == -1) {
                            return response.data.tweet;
                        }
                        else {
                            return axios.get(`/tweet/getTweet/${response.data.tweet.original}`, { headers: { 'Cookie': req.headers.cookie } })
                                .then(originalResponse => {
                                    const tweet_info = {
                                        tweet_id: response.data.tweet.tweet_id,
                                        content: response.data.tweet.content,
                                        user: response.data.tweet.user,
                                        time: response.data.tweet.time,
                                        privacy_state: response.data.tweet.privacy_state,
                                        like: response.data.tweet.like,
                                        dislike: response.data.tweet.dislike,
                                        tag: response.data.tweet.tag,
                                        original: originalResponse.data.tweet,
                                    }
                                    return tweet_info;
                                })
                        }
                    })
            });

            Promise.all(promises)
                .then((tweets) => {
                    tweet_list = tweets.filter(tweet => tweet != null)
                    console.log(tweet_list)

                    if (tweet_list.length == 0) {
                        return res.status(404).json({
                            message: 'No tweet found.'
                        });
                    }

                    res.json({ tweets });
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Internal server error.'
            });
        });
});


// get all tweetId posted by time
router.get('/tweetIdList', (req, res) => {
    Tweet.find({})
      // .limit(10)
      //  .sort({ tweet_id: -1 })
        .then((tweets) => {
            if (tweets.length == 0) {
                return res.status(404).json({
                    message: 'No tweet found.'
                });
            }
            const tweetId = [];
            tweets.map((tweet) => {
                tweetId.push(tweet.tweet_id)
            })
            res.json({ tweetId });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Server error.'
            });
        });
});

//API providing services for recommending users to follow on the homepage
router.get('/userRecommendation', (req, res) => {
    const loggedInUser = req.cookies.userId; // Make sure to declare loggedInUser with const to avoid global scope

    User.find()
        .then((users) => {
            if (users.length == 0) {
                return res.status(404).json({
                    message: 'No user found.'
                });
            }

            // get logged-in user's following list
            axios.get(`/follow/followList/${loggedInUser}`, { headers: { 'Cookie': req.headers.cookie } })
                .then(response => {
                    let followingList = [];
                    if (response.data.message == 'He/She followes no one.') {
                        console.log('The user\'s folloing list is:', response.data)
                    }
                    else {
                        console.log('The user\'s folloing list is:', response.data)
                        followingList = response.data.map((item, index) => {
                            return item.user_id;
                        });
                        console.log('The user\'s folloing list is:', followingList)
                    }


                    console.log(followingList)
                    const randomUser = [];
                    const randomIndex = [];
                    for (let i = 0; i < 2; i++) {
                        let index = Math.floor(Math.random() * users.length);
                        while (followingList.includes(index) || randomIndex.includes(index) || users[index].user_id == loggedInUser) {
                            index = Math.floor(Math.random() * users.length);
                        }
                        randomIndex.push(index);

                        if (users[index].avatar === null || users[index].avatar.data == undefined) {
                            avatar = null;
                        }
                        else {
                            avatar = {
                                contentType: users[index].avatar.contentType,
                                data: users[index].avatar.data.toString('base64')
                            }
                        }
                        const userInfo = {
                            user_id: users[index].user_id,
                            username: users[index].username,
                            description: users[index].description,
                            avatar: avatar,
                        };

                        console.log('Recommend users are:', index)
                        randomUser.push(userInfo);
                    }

                    res.json({ randomUser });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Server error.'
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Server error.'
            });
        });
});



module.exports = router;