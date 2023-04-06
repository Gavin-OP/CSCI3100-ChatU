//Process the requests related to Tweets
const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5555'
});

const User = require('./userSchema');


// Get all tweets posted by a user
router.get('/tweet/:userId', (req, res) => {
    const userId = req.params['userId'];

    User.findOne({ user_id: userId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            const tweetId = user.tweet_id;
            const promises = tweetId.map((tweetId) => {
                return axios.get(`/tweet/getTweet/${tweetId}`, { headers: { 'Cookie': req.headers.cookie } })
                    .then(response => {
                        if (response.data.original === -1) {
                            originalTweet = response.data;
                        }
                        else {
                            return axios.get(`/tweet/getTweet/${response.data.original}`, { headers: { 'Cookie': req.headers.cookie } })
                                .then(originalResponse => {
                                    originalTweet = originalResponse.data;

                                })
                        }
                        const tweet_info = {
                            tweet_id: response.data.tweet_id,
                            content: response.data.content,
                            user: response.data.user,
                            time: response.data.time,
                            original: originalTweet,
                            privacy_state: response.data.privacy_state,
                            image: response.data.Image,
                            like: response.data.like,
                            dislike: response.data.dislike,
                            tag: response.data.tag,
                        };
                        return tweet_info;
                    })
            });
            return Promise.all(promises);
        })
        .then((tweets) => {
            res.json({
                message: 'Tweets fetched successfully.',
                tweets: tweets,
                action_status: true,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to fetch tweets.',
            });
        });
});




module.exports = router;