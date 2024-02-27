const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require("../models/user");

// configuring Passport! this function will be called everytime
// a user login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  //the verify callback function(gets called everytime a user login)
  async function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    // Search the database for users profile
    // if we find a user with a profile.id that matches a users googleId
    let user = await UserModel.findOne({googleId: profile.id});
    if (user) return cb(null, user)

    try {
      user = await UserModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      })

      cb(null, user)

    } catch (err){
      return cb(err);

    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id)
  
});

passport.deserializeUser(async function(userId, cb) {

  // Find your User, using your model, and then call cb(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  try {
    const userDoc = await UserModel.findById(userId)
    cb(null, userDoc);
    // req.user = userDoc
  } catch(err){
    cb(err)

  }
});



