var db = require("../config/postgres.js");
var bcrypt = require('bcrypt');//for password hash
const saltRounds = 10;//for password salt

module.exports = (function(){
	return{
	  getUsers: getUsers,
	  loginUsers: loginUsers,
	  registerUsers: registerUsers
	}
})();
var sess;
function getUsers(req, res) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function loginUsers(req, res) {
	sess = req.session;
	var email = req.body.email.trim();
	var password = req.body.password.trim();

	db.any('select * from users where email=$1',[email])
	.then(function (data) {
		console.log('data',data[0]);
		if(data.length > 0){
			var hashed = data[0].password;
			// compare db password with password from input
			bcrypt.compare(password, hashed, function(err, result) {
			    if(result){ //result returns true
					sess.email = email;
					sess.name = data[0].name;
					sess.userid = data[0].id;
					res.redirect('/');
			    }
			});
		}else{
			console.log('user not found')
			res.redirect('/login');
		}
	})
	.catch(function (err) {
	  console.log(err);
	});
}

function registerUsers(req, res) {
	var sess = req.session;
	var name = req.body.name.trim();
	var email = req.body.email.trim();
	var password = req.body.password.trim();
	
	// check if user already exists
	db.any('select * from users where email=$1',[email])
	.then(function (data) {
		// if user exists, then redirect
		if(data.length > 0){
			console.log('user exists');
			res.redirect('/');
		// otherwise add user to db
		}else{
			addUser();
		}
	})
	.catch(function (err) {
	  console.log(err);
	});
	// adds user to db
    function addUser(){
    	//hash password before storing to db
		bcrypt.hash(password, saltRounds, function(err, hash) {
	    	db.one("insert into users(name, email, password) values($1, $2, $3) returning id,name,email", [name, email, hash])
		    .then(function (data) {
		        console.log('register data',data);
		        sess.email = data.email;
				sess.name = data.name;
				sess.userid = data.id;
		        res.redirect('/'); 
		    })
		    .catch(function (error) {
		        console.log("ERROR:", error.message || error); // print error;
		    });
		});
    }

}