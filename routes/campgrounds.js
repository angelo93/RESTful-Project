var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX - Campground list
router.get("/", function(req, res){
    // IMPORT CAMPGROUNDS FROM MONGODB //
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

// NEW - show form to create campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// CREATE - ADD NEW CAMPGROUND //
router.post("/", middleware.isLoggedIn, function(req, res){
    // GET DATA FROM FORM & ADD DATA TO CAMPGROUNDS ARRAY
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create new Campground and push to DB //
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            // REDIRECT TO CAMPGROUNDS PAGE //
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info of selected campground
router.get("/:id", function(req, res){
    // Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            // Render campground with that ID
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - campgrounds
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE - campgrounds
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update campground, then redirect
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY - campground
router.delete("/:id/", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
