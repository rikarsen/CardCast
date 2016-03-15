angular

.module('cardCast.HomeController', [])

.controller('HomeController', ['$scope', '$timeout', 'AJAX', 'scaleCard', function ($scope, $timeout, AJAX, scaleCard) {
	$scope.searchForm;

	$scope.searchLoading = false;
	$scope.cardCastLoading = false;

	$scope.searchSubmit = function (text) {
		$scope.searchLoading = true;

		AJAX.post({
			key: text || $scope.searchForm,
			action: 'search',
			token: $scope.app.token
		}).then(function (response) {
			var data = response.data;
			
			$scope.app.token = data.token;

			if(data.e) {

			} else {
				$scope.app.searchedContacts = data.cards;
			}

			$scope.searchLoading = false;

			$timeout(function () {
				scaleCard();
			});
		});
	};

	$scope.cardCast = function () {
		$scope.cardCastLoading = true;

		navigator.geolocation.getCurrentPosition(function foundLocation (position) {
			AJAX.post({
				lat: position.coords.latitude,
				long: position.coords.longitude,
				action: 'cardcast',
				token: $scope.app.token
			}).then(function (response) {
				var data = response.data;
				
				$scope.app.token = data.token;

				if(data.e) {

				} else {
					$scope.app.searchedContacts = data.cards;
				}
				
				$scope.cardCastLoading = false;
				$scope.searchLoading = false;

				$timeout(function () {
					scaleCard();
				});
			});
		}, function noLocation () {
			alert('Could not find location');
		});
	};
}]);