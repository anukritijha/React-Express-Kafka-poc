const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./list-consumer-groups.app");
const passport=require('passport');
const mongoose=require('mongoose');
const cokkieSession=require('cookie-session');
const keys=require('./config/keys');
const authRoutes=require('./routes/auth-routes');
//const profileRoutes=require('./routes/profile-routes');
require('./config/passport-setup');

const app = express();

//setup session cokkies
app.use(cokkieSession({
  maxAge:24*60*60*100,
  keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{
  console.log('connected to mongodb');
});

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/auth',authRoutes);

      app.get("/user", (req, res) => {
        console.log("getting user data!");
        res.send(user);
    });
//app.use('profile',profileRoutes);
app.get("/api/consumergroups", groups.listGroups);

app.listen(port, () => console.log(`Listening on port ${port}`));
