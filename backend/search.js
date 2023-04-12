const express = require('express');
const router = express.Router();
const Tweet = require('./tweetSchema');
const User = require('./userSchema');
const Comment = require('./commentSchema');

const { json } = require('body-parser');

//Search for tweets by keyword(s) (partial search)
// Input: a string, called "search", that contains the search string inputted by the user
router.post('/searchTweet', (req, res) =>{
       const keyword = req.body['search']

       Tweet.find( { "content": {"$regex": keyword, "$options": "i" } } )
            .then((matchedTweets) => {
                    if(!matchedTweets) {
                          return res.status(404).json({
                                message: "No tweet's content matches the keyword(s) you gave"
                          })
                       }

                    res.set('Content-Type', 'application/json');
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
                    })

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

//search for user(s) by username (partial search)
// input: a string, called 'search', that contains the keyword inputted by user
// output: the user_id, username, ban status, and avatar of all user(s) whose usernames contain the string 'search' 
router.post('/searchUser', (req, res) => {
    const keyword = req.body['search']

       User.find( { "username": {"$regex": keyword, "$options": "i" } } )
            .then((matchedUsers) => {
                    if(!matchedUsers) {
                          return res.status(404).json({
                                message: "No user's username matches the keyword(s) you gave"
                          })
                       }

                    res.set('Content-Type', 'application/json');
                    const promises = matchedUsers.map((user) => {
                                 return {
                                     user_id: user.user_id,
                                     username: user.username,
                                     ban: user.ban,
                                     avatar: user.avatar
                                 };
                            })

                    Promise.all(promises)
                    .then(users => {
                        res.status(200).json(users);
                    })
          
            })
            .catch(error => {
                console.error(`Error retrieving details of users that match the keyword ${keyword}:`, error);
                res.status(500).json({
                    message: 'Failed to retrieve matched user(s) from the db.'
                }); 
        }); 

});

//search for comment(s) by keyword (partial search)
router.post('/searchComment', (req, res) => {
    const keyword = req.body['search']

       Comment.find( { "content": {"$regex": keyword, "$options": "i" } } )
            .then((matchedComments) => {
                    if(!matchedComments) {
                          return res.status(404).json({
                                message: "No comment matches the keyword(s) you gave"
                          })
                       }

                    res.set('Content-Type', 'application/json');
                    const promises = matchedComments.map((comment) => {
                                 return {
                                     comment_id: comment.comment_id,
                                     tweet_id: comment.tweet_id,
                                     user_id: comment.user_id,
                                     time: comment.time,
                                     content: comment.content
                                 };
                            })

                    Promise.all(promises)
                    .then(comments => {
                        res.status(200).json(comments);
                    })
          
            })
            .catch(error => {
                console.error(`Error retrieving details of comments that match the keyword ${keyword}:`, error);
                res.status(500).json({
                    message: 'Failed to retrieve matched comment(s) from the db.'
                }); 
        }); 

});

module.exports = router;