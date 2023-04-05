const express = require('express');
const router = express.Router();
const User = require('./userSchema');


// remove a user
router.get('/delete/:userId', (req, res) => {
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
                user: updatedUser
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Failed to ban user"
            });
        });
});




// remove a user
router.get('/delete/:userId', (req, res) => {
    const userId = req.params['userId'];

    User.findOneAndDelete({ user_id: userId })
        .exec()
        .then((user) => {
            if (user) {
                console.log('user removed:', user);

                // clear cookies
                res.clearCookie('userId');
                res.clearCookie('userDbId');
                res.clearCookie('isAdmin');

                res.json({
                    message: 'User removed successfully.',
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


module.exports = router;