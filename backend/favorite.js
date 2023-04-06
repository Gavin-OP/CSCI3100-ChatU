const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5555'
});

const Tweet = require('./tweetSchema');
const Favorite = require('./favoriteSchema');
const User = require('./userSchema');


// add a tweet to the favorite list of the currently logged-in user
router.get('/add/:tweetId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const tweetId = req.params['tweetId'];

    // check whether it is a authorized user
    User.findOne({ user_id: loggedInUserId })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // check whether the tweetId is an existing tweet
            Tweet.findOne({ tweet_id: tweetId })
                .then(tweet => {
                    if (!tweet) {
                        return res.status(404).json({
                            message: 'TweetId not found. Can not add a non-existing tweet to the favorite list.'
                        });
                    }

                    // add the tweet to the favorite list of the logged-in user
                    Favorite.findOneAndUpdate(
                        { user_id: loggedInUserId },
                        { $addToSet: { favorite_id: tweetId } },
                        { upsert: true, new: true }
                    )
                        .then(favoriteResult => {
                            User.findOneAndUpdate(
                                { user_id: loggedInUserId },
                                { $addToSet: { favorite: tweetId } },
                                { upsert: true, new: true }
                            )
                                .then(userResult => {
                                    console.log(`Add the tweet with ID ${tweetId} to the favorite list of user with ID ${loggedInUserId}`);
                                    res.status(200).json({
                                        message: "Add tweet to favorite list successfully",
                                        favoriteList: favoriteResult.favorite_id,
                                    });
                                })
                                .catch(error => {
                                    console.error(`Error adding tweet with ID ${tweetId} to the favorite list of user with ID ${loggedInUserId}:`, error);
                                    res.status(500).json({
                                        message: "Failed to add the tweet to the favorite list of the logged-in user"
                                    });
                                });
                        })
                        .catch(error => {
                            console.error(`Error finding tweet with ID ${tweetId}:`, error);
                            res.status(500).json({
                                message: "Failed to find the tweet"
                            });
                        });
                })
                .catch(error => {
                    console.error(`Error finding user with ID ${loggedInUserId}:`, error);
                    res.status(500).json({
                        message: "Failed to find the user"
                    });
                });
        });
});


// delete a tweet from the favorite list of the currently logged-in user
router.get('/delete/:tweetId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const tweetId = req.params['tweetId'];

    // check whether it is a authorized user
    User.findOne({ user_id: loggedInUserId })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // check whether the tweetId is an existing tweet
            Tweet.findOne({ tweet_id: tweetId })
                .then(tweet => {
                    if (!tweet) {
                        return res.status(404).json({
                            message: 'TweetId not found. Can not delete a non-existing tweet from the favorite list.'
                        });
                    }
                    // delete the tweet from the favorite list of the logged-in user
                    Favorite.findOneAndUpdate(
                        { user_id: loggedInUserId },
                        { $pull: { favorite_id: tweetId } },
                        { upsert: true, new: true }
                    )
                        .then(favoriteResult => {
                            User.findOneAndUpdate(
                                { user_id: loggedInUserId },
                                { $pull: { favorite: tweetId } },
                                { upsert: true, new: true }
                            )
                                .then(userResult => {

                                    console.log(`Delete the tweet with ID ${tweetId} from the favorite list of user with ID ${loggedInUserId}`);
                                    res.status(200).json({
                                        message: "Delete tweet from favorite list successfully",
                                        favoriteList: favoriteResult.favorite_id,
                                    });
                                })
                                .catch(error => {
                                    console.error(`Error deleting tweet with ID ${tweetId} from the favorite list of user with ID ${loggedInUserId}:`, error);
                                    res.status(500).json({
                                        message: "Failed to delete the tweet from the favorite list of the logged-in user"
                                    });
                                });
                        })
                        .catch(error => {
                            console.error(`Error finding tweet with ID ${tweetId}:`, error);
                            res.status(500).json({
                                message: "Failed to find the tweet"
                            });
                        });
                })
                .catch(error => {
                    console.error(`Error finding user with ID ${loggedInUserId}:`, error);
                    res.status(500).json({
                        message: "Failed to find the user"
                    });
                });
        });
});


// Get all tweets favorite by a user
router.get('/favoriteList', (req, res) => {
    const userId = req.cookies.userId;

    User.findOne({ user_id: userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            Favorite.findOne({ user_id: userId })
                .then(favorite => {
                    if (!favorite) {
                        return res.status(404).json({
                            message: 'Favorite not found.'
                        });
                    }

                    const favoriteList = favorite.favorite_id;
                    const promises = favoriteList.map(favoriteId => {
                        return axios.get(`/tweet/getTweet/${favoriteId}`, { headers: { 'Cookie': req.headers.cookie } })
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
                                        .catch(err => {
                                            console.error(err);
                                            return null;
                                        });
                                };
                            })
                            .catch(err => {
                                console.error(err);
                                return null;
                            });
                    });

                    Promise.all(promises)
                        .then(tweets => {
                            tweet_list = tweets.filter(tweet => tweet != null)
                            console.log(tweet_list)

                            if (tweet_list.length == 0) {
                                return res.status(404).json({
                                    message: 'Favorite list is empty.'
                                });
                            }

                            res.set('Content-Type', 'application/json');
                            res.status(200).json(tweets);
                        });
                })
                .catch(error => {
                    console.error(`Error retrieving favorite list:`, error);
                    res.status(500).json({
                        message: 'Failed to retrieve favorite list'
                    });
                });
        })
        .catch(error => {
            console.error(`Error retrieving favorite list:`, error);
            res.status(500).json({
                message: 'Failed to retrieve favorite list'
            });
        });
});


module.exports = router;