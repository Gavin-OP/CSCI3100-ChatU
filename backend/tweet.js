//Process the requests related to Tweets
const express = require('express');
const router = express.Router();
const Tweet = require('./tweetSchema');
const User = require('./userSchema');

const multer = require('multer');
const { json } = require('body-parser');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create a new tweet
router.post("/create", upload.any('image'), (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to create tweet. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    Tweet.findOne({})
        .sort('-tweet_id')
        .exec()
        .then((tweet) => {
            //check if the request has image(s) or not
            console.log(req.files)
            let images = [];
            if (req.files) {
                //if the request has image(s)
                let i = 0;
                while (i < req.files.length) {
                    images.push({
                        data: req.files[i].buffer,
                        contentType: req.files[i].mimetype
                    });
                    i++;
                }
            }

            const newTweet = new Tweet({
                tweet_id: tweet ? tweet.tweet_id + 1 : 1,
                content: req.body['content'],
                image: images,
                user: userId,
                time: req.body['time'],
                privacy_state: req.body['privacy_state'], // 0 if everyone can see the tweet; 1 if only self can see the tweet
                tag: req.body['tag'],
            });

            // saving the object into the database
            return newTweet.save()
        })

        .then((newTweet) => {
            console.log('tweet created', newTweet);

            User.findOneAndUpdate(
                { user_id: userId },
                { $push: { tweet: newTweet.tweet_id } },
                { upsert: true, new: true },
            )
                .then((user) => {
                    res.json({
                        message: 'Create tweet successfully',
                        action_status: true 
                    });
                });
        })

        .catch((err) => {
            console.error(err);
            res.status(500).send("Fail to save the new tweet. Backend Error.");
        });
});


//Delete a tweet record from db
router.get('/delete/:tweetId', (req, res) => {
    Tweet.findOneAndDelete({ tweet_id: req.params.tweetId })
        .then((tweet) => {
            console.log('tweet deleted:', tweet);

            User.findOneAndUpdate(
                { user_id: tweet.user },
                { $pull: { tweet: tweet.tweet_id } },
                { upsert: true, new: true },
            )
                .then((user) => {
                    res.json({
                        message: 'Tweet successfully deleted',
                        action_status: true
                    });
                })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to delete tweet. Maybe because tweet does not exist."
            });
        })
});


// retweet
router.post('/retweet', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to create retweet. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    Tweet.findOne({})
        .sort('-tweet_id')
        .exec()
        .then((tweet) => {
            const newTweet = new Tweet(
                {
                    tweet_id: tweet ? tweet.tweet_id + 1 : 1,
                    content: req.body['content'],
                    user: userId,
                    privacy_state: req.body['privacy_state'], // 0 if everyone can see the tweet; 1 if only self can see the tweet
                    original: req.body['original'],
                    tag: req.body['tag'],
                });
            // saving the object into the database
            return newTweet.save();
        })
        .then((newTweet) => {
            console.log('retweet created');

            User.findOneAndUpdate(
                { user_id: userId },
                { $push: { tweet: newTweet.tweet_id } },
                { upsert: true, new: true },
            )
                .then((user) => {
                    res.json({
                        message: 'Create retweet successfully',
                        action_status: true
                    });
                })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error");
        })

});


// like a tweet
router.get('/like/:tweetId', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to like or unlike. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    if (!req.params['tweetId']) {
        return res.status(400).json({
            message: 'Failed to like or unlike. The tweet_id given is not valid.'
        });
    }

    Tweet.findOne({ tweet_id: req.params['tweetId'] })
        .exec()
        .then((tweet) => {
            if (!tweet) {
                return res.status(404).json({
                    message: 'Failed to like or unlike. The tweet does not exist.'
                });
            }

            // check if the user has disliked the tweet
            if (tweet.dislike.includes(userId)) {
                // remove the user from the dislike list if the user has disliked the tweet
                tweet.dislike.pull(userId);
                //And add the user to the like list
                tweet.like.push(userId);
            }

            // check if the user has liked the tweet
            if (tweet.like.includes(userId)) {
                // doing nothing if the user has already liked the tweet
            } else {
                // if the user has not liked the tweet, then like it
                tweet.like.push(userId);
            }
            
            return tweet.save();
        })
        .then((tweet) => {
            console.log('Like successful.', tweet.like);
            res.json({
                message: 'like successful.',
                action_status: true
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to save your like in server."
            });
        })
});


// unlike a tweet
router.get('/unlike/:tweetId', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to like or unlike. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    if (!req.params['tweetId']) {
        return res.status(400).json({
            message: 'Failed to like or unlike. The tweet_id given is not valid.'
        });
    }

    Tweet.findOne({ tweet_id: req.params['tweetId'] })
        .exec()
        .then((tweet) => {
            if (!tweet) {
                return res.status(404).json({
                    message: 'Failed to like or unlike. The tweet does not exist.'
                });
            }

            // check if the user has liked the tweet
            if (tweet.like.includes(userId)) {
                // if the user has liked the tweet, then unlike it
                tweet.like.pull(userId);
            }


            return tweet.save();
        })
        .then((tweet) => {
            console.log('Unlike successful.', tweet.like);
            res.json({
                message: 'unlike successful.',
                action_status: true
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to save your unlike in server."
            });
        })
});


// dislike a tweet
router.get('/dislike/:tweetId', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to dislike or undislike. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    if (!req.params['tweetId']) {
        return res.status(400).json({
            message: 'Failed to dislike or undislike. The tweet_id given is not valid.'
        });
    }

    Tweet.findOne({
        tweet_id: req.params['tweetId']
    })
        .exec()
        .then((tweet) => {
            if (!tweet) {
                return res.status(404).json({
                    message: 'Failed to dislike or undislike. The tweet does not exist.'
                });
            }

            // check if the user has disliked the tweet
            if (tweet.dislike.includes(userId)) {
                // doing nothing if the user has already disliked the tweet
            } else {
                // if the user has not disliked the tweet, then dislike it
                tweet.dislike.push(userId);
            }
            // check if the user has liked the tweet
            if (tweet.like.includes(userId)) {
                // remove the user from the like list if the user has liked the tweet
                tweet.like.pull(userId);
                //And add the user to the dislike list of this tweet
                tweet.dislike.push(userId);
            }

            return tweet.save();
        })
        .then((tweet) => {
            console.log('Dislike successful.', tweet.dislike);
            res.json({
                message: 'dislike successful.',
                action_status: true
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to find the designated tweet."
            });
        });
});


// undislike a tweet
router.get('/undislike/:tweetId', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to dislike or undislike. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    if (!req.params['tweetId']) {
        return res.status(400).json({
            message: 'Failed to dislike or undislike. The tweet_id given is not valid.'
        });
    }

    Tweet.findOne({
        tweet_id: req.params['tweetId']
    })

        .exec()
        .then((tweet) => {
            if (!tweet) {
                return res.status(404).json({
                    message: 'Failed to dislike or undislike. The tweet does not exist.'
                });
            }

            // check if the user has disliked the tweet
            if (tweet.dislike.includes(userId)) {
                // if the user has disliked the tweet, then undislike it
                tweet.dislike.pull(userId);
            }

            return tweet.save();
        })
        .then((tweet) => {
            console.log('Undislike successful.', tweet.dislike);
            res.json({
                message: 'undislike successful.',
                action_status: true
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to find the designated tweet."
            });
        });
});


// retrieve tweet information by tweetId
router.get('/getTweet/:tweetId', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Failed to retrieve tweet information. Maybe the user has not logged in or the log in is unauthorized.'
        });
    }

    if (!req.params['tweetId']) {
        return res.status(400).json({
            message: 'Failed to retrieve tweet information. The tweet_id given is not valid.'
        });
    }

    Tweet.findOne({
        tweet_id: req.params['tweetId']
    })

        .exec()
        .then((tweet) => {
            if (!tweet) {
                return res.status(404).json({
                    message: 'Failed to retrieve tweet information. The tweet does not exist.'
                });
            }

            User.findOne({ user_id: tweet.user })
            .exec()
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Failed to retrieve user number. The user does not exist.'
                    });
                }
                if (tweet.image!==undefined && tweet.image.length>0){
                    let image_data = tweet.image.map((i,index)=>{
                        return {contentType: i.contentType, data: i.data.toString('base64')}});
                    res.json({
                        message: 'retrieve tweet information successful.',
                        action_status: true,
                        tweet: tweet,
                        favorite: user.favorite,
                        image: image_data
                    });
                }
                else {
                    res.json({
                        message: 'retrieve tweet information successful.',
                        action_status: true,
                        tweet: tweet,
                        user: user
                    });
                }
            })
            
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to find the designated tweet."
            });
        });
});


// return how many tweets a user has posted
router.get('/tweetNum/:userId', (req, res) => {
    const userId = req.params.userId;

    User.findOne({ user_id: userId })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'Failed to retrieve tweet number. The user does not exist.'
                });
            }

            if (!user.tweet) {
                return res.status(404).json({
                    message: 'Failed to retrieve tweet number. The user has not posted any tweet.'
                });
            }

            res.json({
                message: 'retrieve tweet number successful.',
                action_status: true,
                tweetNum: user.tweet.length
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to find the designated user."
            });
        });
});



module.exports = router;





