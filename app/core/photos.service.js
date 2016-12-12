'use strict';

angular.
module('core').
factory('Photos', ['$resource','$http',
    function($resource, $http) {
        var resource = $resource('/photos', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });

        function getPhotos(callback) {
            $http.get('/photos').success(function(results){
                callback(results);
            })
        }

        function savePhoto(event) {
            return resource.save(event);
        }

        function uploadPhoto(file, uploadUrl, callback) {
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).success(function(res) {
                console.log('file saved',res);
                callback();
            }).error(function(res) {
                console.log('error saving file',res);
            });
        }
        var service = {
            name: "photos sevice",
            getPhotos: getPhotos,
            savePhoto: savePhoto,
            uploadPhoto: uploadPhoto
        };

        return service;
    }

]);