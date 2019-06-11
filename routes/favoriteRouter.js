const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use (bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user:req.user._id})
    .populate('user')
    .populate('recipes')
    .then((favorite) => {
       res.statusCode = 200;
       res.setHeader ('Content-Type', 'application/json');
       res.json(favorite);
    }, (err) => next(err))
   .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favorites.findOne({user:req.user._id}, (err, favorite)=>{
        if(err){
            return next(err);
        }
        if(!favorite){
           Favorites.create({user:req.user._id})
           .then((favorite) => {
               for(i=0;i<req.body.length;i++){
                   if(favorite.recipes.indexOf(req.body[i]._id)){
                       favorite.recipes.push(req.body[i]);
                   }
               }
               favorite.save()
               .then((favorite)=>{
                   Favorites.findById(favorite._id)
                   .populate('user')
                    .populate('recipes')
                    .then((favorite)=> {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);   
                    }) 
               })
               .catch((err) => {
                   return next(err);
               });
           })
           .catch((err) => {
                   return next(err);
               }); 
        }
        else{
            for(i=0;i<req.body.length;i++){
                   if(favorite.recipes.indexOf(req.body[i]._id)){
                       favorite.recipes.push(req.body[i]);
                   }
            }
            favorite.save()
            .then((favorite)=>{
                Favorites.findById(favorite._id)
                .populate('user')
                .populate('recipes')
                .then((favorite)=> {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);   
                }) 
            })
            .catch((err) => {
                return next(err);
            });
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
            res.statusCode = 403;
            res.setHeader ('Content-Type', 'text/plain');
            res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
favoriteRouter.route('/:recipeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({user:req.user._id})
        .then((favorites) => {
             if (!favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favorites": favorites});
            }
            else {
                if (favorites.recipes.indexOf(req.params.recipeId) < 0) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({"exists": false, "favorites": favorites});
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({"exists": true, "favorites": favorites});
                }
            }
        }, (err) => next(err))
        .catch((err)=>next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user:req.user._id}, (err, favorite)=>{
        if(err){
            return next(err);
        }
        if(!favorite){
            Favorites.create({user:req.user._id})
            .then((favorite) =>{
                favorite.recipes.push({"_id":req.params.recipeId})
                .favorite.save()
                .then((favorite) =>{
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('recipes')
                    .then((favorite)=> {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);   
                    }) 
                })
                .catch((err) => {
                    return next(err);
                });
            })
            .catch((err) => {
                    return next(err);
            });
        }
        else{
           if(favorite.recipes.indexOf(req.params.recipeId)<0) {
               favorite.recipes.push({"_id":req.params.recipeId})
               favorite.save()
               .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .populate('user')
                    .populate('recipes')
                    .then((favorite)=> {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);   
                    }) 
            })
            .catch((err) => {
                    return next(err);
            });
         }
         else{
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Recipe '+req.params.recipeId+'already exists!') 
         }
           
        }
        
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader ('Content-Type', 'text/plain');
        res.end('PUT operation not supported on /favorites/' + req.params.recipeId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
        .then((favorite) => {
            if (favorite) {
                index = favorite.recipes.indexOf(req.params.recipeId);
                if (index >= 0) {
                    favorite.recipes.splice(index, 1);
                    favorite.save()
                    .then(favorite => {
                        Favorites.findById(favorite._id)
                        .populate('user')
                        .populate('recipes')
                        .then((favorite)=> {
                            console.log('Favorite recipe deleted ', favorite);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);   
                        }) 
                    })
                    .catch((err) => {return next(err)});
                }
                else {
                    err = new Error('Recipe ' + req.params.recipeId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }
            else {
                err = new Error('Favorites not found');
                err.status = 404;
                return next(err);
            }
        }, err => next(err))
        .catch(err => next(err));
    });


module.exports = favoriteRouter;