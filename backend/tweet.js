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
        return res.status(401).json({ message: 'Failed to create tweet. Maybe the user has not logged in or the log in is unauthorized.' });
    }

    Tweet.find({})
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
                tweet_id: 1,//there should be a tweet_id generator
                content: req.body['content'],
                image: images,
                user: userId,
                privacy_state: req.body['privacy_state'], // 0 if everyone can see the tweet; 1 if only self can see the tweet
                tag: req.body['tag'],
            });

            // saving the object into the database
            return newTweet.save().catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save the new tweet."
                });
            });
        })
        .then((newTweet) => {
            console.log('tweet created');
            res.send('Create tweet successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error");
        });
});


//Delete a tweet record from db
router.get('/delete/:tweetId', (req, res) => {
    Tweet.findOneAndDelete({ tweet_id: req.params.tweetId })
        .then((tweet) => {
            console.log('tweet deleted:', tweet);
            res.json({
                message: 'Tweet successfully deleted'
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to delete tweet. Maybe because tweet does not exist."
            });
        })
});







//Add or remove the user's id from the list of those who like the tweet when the user clicks its like button
//Input: id of the tweet (call it 'tweet_id'), 
// a boolean var called 'liked' : 0 if the like button is grey (not liked); 1 if it is light (already liked)
router.post('/like', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Failed to like or unlike. Maybe the user has not logged in or the log in is unauthorized.' });
    }

    if (!req.body['tweet_id']) {
        return res.status(400).json({ message: 'Failed to like or unlike. The tweet_id given is not valid.' });
    }

    if (req.body['liked']) {
        Tweet.updateOne({ tweet_id: req.body['tweet_id'] }, { $pull: { like: userId } })
            .then(() => {
                res.json({
                    message: 'Unlike successful.',
                    liked_status: 0     // 0: not liked, 1: liked
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your unlike in server."
                });
            })

    } else {
        const doc = Tweet.findOne({ tweet_id: req.body['tweet_id'] })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to find the designated tweet."
                });
            })

        doc.like.push(userId);
        doc.save()
            .then(() => {
                res.json({
                    message: 'like successful.',
                    liked_status: 1     // 0: not liked, 1: liked
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your like in server."
                });
            })

    }
});

//Add or remove the user's id from the list of those who dislike the tweet when the user clicks its dislike button
//Input: id of the tweet (call it 'tweet_id'), 
// a boolean var called 'disliked' : 0 if the dislike button is grey (not disliked); 1 if it is light (already disliked)
router.post('/dislike', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Failed to dislike or un-dislike. Maybe the user has not logged in or the log in is unauthorized.' });
    }

    if (!req.body['tweet_id']) {
        return res.status(400).json({ message: 'Failed to dislike or un-dislike. The tweet_id given is not valid.' });
    }

    if (req.body['disliked']) {
        Tweet.updateOne({ tweet_id: req.body['tweet_id'] }, { $pull: { dislike: userId } })
            .then(() => {
                res.json({
                    message: 'Un-disliked successful.',
                    disliked_status: 0     // 0: not disliked, 1: disliked
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your un-dislike in server."
                });
            })

    } else {
        const doc = Tweet.findOne({ tweet_id: req.body['tweet_id'] })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to find the designated tweet."
                });
            })

        doc.dislike.push(userId);
        doc.save()
            .then(() => {
                res.json({
                    message: 'disliked successful.',
                    disliked_status: 1     // 0: not disliked, 1: disliked
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your dislike in server."
                });
            })

    }
});

//Add or remove the tweet_id from the list of tweets this user favorites when the user click its favorite button
//Input: tweet_id of the tweet being favourited/un-favorited (var name: tweet_id),
//a boolean var called 'fav': 1 if the favorite button of this tweet is light (already favourited);
// 0 if the favorite button of this tweet is grey (not favorited)
router.post('/fav', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Failed to favourite or un-favourite. Maybe the user has not logged in or the log in is unauthorized.' });
    }

    if (!req.body['tweet_id']) {
        return res.status(400).json({ message: 'Failed to favourite or un-favourite. The tweet_id given is not valid.' });
    }

    if (req.body['fav']) {
        User.updateOne({ user_id: userId }, { $pull: { favorite: req.body['tweet_id'] } })
            .then(() => {
                res.json({
                    message: 'Un-favorited successful.',
                    favorited_status: 0     // 0: not favorited, 1: favorited
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your un-favorite in server."
                });
            })

    } else {
        const doc = User.findOne({ user_id: userId })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to find this user in the db."
                });
            })

        doc.favorite.push(req.body['tweet_id']);
        doc.save()
            .then(() => {
                res.json({
                    message: 'favorited successful.',
                    favorited_status: 1     // 0: not favorited, 1: favorited
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save your favorite in server."
                });
            })

    }
});

//Retrive tweet_ids of all tweets that a designated user posted
//Input: user id (var name: userId)
router.get('/getTweet/:userId', (req, res) => {
    User.findOne({ user_id: req.params['userId'] })
        .then((result) => {
            const tweets = result.tweet;
            res.set('Content-Type', 'application/json');
            res.json(tweets);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve tweet ids posted by this user. Maybe because user does not exist.'
            });
        });
});

//Retrive tweet_ids of all tweets that a designated user favorites
//Input: user id (var name: userId)
router.get('/getFav/:userId', (req, res) => {
    User.findOne({ user_id: req.params['userId'] })
        .then((result) => {
            const favs = result.favorite;
            res.set('Content-Type', 'application/json');
            res.json(favs);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve tweet ids favorited by this user. Maybe because user does not exist.'
            });
        });
});

//Get all info of a tweet/retweet by providing its id
//The attribute original is not null only if this is a retweet
//Input: id of tweet/retweet (var name: tweet_id)
router.post('/getTweetInfo', (req, res) => {
    Tweet.findOne({ tweet_id: req.body['tweet_id'] })
        .then((t) => {
            const tweet_info = {
                tweet_id: t.tweet_id,
                content: t.content,
                image: [{
                    data: t.image.data,
                    contentType: t.image.contentType
                }],
                time: t.time,
                user: t.user,
                like: t.like,
                dislike: t.dislike,
                privacy_state: t.privacy_state,
                original: t.original,
                tag: t.tag
            };
            res.set('Content-Type', 'application/json');
            res.json(tweet_info);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve tweet information. Maybe because tweet does not exist.'
            });
        });
});

//Delete a tweet record from db
//Input: the id of the tweet/retweet to be deleted (var name: tweet_id)
router.post('/deleteTweet', (req, res) => {
    Tweet.findOneAndDelete({ tweet_id: req.body['tweet_id'] })
        .then((t) => {
            console.log('tweet deleted:', t);
            res.json({
                message: 'Tweet successfully deleted'
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to delete tweet. Maybe because tweet does not exist."
            });
        })
});



//Create a new retweet in the db
//Input: tweet id of the tweet to retweet for (call this var 'original'), content, time, privacy_state, tag
router.post('/createRetweet', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Failed to create retweet. Maybe the user has not logged in or the log in is unauthorized.' });
    }

    Tweet.find({})
        .sort('-tweet_id')
        .exec()
        .then((tweet) => {
            const newTweet = new Tweet(
                {
                    tweet_id: tweet ? tweet.tweet_id + 1 : 1,
                    content: req.body['content'],
                    image: [],
                    time: req.body['time'],
                    user: userId,
                    comment: [],
                    like: [],
                    dislike: [],
                    privacy_state: req.body['privacy_state'], // 0 if everyone can see the tweet; 1 if only self can see the tweet
                    original: req.body['original'],
                    tag: req.body['tag'],
                });
            // saving the object into the database
            return newTweet.save().catch((err) => {
                console.error(err);
                res.status(500).json({
                    message: "Fail to save the new retweet."
                });
            })
        })
        .then((newTweet) => {
            console.log('retweet created');
            res.send('Create retweet successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error");
        })

});

module.exports = router;





