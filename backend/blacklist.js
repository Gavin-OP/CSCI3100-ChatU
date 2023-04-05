const express = require('express');
const router = express.Router();
const Blacklist = require('./blacklistSchema');
const User = require('./userSchema');


// add a user to blacklist
router.get('/add/:userId', (req, res) => {
    const loggedInUserId = req.cookies.userId;
    const userIdToAdd = req.params.userId;

    // Check if the user is trying to add themselves to the blacklist
    if (loggedInUserId === userIdToAdd) {
        return res.status(400).json({
            message: 'Cannot add yourself to the blacklist'
        });
    }

    // Check if the user to add exists
    User.findOne({ user_id: userIdToAdd })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found. Cannot add a non-existing user to the blacklist.'
                });
            }

            // Check if the user is already in the blacklist
            Blacklist.findOne({ user_id: loggedInUserId })
                .then((blacklist) => {
                    if (blacklist && blacklist.blacklist.includes(userIdToAdd)) {
                        return res.status(400).json({
                            message: 'User already in blacklist'
                        });
                    }

                    // Add the user to the blacklist
                    Blacklist.findOneAndUpdate(
                        { user_id: loggedInUserId },
                        { $addToSet: { blacklist: userIdToAdd } },
                        { upsert: true, new: true }
                    )
                        .then((result) => {
                            console.log('User added to blacklist for user with ID:', loggedInUserId, result.blacklist)
                            res.status(200).json({
                                message: 'User added to blacklist successfully',
                                blacklist: result.blacklist,
                                action_status: true,
                            });
                        })
                        .catch((error) => {
                            console.error(`Error adding user with ID ${userIdToAdd} to the blacklist of user with ID ${loggedInUserId}:`, error);
                            res.status(500).json({
                                message: 'Failed to add user to blacklist'
                            });
                        });
                })
                .catch((error) => {
                    console.error(`Error checking if user with ID ${userIdToAdd} is in the blacklist of user with ID ${loggedInUserId}:`, error);
                    res.status(500).json({
                        message: 'Failed to check if user is in blacklist'
                    });
                });
        })
        .catch((error) => {
            console.error(`Error finding user with ID ${userIdToAdd}:`, error);
            res.status(500).json({
                message: 'Failed to find user to add to blacklist'
            });
        });
});


// remove a user from blacklist
router.get('/delete/:userId', (req, res) => {
    const requestedUserId = req.params['userId'];
    const loggedInUserId = req.cookies.userId;

    // Check if the logged-in user has blacklist
    Blacklist.findOne({ user_id: loggedInUserId })
        .then((blacklist) => {
            if (!blacklist) {
                return res.status(404).json({
                    message: 'You have no users in your blacklist.'
                });
            }

            // Check if the requested user is in the blacklist
            if (!blacklist.blacklist.includes(requestedUserId)) {
                return res.status(404).json({
                    message: 'User is not in your blacklist.'
                });
            }

            // Remove the user from the blacklist
            Blacklist.findOneAndUpdate(
                { user_id: loggedInUserId },
                { $pull: { blacklist: requestedUserId } },
                { new: true }
            )
                .then((result) => {
                    console.log(`User with ID ${requestedUserId} removed from the blacklist of user with ID ${loggedInUserId}`);
                    res.status(200).json({
                        message: `User with ID ${requestedUserId} removed from your blacklist.`,
                        blacklist: result.blacklist,
                        action_status: true,
                    });
                })
                .catch((error) => {
                    console.error(`Error removing user with ID ${requestedUserId} from the blacklist of user with ID ${loggedInUserId}:`, error);
                    res.status(500).json({
                        message: 'Failed to remove user from the blacklist.'
                    });
                });
        })
        .catch((error) => {
            console.error(`Error retrieving blacklist for user with ID ${loggedInUserId}:`, error);
            res.status(500).json({
                message: 'Failed to retrieve blacklist.'
            });
        });
});


// return all users in userId's blacklist
router.get('/list', (req, res) => {
    const loggedInUserId = req.cookies.userId;

    Blacklist.findOne({ user_id: loggedInUserId })
        .then(blacklist => {
            if (!blacklist) {
                return res.status(404).json({
                    message: 'No user found in the blacklist.'
                });
            }

            const blacklistUsers = blacklist.blacklist;
            const promises = blacklistUsers.map((userId) => {
                return User.findOne({ user_id: userId })
                    .then(user => {
                        if (!user) {
                            return null;
                        }

                        return {
                            user_id: user.user_id,
                            username: user.username,
                            avatar: user.avatar,
                        };
                    });
            });

            Promise.all(promises)
                .then(users => {
                    users = users.filter(user => user !== null);
                    res.status(200).json(users);
                })
                .catch(error => {
                    console.error(`Error retrieving users from the blacklist of user with ID ${requestedUserId}:`, error);
                    res.status(500).json({
                        message: 'Failed to retrieve users from the blacklist.'
                    });
                });
        })
        .catch(error => {
            console.error(`Error retrieving blacklist of user with ID ${requestedUserId}:`, error);
            res.status(500).json({
                message: 'Failed to retrieve blacklist.'
            });
        });
});


module.exports = router;