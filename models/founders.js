const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const founderSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        default : false
    },
     description : {
        type : String,
        required : true
    },
},{
    timestamps : true
});
var Founders = mongoose.model('Founder',founderSchema);

module.exports = Founders;