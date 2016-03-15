angular

.module('cardCast.HomeController', [])

.controller('HomeController', ['$scope', '$timeout', 'AJAX', 'scaleCard', function ($scope, $timeout, AJAX, scaleCard) {
	$scope.searchForm;

	$scope.searchLoading = false;
	$scope.cardCastLoading = false;

	$scope.searchSubmit = function (text) {
		var time = text ? 3000 : 0;

		if(text) {
			$scope.cardCastLoading = true;
		} else {
			$scope.searchLoading = true;
		}

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

			$timeout(function () {
				$scope.cardCastLoading = false;
				$scope.searchLoading = false;

				$timeout(function () {
					scaleCard();
				})
			}, time);
		});
	};
}]);