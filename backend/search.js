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

       if (keyword.match(/^[0-9]+$/) != null) {
           Tweet.find( { user: keyword } )
                .then((matchedTweets) => {
                     if(!matchedTweets) {
                         return res.status(404).json({
                            message: "Either the user doesn't exist or he/she never posted a tweet before"
                         })
                     }

               // res.set('Content-Type', 'application/json');
                list = []
                i = 0
                while(i < matchedTweets.length) {
                    list.push(matchedTweets[i].tweet_id)
                    i++
                }

                o = { "tweetId": list }

                res.status(200).send(o);
            })
            .catch(error => {
                console.error(`Error retrieving details of tweets with the user id ${keyword}:`, error);
                res.status(500).json({
                    message: 'Failed to retrieve matched tweet(s) from the db.'
                }); 
            }); 

       } else if ( (keyword[0] == '$') && ( keyword.slice(1).match(/^[a-zA-Z]+$/) != null )  ) {
              const givenTag = keyword.slice(1)
        
              Tweet.find( { "tag": {"$regex": givenTag, "$options": "i" } } )
                   .then((matchedTweets) => {
                         if(!matchedTweets) {
                            return res.status(404).json({
                                  message: "Either the input is not a valid tag, or no tweets under this tag have been posted"
                           })
                         }

                   // res.set('Content-Type', 'application/json');
                   list = []
                   i = 0
                   while(i < matchedTweets.length) {
                         list.push(matchedTweets[i].tweet_id)
                         i++
                   }

                   o = { "tweetId": list }

                   res.status(200).send(o);
                 


            })
            .catch(error => {
                      console.error(`Error retrieving details of tweets with the tag ${givenTag}:`, error);
                      res.status(500).json({
                          message: 'Failed to retrieve matched tweet from the db.'
                      }); 
             }); 
       
       
       } else if ( (keyword[0] == '#') && ( keyword.slice(1).match(/^[0-9]+$/) != null ) ) {
             const id = keyword.slice(1)
        
             Tweet.findOne( { tweet_id: id } )
                  .then((matchedTweet) => {
                         if(!matchedTweet) {
                           return res.status(404).json({
                                  message: "The tweet id given doesn't exist"
                           })
                         }

                        // res.set('Content-Type', 'application/json');
                     /*   list = []
                        i = 0
                        while(i < matchedTweets.length) {
                              list.push(matchedTweets[i].tweet_id)
                              i++
                        }

                        o = { "tweetId": list }

                        res.status(200).send(o);
                      */
                     res.json({
                        tweet_id: id,
                        content: matchedTweet.content,
                        user: matchedTweet.user,
                        time: matchedTweet.time,
                        original: matchedTweet.original,
                        privacy_state: matchedTweet.privacy_state,
                        //image: matchedTweet.image,
                        like: matchedTweet.like,
                        dislike: matchedTweet.dislike,
                        tag: matchedTweet.tag 
                     });  

                 })
                 .catch(error => {
                           console.error(`Error retrieving details of tweet with the tweet id ${id}:`, error);
                           res.status(500).json({
                               message: 'Failed to retrieve matched tweet from the db.'
                           }); 
                  }); 
       } else {
            Tweet.find(  { "content": {"$regex": keyword, "$options": "i" } } )
                 .then((matchedTweets) => {
                        if(!matchedTweets) {
                            return res.status(404).json({
                                  message: "No tweet's content matches the keyword(s) you gave"
                             })
                        }

                        // res.set('Content-Type', 'application/json');
                        list = []
                        i = 0
                        while(i < matchedTweets.length) {
                            list.push(matchedTweets[i].tweet_id)
                            i++
                        }

                        o = { "tweetId": list }

                        res.status(200).send(o);
                    
                       /*
                        const promises = matchedTweets.map((tweet) => {
                             return {
                                tweet_id: tweet.tweet_id,
                          
                             };
                        })

                        Promise.all(promises)
                                .then(tweets => {
                                     res.status(200).json(tweets);
                                })
                        */
          
                 })
                 .catch(error => {
                       console.error(`Error retrieving details of tweets that match the keyword ${keyword}:`, error);
                       res.status(500).json({
                           message: 'Failed to retrieve matched tweet(s) from the db.'
                       }); 
                 }); 
    }
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
                                     email: user.email,
                                     ban: user.ban,
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
                                     _id: comment._id,
                                     comment_id: comment.comment_id,
                                     tweet_id: comment.tweet_id,
                                     user_id: comment.user_id,
                                     content: comment.content,
                                     time: comment.time,
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