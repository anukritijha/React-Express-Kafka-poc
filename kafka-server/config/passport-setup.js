const passport =require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const GithubStrategy=require('passport-github2');
const FacebookStrategy=require('passport-facebook2');
const keys=require('./keys');
const User=require('../model/user-model');

passport.serializeUser((user,done)=>{
  //console.log("serializeUser: ",user.id);
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{    
    //done(null,id);
  User.findById(id).then((user)=>{
    //console.log("user: ",user);
     done(null,user);
  });
});

function findOrCreate(profile, done, findObject, createObject) {
    //console.log('findOrCreate: ',profile);
    User.findOne(findObject).then(currentUser => {
      if (currentUser) {
        console.log("user found: " + currentUser);
        // already have this user
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User(createObject).save().then(newUser => {
          console.log("saving user: ",newUser);
          done(null, newUser);
        });
      }
    });
  }

//google strategy
passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:keys.google.callbackUrl
    },(accessToken,refreshToken,profile,done)=>{
        console.log("profile: ",profile);
        console.log(accessToken);
        console.log(refreshToken);
        findOrCreate(
            profile,
            done,
            {profileId:profile.id},
            {
                profileId:profile.id,
                username:profile.displayName,
                thumbnail:profile._json.picture
            }
        );
    })
);

//github strategy
passport.use(
    new GithubStrategy({
     clientID:keys.github.clientId,
     clientSecret:keys.github.clientSecret,
     callbackURL:keys.github.callbackUrl
    },(accessToken,refreshToken,profile,done)=>{
      console.log("profile: ",profile);
      done(null,profile);     
    })
);

//facebook strategy
passport.use(
    new FacebookStrategy({
     clientID:keys.facebook.clientId,
     clientSecret:keys.facebook.clientSecret,
     callbackURL:keys.facebook.callbackUrl
    },(accessToken,refreshToken,profile,done)=>{
        console.log("profile: ",profile);
        done(null,profile);  
    })
);
