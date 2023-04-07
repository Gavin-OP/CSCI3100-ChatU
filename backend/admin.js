const express = require('express');
const router = express.Router();
const User = require('./userSchema');
const Tweet = require('./tweetSchema');


// remove a user
router.get('/deleteUser/:userId', (req, res) => {
    const userId = req.params['userId'];
    User.findOneAndDelete({ user_id: userId })
        .exec()
        .then((user) => {
            if (user) {
                console.log('user removed:', user);
                res.json({
                    message: 'User removed successfully.',
                    action_status: true,
                });
            } else {
                console.log('user not found');
                res.status(404).json({
                    message: 'User not found.',
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to remove user.',
            });
        });
});


// ban a user
router.get('/ban/:userId', (req, res) => {
    const userId = req.params.userId;
    User.findOne({ user_id: userId }).exec()
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.ban = true;
            return user.save();
        })
        .then((updatedUser) => {
            res.json({
                message: "User banned",
                ban: updatedUser.ban,
                action_status: true,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Failed to ban user"
            });
        });
});


// unban a user
router.get('/unban/:userId', (req, res) => {
    const userId = req.params.userId;

    User.findOne({ user_id: userId }).exec()
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.ban = false;
            return user.save();
        })
        .then((updatedUser) => {
            res.json({
                message: "User unbanned",
                ban: updatedUser.ban,
                action_status: true,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Failed to unban user"
            });
        });
});


// get all users
router.get('/userList', (req, res) => {
    User.find()
        .exec()
        .then((users) => {
            user_info_list = users.map((user) => {
                return {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                    ban: user.ban,
                }
            })
            console.log(user_info_list)
            res.json(user_info_list);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve users.',
            });
        });
});


// delete a tweet
router.get('/deleteTweet/:tweetId/:userId', (req, res) => {
    const tweetId = req.params['tweetId'];
    const userId = req.params['userId'];

    Tweet.findOneAndDelete({ tweet_id: tweetId })
        .exec()
        .then((tweet) => {
            if (tweet) {
                console.log('tweet removed:', tweet);

                User.findOneAndUpdate(
                    { user_id: userId },
                    {
                        $pull: { tweet: tweetId }
                    })
                    .exec()
                    .then((user) => {
                        if (user) {
                            console.log('tweet removed from user:', user);
                            res.json({
                                message: 'Tweet removed successfully.',
                                action_status: true,
                            });
                        } else {
                            console.log('user not found');
                            res.status(404).json({
                                message: 'User not found.',
                            });
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({
                            message: 'Fail to remove tweet from user.',
                        });
                    });
            } else {
                console.log('tweet not found');
                res.status(404).json({
                    message: 'Tweet not found.',
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to remove tweet.',
            });
        });
});


module.exports = router;