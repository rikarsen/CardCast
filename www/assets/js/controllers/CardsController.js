angular

.module('cardCast.CardsController', [])

.controller('CardsController', ['$scope', '$stateParams', '$state', '$timeout', 'AJAX', function ($scope, $stateParams, $state, $timeout, AJAX) {
	if($stateParams.id) {
		$scope.contact = $scope.app.cards[$stateParams.id] || {};

		if($scope.contact.templateID) {
			$scope.contact.templateID = parseInt($scope.contact.templateID);
		}
	}

	$scope.delete = function (id) {
		swal({
			title: 'Are you sure?',
			text: 'You will not be able to recover back!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Confirm',
			showLoaderOnConfirm: true,
			closeOnConfirm: false
		}, function () {
			AJAX.post({
				id: id,
				action: 'deleteContact',
				token: $scope.app.token
			}).then(function (response) {
				var data = response.data;

				$scope.app.token = data.token;

				if(data.e) {
					doFail(data.d);
				} else {
					swal({
						title: 'Deleted!',
						text: data.d,
						type: 'success',
						confirmButtonText: 'Ok'
					}, function () {
						$scope.$apply(function () {
							delete $scope.app.cards[id];
						});
					});
				}
			});
		});
	};

	$scope.save = function () {
		var data = $scope.contact;

		data.token = $scope.app.token;
		data.action = 'createContact';

		AJAX.post(data).then(function (response) {
			var data = response.data;

			$scope.app.token = data.token;

			if(data.e) {
				swal({
					title: 'Error!',
					text: data.d,
					type: 'error',
					confirmButtonText: 'Ok'
				});
			} else {
				swal({
					title: 'Success!',
					text: data.d,
					type: 'success',
					confirmButtonText: 'Ok'
				}, function () {
					$scope.app.cards[$scope.contact.id] = $scope.contact;

					$state.go('cards');
				});
			}
		});
	};

	$scope.getCarouselHeight = function () {
		return ($(window).width() - 30) / 1.75 + 'px';
	};

	$scope.occupations = {};
	$scope.occupationsShow = false;
	$scope.occupationSelected = false;

	$scope.$watch('card.occupation', function (nVal, oVal) {
		if(nVal !== oVal) {
			if(nVal == '') {
				$scope.occupations = {};
			} else if(nVal.length > 2) {
				if($scope.occupationSelected) {
					$scope.occupationSelected = false;
				} else {
					AJAX.post({
						key: nVal,
						action: 'getOccupations',
						token: $scope.app.token
					}).then(function (response) {
						var data = response.data;

						$scope.occupations = data.occupations;
						$scope.occupationsShow = true;

						$('html, body').scrollTop($('.relative').offset().top - 70);
					});
				}
			}
		}
	});

	$scope.selectOccupation = function (occupation) {
		$scope.occupationsShow = false;
		$scope.occupations = {};

		$scope.occupationSelected = true;

		$scope.card.occupation = occupation;
	};
}]);