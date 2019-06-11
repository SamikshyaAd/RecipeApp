const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Recipes = require('../models/recipes');

const recipeRouter = express.Router();
recipeRouter.use (bodyParser.json());

recipeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
   Recipes.find(req.query)
   .populate('author')
   .then((recipes) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(recipes);
   }, (err) => next(err))
   .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.author = req.user._id;
        Recipes.create(req.body)
        .then((recipe) => {
            console.log('Recipe created');
            Recipes.findById(recipe._id)
            .populate('author')
            .then((recipe) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(recipe);
            })
        }, (err) => next(err))
        .catch(err => next(err));
    }
    else {
        err = new Error('Recipe not found in request body');
        err.status = 404;
        return next(err);
    }
})
.put(cors.corsWithOptions, authenticate.verifyUser,
(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Recipes.remove({})
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch(err => next(err));
});

recipeRouter.route('/:recipeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Recipes.findById(req.params.recipeId)
    .populate('author')
    .then((recipe) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(recipe);
    }, (err) => next(err))
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   res.end('POST operation not supported on /recipes/'+ req.params.recipeId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Recipes.findById(req.params.recipeId)
    .then((recipe) => {
        if (recipe != null) {
            if (!recipe.author.equals(req.user._id)) {
                var err = new Error('You are not authorized to update this recipe!');
                err.status = 403;
                return next(err);
            }
            req.body.author = req.user._id;
            Recipes.findByIdAndUpdate(req.params.recipeId, {
                $set: req.body
            }, { new: true })
            .then((recipe) => {
                Recipes.findById(recipe._id)
                .populate('author')
                .then((recipe) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(recipe); 
                })               
            }, (err) => next(err));
        }
        else {
            err = new Error('Recipe ' + req.params.recipeId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Recipes.findByIdAndRemove(req.params.recipeId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
        .catch(err => next(err));
    });

module.exports = recipeRouter;
