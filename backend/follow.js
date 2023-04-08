const express = require('express');
const router = express.Router();
const axios = require('axios').create({
    baseURL: 'http://localhost:5555'
});

const Follow = require('./followSchema');
const User = require('./userSchema');
const Fan = require('./fanSchema');


// follow a user for the currently logged-in user
router.get('/add/:followId', (req, res) => {
    console.log(req.cookies)    // test to see if cookies are sent
    const loggedInUserId = req.cookies.userId;
    const followId = req.params['followId'];

    // Check if the followId is the same as the loggedInUserId
    if (loggedInUserId === followId) {
        return res.status(400).json({
            message: 'Cannot follow yourself'
        });
    }

    // check whether followId is an existing user
    User.findOne({ user_id: followId })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: 'FollowId not found. Can not follow an non-existing user.'
                });
            }

            // Add the followed user to the logged-in user's following list
            Follow.findOneAndUpdate(
                { user_id: loggedInUserId },
                { $addToSet: { follow_id: followId } },
                { upsert: true, new: true }
            )
                .then(followResult => {
                    console.log(`Followed user with ID ${followId}`);

                    // Add the logged-in user to the followed user's fan list
                    Fan.findOneAndUpdate(
                        { user_id: followId },
                        { $addToSet: { fan_id: loggedInUserId } },
                        { upsert: true, new: true }
                    )
                        .then(fanResult => {
                            console.log(`Added fan with ID ${loggedInUserId} to the fan list of user with ID ${followId}`);
                            res.status(200).json({
                                message: "Follow user successfully. Followed user's fan list updated.",
                                followList: followResult.follow_id,
                                fanList: fanResult.fan_id,
                            });
                        })
                        .catch(error => {
                            console.error(`Error adding fan with ID ${loggedInUserId} to user with ID ${followId}:`, error);
                            res.status(500).json({
                                message: "Failed to add the loggin user to the followed user's fan list"
                            });
                        });
                })

                .catch(error => {
                    console.error(`Error following user with ID ${followId}:`, error);
                    res.status(500).json({
                        message: "Failed to follow user"
                    });
                });
        })

        .catch(error => {
            console.error(`Error verifying user with ID ${followId}:`, error);
            res.status(500).json({
                message: "Failed to verify user"
            });
        })
});

router.get('/get/:foollowId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const followId = req.params['followId'];

    // Check if the followId is the same as the loggedInUserId
    if (loggedInUserId == followId) {
        return res.json({
            status: "following"
        });
    }

    // check whether followId is an existing user
    Follow.findOne({ user_id: loggedInUserId, follow_id: followId})
        .then(follow => {
            console.log(follow)
            if (!follow) {
                return res.json({
                    status: 'Follow'
                });
            }
            else return res.json({status:'Following'})
        })
})
// unfollow a user for the currently logged-in user
router.get('/delete/:followId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const followId = req.params['followId'];

    // Check if the followId is the same as the loggedInUserId
    if (loggedInUserId == followId) {
        return res.status(400).json({
            message: "Can't unfollow yourself"
        });
    }

    // check whether followId is an existing user
    User.findOne({ user_id: followId })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(404).json({
                    message: 'FollowId not found. Can not unfollow an non-existing user.'
                });
            }

            // remove the unfollowed user from the logged-in user's following list
            Follow.findOneAndUpdate(
                { user_id: loggedInUserId },
                { $pull: { follow_id: followId } },
                { upsert: true, new: true }
            )
                .then(unFollowResult => {
                    console.log(`Unfollowed user with ID ${followId}`);

                    // remove the logged-in user from the followed user's fan list
                    Fan.findOneAndUpdate(
                        { user_id: followId },
                        { $pull: { fan_id: loggedInUserId } },
                        { upsert: true, new: true }
                    )
                        .then(fanResult => {
                            console.log(`Removed fan with ID ${loggedInUserId} from the fan list of user with ID ${followId}`);
                            res.status(200).json({
                                message: "Unfollow user successfully. Followed user's fan list updated.",
                                followList: unFollowResult.follow_id,
                                fanList: fanResult.fan_id,
                            });
                        })
                        .catch(error => {
                            console.error(`Error removing fan with ID ${loggedInUserId} from user with ID ${followId}:`, error);
                            res.status(500).json({
                                message: "Failed to remove the loggin user from the followed user's fan list"
                            });
                        });
                })

                .catch(error => {
                    console.error(`Error unfollowing user with ID ${followId}:`, error);
                    res.status(500).json({
                        message: "Failed to unfollow user"
                    });
                });
        })

        .catch(error => {
            console.error(`Error verifying user with ID ${followId}:`, error);
            res.status(500).json({
                message: "Failed to verify user"
            });
        })
});


// retrieve user information for all users in the follow_id array
router.get('/followList/:userId', (req, res) => {
    const requestedUserId = req.params['userId'];

    User.findOne({ user_id: requestedUserId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            Follow.findOne({ user_id: requestedUserId })
                .then((follow) => {
                    if (!follow) {
                        return res.status(404).json({
                            message: 'He/She followes no one.'
                        });
                    }

                    const followIds = follow.follow_id;
                    const promises = followIds.map((userId) => {
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
                                    message: 'No users found in his/her follow list.'
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
                        message: 'Fail to retrieve follow information.'
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


// return the number of users the user with userId is following
router.get('/followNum/:userId', (req, res) => {
    const userId = req.params.userId;

    Follow.findOne({ user_id: userId })
        .exec()
        .then((result) => {
            if (result) {
                res.status(200).json({
                    message: `User with ID ${userId} is following ${result.follow_id.length} users.`,
                    following_count: result.follow_id.length,
                });
            } else {
                res.status(404).json({
                    message: `User with ID ${userId} not found.`,
                });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        });
});


module.exports = router;