var express = require("express");
var path = require("path");
var fs = require('fs');
var session = require('express-session');
// for handling file uploads
var fileUpload = require('express-fileupload');
var app = express();
var bodyParser = require("body-parser");

app.use(session({secret: '123456'}));
require('./config/postgres.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../app")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "../app"));
require('./config/routes.js')(app);
app.listen(8000, function() {
        console.log("listening on port 8000");
    })

