const express = require('express');
const router = express.Router();


const User = require('./userSchema');
const Comment = require('./commentSchema');
const Tweet = require('./tweetSchema');


// create a comment
router.post('/create', (req, res) => {
    const tweet_id = req.body.tweet_id;
    const user_id = req.cookies.userId;
    const content = req.body.content;

    Comment.findOne({ tweet_id: tweet_id })
        .sort({ comment_id: -1 })
        .then((comment) => {
            const newComment = new Comment({
                comment_id: comment ? comment.comment_id + 1 : 1,
                user_id: user_id,
                tweet_id: tweet_id,
                content: content,
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
        .catch(err => {
            console.log(err)
            res.status(400).json({
                message: 'Comment creation failed.',
                action_status: false,
            });
        });
});


// delete a comment
// router.delete('/delete', (req, res) => {
//     const comment_id = req.body.comment_id;
//     const user_id = req.cookies.userId;





module.exports = router;