const express = require('express');
const router = express.Router();


const User = require('./userSchema');
const Comment = require('./commentSchema');
const Tweet = require('./tweetSchema');
const General = require('./generalSchema');


// create a comment
router.post('/create', (req, res) => {
    const user_id = req.cookies.userId;
    const tweet_id = req.body.tweet_id;
    const content = req.body.content;
    const time = req.body.time;

    Comment.findOne({})
        .sort({ comment_id: -1 })
        .then((comment) => {
            General.find()
                .then((general) => {
                    general[0].comment_cnt = general[0].comment_cnt + 1;
                    return general[0].save();
                })

                .then((general) => {
                    const newComment = new Comment({
                        comment_id: general.comment_cnt,
                        user_id: user_id,
                        tweet_id: tweet_id,
                        content: content,
                        time: time
                    });

                    return newComment.save();
                })

                .then((newComment) => {
                    console.log(newComment)
                    User.findOneAndUpdate(
                        { user_id: user_id },
                        { $push: { comment: newComment.comment_id } },
                        { upsert: true, new: true }
                    )
                        .then(() => {
                            res.json({
                                message: 'Comment created.',
                                action_status: true,
                            });
                        })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'Comment creation failed.',
                action_status: false,
            });
        });
});


// delete a comment
router.get('/delete/:commentId', (req, res) => {
    const user_id = req.cookies.userId;

    Comment.findOneAndDelete({ comment_id: req.params.commentId })
        .exec()
        .then((comment) => {
            if (comment) {
                console.log('comment removed:', comment);
                User.findOneAndUpdate(
                    { user_id: user_id },
                    { $pull: { comment: comment.comment_id } },
                    { upsert: true, new: true }
                )
                    .then(() => {
                        res.json({
                            message: 'Comment removed successfully.',
                            action_status: true,
                        });
                    })
            } else {
                console.log('comment not found');
                res.status(404).json({
                    message: 'Comment not found.',
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to remove comment.',
            });
        });
});


// get all comments of a tweet
router.get('/commentList/:tweetId', (req, res) => {
    const tweet_id = req.params.tweetId;

    Comment.find({ tweet_id: tweet_id })
        .sort({ comment_id: -1 })
        .exec()
        .then((comments) => {
            res.json(comments);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to get comments.',
            });
        });
});


module.exports = router;