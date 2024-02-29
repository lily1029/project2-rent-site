const mongoose = require('mongoose')

const Schema = mongoose.Schema;


// ONE HOUSE HAS MANY REVIEWS
// A REVIEW BELONGS TO A HOUSE (Using mongoose embedding to implement the relationship)

// when we use embedding we define the schemas of the relationship in the same file
// Referencing (each data entity) gets its own model file
const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    // One to many relationship on the belongs to side
    user: {
      type: Schema.Types.ObjectId, // this is from mongoose
      ref: 'User' // this references this line mongoose.model('User', userSchema);
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  })

// Enforces the shape of the documents (Think of objects)
// in our mongodb houses collection
const houseSchema = new Schema({
    type: String, 
    address: String, 
    bedsbaths: String, 
    picture: String,
    price: String, 
    availableDate: Date, 
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('House', houseSchema);