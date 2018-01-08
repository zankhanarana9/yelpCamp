var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/User.js");
var methodOverride = require("method-override");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds.js");
var Comment = require("./models/comment.js");
var flash = require("connect-flash");


//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");


//seed the database
//seedDB();

//Passport configuration

app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"Rusty is cute dog",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Server started!!!");
});