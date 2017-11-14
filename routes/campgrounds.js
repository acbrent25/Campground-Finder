var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE - Show all campgrounds
router.get("/", function(req, res){
    // Get all campagrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })  
});

//CREATE ROUTE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    // create object to push new campgrounds into
    var newCampground = {name: name, image: image, description: desc, author: author};
    console.log(req.user);


    // create new campground and save to DB

    //Sanitize it
    req.body.description = req.sanitize(req.body.description);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW ROUTE - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("new");
})

// SHOW ROUTE - Shows more info about 1 campground
router.get("/:id", function(req, res){
    // Find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id
    // render show template with that campground
    
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
     Campground.findById(req.params.id, function(err, foundCampground){
        res.render("edit", {campground: foundCampground});
    }); 
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // Sanitize
    req.body.campground.description = req.sanitize(req.body.campground.description);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // destroy campground
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
    //redirect 
});

module.exports = router;