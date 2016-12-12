'use strict';

angular.module('myApp').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    }).when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    }).when('/photos', {
        template: '<photos-component></photos-component>',
    }).otherwise({ redirectTo: '/view1' });

}]);