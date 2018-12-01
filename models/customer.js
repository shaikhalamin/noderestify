const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema   = mongoose.Schema;

const CustomerSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    balance:{
        type:Number,
        default:0
    }

});

CustomerSchema.plugin(timestamp);

const Customer = mongoose.model('Customer',CustomerSchema);

module.exports = Customer;

