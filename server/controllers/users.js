var User = require("../models/user.js");

module.exports = (function(){
	return { //start obj

		getUsers: function(req,res){
			User.getUsers(req,res);
		},
		loginUsers: function(req,res){
			User.loginUsers(req,res);
		},
		registerUsers: function(req,res){
			User.registerUsers(req,res);
		},
		logoutUsers: function(req,res){
			req.session.destroy(function(err) {
			  if(err) {
			    console.log(err);
			  } else {
			    res.redirect('/login');
			  }
			});
		}
	} // end obj
})();
