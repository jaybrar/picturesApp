var Photo = require("../models/photo.js");

module.exports = (function(){
	return{
		getPhotos: function(req,res){
			Photo.getPhotos(req,res);
		},
		uploadPhoto: function(req,res){
			Photo.uploadPhoto(req,res);
		}
	}
})();