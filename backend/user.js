const express = require('express');
const router = express.Router();
const User = require('./userSchema');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// retrieve user information by userId
router.get('/getUser/:userId', (req, res) => {
    User.findOne({ user_id: req.params['userId'] })
        .then((user) => {
            const user_info = {
                user_id: user.user_id,
                username: user.username,
                description: user.description,
                avatar: {
                    contentType: user.avatar.contentType,
                    data: user.avatar.data
                },
            };
            res.set('Content-Type', 'application/json');
            res.send(user_info);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Fail to retrieve user information. ');
        });
})

// test to upload avatar
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



router.post('/signUp', (req, res) => {
    User.findOne({})
        .sort('-user_id')
        .exec()
        .then((user) => {
            console.log(user ? 0 : 1)
            const newUser = new User(
                {
                    user_id: user ? user.user_id + 1 : 1,
                    email: req.body['email'],
                    pwd: req.body['pwd'],
                    username: req.body['username'],
                })
            return newUser.save();
        })
        .then((newUser) => {
            console.log('user created:', newUser);
            res.send('Create user successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Fail to create user. ");
        })
});


module.exports = router;
