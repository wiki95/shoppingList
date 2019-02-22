const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema 
const ItemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('students',ItemSchema);

module.exports = Item;