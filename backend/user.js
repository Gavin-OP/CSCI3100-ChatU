const express = require('express');
const router = express.Router();
const User = require('./userSchema');
const Follow = require('./followSchema');
const Avatar = require('./avatarSchema');
const General = require('./generalSchema');

const multer = require('multer');
const bodyParser = require('body-parser');      // is this really necessary???
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// sign up a new user
router.post('/signUp', (req, res) => {
    User.findOne({})
        .exec()
        .then((user) => {
            General.find()
                .then((general) => {
                    general[0].user_cnt += 1;
                    return general[0].save();
                })

                .then((general) => {
                    console.log('general data:', general)
                    const newUser = new User(
                        {
                            user_id: general.user_cnt,
                            email: req.body['email'],
                            pwd: req.body['pwd'],
                            username: req.body['username'],
                            is_admin: false,
                        })
                    return newUser.save();
                })

                .then((newUser) => {
                    console.log('user created:', newUser)

                    // Set cookie to identify user
                    res.cookie('userId', newUser.user_id, { httpOnly: false });
                    res.cookie('userDbId', newUser._id, { httpOnly: true });
                    res.cookie('isAdmin', newUser.is_admin, { httpOnly: false });

                    const newAvatar = new Avatar(
                        {
                            user_id: newUser.user_id,
                        })
                    return newAvatar.save();
                })

                .then((newUser) => {
                    console.log('avatar created:', newUser);

                    res.json({
                        message: 'Sign up successful. User will automatically login.',
                        login_status: 2     // 0: wrong email, 1: wrong password, 2: login successful
                    });

                })


        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Fail to create user. Maybe because email has been used."
            });
        })
});


// Login
router.post('/login', (req, res) => {
    const { email, pwd } = req.body;

    // Check if user exists
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: 'Wrong email.',
                    login_status: 0     // 0: wrong email, 1: wrong password, 2: login successful
                });
            }

            // Check password
            if (user.pwd !== pwd) {
                return res.status(400).json({
                    message: 'Wrong password.',
                    login_status: 1     // 0: wrong email, 1: wrong password, 2: login successful
                });
            }

            // Check if user is banned
            if (user.ban === true) {
                return res.status(400).json({
                    message: 'User banned.',
                    login_status: 3     // 0: wrong email, 1: wrong password, 2: login successful, 3: user banned
                });
            }

            // Set cookie to identify user
            res.cookie('userId', user.user_id, { httpOnly: false });
            res.cookie('userDbId', user._id, { httpOnly: true });
            res.cookie('isAdmin', user.is_admin, { httpOnly: false });
            res.json({
                message: 'Login successful',
                login_status: 2     // 0: wrong email, 1: wrong password, 2: login successful
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Server error'
            });
        });
});


// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('userDbId');
    res.clearCookie('userId');
    res.clearCookie('isAdmin');
    res.json({
        message: 'Logout successful'
    });
});


// protected route that requires authentication
router.get('/authorizationCheck', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized',
            authorized: false
        });
    }

    User.findOne({ user_id: userId })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorized',
                    authorized: false
                });
            }

            res.json({
                message: 'Authorized',
                authorized: true
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Server error',
                authorized: false
            });
        });
});


// retrieve user information by userId
router.get('/getUser/:userId', (req, res) => {
    const requestedUserId = req.params['userId'];
    const loggedInUserId = req.cookies.userId;

    User.findOne({ user_id: requestedUserId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            if (loggedInUserId != user.user_id) {
                Follow.findOne({
                    user_id: loggedInUserId,
                    follow_id: requestedUserId
                })
                    .then((follow) => {
                        if (follow) {
                            followStatus = 1;   // 0: not following, 1: following, 2: self
                        }
                        else {
                            followStatus = 0;
                        }

                        Avatar.findOne({ user_id: user.user_id })
                            .then((avatar) => {
                                if (!avatar) {
                                    const user_info = {
                                        favorite: user.favorite,
                                        user_id: user.user_id,
                                        username: user.username,
                                        description: user.description,
                                        email: user.email,
                                        ban: user.ban,
                                        follow_status: followStatus,
                                        avatar_url: '../avatar.png',
                                        avatar: {
                                            contentType: user.avatar.contentType,
                                            data: user.avatar.data
                                        },
                                    };

                                    res.set('Content-Type', 'application/json');
                                    res.json(user_info);
                                }
                                else {
                                    const user_info = {
                                        favorite: user.favorite,
                                        user_id: user.user_id,
                                        username: user.username,
                                        description: user.description,
                                        email: user.email,
                                        ban: user.ban,
                                        follow_status: followStatus,
                                        avatar_url: avatar.avatar_url,
                                        avatar: {
                                            contentType: avatar.contentType,
                                            data: avatar.data
                                        },
                                    };

                                    res.set('Content-Type', 'application/json');
                                    res.json(user_info);
                                }
                            })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({
                            message: 'Fail to retrieve user information. Maybe because user does not exist.'
                        });
                    });
            } else {
                // const user_info = {
                //     favorite: user.favorite,
                //     user_id: user.user_id,
                //     username: user.username,
                //     description: user.description,
                //     email: user.email,
                //     ban: user.ban,
                //     follow_status: 2,
                //     avatar: {
                //         contentType: user.avatar.contentType,
                //         data: user.avatar.data
                //     },
                // };
                Avatar.findOne({ user_id: user.user_id })
                    .then((avatar) => {
                        if (!avatar) {
                            const user_info = {
                                favorite: user.favorite,
                                user_id: user.user_id,
                                username: user.username,
                                description: user.description,
                                email: user.email,
                                ban: user.ban,
                                follow_status: 2,
                                avatar_url: '../avatar.png',
                                avatar: {
                                    contentType: user.avatar.contentType,
                                    data: user.avatar.data
                                },
                            };

                            res.set('Content-Type', 'application/json');
                            res.json(user_info);
                        }
                        else {
                            const user_info = {
                                favorite: user.favorite,
                                user_id: user.user_id,
                                username: user.username,
                                description: user.description,
                                email: user.email,
                                ban: user.ban,
                                follow_status: 2,
                                avatar_url: avatar.avatar_url,
                                avatar: {
                                    contentType: avatar.contentType,
                                    data: avatar.data
                                },
                            };

                            res.set('Content-Type', 'application/json');
                            res.json(user_info);
                        }
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Fail to retrieve user information. Maybe because user does not exist.'
            });
        });
});




// test to upload avatar it will change to setting if needed
router.post('/create', upload.single("file"), (req, res) => {
    // req.file can be used to access all file properties
    User.findOne({})
        .sort('-user_id')
        .exec()
        .then((user) => {
            // const { email, pwd, username, description } = req.body;
            //check if the request has an image or not
            console.log(req.file)
            if (!req.file) {
                const newUser = new User(
                    {
                        user_id: user ? user.user_id + 1 : 1,
                        email: req.body['email'],
                        pwd: req.body['pwd'],
                        username: req.body['username'],
                        description: 'perfectly balanced',
                        avatar: {
                            data: req.file.buffer,
                            contentType: req.file.mimetype
                        },
                    });
                // saving the object into the database
                return newUser.save();
                res.json({
                    success: false,
                    message: "You must provide at least 1 file"
                });
            } else {
                const newUser = new User(
                    {
                        user_id: user ? user.user_id + 1 : 1,
                        email: req.body['email'],
                        pwd: req.body['pwd'],
                        username: req.body['username'],
                        description: 'perfectly balanced',
                        ban: 0,
                        favorite_visibility: 0,
                        global_visibility: 2,
                        is_admin: true,
                        avatar: {
                            data: req.file.buffer,
                            contentType: req.file.mimetype
                        },
                    });
                // saving the object into the database
                return newUser.save();
            }
        })
        .then((newUser) => {
            console.log('user created');
            res.send('Create user successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error");
        })
});

router.post('/update', (req, res) => {
    // req.file can be used to access all file properties
    const loggedInUserId = req.cookies.userId;

    User.findOneAndUpdate(
        { user_id: loggedInUserId },
        {
            username: req.body['username'],
            description: req.body['description']
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }
            Avatar.findOneAndUpdate(
                { user_id: loggedInUserId },
                { avatar_url: req.body['avatar_url'] },
                { upsert: true, new: true }
            )
                .then(result => {
                    console.log(req.body)
                    console.log(`Update user information with ID ${loggedInUserId}`);
                    res.send('Update user successfully');
                })
                .catch(error => {
                    console.error(`Error updating avatar for user with ID ${loggedInUserId}`, error);
                    res.status(500).json({
                        message: "Failed to update the avatar"
                    });
                });
        })
        .catch(error => {
            console.error(`Error updating user information with user ID ${loggedInUserId}`, error);
            res.status(500).json({
                message: "Failed to update user information"
            });
        });

})

module.exports = router;
