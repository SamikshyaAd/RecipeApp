const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const GeneralFeedbacks = require('../models/generalFeedbacks');

const generalFeedbackRouter = express.Router();
generalFeedbackRouter.use (bodyParser.json());

 generalFeedbackRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    GeneralFeedbacks.find(req.query)
    .populate('author')
    .then((feedbacks) => {        
        res.statusCode = 200;                                   
        res.setHeader ('Content-Type', 'application/json');
        res.json(feedbacks);
    }, (err) => next(err))
    .catch(err => next(err));
})
 .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.author = req.user._id;
        GeneralFeedbacks.create(req.body)
        .then((feedback) => {
            GeneralFeedbacks.findById(feedback._id)
            .populate('author')
            .then((feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('GeneralFeedback not found in request body');
        err.status = 404;
        return next(err);
    }

})       
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /GeneralFeedbacks/');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    GeneralFeedbacks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = generalFeedbackRouter;