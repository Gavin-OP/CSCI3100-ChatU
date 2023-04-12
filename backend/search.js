const express = require('express');
const router = express.Router();
const Tweet = require('./tweetSchema');
const User = require('./userSchema');

const { json } = require('body-parser');

//Search for tweets by keyword(s)
// Input: a string, called 'search', that contains the search string inputted by the user
router.post('/searchTweet', (req, res) =>{
       const keyword = req.body['search']

       Tweet.find( { "content": { $regex: /.*keyword.*/, $options: 'i' } } )
            .then((matchedTweets) => {
                if(!matchedTweets) {
                    return res.status(404).json({
                        message: 'No tweet matches the keyword(s) you gave'
                    })
                }

                    const promises = matchedTweets.map((tweet) => {

                        return {
                            tweet_id: tweet.tweet_id,
                            content: tweet.content,
                            user: tweet.user,
                            time: tweet.time,
                            original: tweet.original,
                            privacy_state: tweet.privacy_state,
                            image: tweet.image,
                            like: tweet.like,
                            dislike: tweet.dislike,
                            tag: tweet.tag
                        };
                    });

                    Promise.all(promises)
                    .then(tweets => {
                        res.status(200).json(tweets);
                    })
            })
            .catch(error => {
                console.error(`Error retrieving details of tweets that match the keyword ${keyword}:`, error);
                res.status(500).json({
                    message: 'Failed to retrieve matched tweet(s) from the db.'
                });
            });  
});

module.exports = router;