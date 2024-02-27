const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const houseSchema = new Schema({
    type: String, 
    address: String, 
    bedsbaths: Number, 
    pictures: Image,
    price: Number, 
    availableDate: Date, 
    reviews: ([])
}, {
    timestamps: true
});

module.exports = mongoose.model('House', houseSchema);