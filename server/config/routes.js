var users = require("../controllers/users.js");
var photos = require("../controllers/photos.js");
var sess;
module.exports = function(app){
	
	app.get("/", function(req, res) {
		sess = req.session;
		if(sess.email){
			var user = {};
			user.name = sess.name;
			user.email = sess.email;
			console.log(sess.email);
	    	res.render('main', {user: user});
		}else{
			res.redirect('/login');
		}
	})
	// app.get('/main', function(req, res) {
	// 	res.render('main')
	// })
	app.get('/login', function(req, res) {
		res.render('login')
	})
	app.post('/upload', function(req,res) {
		photos.uploadPhoto(req,res);
	})
	app.get('/photos', function(req,res) {
		photos.getPhotos(req,res);
	})
	app.get('/users', function(req, res){
		users.getUsers(req, res);
	})
	app.post('/login', function(req, res){
		users.loginUsers(req, res);
	})
	app.post('/register', function(req, res){
		users.registerUsers(req, res);
	})
	app.get('/logout', function(req,res){
		users.logoutUsers(req,res);
	})
	
	
};