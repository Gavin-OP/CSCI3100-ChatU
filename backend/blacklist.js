const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5000'
});

const Follow = require('./followSchema');
const User = require('./userSchema');
const Fan = require('./fanSchema');


router.get('/blacklist/:userId', (req, res) => {
    const requestedUserId = req.params['userId'];

    User.findOne({ user_id: requestedUserId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            Blacklist.findOne({ user_id: requestedUserId })
                .populate('blacklist_is', 'user_id username')
                .then((blacklist) => {
                    if (!blacklist) {
                        return res.status(404).json({
                            message: 'No blacklisted users found for this user.'
                        });
                    }

                    const blacklistedUsers = blacklist.blacklist_is.map((user) => ({
                        user_id: user.user_id,
                        username: user.username
                    }));

                    res.json(blacklistedUsers);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({
                        message: 'Fail to retrieve blacklisted users.'
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve user information. Maybe because user does not exist.'
            });
        });
});



module.exports = router;