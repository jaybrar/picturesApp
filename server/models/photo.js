var db = require("../config/postgres.js");
var path = require("path");
var fs = require('fs');
var sess;
module.exports = (function(){
	return{
	  getPhotos: getPhotos,
    uploadPhoto: uploadPhoto
	}
})();

var testFolder = path.join(__dirname,"../../app/uploads/");
function getPhotos(req, res) {
  var data = [];
  sess = req.session;
  var userid = sess.userid;
  db.any('select photourl from photos where userid=$1',[userid])
  .then(function (data) {
    JSON.stringify(data);
        res.send(data);
  })
  .catch(function (err) {
    console.log(err);
  });

  // fs.readdir(testFolder, function(err, files) {
  //     if(err){
  //         res.send(err);
  //     }else{
  //       files.forEach(function(file) {
  //         data.push('/uploads/'+file);
  //       });
  //       JSON.stringify(data);
  //       res.send(data);
  //     }
  // })
}
function uploadPhoto(req, res) {
    sess = req.session;
    var userid = '.'+ sess.userid.toString() +'.';
    var username = sess.name;
    var sampleFile;
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.file;
    var url = testFolder + username + userid + sampleFile.name;
    var dburl = '/uploads/' + username + userid + sampleFile.name;
    sampleFile.mv(url, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
          db.one("insert into photos(userid, photourl) values($1, $2) returning id", [sess.userid, dburl])
          .then(function (data) {
              console.log('file url saved to db.'); 
          })
          .catch(function (error) {
              console.log("ERROR:", error.message || error); // print error;
          });
            res.send('File uploaded!');
        }
    });
};