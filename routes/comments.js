var express=require("express");
var router=express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//Add a new comment

router.get("/new",middleware.isLoggedIn, function(req,res){
    
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Create a comment

router.post("/",middleware.isLoggedIn, function(req,res){
   Campground.findById(req.params.id,function(err, campground){
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error","Something went wrong!!")
                console.log(err);
            } else {
                //add username and id to the comment
                
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save()
                campground.comments.push(comment);
                campground.save();
                console.log(comment);
                req.flash("success","Comment added Successfully");
                res.redirect("/campgrounds/" + campground._id);
            }
           })
       }
   }) ;
}); 

//Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        } else {
             res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    })
   
});

//Comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
     if(err){
         res.redirect("back");
     } else {
         res.redirect("/campgrounds/" + req.params.id);
     }  
    });
});
//comment destroy route

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("block");
        } else {
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/" +req.params.id);
        }
    })
});

//check comment Ownership



//middleware


module.exports = router;
