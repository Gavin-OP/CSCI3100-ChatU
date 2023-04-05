const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5000'
});

const Fan = require('./fanSchema');
const User = require('./userSchema');
const Follow = require('./followSchema');


// delete a fan for the currently logged-in user
router.get('/delete/:fanId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const fanId = req.params['fanId'];

    // Check if the fanId is the same as the loggedInUserId
    if (loggedInUserId == fanId) {
        return res.status(400).json({
            message: "Can't unfan yourself"
        });
    }

    // check whether fanId is an existing user
    User.findOne({ user_id: fanId })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: 'FanId not found. Can not delete an non-existing fan.'
                });
            }

            // remove fan from the logged-in user's fan list
            Fan.findOneAndUpdate(
                { user_id: loggedInUserId },
                { $pull: { fan_id: fanId } },
                { upsert: true, new: true }
            )
                .then(fanResult => {
                    console.log(`Delete the fan with ID ${fanId}`);

                    // remove the logged-in user from the fan's following list
                    Follow.findOneAndUpdate(
                        { user_id: fanId },
                        { $pull: { follow_id: loggedInUserId } },
                        { upsert: true, new: true }
                    )
                        .then(unFollowResult => {
                            console.log(`Unfollow user ${loggedInUserId} from the following list of user with ID ${fanId}`);
                            res.status(200).json({
                                message: "Unfan user successfully. Fan's following list updated.",
                                fanList: fanResult.fan_id,
                                followList: unFollowResult.follow_id,
                            });
                        })
                        .catch(error => {
                            console.error(`Error unfollow with ID ${loggedInUserId} from fan with ID ${fanId}:`, error);
                            res.status(500).json({
                                message: "Failed to remove the loggin user from the fan's following list"
                            });
                        });
                })

                .catch(error => {
                    console.error(`Error delete fan with ID ${fanId}:`, error);
                    res.status(500).json({
                        message: "Failed to delete fan"
                    });
                });
        })

        .catch(error => {
            console.error(`Error verifying user with ID ${fanId}:`, error);
            res.status(500).json({
                message: "Failed to verify user"
            });
        })
});


// retrieve user information for all users in the fan_id array
router.get('/fanList/:userId', (req, res) => {
    const requestedUserId = req.params['userId'];

    User.findOne({ user_id: requestedUserId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            Fan.findOne({ user_id: requestedUserId })
                .then((fan) => {
                    if (!fan) {
                        return res.status(404).json({
                            message: 'He/She has no fan.'
                        });
                    }

                    const fanIds = fan.fan_id;
                    const promises = fanIds.map((userId) => {
                        return axios.get(`/user/getUser/${userId}`, { headers: { 'Cookie': req.headers.cookie } })
                            .then((response) => {
                                const user_info = {
                                    user_id: response.data.user_id,
                                    username: response.data.username,
                                    follow_status: response.data.follow_status,
                                    avatar: response.data.avatar,
                                };
                                console.log(user_info);
                                return user_info;
                            })
                            .catch((err) => {
                                console.error(err);
                                return null;
                            });
                    });

                    Promise.all(promises)
                        .then((user_info_list) => {
                            user_info_list = user_info_list.filter((user_info) => user_info !== null);

                            if (user_info_list.length === 0) {
                                return res.status(404).json({
                                    message: 'No users found in his/her fan list.'
                                });
                            }

                            res.set('Content-Type', 'application/json');
                            res.json(user_info_list);
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({
                                message: 'Fail to retrieve users information.'
                            });
                        });
                })

                .catch((err) => {
                    console.error(err);
                    res.status(500).json({
                        message: 'Fail to retrieve fan information.'
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

// return how many fans the user has
router.get('/fansNum/:userId', (req, res) => {
    const userId = req.params.userId;

    Fan.findOne({ user_id: userId })
        .then((fan) => {
            if (!fan) {
                return res.json({ fans: 0 });
            }
            res.json({ fans: fan.fan_id.length });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to get fans for user' });
        });
});




module.exports = router;