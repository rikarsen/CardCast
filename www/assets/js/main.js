'use strict';

angular

.module('cardCast', [
	'ui.bootstrap',
	'ui.router',
	'ngStorage',
	'ngAnimate',
	'ui.bootstrap.tpls',
	'angular-carousel',
	'cardCast.services',
	'cardCast.directives',
	'cardCast.filters',
	'cardCast.AppController'
])

.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	$httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
		var key, result = [];

		if(typeof data === 'string') return data;

		for(key in data) {
			if(data.hasOwnProperty(key)) result.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}

		return result.join('&');
	});
}])

.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'assets/partials/login.html',
		controller: 'LoginController'
	}).state('signup', {
		url: '/signup',
		templateUrl: 'assets/partials/signup.html',
		controller: 'LoginController'
	}).state('recover', {
		url: '/recover',
		templateUrl: 'assets/partials/recover.html',
		controller: 'LoginController'
	}).state('home', {
		url: '/home',
		templateUrl: 'assets/partials/home.html',
		controller: 'HomeController'
	}).state('contacts', {
		url: '/contacts',
		templateUrl: 'assets/partials/contacts.html',
		controller: 'ContactsController'
	}).state('contact', {
		url: '/contact/:id',
		templateUrl: 'assets/partials/contact.html',
		controller: 'ContactsController'
	}).state('shareContact', {
		url: '/shareContact',
		templateUrl: 'assets/partials/shareContact.html',
		controller: 'ContactsController'
	}).state('alerts', {
		url: '/alerts',
		templateUrl: 'assets/partials/alerts.html',
		controller: 'AlertsController'
	}).state('profile', {
		url: '/profile',
		templateUrl: 'assets/partials/profile.html',
		controller: 'ProfileController'
	}).state('cards', {
		url: '/cards',
		templateUrl: 'assets/partials/cards.html',
		controller: 'CardsController'
	}).state('card', {
		url: '/card/:id',
		templateUrl: 'assets/partials/card.html',
		controller: 'CardsController'
	});
})

.run(['$rootScope', '$http', '$timeout', '$localStorage', '$state', '$window', '$templateCache', 'scaleCard', function ($rootScope, $http, $timeout, $localStorage, $state, $window, $templateCache, scaleCard) {
	$timeout(function () {
		$state.go('login');
	});

	$rootScope.goBack = function () {
		$window.history.back();
	};

	$(window).on('load resize', function () {
		scaleCard();
	});

	$rootScope.$on('$includeContentLoaded', function(event, templateName) {
		$timeout(function () {
			scaleCard();
		});
	});
}]);