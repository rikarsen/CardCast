angular

.module('cardCast.AppController', [
	'cardCast.LoginController',
	'cardCast.HomeController',
	'cardCast.ContactsController',
	'cardCast.AlertsController',
	'cardCast.ProfileController',
	'cardCast.CardsController'
])

.controller('AppController', ['$scope', '$state', '$interval', '$window', 'AJAX', 'alerts', function ($scope, $state, $interval, $window, AJAX, alerts) {
	$scope.$state = $state;

	$scope.app = {
		loading: true,
		token: null,
		contacts: {},
		searchedContacts: {},
		allSearchedContacts: {},
		alerts: {},
		alertsCount: 0,
		alertMin: 999999999999,
		alertMax: 0,
		cards: {},
		user: {},
		cardTemplates: [0, 1, 2],
		shareContactID: null
	};

	$scope.getCard = function (id) {
		return 'assets/partials/cards/card_' + id + '.html';
	};

	$interval(function () {
		AJAX.post({action: 'getNotifications', token: $scope.app.token}).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {

			} else {
				$scope.app.alerts = alerts(data.n);

				// var alertsCount = 0;
				// var callCardsRequest = false;

				// angular.forEach(data.n, function (alert) {
				// 	if(alert.isRead == 0) {
				// 		alertsCount++;
				// 	}

				// 	if(parseInt(alert.id) < $scope.app.alertMin) {
				// 		$scope.app.alertMin = alert.id;
				// 	}

				// 	if(parseInt(alert.id) > $scope.app.alertMax) {
				// 		$scope.app.alertMax = alert.id;
				// 	}

				// 	if(!angular.equals(alert, $scope.app.alerts[alert.id])) {
				// 		$scope.app.alerts[alert.id] = alert;
				// 	}

				// 	if(alert.type == 'cardRequestAccepted') {
				// 		if(!$scope.app.cards[alert.obj1]) {
				// 			callCardsRequest = true;
				// 		}
				// 	}
				// });

				// if(callCardsRequest) {
				// 	AJAX.post({action: 'getMyCards', token: $scope.app.token}).then(function (response) {
				// 		var data = response.data;

				// 		$scope.app.token = data.token;

				// 		if(data.e) {

				// 		} else {
				// 			angular.forEach(data.cards, function (contact) {
				// 				if(!angular.equals(contact, $scope.app.contacts[contact.id])) {
				// 					$scope.app.contacts[contact.id] = contact;
				// 				}
				// 			});
				// 		}
				// 	});
				// }

				// $scope.app.alertsCount = alertsCount;

				// if(alertsCount) {
				// 	$scope.$broadcast('readAlerts');
				// }
			}
		});
	}, 20000);

	function doOnOrientationChange () {
		switch(window.orientation)  {  
			case -90:
			case 90:
				$scope.orientation = 'landscape';
				
				break; 
			default:
				$scope.orientation = 'portrait';
				
				break; 
		}
	}

	window.addEventListener('orientationchange', doOnOrientationChange);

	doOnOrientationChange();
}]);