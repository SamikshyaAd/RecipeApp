const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    ingredients : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        default : false
    },
    direction : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
},  {
        timestamps : true
    });

var Recipes = mongoose.model('Recipe',recipeSchema);

module.exports = Recipes;