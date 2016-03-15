angular

.module('cardCast.ProfileController', [])

.controller('ProfileController', ['$scope', '$state', '$localStorage', '$timeout', 'AJAX', 'fileReader', function ($scope, $state, $localStorage, $timeout, AJAX, fileReader) {
	$scope.$storage = $localStorage;

	$scope.userPhotoLoading = false;
	$scope.userAvatarFile = '';

	$scope.logout = function () {
		delete $scope.$storage.loginForm;

		$state.go('login');
	};

	$scope.getFile = function (file) {
		if(file) {
			$scope.userAvatarFile = file;

			$scope.$apply(function () {
				if($scope.app.user.photo) {
					$scope.userPhotoLoading = true;
				}
			});

			$timeout(function () {
				fileReader.readAsDataUrl(file, $scope).then(function (result) {
					$scope.userPhotoLoading = false;

					$scope.app.user.photo = result;
				});
			});
		}
	};

	$scope.$on('fileProgress', function(e, progress) {
		$scope.progress = progress.loaded / progress.total;
	});

	$scope.saveAvatar = function () {
		var file = $scope.userAvatarFile;

		var fd = new FormData();

		fd.append('token', $scope.app.token);
		fd.append('action', 'updateProfile');
		fd.append('photo', file);

		AJAX.postFile(fd).then(function (response) {
			var data = response.data;
			
			$scope.app.token = data.token;
		});
	};
}]);