const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    recipe : {
        type : mongoose.Schema.Types.ObjectId,
         ref : 'Recipe'
    }
    },  {
        timestamps : true
});

var Feedbacks = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedbacks;