var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//ADMIN ROUTE - SHOW ADMIN AREA
router.get("/", function(req, res){
    // Get all campagrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("admin", {campgrounds: campgrounds});
        }
    })  
});

module.exports = router;