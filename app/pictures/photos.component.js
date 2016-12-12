'use strict';
// register photos component along with its controller and template
angular.module('photos').
component('photosComponent', {
    templateUrl: 'pictures/photos.template.html',
    controller: ['Photos',
        function PhotosController(Photos) {
            var self = this;
            self.photos = [];
            Photos.getPhotos(function(results) {
                self.photos = results;
                console.log(self.photos);
            })
            self.name = 'PhotosController';
            self.service = Photos.name;
            self.msg = '';
            self.uploadFile = function() {

                var file = self.file;
                if (!file) {
                    self.msg = 'please attach file';
                    return;
                }
                var check = self.checkExtension(file.name);
                console.log('file is ');
                console.dir(file);
                var uploadUrl = "/upload";
                if (check) {
                    Photos.uploadPhoto(file, uploadUrl, function() {
                    	document.getElementById("file").value = "";
                    	self.file = '';
                        Photos.getPhotos(function(results) {
                            self.photos = results;
                        });
                    });
                } else {
                    self.msg = "only file extensions jpg, png, gif are excepted";
                }
            };
            self.checkExtension = function(fileName) {

                var extension = fileName.split(".").pop().toLowerCase();
                if (extension === 'jpg' || extension === 'png' || extension === 'gif') {
                    return true;
                }
                return false;
            };
        }
    ]
})