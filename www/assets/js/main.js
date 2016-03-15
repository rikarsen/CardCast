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
		controller: 'LoginController',
		showFooterNav: false
	}).state('signup', {
		url: '/signup',
		templateUrl: 'assets/partials/signup.html',
		controller: 'LoginController',
		showFooterNav: false
	}).state('recover', {
		url: '/recover',
		templateUrl: 'assets/partials/recover.html',
		controller: 'LoginController',
		showFooterNav: false
	}).state('home', {
		url: '/home',
		templateUrl: 'assets/partials/home.html',
		controller: 'HomeController',
		showFooterNav: true
	}).state('contacts', {
		url: '/contacts',
		templateUrl: 'assets/partials/contacts.html',
		controller: 'ContactsController',
		showFooterNav: true
	}).state('contact', {
		url: '/contact/:id',
		templateUrl: 'assets/partials/contact.html',
		controller: 'ContactsController',
		showFooterNav: false
	}).state('shareContact', {
		url: '/shareContact',
		templateUrl: 'assets/partials/shareContact.html',
		controller: 'ContactsController',
		showFooterNav: true
	}).state('alerts', {
		url: '/alerts',
		templateUrl: 'assets/partials/alerts.html',
		controller: 'AlertsController',
		showFooterNav: true
	}).state('profile', {
		url: '/profile',
		templateUrl: 'assets/partials/profile.html',
		controller: 'ProfileController',
		showFooterNav: true
	}).state('cards', {
		url: '/cards',
		templateUrl: 'assets/partials/cards.html',
		controller: 'CardsController',
		showFooterNav: true
	}).state('card', {
		url: '/card/:id',
		templateUrl: 'assets/partials/card.html',
		controller: 'CardsController',
		showFooterNav: false
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

	$http.get('assets/partials/alerts.html', {cache: $templateCache});
	$http.get('assets/partials/card.html', {cache: $templateCache});
	$http.get('assets/partials/cards.html', {cache: $templateCache});
	$http.get('assets/partials/contact.html', {cache: $templateCache});
	$http.get('assets/partials/contacts.html', {cache: $templateCache});
	$http.get('assets/partials/home.html', {cache: $templateCache});
	$http.get('assets/partials/login.html', {cache: $templateCache});
	$http.get('assets/partials/profile.html', {cache: $templateCache});
	$http.get('assets/partials/recover.html', {cache: $templateCache});
	$http.get('assets/partials/shareContact.html', {cache: $templateCache});
	$http.get('assets/partials/signup.html', {cache: $templateCache});
	$http.get('assets/partials/footerNav.html', {cache: $templateCache});
}]);