const passport = require('passport');
require('dotenv').config()
const GoogleStrategy =require ('passport-google-oauth20').Strategy;
const User =require ('../model/schema');


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: `/redirect/google`,
      },
      async(
        _accessToken,
        _refreshToken,
        profile,
        done
      ) =>{
        console.log('callback')
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
  const addGoogleProfileToUser = async (profile) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: profile._json.email },
        {
          'externalIds.google': profile.id,
          'externalProfiles.google': profile._json,
        },
        { new: true }
      );
      return user;
    } catch (error) {
      return error;
    }
  };

  module.exports=passport