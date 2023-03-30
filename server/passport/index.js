const passport = require('passport');
require('dotenv').config()
const GoogleStrategy =require ('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy
const User =require ('../model/schema');


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/auth/google/callback',
      },
      async function(
        _accessToken,
        _refreshToken,
        profile,
        done
      ){
        console.log('PROFILE',profile)
       
        if (!!profile.id) {
          const user = await User.findOne({ email: profile._json.email }).lean();
  
          // New user
          if (!user) {
            // redirect to register page
            return done(null, false);
          }
  
          // No google profile yet
          if (!!user && !user.externalIds?.google) {
            const updatedUser = await addGoogleProfileToUser(profile);
            return done(null, { ...updatedUser, strategy: 'google' });
          }
  
          // Has existing google profile
          if (
            !!user &&
            !!user.externalIds?.google &&
            user.externalIds?.google === profile.id
          ) {
            return done(null, { ...user, strategy: 'google' }); 
          }
        }
      }
    )
  );
  passport.serializeUser(function(user, done) {
    console.log('serialising')
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    console.log('deserialising')
    done(null, user);
  });
  
  passport.use(new LocalStrategy(
    function verify(username,password,done){
      console.log('local strategy')
      User.findOne({email:username},function(err,user){
        if(err){
          console.log('Wrong Email?')
          return done(err,false)
        }
        if(!user.validPassword(password)){
          console.log('Wrong Password')
          return done(err,false)
        }
        else{
          console.log('correct password')
          return done(null,user)
        }
      })
    }
  ))

  const addGoogleProfileToUser = async (profile) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: profile._json.email },
        {
          'googleId': profile.id,
        },
        { new: true }
      );
      return user;
    } catch (error) {
      return error;
    }
  };

  module.exports=passport