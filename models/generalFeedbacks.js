const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalFeedbackSchema = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
     telnum : {
        type : Number,
        min : 10,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    agree : {
        type : Boolean,
        default : false
    },
    contactType : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
    },  {
        timestamps : true
});

var GeneralFeedbacks = mongoose.model('GeneralFeedback',generalFeedbackSchema);

module.exports = GeneralFeedbacks;