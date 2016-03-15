angular

.module('cardCast.LoginController', [])

.controller('LoginController', ['$scope', '$state', '$localStorage', '$timeout', 'AJAX', 'alerts', function ($scope, $state, $localStorage, $timeout, AJAX, alerts) {	
	$scope.$storage = $localStorage;

	$scope.loginForm = {
		data: {action: 'login'}
	};

	$scope.signupForm = {
		data: {action: 'register'}
	};

	$scope.recoverForm = {
		data: {action: 'recover'}
	};

	$scope.loginFormSubmit = function () {
		AJAX.post($scope.loginForm.data).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {
				$scope.loginForm.error = data.d;
			} else {
				$scope.loginForm.error = '';
				$scope.app.contacts = data.cards;
				$scope.app.alerts = alerts(data.notifications);
				$scope.app.cards = data.contacts;
				$scope.app.user = data.user;
				$scope.app.user.photo = 'http://cardcast.ourdevhost.com/images/uploads/' + data.user.photo;

				$scope.$storage.loginForm = $scope.loginForm;


				$state.go('home');
			}
		}).finally(function () {
			$timeout(function () {
				$scope.app.loading = false;
			}, 1000);
		});
	};

	$scope.signupFormSubmit = function () {
		AJAX.post($scope.signupForm.data).then(function (response) {
			var data = response.data;
		
			$scope.app.token = data.token;

			if(data.e) {
				$scope.signupForm.error = data.d;
			} else {
				$scope.signupForm.error = '';

				$scope.app.contacts = data.cards;
				$scope.app.alerts = data.notifications;
				$scope.app.cards = data.contacts;
				$scope.app.user = data.user;
				$scope.app.user.photo = 'http://cardcast.ourdevhost.com/images/uploads/' + data.user.photo;

				$scope.$storage.loginForm = {
					data: {
						username: $scope.signupForm.email,
						password: $scope.signupForm.password,
						action: 'login'
					}
				};

				$state.go('home');
			}
		});
	};

	$scope.recoverFormSubmit = function () {
		AJAX.post($scope.recoverForm.data).then(function (response) {
			var data = response.data;

			if(data.e) {
				$scope.recoverForm.error = data.d;
			} else {
				$scope.recoverForm.error = '';
			}
		});
	};

	if($scope.$storage.loginForm) {
		$scope.loginForm = $scope.$storage.loginForm;

		$scope.loginFormSubmit();
	} else {
		$scope.app.loading = false;
	}

	$scope.$watch('loginForm.data', function () {
		$scope.loginForm.error = '';
	}, true);

	$scope.$watch('signupForm.data', function () {
		$scope.signupForm.error = '';
	}, true);

	$scope.$watch('recoverForm.data', function () {
		$scope.recoverForm.error = '';
	}, true);
}]);