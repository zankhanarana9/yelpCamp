var express=require("express");
var router=express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/",function(req,res){
    //Get all campgrounds from db
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
    //name and image of campground 
    
});

router.get("/new", middleware.isLoggedIn,function(req,res){
   req.flash("error","You need to be logged in!");
   res.render("campgrounds/new.ejs"); 
   
});

//SHOW ROUTE: shows more info about one campground

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundGround){
        if(err){
            console.log(err);
        } else {
            console.log(foundGround);
            res.render("campgrounds/show",{campgrounds: foundGround});
        }
    });
   
});

router.post("/", middleware.isLoggedIn,function(req,res){
   //getdata from the form
   var campName = req.body.name;
   var price = req.body.price;
   var image = req.body.imageURL;
   var desc = req.body.description;
   var author = {
       id:req.user._id,
       username: req.user.username
   }
   var newCampGround = {name: campName,price: price, image: image, description: desc, author: author };
   console.log(req.user);
   //create new campground and save to db
   
   Campground.create(newCampGround, function(err,newlyCreated){
       if(err){
           console.log(err);
       } else {
           console.log("Newly created" + newlyCreated);
           res.redirect("/campgrounds");
       }
   });
   //add to campground array
   //redirect to /campground
   
   
});

//EDIT Campground Route

router.get("/:id/edit",middleware.checkCampGroundOwnership,function(req,res){
    
         Campground.findById(req.params.id, function(err,foundCampground){
              res.render("campgrounds/edit", {campground: foundCampground});            
        });
});

//UPDATE Campground route

router.put("/:id",middleware.checkCampGroundOwnership,function(req,res){
    
    //find out the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

//DESTROY campground route
router.delete("/:id",middleware.checkCampGroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campgrounds");
      }  else {
          res.redirect("/campgrounds")
      }
   });
});





module.exports = router;