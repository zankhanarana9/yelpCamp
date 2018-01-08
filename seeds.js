var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");

var data  = [
    {
        name: "Sam Houston National Forest",
        image: "https://www.forestcamping.com/dow/graphics/samh.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
    },
      {
        name: "Houston MESA campground",
        image:"https://jamiecasebier.files.wordpress.com/2013/04/houston_mesa_sign.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
    },
      {
        name:"Blue Bonnet Campground",
        image: "https://texascampgrounds.com/wp-content/uploads/2014/06/084.jpg",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
    }
];

function seedDB(){
    
    //Remove all campgrounds
        Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed campgrounds");
            
        }
        //add few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err,data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added Campground");
                        //create a comment
                        Comment.create(
                            {
                                text:"This place is great but I wish it had internet",
                                author: "Zankhana Rana"
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    data.comments.push(comment);
                                    data.save();
                                    console.log("created  new comment");
                                }
                            });
                    }
                });
            });
        });
}


module.exports = seedDB;