var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Round Valley Reservoir", 
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    },
    {
        name: "Stairway to Heaven", 
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    },
    {
        name: "Grand Canyon Floor", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    },
    {
        name: "Grand Canyon Floor", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    },
    {
        name: "Grand Canyon Floor", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    },
    {
        name: "Grand Canyon Floor", 
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Viral chicharrones shoreditch, synth tbh lo-fi kogi truffaut skateboard ennui echo park cloud bread"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    // Comment.create(
                    //     {
                    //         text: "This place is great, but I wish there was internet",
                    //         author: "Homer"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         } else {
                    //             campground.comments.push(comment);
                    //             campground.save();
                    //             console.log("Created new comment");
                    //         }
                    //     });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
