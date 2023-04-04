const express = require('express');
const router = express.Router();
const Feedback = require('./feedbackSchema');


// get feedback by feedbackId
router.get('/retrieve/:feedbackId', (req, res) => {
    Feedback.findOne({ feedback_id: req.params['feedbackId'] })
        .then((feedback) => {
            if (feedback == null) res.status(404).json({
                message: 'feedback not found.',
            })
            else {
                feedback_data = {
                    'feedback_id': feedback.feedback_id,
                    'content': feedback.content,
                }
                res.json(feedback_data)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving feedback.'
            })
        });
});


// create feedback
router.post('/create', (req, res) => {
    Feedback.findOne({})
        .sort('-feedback_id')
        .exec()
        .then((feedback) => {
            const newFeedback = new Feedback(
                {
                    // new id is the highest existed id + 1
                    feedback_id: feedback ? feedback.feedback_id + 1 : 1,
                    content: req.body['content'],
                })
            return newFeedback.save()
        })
        .then((newFeedback) => {
            console.log('feedback created:', newFeedback);
            res.json({
                message: 'Create feedback successfully.',
                feedback_creation_status: 1,
            });
        })
        .catch((err) => {
            console.error(err)
            res.status(500).json({
                message: 'Fail to create feedback.',
                feedback_creation_status: 0,
            });
        });
});


module.exports = router;
