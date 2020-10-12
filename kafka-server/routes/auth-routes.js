const router = require('express').Router();
const passport=require('passport');
const keys=require('../config/keys');

// To return the user data to the client
router.get("/check", (req, res) => {
    console.log("user - " + req.user);
    console.log(req.session.passport);
    if (req.user === undefined) {
      res.json({});
    } else {
      res.json({
        user: req.user
      });
    }
  });

//local strategy
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  //google strategy
  router.get("/google", passport.authenticate("google", {
    scope: ["profile","email"]
  }));
  
  //callback router for google to redirect to
  // hand controll to passport to use code to grab profile info
  router.get('/google/redirect', passport.authenticate("google", { failureRedirect: "/" }),(req,res)=>{
   res.redirect(keys.redirectUrl);
  });

//github strategy
router.get('/github',passport.authenticate('github',{
    scope:['profile']
}));

router.get('/github/redirect',passport.authenticate('github',{failureRedirect: "/"}),(req,res)=>{
    res.redirect(keys.redirectUrl);
});


//facebook strategy
router.get('/facebook',passport.authenticate('facebook',{ scope: ['public_profile'] }));

router.get('/facebook/redirect',passport.authenticate('facebook',{failureRedirect:"/"},(req,res)=>{
    res && res.redirect(keys.redirectUrl);
}));

//auth logout
router.get('/logout',(req,res)=>{
 req.logout();
 res.redirect(keys.redirectUrl);
});

module.exports = router;