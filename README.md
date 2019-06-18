# **Project utilizing RESTful routing**

#### Description:
Fully functional and responsive full stack web app. Utilizes RESTful routing conventions. 

Current features include:

* User sign up, login and logout.
* Campground creation, edit and deletion.
* Comment creation, edit and deletion.
* User authentication and permissions.

More features are planned and will be implemented soon!

#### Tech Stack:
* HTML: Web app layout.
* CSS: Landing page animations and styling of certain elements.
* Bootstrap: Navbar, and other styling elements.
* JavaScript: Web app logic.
* NodeJS: Web app hosting logic.
* Express: Web app routing logic.
* MongoDB: Database for web app.

#### Libraries and Modules:
For a full list, consult the JSON file.
* Bootstrap
* Express
* Flash
* Body Parser
* Mongoose
* Passport
* Method Override

## Campground Routes ##

| Name   | Path	                 | HTTP Verb | Purpose	                                | Mongoose Method               |
| ---    | ---                   | ---       | ---                                      | ---                           |
| Index	 | /campgrounds	         | GET	     | List all campgrounds	                    | Camgpround.find()             |
| New	 | /campgrounds/new	     | GET	     | Show new campground form	                | N/A                           |
| Create | /campgrounds	         | POST	     | Create a new campground	                | Campground.create()           |
| Show	 | /campgrounds/:id	     | GET	     | Show info about one specific campground	| Campground.findById()         |
| Edit	 | /campgrounds/:id/edit | GET	     | Show edit form for one campground	    | Campground.findById()         |
| Update | /campgrounds/:id	     | PUT	     | Update particular campground	            | Campground.findByIdAndUpdate()|
| Destroy| /campgrounds/:id	     | DELETE	 | Delete a particular campground	        | Campground.findByIdAndRemove()|

## Comment Routes ##

All comment routes preceeded by `/campgrounds/:id`

| Name   | Path	                     | HTTP Verb | Purpose	                              | Mongoose Method               |
| ---    | ---                       | ---       | ---                                    | ---                           |
| Index	 | /comments	             | GET	     | List all comments	                  | Comment.find()                |
| New	 | /comments/new	         | GET	     | Show new comment form	              | N/A                           |
| Create | /comments	             | POST	     | Create a new comment	                  | Comment.create()              |
| Show	 | /comments/comment_id	     | GET	     | Show info about one specific comment	  | Comment.findById()            |
| Edit	 | /comments/comment_id/edit | GET	     | Show edit form for one comment	      | Comment.findById()            |
| Update | /comments/comment_id	     | PUT	     | Update particular comment	          | Comment.findByIdAndUpdate()   |
| Destroy| /comments/comment_id	     | DELETE	 | Delete a particular comment	          | Comment.findByIdAndRemove()   |