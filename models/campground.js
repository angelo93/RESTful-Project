var mongoose = require("mongoose");
    
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// https://www.udemy.com/the-web-developer-bootcamp/learn/lecture/3947302#questions/6168552
// const Comment = require('./comment');
// CampgroundSchema.pre('remove', async function() {
//    await Comment.remove({
//       _id: {
//          $in: this.comments
//       }
//    });
// });
 
module.exports = mongoose.model("Campground", campgroundSchema);