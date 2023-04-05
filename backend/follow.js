const express = require('express');
const router = express.Router();
const Follow = require('./followSchema');
const User = require('./userSchema');
const Fan = require('./fanSchema');


// follow a user for the currently logged-in user
router.get('/create/:followId', (req, res) => {
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
router.get('/followList', (req, res) => {
    const loggedInUserId = req.cookies.userId;

    Follow.findOne({ user_id: loggedInUserId })
        .then((follow) => {
            if (!follow) {
                return res.status(404).json({
                    message: 'Follow not found.'
                });
            }

            const followIds = follow.follow_id;
            const promises = followIds.map((userId) => {
                return axios.get(`/user/getUser/${userId}`)
                    .then((response) => {
                        const user_info = response.data;
                        user_info.follow_status = loggedInUserId === userId ? 2 : 1;
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
                            message: 'No users found in follow list.'
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
});



module.exports = router;