const express = require('express');
const bodyParser = require('body-parser');
const Founders = require('../models/founders');
const authenticate = require('../authenticate');
const cors = require('./cors');

const founderRouter = express.Router();
founderRouter.use (bodyParser.json());


founderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
   Founders.find(req.query)
   .then((founders) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(founders);
   }, (err) => next(err))
   .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Founders.create(req.body)
        .then((founder) => {
            console.log('Founder created');
            res.statusCode = 200;
            res.setHeader ('Content-Type', 'application/json');
            res.json(founder);
        }, (err) => next(err))
        .catch(err => next(err));})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
   res.end('PUT operation not supported on /founders');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Founders.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch(err => next(err));;
});

founderRouter.route('/:founderId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Founders.findById(req.params.founderId)
        .then((founder) => {
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'application/json');
        res.json(founder);
        }, (err) => next(err))
        .catch(err => next(err));})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   res.end('POST operation not supported on /founder/'+ req.params.founderId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Founders.findByIdAndUpdate(req.params.founderId, {$set:req.body}, {new:true})
    .then((founder) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(founder);
    }, (err) => next(err))
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Founders.findByIdAndRemove(req.params.founderId)
        .then((resp) => {
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
        .catch(err => next(err));
});

module.exports = founderRouter;