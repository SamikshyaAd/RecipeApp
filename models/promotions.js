const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promoSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
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
var Promotions = mongoose.model('Promotion',promoSchema);

module.exports = Promotions;