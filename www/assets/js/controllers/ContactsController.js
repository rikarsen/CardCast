angular

.module('cardCast.ContactsController', [])

.controller('ContactsController', ['$scope', '$stateParams', '$state', 'AJAX', function ($scope, $stateParams, $state, AJAX) {
	if($stateParams.id) {
		$scope.contact = $scope.app.contacts[$stateParams.id] || $scope.app.searchedContacts[$stateParams.id];
	}

	$scope.searched = false;

	$scope.add = function () {
		AJAX.post({
			id: $scope.contact.id,
			action: 'addToMyCards',
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
					$state.go('home');
				});
			}
		})	
	};

	$scope.remove = function () {
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
				id: $scope.contact.id,
				action: 'deleteFromMyCards',
				token: $scope.app.token
			}).then(function (response) {
				var data = response.data;

				$scope.app.token = data.token;

				if(data.e) {
					// doFail(data.d);
				} else {
					swal({
						title: 'Deleted!',
						text: data.d,
						type: 'success',
						confirmButtonText: 'Ok'
					}, function () {
						delete $scope.app.contacts[$scope.contact.id];

						$state.go('contacts');
					});
				}
			});
		});
	};

	$scope.shareContact = function (id) {
		$scope.app.shareContactID = id;

		console.log(id)

		$state.go('shareContact');
	};

	$scope.share = function (id) {
		AJAX.post({
			action: 'shareFromMyCards',
			shareContactID: $scope.app.shareContactID,
			receiverContactID: id,
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
					$state.go('contacts');
				});
			}
		});
	};
}]);