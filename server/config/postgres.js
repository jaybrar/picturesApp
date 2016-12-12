var pgp = require('pg-promise')();
// create the connection object
var cn = {
    host: 'localhost',
    port: 5432,
    database: 'users',
    user: 'mandeepbrar',
    password: ''
};
// connect by passing in the connection object
var db = pgp(cn);

//~~~ or you can directly pass in a string ~~~~
// var db = pgp('postgres://username:password@host:port/database');

module.exports = (function(){
	return db;
})();
