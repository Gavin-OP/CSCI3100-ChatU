const express = require('express');
const router = express.Router();
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

module.exports = router;