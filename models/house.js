const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const houseSchema = new Schema({
    type: String, 
    address: String, 
    bedsbaths: String, 
    //pictures: Image,
    price: String, 
    availableDate: Date, 
    reviews: ([])
}, {
    timestamps: true
});

module.exports = mongoose.model('House', houseSchema);