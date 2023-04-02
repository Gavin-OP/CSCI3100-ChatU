const express = require('express');
const router = express.Router();
const User = require('./userSchema');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/retrieve/:userId', (req, res) => {
    User.findOne({ user_id: req.params['userId'] })
        .then((user) => {
            if (!user || !user.avatar) {
                res.status(404).send('User or avatar not found.');
            } else {
                res.set('Content-Type', user.avatar.contentType);
                res.send(user.avatar.data);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving avatar.');
        });
})


router.post('/create', upload.single("file"), (req, res) => {
    // req.file can be used to access all file properties
    User.findOne({})
        .sort('-user_id')
        .exec()
        .then((user) => {
            //check if the request has an image or not
            if (!req.file) {
                res.json({
                    success: false,
                    message: "You must provide at least 1 file"
                });
            } else {
                const newUser = new User(
                    {
                        user_id: 1,
                        avatar: {
                            data: req.file.buffer,
                            contentType: req.file.mimetype
                        },
                    });
                // saving the object into the database
            }
            return newUser.save();
        })
        .then((newUser) => {
            console.log('user created:', newUser);
            res.send('Create user successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Server Error");
        })
});


module.exports = router;
