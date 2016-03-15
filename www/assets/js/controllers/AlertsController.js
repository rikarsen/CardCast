angular

.module('cardCast.AlertsController', [])

.controller('AlertsController', ['$scope', 'AJAX', function ($scope, AJAX) {
	$scope.read = function () {
		AJAX.post({
			action: 'markNotificationsAsRead',
			idMin: $scope.app.alerts.min,
			idMax: $scope.app.alerts.max,
			token: $scope.app.token
		}).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {
				// doFail(data.d);
			} else {
				$scope.app.alerts.noReadCount = 0;
			}
		});
	};

	if($scope.app.alerts.noReadCount) {
		$scope.read();
	};

	$scope.accept = function (id) {
		AJAX.post({
			action: 'acceptCardRequest',
			id: id,
			answer: 1,
			token: $scope.app.token
		}).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {
				// doFail(data.d);
			} else {
				swal({
					title: 'Success!',
					text: data.d,
					type: 'success',
					confirmButtonText: 'Ok'
				}, function () {
					$scope.$apply(function () {
						$scope.app.alerts[id].isAnswer = 1;
					});
				});
			}
		});
	};

	$scope.reject = function (id) {
		AJAX.post({
			action: 'acceptCardRequest',
			id: id,
			answer: -1,
			token: $scope.app.token
		}).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {
				// doFail(data.d);
			} else {
				swal({
					title: 'Success!',
					text: data.d,
					type: 'success',
					confirmButtonText: 'Ok'
				}, function () {
					$scope.$apply(function () {
						$scope.app.alerts[id].isAnswer = 1;
					});
				});
			}
		});
	};

	$scope.$on('readAlerts', function (e) {
		$scope.read();
	});
}]);