const express = require('express');
const router = express.Router();
const User = require('./userSchema');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'Wrong email.' });
            }

            // Check password
            if (user.pwd !== password) {
                return res.status(400).json({ message: 'Wrong password.' });
            }

            // Set cookie to identify user
            res.cookie('userId', user.user_id, { httpOnly: true });
            res.cookie('userDbId', user._id, { httpOnly: true });
            res.json({ message: 'Login successful' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});


// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('userDbId');
    res.clearCookie('userId');
    res.json({ message: 'Logout successful' });
});


// Example protected route that requires authentication
router.get('/profile', (req, res) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            res.json({ user });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});



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
