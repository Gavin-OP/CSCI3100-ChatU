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
        .sort({ time: -1 })
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

module.exports = router;